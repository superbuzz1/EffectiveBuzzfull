import { Router } from 'express';
import { WorkflowController } from '../controllers/WorkflowController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 100, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, WorkflowController.getWorkflows);
router.post('/', limit, WorkflowController.createWorkflow);
router.put('/:id', limit, WorkflowController.updateWorkflow);
router.patch('/:id/toggle', limit, WorkflowController.toggleWorkflow);
router.delete('/:id', limit, WorkflowController.deleteWorkflow);
router.get('/:id/executions', limit, WorkflowController.getWorkflowExecutions);

export default router;
