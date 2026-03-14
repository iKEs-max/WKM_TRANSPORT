import { Request, Response } from 'express';
import prisma from '../../config/database';

export const getDashboardStats = async (req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalUsers, totalBookings, totalRoutes, revenueRaw, todayBookings, todayRevenueRaw] = await Promise.all([
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.booking.count(),
    prisma.route.count(),
    prisma.payment.aggregate({
      where: { status: 'SUCCESS' },
      _sum: { amount: true }
    }),
    prisma.booking.count({
      where: { createdAt: { gte: today } }
    }),
    prisma.payment.aggregate({
      where: { status: 'SUCCESS', createdAt: { gte: today } },
      _sum: { amount: true }
    })
  ]);

  const popularRoutesRaw = await prisma.booking.groupBy({
    by: ['routeId'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 3
  });

  const popularRoutes = await Promise.all(popularRoutesRaw.map(async (item) => {
    const route = await prisma.route.findUnique({ where: { id: item.routeId } });
    return { name: `${route?.departure} to ${route?.destination}`, count: item._count.id };
  }));

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { firstName: true, lastName: true } }, route: { select: { departure: true, destination: true } } }
  });

  res.send({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalBookings,
        totalRoutes,
        totalRevenue: Number(revenueRaw._sum.amount) || 0,
        todayBookings,
        todayRevenue: Number(todayRevenueRaw._sum.amount) || 0,
        popularRoutes
      },
      recentBookings
    }
  });
};

export const getAllBookings = async (req: Request, res: Response) => {
  const { status, page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where: status ? { status: status as any } : {},
      include: { 
        user: { select: { id: true, firstName: true, lastName: true, email: true } }, 
        route: { select: { id: true, departure: true, destination: true } } 
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit)
    }),
    prisma.booking.count({
      where: status ? { status: status as any } : {}
    })
  ]);

  res.send({
    success: true,
    data: bookings,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: { role: 'USER' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      createdAt: true
    }
  });

  res.send({
    success: true,
    data: users,
    pagination: {
      total: users.length,
      page: 1,
      limit: users.length,
      totalPages: 1
    }
  });
};

export const getSettings = async (req: Request, res: Response) => {
  let settings = await prisma.globalSetting.findFirst();
  
  if (!settings) {
    // Return defaults if none created yet
    settings = await prisma.globalSetting.create({
      data: {}
    });
  }
  
  res.send({
    success: true,
    data: settings
  });
};

export const updateSettings = async (req: Request, res: Response) => {
  const settings = await prisma.globalSetting.upsert({
    where: { id: 'global_config' },
    update: req.body,
    create: { id: 'global_config', ...req.body }
  });
  
  res.send({
    success: true,
    data: settings
  });
};
