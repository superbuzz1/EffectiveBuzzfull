import { prisma } from '../prismaClient';

export class MeetingBookingService {
  public static async connect(workspaceId: string, provider: string, payload: any) {
    return await prisma.meetingCalendar.upsert({
      where: { workspaceId_provider: { workspaceId, provider } },
      create: {
        workspaceId,
        provider,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        bookingLink: payload.bookingLink
      },
      update: {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        bookingLink: payload.bookingLink
      }
    });
  }

  public static async getCalendars(workspaceId: string) {
    return await prisma.meetingCalendar.findMany({
      where: { workspaceId }
    });
  }

  public static async disconnect(workspaceId: string, provider: string) {
    return await prisma.meetingCalendar.delete({
      where: { workspaceId_provider: { workspaceId, provider } }
    });
  }
}
