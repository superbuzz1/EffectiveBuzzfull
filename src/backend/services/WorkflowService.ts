import { prisma } from '../prismaClient';

export class WorkflowService {
  public static async getWorkflows(workspaceId: string) {
    return await prisma.workflow.findMany({
      where: { workspaceId },
      orderBy: { createdAt: 'desc' }
    });
  }

  public static async createWorkflow(workspaceId: string, payload: any) {
    return await prisma.workflow.create({
      data: {
        workspaceId,
        name: payload.name,
        description: payload.description,
        trigger: payload.trigger,
        nodes: payload.nodes || [],
        edges: payload.edges || [],
        isActive: true
      }
    });
  }

  public static async updateWorkflow(workflowId: string, workspaceId: string, payload: any) {
    return await prisma.workflow.update({
      where: { id: workflowId, workspaceId },
      data: {
        name: payload.name,
        description: payload.description,
        trigger: payload.trigger,
        nodes: payload.nodes,
        edges: payload.edges,
        isActive: payload.isActive
      }
    });
  }

  public static async toggleWorkflow(workflowId: string, workspaceId: string, isActive: boolean) {
    return await prisma.workflow.update({
      where: { id: workflowId, workspaceId },
      data: { isActive }
    });
  }

  public static async deleteWorkflow(workflowId: string, workspaceId: string) {
    return await prisma.workflow.delete({
      where: { id: workflowId, workspaceId }
    });
  }

  public static async getWorkflowExecutions(workflowId: string) {
    return await prisma.workflowExecution.findMany({
      where: { workflowId },
      orderBy: { startedAt: 'desc' },
      take: 50
    });
  }
}
