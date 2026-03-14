import Joi from 'joi';

export const updateSettings = {
  body: Joi.object().keys({
    siteName: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    contactPhone: Joi.string().allow('', null),
    whatsappNumber: Joi.string().allow('', null),
    facebookUrl: Joi.string().uri().allow('', null),
    twitterUrl: Joi.string().uri().allow('', null),
    instagramUrl: Joi.string().uri().allow('', null),
    defaultCurrency: Joi.string().required(),
    paymentProvider: Joi.string().required(),
    maxSeatsPerBooking: Joi.number().integer().min(1).required(),
    enableEmailNotifications: Joi.boolean().required(),
  }),
};
