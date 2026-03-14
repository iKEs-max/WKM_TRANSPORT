import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;

  if (!user || user.role !== 'ADMIN') {
    return res.status(httpStatus.FORBIDDEN).json({
      success: false,
      message: 'Access denied: Admin role required',
    });
  }

  next();
};
