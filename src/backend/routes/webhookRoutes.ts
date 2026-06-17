import { Router, Request, Response } from 'express';
import { prisma } from '../prismaClient';

const router = Router();

// SendGrid Webhook Endpoint
router.post('/sendgrid', async (req: Request, res: Response) => {
  // Respond immediately to avoid timeout
  res.status(200).send('OK');

  const events = req.body;
  if (!Array.isArray(events)) return;

  // Process events asynchronously
  processImmediate(async () => {
    for (const event of events) {
      const trackingId = event.tracking_id; // Custom arg passed during send
      if (!trackingId) continue;

      try {
        const target = await prisma.campaignTarget.findUnique({ where: { id: trackingId }, select: { contactId: true } });
        if (!target) continue;

        if (event.event === 'bounce' || event.event === 'dropped') {
          // Hard bounce -> unsubscribe
          await prisma.campaignTarget.update({
            where: { id: trackingId },
            data: { status: 'BOUNCED' }
          });
          
          await prisma.contact.updateMany({
            where: { campaignTargets: { some: { id: trackingId } } },
            data: { status: 'DO_NOT_CONTACT' }
          });
          
          await prisma.campaignEventLog.create({
            data: {
              eventType: 'BOUNCED',
              metadata: event,
              campaignTarget: { connect: { id: trackingId } },
              contact: { connect: { id: target.contactId } }
            }
          });
        } else if (event.event === 'delivered') {
          await prisma.campaignEventLog.create({
            data: {
              eventType: 'DELIVERED',
              metadata: event,
              campaignTarget: { connect: { id: trackingId } },
              contact: { connect: { id: target.contactId } }
            }
          });
        }
      } catch (err) {
        console.error('[Webhook] Failed to process SendGrid event:', err);
      }
    }
  });
});

// Resend Webhook Endpoint
router.post('/resend', async (req: Request, res: Response) => {
  res.status(200).send('OK');

  const payload = req.body;
  if (!payload || !payload.type) return;

  processImmediate(async () => {
    try {
      const trackingId = payload.data?.tags?.find((t: any) => t.name === 'tracking_id')?.value;
      if (!trackingId) return;

      const target = await prisma.campaignTarget.findUnique({ where: { id: trackingId }, select: { contactId: true } });
      if (!target) return;

      if (payload.type === 'email.bounced' || payload.type === 'email.complained') {
        await prisma.campaignTarget.update({
          where: { id: trackingId },
          data: { status: 'BOUNCED' }
        });
        
        await prisma.contact.updateMany({
          where: { campaignTargets: { some: { id: trackingId } } },
          data: { status: 'DO_NOT_CONTACT' }
        });
        
        await prisma.campaignEventLog.create({
          data: {
            eventType: 'BOUNCED',
            metadata: payload,
            campaignTarget: { connect: { id: trackingId } },
            contact: { connect: { id: target.contactId } }
          }
        });
      } else if (payload.type === 'email.delivered') {
        await prisma.campaignEventLog.create({
          data: {
            eventType: 'DELIVERED',
            metadata: payload,
            campaignTarget: { connect: { id: trackingId } },
            contact: { connect: { id: target.contactId } }
          }
        });
      }
    } catch (err) {
      console.error('[Webhook] Failed to process Resend event:', err);
    }
  });
});

function processImmediate(fn: () => void) {
  setTimeout(fn, 0);
}

export default router;
