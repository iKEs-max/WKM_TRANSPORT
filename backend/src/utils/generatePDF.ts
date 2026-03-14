import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateTicketPDF = async (
  bookingData: any,
  outputPath: string,
  siteName: string = 'WKM Transport'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // Add company logo/header
      doc.fontSize(25).text(siteName, { align: 'center' });
      doc.moveDown();

      doc.fontSize(20).text(`Ticket: ${bookingData.ticketNumber}`, { align: 'center' });
      doc.moveDown();

      // Passenger Details
      const passengerName = bookingData.user
        ? `${bookingData.user.firstName} ${bookingData.user.lastName}`
        : bookingData.guestName || 'Valued Customer';
      const passengerEmail = bookingData.user?.email || 'N/A';

      doc.fontSize(14).text('Passenger Details:');
      doc.fontSize(12).text(`Name: ${passengerName}`);
      doc.text(`Email: ${passengerEmail}`);
      doc.moveDown();

      // Trip Details
      doc.fontSize(14).text('Trip Details:');
      doc.fontSize(12).text(`Route: ${bookingData.route.departure} to ${bookingData.route.destination}`);
      doc.text(`Departure Time: ${bookingData.selectedTime || 'Specified at station'}`);
      doc.text(`Travel Date: ${new Date(bookingData.createdAt).toLocaleDateString()}`);
      doc.moveDown();

      // Payment Details
      doc.fontSize(14).text('Payment Details:');
      doc.fontSize(12).text(`Tickets: ${bookingData.numberOfTickets}`);
      doc.text(`Total Amount: GHS ${bookingData.totalAmount}`);
      doc.text(`Status: Paid / Confirmed`);

      doc.end();

      stream.on('finish', () => resolve(outputPath));
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
};
