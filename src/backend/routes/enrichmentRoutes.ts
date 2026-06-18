// src/backend/routes/enrichmentRoutes.ts
import { Router } from 'express';
import { EnrichmentController } from '../controllers/EnrichmentController';
import { authenticateAccessToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateAccessToken);

/**
 * POST /api/v2/enrichment/company
 */
router.post('/company', EnrichmentController.enrichCompany);

export default router;
