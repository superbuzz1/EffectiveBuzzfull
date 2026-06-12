import { Router } from 'express';
// @ts-ignore
import express from 'express';
import { BillingController } from '../controllers/BillingController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const limit = rateLimiter({ limit: 120, windowSec: 60 });

// Webhook endpoint (should be called before global body parsers if possible, but we use what we receive)
router.post('/webhook', express.raw({type: 'application/json'}), limit, BillingController.handleWebhook);

// Protected endpoints
router.post('/subscriptions', authenticateAccessToken, limit, BillingController.createSubscription);
router.post('/usage', authenticateAccessToken, limit, BillingController.meterUsage);
router.get('/customers/:customerId/credits', authenticateAccessToken, limit, BillingController.getCredits);
router.post('/customers/deduct-credits', authenticateAccessToken, limit, BillingController.deductCredits);

export default router;
