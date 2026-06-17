import { Router, Request, Response } from 'express';
import { prisma } from '../prismaClient';

const router = Router();

// Open Tracking Endpoint
router.get('/open', async (req: Request, res: Response) => {
  const { tid } = req.query;
  
  if (typeof tid === 'string') {
    try {
      const target = await prisma.campaignTarget.findUnique({ where: { id: tid }, select: { contactId: true } });
      if (target) {
        const log = await prisma.campaignEventLog.create({
          data: {
            eventType: 'OPENED',
            metadata: { trackingId: tid, timestamp: new Date().toISOString() },
            campaignTarget: { connect: { id: tid } },
            contact: { connect: { id: target.contactId } }
          }
        });
        // Optionally update the target status
        await prisma.campaignTarget.update({
          where: { id: tid },
          data: { status: 'OPENED' }
        });
      }
    } catch (err) {
      console.error('[Tracking] Open track failed to log:', err);
    }
  }

  // Return transparent 1x1 GIF
  const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': pixel.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  });
  res.end(pixel);
});

// Click Tracking Endpoint
router.get('/click', async (req: Request, res: Response) => {
  const { tid, url } = req.query;
  
  if (typeof tid === 'string') {
    try {
      const target = await prisma.campaignTarget.findUnique({ where: { id: tid }, select: { contactId: true } });
      if (target) {
        await prisma.campaignEventLog.create({
          data: {
            eventType: 'CLICKED',
            metadata: { trackingId: tid, destination: url, timestamp: new Date().toISOString() },
            campaignTarget: { connect: { id: tid } },
            contact: { connect: { id: target.contactId } }
          }
        });
      }
    } catch (err) {
      console.error('[Tracking] Click track failed to log:', err);
    }
  }

  // Redirect prospect to target link immediately
  const redirectUrl = typeof url === 'string' ? url : 'https://effectivebuzz.online';
  res.redirect(302, redirectUrl);
});

export default router;
