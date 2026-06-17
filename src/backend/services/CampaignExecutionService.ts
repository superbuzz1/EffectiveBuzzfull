import { prisma } from '../prismaClient';
import { emailRouter } from './EmailService';
import { GoogleGenAI } from '@google/genai';

export class CampaignExecutionService {
  private static isRunning = false;
  private static timer: NodeJS.Timeout | null = null;

  public static startDaemon(pollIntervalMs = 60000) {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log(`[CampaignExecutionService] Daemon started. Polling every ${pollIntervalMs}ms.`);
    
    this.timer = setInterval(async () => {
      await this.sweep();
    }, pollIntervalMs);
    
    // Initial run
    this.sweep();
  }

  public static stopDaemon() {
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    console.log(`[CampaignExecutionService] Daemon stopped.`);
  }

  private static async sweep() {
    try {
      // 1. Fetch due targets
      const dueTargets = await prisma.campaignTarget.findMany({
        where: {
          status: 'active',
          OR: [
            { nextRunAt: { lte: new Date() } },
            { nextRunAt: null }
          ]
        },
        include: {
          campaign: {
            include: { sequence: { include: { steps: { include: { variants: true }, orderBy: { order: 'asc' } } } } }
          },
          contact: {
            include: { company: true }
          }
        },
        take: 50 // process in batches
      });

      if (dueTargets.length > 0) {
        console.log(`[CampaignExecutionService] Found ${dueTargets.length} due targets.`);
      }

      // 2. Process each target
      for (const target of dueTargets) {
        await this.processTarget(target);
      }
    } catch (err) {
      console.error('[CampaignExecutionService] Sweep failed:', err);
    }
  }

  private static async processTarget(target: any) {
    try {
      const steps = target.campaign.sequence.steps;
      const currentStepIndex = target.currentStep;

      // If finished all steps
      if (currentStepIndex >= steps.length) {
        await prisma.campaignTarget.update({
          where: { id: target.id },
          data: { status: 'completed' }
        });
        return;
      }

      const step = steps[currentStepIndex];

      // Select Variant if available
      let subjectRaw = step.subject || 'Outreach';
      let contentRaw = step.content || '';
      let selectedVariantId = null;

      if (step.variants && step.variants.length > 0) {
        // A simple random selection based on distribution could go here.
        // For now, uniformly random pick.
        const variant = step.variants[Math.floor(Math.random() * step.variants.length)];
        subjectRaw = variant.subject || subjectRaw;
        contentRaw = variant.content || contentRaw;
        selectedVariantId = variant.id;
      }

      // Execute Step
      if (step.type === 'EMAIL') {
        const subject = this.compileTemplate(subjectRaw, target.contact);
        const bodyHtml = this.compileTemplate(contentRaw, target.contact);

        const result = await emailRouter.send({
          to: target.contact.email,
          from: process.env.FROM_EMAIL || 'onboarding@effectivebuzz.online',
          subject,
          bodyHtml,
          bodyText: bodyHtml.replace(/<[^>]*>?/gm, ''), // naive strip tags
          trackingId: target.id
        });

        // Log sent
        await prisma.campaignEventLog.create({
          data: {
            eventType: 'SENT',
            channel: 'EMAIL',
            campaignTargetId: target.id,
            contactId: target.contact.id,
            messageId: result.messageId,
            metadata: { provider: result.provider, subject, variantId: selectedVariantId }
          }
        });
      } else if (step.type === 'CONDITION') {
        // Evaluate condition
        let conditionMet = false;
        
        if (step.conditionMetric === 'reply') {
           const replies = await prisma.campaignEventLog.count({
             where: { campaignTargetId: target.id, eventType: 'REPLIED' }
           });
           conditionMet = replies > 0;
        } else if (step.conditionMetric === 'open') {
           const opens = await prisma.campaignEventLog.count({
             where: { campaignTargetId: target.id, eventType: 'OPENED' }
           });
           conditionMet = opens > 0;
        } else if (step.conditionMetric === 'click') {
           const clicks = await prisma.campaignEventLog.count({
             where: { campaignTargetId: target.id, eventType: 'CLICKED' }
           });
           conditionMet = clicks > 0;
        }

        // Branching logic overrides the linear next step
        const routedStepId = conditionMet ? step.trueNextStepId : step.falseNextStepId;
        if (routedStepId) {
           const nextIdx = steps.findIndex((s: any) => s.id === routedStepId);
           if (nextIdx !== -1) {
             await prisma.campaignTarget.update({
               where: { id: target.id },
               data: { currentStep: nextIdx, nextRunAt: new Date(), status: 'active' }
             });
             return; // Branch took over
           }
        }
      } else {
        console.log(`[CampaignExecutionService] Step type ${step.type} not fully implemented yet.`);
      }

      // 3. Move to next step
      const nextStepIndex = currentStepIndex + 1;
      let nextRunAt = null;

      if (nextStepIndex < steps.length) {
        const nextStep = steps[nextStepIndex];
        const delayMs = nextStep.delayDays * 24 * 60 * 60 * 1000;
        nextRunAt = new Date(Date.now() + delayMs);
      }

      await prisma.campaignTarget.update({
        where: { id: target.id },
        data: {
          currentStep: nextStepIndex,
          nextRunAt: nextRunAt,
          status: nextRunAt ? 'active' : 'completed'
        }
      });
      
    } catch (err) {
      console.error(`[CampaignExecutionService] Failed to process target ${target.id}:`, err);
      // Optional: Pause target on consecutive failures
    }
  }

  private static compileTemplate(template: string, contact: any): string {
    let result = template;
    result = result.replace(/\{\{name\}\}/gi, contact.firstName || 'there');
    result = result.replace(/\{\{firstName\}\}/gi, contact.firstName || 'there');
    result = result.replace(/\{\{lastName\}\}/gi, contact.lastName || '');
    result = result.replace(/\{\{company\}\}/gi, contact.company?.name || 'your company');
    return result;
  }
}
