import { Router } from 'express';
import { AiAgentController } from '../controllers/AiAgentController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 60, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, AiAgentController.getAgents);
router.post('/', limit, AiAgentController.createAgent);
router.get('/:id', limit, AiAgentController.getAgent);
router.put('/:id', limit, AiAgentController.updateAgent);
router.delete('/:id', limit, AiAgentController.deleteAgent);

export default router;
