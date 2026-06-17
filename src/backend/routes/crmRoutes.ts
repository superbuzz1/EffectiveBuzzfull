import { Router } from 'express';
import { CrmIntegrationController } from '../controllers/CrmIntegrationController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 60, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, CrmIntegrationController.getIntegrations);
router.post('/:provider', limit, CrmIntegrationController.connect);
router.post('/:provider/sync', limit, CrmIntegrationController.sync);
router.delete('/:provider', limit, CrmIntegrationController.disconnect);

export default router;
