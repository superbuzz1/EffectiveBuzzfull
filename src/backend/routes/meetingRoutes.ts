import { Router } from 'express';
import { MeetingBookingController } from '../controllers/MeetingBookingController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 60, windowSec: 60 });

router.use(authenticateAccessToken);

router.get('/', limit, MeetingBookingController.getCalendars);
router.post('/:provider', limit, MeetingBookingController.connect);
router.delete('/:provider', limit, MeetingBookingController.disconnect);

export default router;
