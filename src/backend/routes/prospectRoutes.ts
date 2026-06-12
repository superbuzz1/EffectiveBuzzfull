// src/backend/routes/prospectRoutes.ts
import { Router } from 'express';
import { ProspectController } from '../controllers/ProspectController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const prospectLimiter = rateLimiter({ limit: 60, windowSec: 60 });

// Apply JWT authentication checks on all CRM workflows
router.use(authenticateAccessToken);

// Prospect endpoints
router.get('/', prospectLimiter, ProspectController.listProspects);
router.post('/', prospectLimiter, ProspectController.createProspect);
router.put('/:id', prospectLimiter, ProspectController.updateProspect);
router.delete('/:id', prospectLimiter, ProspectController.deleteProspect);
router.post('/:id/notes', prospectLimiter, ProspectController.addProspectNote);
router.post('/:id/restore', prospectLimiter, ProspectController.restoreProspect);
router.post('/import-csv', prospectLimiter, ProspectController.importProspectsCSV);
router.post('/import-bulk', prospectLimiter, ProspectController.importProspectsBulk);

export default router;
