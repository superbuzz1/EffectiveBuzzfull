import { Router } from 'express';
import { CampaignController } from '../controllers/CampaignController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 60, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, CampaignController.getCampaigns);
router.post('/', limit, CampaignController.createCampaign);
router.post('/:id/enroll', limit, CampaignController.enrollContacts);
router.get('/:id/enrollments', limit, CampaignController.getEnrollments);

export default router;
