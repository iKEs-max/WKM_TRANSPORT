import express from 'express';
import { validate } from '../../middleware/validation';
import * as bookingValidation from './booking.validation';
import * as bookingController from './booking.controller';
import { auth } from '../auth/auth.middleware';

const router = express.Router();

// Public tracking & concierge routes - Must be before auth()
router.get('/track/:ticketCode', bookingController.trackBooking);
router.post('/concierge', validate(bookingValidation.createConciergeBooking), bookingController.createConciergeBooking);

// All booking routes require authentication
router.use(auth());

router.post('/', validate(bookingValidation.createBooking), bookingController.createBooking);
router.get('/', bookingController.getUserBookings);
router.get('/:bookingId', validate(bookingValidation.getBooking), bookingController.getBooking);
router.post('/:bookingId/cancel', validate(bookingValidation.cancelBooking), bookingController.cancelBooking);
router.patch('/:bookingId/status', validate(bookingValidation.updateBookingStatus), bookingController.updateBookingStatus);

export default router;
