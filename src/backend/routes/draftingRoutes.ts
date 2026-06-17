// src/backend/routes/draftingRoutes.ts
import { Router } from 'express';
import { DraftingController } from '../controllers/DraftingController';
import { authenticateAccessToken } from '../middleware/authMiddleware';

const router = Router();

// Apply authentication
router.use(authenticateAccessToken);

/**
 * POST /api/v2/drafting/generate
 */
router.post('/generate', DraftingController.generateSingleDraft);

/**
 * GET /api/v2/drafting/list
 */
router.get('/list', DraftingController.listDrafts);

/**
 * POST /api/v2/drafting/bulk-generate
 */
router.post('/bulk-generate', DraftingController.generateBulkDrafts);

/**
 * POST /api/v2/drafting/review
 */
router.post('/review', DraftingController.reviewDraft);

export default router;
