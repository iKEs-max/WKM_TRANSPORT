import Joi from 'joi';

export const createBooking = {
  body: Joi.object().keys({
    routeId: Joi.string().required(),
    numberOfTickets: Joi.number().integer().min(1).required(),
  }),
};

export const createConciergeBooking = {
  body: Joi.object().keys({
    routeId: Joi.string().required(),
    numberOfTickets: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    paymentMethod: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
  }),
};

export const getBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().required(),
  }),
};

export const cancelBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().required(),
  }),
};

export const updateBookingStatus = {
  params: Joi.object().keys({
    bookingId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED').required(),
  }),
};
