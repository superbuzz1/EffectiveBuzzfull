// src/backend/routes/analyticsRoutes.ts
import { Router } from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController';
import { authenticateAccessToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateAccessToken);

router.get('/dashboard', AnalyticsController.getDashboardMetrics);

export default router;
