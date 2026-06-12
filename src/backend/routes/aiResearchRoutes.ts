import { Router } from 'express';
import { AIResearchController } from '../controllers/AIResearchController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 20, windowSec: 60 }); // stricter limit for AI endpoints

router.use(authenticateAccessToken);

router.post('/company', limit, AIResearchController.researchCompany);
router.post('/prospect', limit, AIResearchController.researchProspect);
router.post('/industry', limit, AIResearchController.researchIndustry);

export default router;
