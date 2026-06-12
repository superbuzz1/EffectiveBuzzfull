// src/backend/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

const profileLimiter = rateLimiter({ limit: 40, windowSec: 60 });
const standardLimiter = rateLimiter({ limit: 50, windowSec: 60 });

// Apply JWT Authentication globally to all User Management endpoints
router.use(authenticateAccessToken);

// Profile
router.get('/profile', profileLimiter, UserController.getProfile);
router.put('/profile', profileLimiter, UserController.updateProfile);

// Preferences
router.get('/preferences', standardLimiter, UserController.getPreferences);
router.put('/preferences', standardLimiter, UserController.updatePreferences);

// Activity Trails (Individual)
router.get('/activities', standardLimiter, UserController.getActivity);
router.get('/activities/:userId', standardLimiter, UserController.getActivity);

// Team Management
router.get('/team', standardLimiter, UserController.listTeam);
router.put('/team/:userId/role', standardLimiter, UserController.updateTeammateRole);
router.delete('/team/:userId', standardLimiter, UserController.evictTeammate);

export default router;
