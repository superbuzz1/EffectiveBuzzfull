// src/backend/routes/conversationalRoutes.ts
import { Router } from 'express';
import { ConversationalController } from '../controllers/ConversationalController';

const router = Router();

/**
 * POST /api/v2/conversational/qualify
 * Public endpoint for the inbound widget.
 */
router.post('/qualify', ConversationalController.qualifyInboundLead);

export default router;
