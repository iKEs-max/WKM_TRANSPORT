import express from 'express';
import { getDashboardStats, getUsers, getSettings, updateSettings } from './admin.controller';
import { validate } from '../../middleware/validation';
import * as adminValidation from './admin.validation';
import { auth } from '../auth/auth.middleware';

const router = express.Router();

// Public route for settings
router.get('/public', getSettings);

// All other admin routes require authentication
router.use(auth('manageRoutes')); 

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.get('/settings', getSettings);
router.patch('/settings', validate(adminValidation.updateSettings), updateSettings);

export default router;
