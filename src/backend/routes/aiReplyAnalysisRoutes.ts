import { Router } from 'express';
import { AIReplyAnalysisController } from '../controllers/AIReplyAnalysisController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 20, windowSec: 60 });

router.use(authenticateAccessToken);

router.post('/', limit, AIReplyAnalysisController.analyzeReply);

export default router;
