import prisma from '../../config/database';
import { generateTicketNumber } from '../../utils/generateTicket';
import { sendSMS } from '../../services/sms.service';

export class BookingService {
  async createBooking(data: {
    userId: string;
    routeId: string;
    numberOfTickets: number;
    selectedTime?: string;
  }) {
    const route = await prisma.route.findUnique({ where: { id: data.routeId } });
    const user = await prisma.user.findUnique({ where: { id: data.userId } });

    if (!route || route.status !== 'ACTIVE') {
      throw new Error('Route not found or inactive');
    }

    if (route.availableSeats < data.numberOfTickets) {
      throw new Error('Not enough seats available');
    }

    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: data.userId,
          routeId: data.routeId,
          numberOfTickets: data.numberOfTickets,
          selectedTime: data.selectedTime,
          totalAmount: Number(route.price) * data.numberOfTickets,
          ticketNumber: generateTicketNumber(),
          status: 'PENDING',
        },
      });

      await tx.route.update({
        where: { id: data.routeId },
        data: { availableSeats: { decrement: data.numberOfTickets } },
      });

      return newBooking;
    });

    // Notify User
    if (user?.phone) {
      const msg = [
        `🕒 WKM: Booking Received`,
        `Ticket: ${booking.ticketNumber}`,
        `Route: ${route.departure} ➔ ${route.destination}`,
        `Time: ${data.selectedTime || 'N/A'}`,
        `Status: Awaiting Payment`,
        `Please complete your payment to secure your seat.`
      ].join('\n');
      sendSMS(user.phone, msg).catch((err) => console.error('Initial SMS failed', err));
    }

    return booking;
  }

  async createConciergeBooking(data: {
    routeId: string;
    numberOfTickets: number;
    name: string;
    phone: string;
    paymentMethod: string;
    date: string;
    time: string;
  }) {
    const route = await prisma.route.findUnique({ where: { id: data.routeId } });

    if (!route || route.status !== 'ACTIVE') {
      throw new Error('Route not found or inactive');
    }

    if (route.availableSeats < data.numberOfTickets) {
      throw new Error('Not enough seats available');
    }

    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          routeId: data.routeId,
          numberOfTickets: data.numberOfTickets,
          guestName: data.name,
          guestPhone: data.phone,
          selectedTime: data.time,
          totalAmount: Number(route.price) * data.numberOfTickets,
          ticketNumber: generateTicketNumber(),
          status: 'PENDING',
        },
      });

      await tx.route.update({
        where: { id: data.routeId },
        data: { availableSeats: { decrement: data.numberOfTickets } },
      });

      return newBooking;
    });

    // Notify Customer
    const customerMsg = [
      `🚌 ONUKPA EXPRESS RIDE`,
      `Booking Received!`,
      `Ticket: ${booking.ticketNumber}`,
      `Route: ${route.departure} ➔ ${route.destination}`,
      `Date: ${data.date} at ${data.time}`,
      `Seats: ${data.numberOfTickets}`,
      `Total: GHS ${(Number(route.price) * data.numberOfTickets).toFixed(2)}`,
      `Payment: ${data.paymentMethod.toUpperCase()}`,
      `Status: Awaiting Verification`
    ].join('\n');
    sendSMS(data.phone, customerMsg).catch((err) => console.error('Customer SMS failed', err));

    // Notify Admin
    const settings = await prisma.globalSetting.findUnique({ where: { id: 'global_config' } });
    if (settings?.contactPhone) {
      const adminMsg = `New Concierge Booking!\nRoute: ${route.departure}-${route.destination}\nCustomer: ${data.name}\nPhone: ${data.phone}\nTicket: ${booking.ticketNumber}`;
      sendSMS(settings.contactPhone, adminMsg).catch((err) =>
        console.error('Admin SMS failed', err)
      );
    }

    return booking;
  }

  async trackBooking(ticketCode: string) {
    const booking = await prisma.booking.findFirst({
      where: { ticketNumber: ticketCode },
      include: { route: true },
    });

    if (!booking) {
      throw new Error('Ticket not found');
    }

    const now = new Date();
    const travelDate = new Date(booking.createdAt); // Fallback to createdAt if needed
    let status = 'Scheduled';
    let eta = 'N/A';

    if (booking.status === 'CONFIRMED') {
      // Parse selectedTime if present, e.g., "10:00 AM"
      const departureTime = (booking as any).selectedTime || '10:00 AM';
      const [time, modifier] = departureTime.split(' ');
      const [hoursStr, minutesStr] = time.split(':');
      let hours = Number(hoursStr);
      const minutes = Number(minutesStr) || 0;

      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      const departureDate = new Date(travelDate);
      departureDate.setHours(hours, minutes, 0, 0);

      if (now > departureDate) {
        status = 'In Transit';
        const hoursSinceDeparture = (now.getTime() - departureDate.getTime()) / (1000 * 60 * 60);
        if (hoursSinceDeparture > 5) {
          status = 'Arrived';
          eta = 'Arrived';
        } else {
          // Rudimentary ETA: 6 hours total trip - elapsed time
          const remaining = Math.max(1, 6 - hoursSinceDeparture);
          eta = `${Math.round(remaining)} hours`;
        }
      }
    } else if (booking.status === 'PENDING') {
      status = 'Awaiting Payment';
    } else {
      status = booking.status;
    }

    return {
      status,
      eta,
      booking: {
        ticket_code: booking.ticketNumber,
        origin: booking.route.departure,
        destination: booking.route.destination,
        departure_time: (booking as any).selectedTime || '10:00 AM',
        travel_date: travelDate,
      },
    };
  }
}

export const bookingService = new BookingService();
