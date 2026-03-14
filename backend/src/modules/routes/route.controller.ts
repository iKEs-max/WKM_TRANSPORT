import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import prisma from '../../config/database';

export const createRoute = async (req: Request, res: Response) => {
  const { departure, destination, price, totalSeats, availableSeats, departureTimes, estimatedDuration, operatingDays } = req.body;
  const route = await prisma.route.create({
    data: {
      departure,
      destination,
      price,
      totalSeats,
      availableSeats,
      departureTimes: departureTimes || [],
      isPopular: req.body.isPopular || false,
      estimatedDuration,
      operatingDays,
    },
  });
  res.status(httpStatus.CREATED).send({
    success: true,
    data: route
  });
};

export const getRoutes = async (req: Request, res: Response) => {
  const routes = await prisma.route.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' }
  });
  res.send({
    success: true,
    data: routes
  });
};

export const getRoute = async (req: Request, res: Response) => {
  const route = await prisma.route.findUnique({
    where: { id: req.params.routeId },
  });
  if (!route) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Route not found' });
  }
  res.send({
    success: true,
    data: route
  });
};

export const updateRoute = async (req: Request, res: Response) => {
  const { departure, destination, price, totalSeats, availableSeats, departureTimes, status, estimatedDuration, operatingDays } = req.body;
  const route = await prisma.route.update({
    where: { id: req.params.routeId },
    data: {
      departure,
      destination,
      price,
      totalSeats,
      availableSeats,
      departureTimes,
      isPopular: req.body.isPopular,
      estimatedDuration,
      operatingDays,
      status,
    },
  });
  res.send({
    success: true,
    data: route
  });
};

export const updateRouteStatus = async (req: Request, res: Response) => {
  const route = await prisma.route.update({
    where: { id: req.params.routeId },
    data: { status: req.body.status },
  });
  res.send({
    success: true,
    data: route
  });
};

export const updateRouteSeats = async (req: Request, res: Response) => {
  const { totalSeats, availableSeats } = req.body;
  const route = await prisma.route.update({
    where: { id: req.params.routeId },
    data: { totalSeats, availableSeats },
  });
  res.send({
    success: true,
    data: route
  });
};

export const deleteRoute = async (req: Request, res: Response) => {
  await prisma.route.delete({
    where: { id: req.params.routeId },
  });
  res.status(httpStatus.NO_CONTENT).send();
};
