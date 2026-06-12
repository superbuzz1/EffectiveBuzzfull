import { Router } from 'express';
import { LeadScoringController } from '../controllers/LeadScoringController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 20, windowSec: 60 });

router.use(authenticateAccessToken);

router.post('/', limit, LeadScoringController.scoreLead);

export default router;
