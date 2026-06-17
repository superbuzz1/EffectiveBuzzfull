// src/backend/routes/dnsRoutes.ts
import { Router } from 'express';
import { DnsController } from '../controllers/DnsController';
import { authenticateAccessToken } from '../middleware/authMiddleware';

const router = Router();

// Apply authentication to all DNS routes
router.use(authenticateAccessToken);

/**
 * GET /api/v2/dns/required-records?domain=...
 */
router.get('/required-records', DnsController.getRequiredRecords);

/**
 * POST /api/v2/dns/verify
 */
router.post('/verify', DnsController.verifyDomain);

/**
 * GET /api/v2/dns/list
 */
router.get('/list', DnsController.listDomains);

export default router;
