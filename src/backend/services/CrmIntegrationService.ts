import { prisma } from '../prismaClient';

export class CrmIntegrationService {
  public static async connect(workspaceId: string, provider: string, payload: any) {
    return await prisma.crmIntegration.upsert({
      where: { workspaceId_provider: { workspaceId, provider } },
      create: {
        workspaceId,
        provider,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        instanceUrl: payload.instanceUrl,
        syncStatus: 'connected',
        lastSyncAt: new Date()
      },
      update: {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        instanceUrl: payload.instanceUrl,
        syncStatus: 'connected',
        lastSyncAt: new Date()
      }
    });
  }

  public static async getIntegrations(workspaceId: string) {
    return await prisma.crmIntegration.findMany({
      where: { workspaceId }
    });
  }

  public static async sync(workspaceId: string, provider: string) {
    const integration = await prisma.crmIntegration.findUnique({
      where: { workspaceId_provider: { workspaceId, provider } }
    });
    
    if (!integration) throw new Error('Integration not found');

    // MOCK SYNC BEHAVIOR
    // In production, we'd fetch contacts from HubSpot/Salesforce API
    // and upsert into prisma.contact
    
    return await prisma.crmIntegration.update({
      where: { id: integration.id },
      data: { lastSyncAt: new Date(), syncStatus: 'synced' }
    });
  }

  public static async disconnect(workspaceId: string, provider: string) {
    return await prisma.crmIntegration.delete({
      where: { workspaceId_provider: { workspaceId, provider } }
    });
  }
}
