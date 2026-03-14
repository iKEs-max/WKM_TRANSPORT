import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import prisma from '../../config/database';
import { HubtelProvider } from '../payments/providers/hubtel.provider';
import { generateTicketPDF } from '../../utils/generatePDF';
import { sendSMS } from '../../services/sms.service';
import { sendEmail } from '../../utils/sendEmail';
import path from 'path';

const providers = {
  hubtel: new HubtelProvider(),
};

export const handleWebhook = async (req: Request, res: Response) => {
  const { provider, reference } = req.body;

  const payment = await prisma.payment.findUnique({
    where: { reference },
    include: { booking: { include: { user: true, route: true } } },
  });

  if (!payment) return res.status(httpStatus.NOT_FOUND).send();
  if (payment.status !== 'PENDING') return res.status(httpStatus.OK).send();

  const selectedProvider = providers[provider as keyof typeof providers];
  if (!selectedProvider) return res.status(httpStatus.BAD_REQUEST).send();

  const verification = await selectedProvider.verifyPayment(reference);

  if (verification.status === 'SUCCESS') {
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'SUCCESS' },
      }),
      prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' },
      }),
    ]);

    // Dispatch Confirmation SMS
    const { booking } = payment;
    if (booking.user?.phone) {
      const msg = [
        `🎟️ WKM CONFIRMED!`,
        `Ticket: ${booking.ticketNumber}`,
        `Route: ${booking.route.departure} ➔ ${booking.route.destination}`,
        `Seats: ${booking.numberOfTickets}`,
        `Time: ${(booking as any).selectedTime || 'N/A'}`,
        `Status: Paid & Ready`,
        `Thank you for choosing WKM Transport!`,
      ].join('\n');
      sendSMS(booking.user.phone, msg).catch((err) => console.error('SMS Confirmation failed', err));
    }

    // Async tasks: Generate PDF and send email
    try {
      const settings = await prisma.globalSetting.findFirst();
      const siteName = settings?.siteName || 'WKM Transport';

      const tempDir = path.join(__dirname, '../../../tmp');
      const outputPath = path.join(tempDir, `ticket-${booking.ticketNumber}.pdf`);

      await generateTicketPDF(booking, outputPath, siteName);

      if (settings?.enableEmailNotifications && booking.user?.email) {
        await sendEmail(
          booking.user.email,
          `Your ${siteName} Ticket Confirmation`,
          `Hello ${booking.user.firstName},\n\nYour booking from ${booking.route.departure} to ${booking.route.destination} has been confirmed. Please find your ticket attached.`,
          outputPath
        );
      }
    } catch (e) {
      console.error('Failed to process post-payment tasks', e);
    }
  } else if (verification.status === 'FAILED') {
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      }),
      prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CANCELLED' },
      }),
      prisma.route.update({
        where: { id: payment.booking.routeId },
        data: { availableSeats: { increment: payment.booking.numberOfTickets } },
      }),
    ]);
  }

  res.status(httpStatus.OK).send();
};
