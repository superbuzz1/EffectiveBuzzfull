import { Router } from 'express';
import { InboxController } from '../controllers/InboxController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 60, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, InboxController.getThreads);
router.post('/', limit, InboxController.createThread);
router.get('/:id', limit, InboxController.getThread);
router.put('/:id', limit, InboxController.updateThread);
router.post('/:id/messages', limit, InboxController.addMessage);
router.post('/:id/notes', limit, InboxController.addNote);

export default router;
