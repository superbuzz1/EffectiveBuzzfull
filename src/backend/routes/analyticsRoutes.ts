import { Router } from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 120, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, AnalyticsController.getMetrics);

export default router;
