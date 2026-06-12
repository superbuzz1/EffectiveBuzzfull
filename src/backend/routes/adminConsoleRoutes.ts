import { Router } from 'express';
import { AdminConsoleController } from '../controllers/AdminConsoleController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 100, windowSec: 60 });

// Ensure strict auth (in real life you would also map an Admin role check here)
router.use(authenticateAccessToken);
router.use(limit);

router.get('/users', AdminConsoleController.getUsers);
router.get('/workspaces', AdminConsoleController.getWorkspaces);
router.get('/audit-logs', AdminConsoleController.getAuditLogs);
router.get('/ai-usage', AdminConsoleController.getAIUsage);
router.get('/billing', AdminConsoleController.getBillingStatus);

export default router;
