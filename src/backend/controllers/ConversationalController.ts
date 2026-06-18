// src/backend/controllers/ConversationalController.ts
import { Request, Response } from 'express';
import { DatabaseClient } from '../services/PrismaService';

export class ConversationalController {
  /**
   * POST /api/v2/conversational/qualify
   * Processes a chat transcript and creates an inbound lead.
   */
  public static async qualifyInboundLead(req: Request, res: Response) {
    const { tenantId, email, name, companyName, transcript } = req.body;
    
    if (!tenantId || !email) {
      return res.status(400).json({ error: "Missing tenantId or email" });
    }

    try {
      const lead = await (DatabaseClient as any).createInboundLead(tenantId, {
        email,
        name,
        companyName,
        transcript,
        status: 'qualified'
      });

      return res.json({ success: true, lead });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
