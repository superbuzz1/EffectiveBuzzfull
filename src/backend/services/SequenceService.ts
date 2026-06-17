import { DatabaseClient } from './PrismaService';
import { SequenceStepType, SequenceStep, Sequence, SequenceTemplate } from '../types/sequence';

export class SequenceService {
  /**
   * Sequence Templates
   */
  public static async createTemplate(tenantId: string, name: string, subject: string, body: string, userId: string, ipAddress: string, userAgent: string): Promise<SequenceTemplate> {
    const template = await DatabaseClient.createSequenceTemplate(tenantId, { name, subject, body });
    await DatabaseClient.recordAuditEntry({
      action: "SEQUENCE_TEMPLATE_CREATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Created template: ${name}`
    });
    return template as unknown as SequenceTemplate;
  }

  public static async getTemplates(tenantId: string): Promise<SequenceTemplate[]> {
    return await DatabaseClient.listSequenceTemplates(tenantId) as unknown as SequenceTemplate[];
  }

  /**
   * Sequences
   */
  public static async createSequence(tenantId: string, name: string, isActive: boolean, steps: Omit<SequenceStep, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[], userId: string, ipAddress: string, userAgent: string): Promise<Sequence> {
    if (!name || name.trim() === '') {
      throw new Error("Sequence name is required");
    }

    // Validate Steps
    this.validateSteps(steps);

    const sequence = await DatabaseClient.createSequence(tenantId, { name, isActive, steps: steps as any[] });
    await DatabaseClient.recordAuditEntry({
      action: "SEQUENCE_CREATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Created sequence: ${name}`
    });
    return sequence as unknown as Sequence;
  }

  public static async updateSequence(tenantId: string, id: string, name: string | undefined, isActive: boolean | undefined, steps: Omit<SequenceStep, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[] | undefined, userId: string, ipAddress: string, userAgent: string): Promise<Sequence> {
    if (steps) {
      this.validateSteps(steps);
    }
    const sequence = await DatabaseClient.updateSequence(tenantId, id, { name, isActive, steps: steps as any[] });
    await DatabaseClient.recordAuditEntry({
      action: "SEQUENCE_UPDATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Updated sequence: ${id}`
    });
    return sequence as unknown as Sequence;
  }

  public static async getSequences(tenantId: string): Promise<Sequence[]> {
    return await DatabaseClient.listSequences(tenantId) as unknown as Sequence[];
  }

  public static async getSequence(tenantId: string, id: string): Promise<Sequence | null> {
    return await DatabaseClient.getSequenceById(tenantId, id) as unknown as Sequence | null;
  }

  public static async deleteSequence(tenantId: string, id: string, userId: string, ipAddress: string, userAgent: string): Promise<void> {
    await DatabaseClient.deleteSequence(tenantId, id);
    await DatabaseClient.recordAuditEntry({
      action: "SEQUENCE_DELETE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Deleted sequence: ${id}`
    });
  }

  private static validateSteps(steps: Omit<SequenceStep, 'id' | 'sequenceId' | 'createdAt' | 'updatedAt'>[]) {
    for (const step of steps) {
      if (step.type === SequenceStepType.DELAY && (!step.action.delayMinutes || step.action.delayMinutes <= 0)) {
        throw new Error("Delay node must have a positive delayMinutes value");
      }
      if (step.type === SequenceStepType.CONDITION) {
        if (!step.action.conditionField || !step.action.conditionOperator) {
          throw new Error("Condition node must have field and operator");
        }
      }
      if (step.type === SequenceStepType.EMAIL) {
        if (!step.action.templateId && (!step.action.body || !step.action.subject)) {
          throw new Error("Email step must have either templateId or both subject and body");
        }
      }
    }
  }

  public static async addVariantToStep(stepId: string, label: string, distribution: number, subject: string, content: string) {
    const { prisma } = require('../prismaClient');
    return await prisma.sequenceStepVariant.create({
      data: {
        stepId,
        label,
        distribution,
        subject,
        content
      }
    });
  }

  public static async updateStepCondition(
    stepId: string,
    metric: string,
    operator: string,
    value: string,
    trueNext: string,
    falseNext: string
  ) {
    const { prisma } = require('../prismaClient');
    return await prisma.sequenceStep.update({
      where: { id: stepId },
      data: {
        type: 'CONDITION',
        conditionMetric: metric,
        conditionOperator: operator,
        conditionValue: value,
        trueNextStepId: trueNext,
        falseNextStepId: falseNext
      }
    });
  }
}
