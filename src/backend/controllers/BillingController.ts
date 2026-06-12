import { Request, Response } from 'express';
import { BillingService } from '../services/BillingService';

export class BillingController {
  
  public static async createSubscription(req: Request, res: Response) {
    try {
      const tenantId = (req as any).user?.tenantId || 'anonymous';
      const { planCode, successUrl, cancelUrl } = req.body;
      
      if (!planCode || !successUrl || !cancelUrl) {
         return res.status(400).json({ error: "planCode, successUrl, and cancelUrl are required." });
      }

      const session = await BillingService.createSubscriptionCheckout(tenantId, planCode, successUrl, cancelUrl);
      return res.json({ success: true, data: { url: session.url } });
    } catch (err: any) {
      if (err.message.includes("STRIPE_SECRET_KEY is not set")) {
        return res.status(503).json({ error: "Billing is not configured (Missing STRIPE_SECRET_KEY)." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async meterUsage(req: Request, res: Response) {
    try {
      const { subscriptionItemId, quantity, action } = req.body;
      
      if (!subscriptionItemId) return res.status(400).json({ error: "subscriptionItemId is required" });

      const record = await BillingService.meterUsage(subscriptionItemId, quantity || 1, action || 'increment');
      return res.json({ success: true, data: record });
    } catch (err: any) {
      if (err.message.includes("STRIPE_SECRET_KEY is not set")) {
        return res.status(503).json({ error: "Billing is not configured." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getCredits(req: Request, res: Response) {
    try {
       const { customerId } = req.params;
       if (!customerId) return res.status(400).json({ error: "customerId is required" });

       const credits = await BillingService.getCredits(customerId);
       return res.json({ success: true, data: { credits } });
    } catch (err: any) {
      if (err.message.includes("STRIPE_SECRET_KEY is not set")) {
        return res.status(503).json({ error: "Billing is not configured." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async deductCredits(req: Request, res: Response) {
    try {
       const { customerId, amount, description } = req.body;
       if (!customerId || !amount) return res.status(400).json({ error: "customerId and amount are required" });

       const data = await BillingService.deductCredits(customerId, amount, description || 'Usage deduction');
       return res.json({ success: true, data });
    } catch (err: any) {
      if (err.message.includes("STRIPE_SECRET_KEY is not set")) {
        return res.status(503).json({ error: "Billing is not configured." });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  public static async handleWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      const payload = req.body;

      if (!signature) {
        return res.status(400).json({ error: "No signature provided" });
      }

      const result = await BillingService.handleWebhook(signature, payload);
      return res.json(result);
    } catch (err: any) {
      console.error(`[Billing Webhook Error]:`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
