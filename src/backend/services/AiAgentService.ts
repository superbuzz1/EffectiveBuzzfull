import { prisma } from '../prismaClient';

export class AiAgentService {
  public static async createAgent(workspaceId: string, name: string, persona: string, voice: string = 'professional', model: string = 'claude-3-5-sonnet', settings: any = {}) {
    return await prisma.aiAgent.create({
      data: {
        workspaceId,
        name,
        persona,
        voice,
        model,
        settings
      }
    });
  }

  public static async getAgents(workspaceId: string) {
    return await prisma.aiAgent.findMany({
      where: { workspaceId, deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  }

  public static async getAgent(workspaceId: string, agentId: string) {
    return await prisma.aiAgent.findFirst({
      where: { id: agentId, workspaceId, deletedAt: null }
    });
  }

  public static async updateAgent(workspaceId: string, agentId: string, data: { name?: string; persona?: string; voice?: string; model?: string; settings?: any }) {
    return await prisma.aiAgent.update({
      where: { id: agentId },
      data
    });
  }

  public static async deleteAgent(workspaceId: string, agentId: string) {
    return await prisma.aiAgent.update({
      where: { id: agentId },
      data: { deletedAt: new Date() }
    });
  }
}
