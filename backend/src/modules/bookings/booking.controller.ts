import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import prisma from '../../config/database';
import { bookingService } from './booking.service';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { routeId, numberOfTickets, selectedTime } = req.body;
    const user = req.user as { id: string };
    const userId = user.id;

    const result = await bookingService.createBooking({
      userId,
      routeId,
      numberOfTickets,
      selectedTime,
    });

    res.status(httpStatus.CREATED).send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    include: { route: true, payment: true },
    orderBy: { createdAt: 'desc' },
  });
  res.send({
    success: true,
    data: bookings,
  });
};

export const getBooking = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const booking = await prisma.booking.findFirst({
    where: {
      id: req.params.bookingId,
      userId: user.id,
    },
    include: { route: true, payment: true },
  });

  if (!booking) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Booking not found' });
  }
  res.send({
    success: true,
    data: booking,
  });
};

export const cancelBooking = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const booking = await prisma.booking.findFirst({
    where: { id: req.params.bookingId, userId: user.id },
  });

  if (!booking || booking.status === 'CANCELLED') {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Valid booking not found' });
  }

  const result = await prisma.$transaction(async (tx) => {
    const cancelled = await tx.booking.update({
      where: { id: booking.id },
      data: { status: 'CANCELLED' },
    });

    await tx.route.update({
      where: { id: booking.routeId },
      data: { availableSeats: { increment: booking.numberOfTickets } },
    });
    return cancelled;
  });

  res.send({
    success: true,
    data: result,
  });
};

export const trackBooking = async (req: Request, res: Response) => {
  try {
    const { ticketCode } = req.params;
    const result = await bookingService.trackBooking(ticketCode);
    res.send({ success: true, ...result });
  } catch (error: any) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const booking = await prisma.booking.update({
    where: { id: req.params.bookingId },
    data: { status },
    include: { route: true, user: true }
  });

  // SMS notifications could be moved to service too, leaving here for now for simplicity
  res.send({
    success: true,
    data: booking
  });
};

export const createConciergeBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createConciergeBooking(req.body);
    res.status(httpStatus.CREATED).send({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
