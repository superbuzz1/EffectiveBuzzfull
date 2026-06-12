import { Router } from 'express';
import { SequenceController } from '../controllers/SequenceController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 60, windowSec: 60 });

router.use(authenticateAccessToken);

router.post('/templates', limit, SequenceController.createTemplate);
router.get('/templates', limit, SequenceController.getTemplates);

router.get('/', limit, SequenceController.getSequences);
router.post('/', limit, SequenceController.createSequence);
router.get('/:id', limit, SequenceController.getSequence);
router.put('/:id', limit, SequenceController.updateSequence);
router.delete('/:id', limit, SequenceController.deleteSequence);

export default router;