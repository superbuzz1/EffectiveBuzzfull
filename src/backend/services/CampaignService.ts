import { prisma } from '../prismaClient';

export class CampaignService {
  public static async createCampaign(workspaceId: string, name: string, targetAudience: string, sequenceId: string) {
    const campaign = await prisma.campaign.create({
      data: {
        workspaceId,
        name,
        sequenceId,
        settings: { targetAudience },
        status: 'DRAFT'
      }
    });
    return campaign;
  }

  public static async getCampaigns(workspaceId: string) {
    const campaigns = await prisma.campaign.findMany({
      where: { workspaceId, deletedAt: null },
      include: {
        _count: {
          select: { targets: true }
        }
      }
    });
    return campaigns;
  }

  public static async enrollContacts(campaignId: string, contactIds: string[]) {
    // Prevent duplicate enrollments
    const existing = await prisma.campaignTarget.findMany({
      where: {
        campaignId,
        contactId: { in: contactIds }
      },
      select: { contactId: true }
    });

    const existingSet = new Set(existing.map(e => e.contactId));
    const toEnroll = contactIds.filter(id => !existingSet.has(id));

    if (toEnroll.length === 0) return { count: 0 };

    const payload = toEnroll.map(contactId => ({
      campaignId,
      contactId,
      status: 'active',
      currentStep: 0,
      nextRunAt: new Date()
    }));

    const result = await prisma.campaignTarget.createMany({
      data: payload
    });

    return { count: result.count };
  }

  public static async getEnrollments(campaignId: string) {
    const enrollments = await prisma.campaignTarget.findMany({
      where: { campaignId },
      include: {
        contact: {
          include: { company: true }
        }
      }
    });
    return enrollments;
  }

  public static async updateCampaignStatus(campaignId: string, status: any) {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: { status }
    });
    return campaign;
  }
}
