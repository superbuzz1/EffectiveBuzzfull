// src/backend/services/ProspectService.ts
import { DatabaseClient } from './PrismaService';
import { Prospect, ProspectCreateInput, ProspectUpdateInput, ProspectNote, ProspectStatus } from '../types/prospect';

export class ProspectService {

  public static async createProspect(
    tenantId: string,
    userId: string,
    data: ProspectCreateInput,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    if (!data.name || data.name.trim() === '') {
      throw new Error("Prospect name is required.");
    }
    if (!data.email || !data.email.includes('@')) {
      throw new Error("A valid email address is required.");
    }

    const prospect = await DatabaseClient.createProspect(tenantId, {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || null,
      title: data.title?.trim() || null,
      phone: data.phone?.trim() || null,
      status: data.status || 'New',
      tags: data.tags || []
    });

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_CREATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Prospect created: ${prospect.name} (${prospect.email}) at company ${prospect.company || 'N/A'}`
    });

    return prospect;
  }

  public static async updateProspect(
    tenantId: string,
    id: string,
    userId: string,
    data: ProspectUpdateInput,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    const existing = await DatabaseClient.findProspectById(tenantId, id);
    if (!existing) {
      throw new Error("Prospect not found or belongs to another workspace tenant.");
    }

    const updated = await DatabaseClient.updateProspect(tenantId, id, {
      name: data.name?.trim(),
      email: data.email?.trim().toLowerCase(),
      company: data.company?.trim(),
      title: data.title?.trim(),
      phone: data.phone?.trim(),
      status: data.status,
      tags: data.tags
    });

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_UPDATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Prospect updated: ID ${id}. Modified properties: ${Object.keys(data).join(', ')}`
    });

    return updated;
  }

  public static async addProspectNote(
    tenantId: string,
    prospectId: string,
    userId: string,
    content: string,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    if (!content || content.trim() === '') {
      throw new Error("Note content cannot be empty.");
    }

    const user = await DatabaseClient.findUserById(userId);
    const authorName = user ? user.name : "Authorized CRM User";

    const note = await DatabaseClient.addProspectNote(tenantId, prospectId, {
      content: content.trim(),
      authorId: userId,
      authorName
    });

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_ADD_NOTE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Note added to prospect ${prospectId}: "${content.substring(0, 30)}..."`
    });

    return note;
  }

  public static async deleteProspect(
    tenantId: string,
    id: string,
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<void> {
    const existing = await DatabaseClient.findProspectById(tenantId, id);
    if (!existing) {
      throw new Error("Prospect not found or belongs to another workspace tenant.");
    }

    await DatabaseClient.deleteProspect(tenantId, id);

    // Record Audit Log (Soft delete requirement!)
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_DELETE_SOFT",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Prospect soft deleted: ${existing.name} (${existing.email}) - ID ${id}`
    });
  }

  public static async restoreProspect(
    tenantId: string,
    id: string,
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    const existing = await DatabaseClient.findProspectById(tenantId, id);
    if (!existing) {
      throw new Error("Prospect not found or belongs to another workspace tenant.");
    }

    const restored = await DatabaseClient.restoreProspect(tenantId, id);

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_RESTORE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Prospect restored from soft-delete trash: ${existing.name} (${existing.email})`
    });

    return restored;
  }

  public static async importProspectsCSV(
    tenantId: string,
    userId: string,
    csvContent: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{ count: number; prospects: any[] }> {
    if (!csvContent || csvContent.trim() === '') {
      throw new Error("CSV content is empty or unreadable.");
    }

    const lines = csvContent.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (lines.length < 2) {
      throw new Error("CSV must contain a header row and at least one data row.");
    }

    const header = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Find column positions
    const nameIdx = header.indexOf('name');
    const emailIdx = header.indexOf('email');
    const companyIdx = header.indexOf('company');
    const titleIdx = header.indexOf('title');
    const phoneIdx = header.indexOf('phone');
    const statusIdx = header.indexOf('status');
    const tagsIdx = header.indexOf('tags');

    if (nameIdx === -1 || emailIdx === -1) {
      throw new Error("CSV header must contain at least 'name' and 'email' columns.");
    }

    const itemsToCreate: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Basic CSV splitter that respects quotes if simple (or classic comma separator)
      // A robust comma splitter: line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => {
        let val = col.trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1).trim();
        }
        return val;
      });

      const name = cols[nameIdx];
      const email = cols[emailIdx];

      if (!name || !email) {
        errors.push(`Row ${i + 1}: Missing name or email.`);
        continue;
      }

      const company = companyIdx !== -1 ? cols[companyIdx] || null : null;
      const title = titleIdx !== -1 ? cols[titleIdx] || null : null;
      const phone = phoneIdx !== -1 ? cols[phoneIdx] || null : null;
      
      let status: ProspectStatus = 'New';
      if (statusIdx !== -1 && cols[statusIdx]) {
        const inputStatus = cols[statusIdx].trim();
        const validStatuses: ProspectStatus[] = ['New', 'Contacted', 'Qualified', 'Unqualified', 'Nurturing'];
        const matched = validStatuses.find(s => s.toLowerCase() === inputStatus.toLowerCase());
        if (matched) {
          status = matched;
        }
      }

      let tags: string[] = [];
      if (tagsIdx !== -1 && cols[tagsIdx]) {
        tags = cols[tagsIdx].split(';').map(t => t.trim()).filter(Boolean);
      }

      itemsToCreate.push({
        name,
        email,
        company,
        title,
        phone,
        status,
        tags
      });
    }

    if (itemsToCreate.length === 0) {
      throw new Error(`Failed to import. No valid prospect lines found. Errors: ${errors.join('; ')}`);
    }

    const imported = await DatabaseClient.bulkCreateProspects(tenantId, itemsToCreate);

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_CSV_IMPORT",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `CSV import completed: Added ${imported.length} prospects. (Errors encountered: ${errors.length})`
    });

    return {
      count: imported.length,
      prospects: imported
    };
  }

  public static async bulkCreate(
    tenantId: string,
    userId: string,
    prospectList: ProspectCreateInput[],
    ipAddress: string,
    userAgent: string
  ): Promise<{ count: number; prospects: any[] }> {
    if (!prospectList || !Array.isArray(prospectList) || prospectList.length === 0) {
      throw new Error("Prospect input list must be a non-empty array of prospects.");
    }

    const itemsToCreate = prospectList.map(item => ({
      name: item.name.trim(),
      email: item.email.trim().toLowerCase(),
      company: item.company?.trim() || null,
      title: item.title?.trim() || null,
      phone: item.phone?.trim() || null,
      status: item.status || 'New',
      tags: item.tags || []
    }));

    const imported = await DatabaseClient.bulkCreateProspects(tenantId, itemsToCreate);

    // Record Audit Log (Bulk Import Requirement!)
    await DatabaseClient.recordAuditEntry({
      action: "PROSPECT_BULK_IMPORT",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Bulk array import processed: Created ${imported.length} prospects successfully.`
    });

    return {
      count: imported.length,
      prospects: imported
    };
  }

  public static async listProspects(
    tenantId: string,
    options: { search?: string; status?: string; tag?: string; includeDeleted?: boolean } = {}
  ): Promise<any[]> {
    return DatabaseClient.listProspects(tenantId, options);
  }
}
