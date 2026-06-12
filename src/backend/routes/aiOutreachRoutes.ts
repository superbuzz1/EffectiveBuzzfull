import { Router } from 'express';
import { AIOutreachController } from '../controllers/AIOutreachController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 20, windowSec: 60 });

router.use(authenticateAccessToken);

router.post('/cold-email', limit, AIOutreachController.generateColdEmail);
router.post('/follow-up', limit, AIOutreachController.generateFollowUp);
router.post('/linkedin', limit, AIOutreachController.generateLinkedInMessage);

export default router;
