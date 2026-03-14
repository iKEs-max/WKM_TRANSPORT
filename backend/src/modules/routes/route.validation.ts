import Joi from 'joi';

export const createRoute = {
  body: Joi.object().keys({
    departure: Joi.string().required(),
    destination: Joi.string().required(),
    price: Joi.number().min(0).required(),
    departureTime: Joi.date().iso().optional(),
    arrivalTime: Joi.date().iso().min(Joi.ref('departureTime')).optional(),
    departureTimes: Joi.array().items(Joi.string()).optional(),
    totalSeats: Joi.number().integer().min(1).required(),
    availableSeats: Joi.number().integer().min(0).required(),
    isPopular: Joi.boolean().default(false),
    estimatedDuration: Joi.string().optional(),
    operatingDays: Joi.string().optional(),
  }),
};

export const updateRoute = {
  params: Joi.object().keys({
    routeId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    departure: Joi.string(),
    destination: Joi.string(),
    price: Joi.number().min(0),
    departureTime: Joi.date().iso(),
    arrivalTime: Joi.date().iso().min(Joi.ref('departureTime')),
    departureTimes: Joi.array().items(Joi.string()),
    totalSeats: Joi.number().integer().min(1),
    availableSeats: Joi.number().integer().min(0),
    isPopular: Joi.boolean(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE'),
    estimatedDuration: Joi.string(),
    operatingDays: Joi.string(),
  }).min(1),
};

export const updateRouteStatus = {
  params: Joi.object().keys({
    routeId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  }),
};

export const updateRouteSeats = {
  params: Joi.object().keys({
    routeId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    totalSeats: Joi.number().integer().min(1).required(),
    availableSeats: Joi.number().integer().min(0).max(Joi.ref('totalSeats')).required(),
  }),
};

export const deleteRoute = {
  params: Joi.object().keys({
    routeId: Joi.string().required(),
  }),
};
