import { Router } from 'express';
import { AIQualificationController } from '../controllers/AIQualificationController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 20, windowSec: 60 });

router.use(authenticateAccessToken);

router.post('/bant', limit, AIQualificationController.qualifyBANT);
router.post('/meddic', limit, AIQualificationController.qualifyMEDDIC);

export default router;
