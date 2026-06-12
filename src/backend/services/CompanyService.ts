// src/backend/services/CompanyService.ts
import { DatabaseClient } from './PrismaService';
import { Company, CompanyCreateInput, CompanyUpdateInput, CompanyStatus, CompanyScoringBreakdown } from '../types/company';

export class CompanyService {

  /**
   * Evaluates and updates a company's sales score algorithmically
   */
  public static calculateCompanyScore(
    size: number,
    revenue: number,
    status: CompanyStatus,
    industry: string,
    manualAdjustment: number = 0
  ): { score: number; breakdown: Omit<CompanyScoringBreakdown, 'calculatedAt'> } {
    
    // 1. Employee headcount size scoring (Max 35 points)
    let sizeScore = 5;
    if (size > 5000) {
      sizeScore = 35;
    } else if (size > 1000) {
      sizeScore = 30;
    } else if (size > 250) {
      sizeScore = 20;
    } else if (size > 50) {
      sizeScore = 15;
    } else if (size > 10) {
      sizeScore = 10;
    }

    // 2. Revenue generation scoring (Max 40 points)
    let revenueScore = 5;
    if (revenue > 1000000000) { // > $1B
      revenueScore = 40;
    } else if (revenue > 100000000) { // > $100M
      revenueScore = 35;
    } else if (revenue > 10000000) { // > $10M
      revenueScore = 25;
    } else if (revenue > 1000000) { // > $1M
      revenueScore = 15;
    } else if (revenue > 100000) { // > $100k
      revenueScore = 10;
    }

    // 3. Status weight (Max 15 points)
    let statusScore = 0;
    if (status === 'Customer') {
      statusScore = 15;
    } else if (status === 'Prospect') {
      statusScore = 10;
    } else if (status === 'Lead') {
      statusScore = 5;
    } else {
      statusScore = 0;
    }

    // 4. Industry trend bonus (Max 10 points)
    let industryBonus = 2; // default safety net
    const searchIndustry = industry.trim().toLowerCase();
    if (['saas', 'software', 'artificial intelligence', 'ai'].includes(searchIndustry)) {
      industryBonus = 10;
    } else if (['fintech', 'finance', 'defi', 'payments'].includes(searchIndustry)) {
      industryBonus = 8;
    } else if (['healthcare', 'medical', 'biotech'].includes(searchIndustry)) {
      industryBonus = 6;
    } else if (['e-commerce', 'retail', 'logistics'].includes(searchIndustry)) {
      industryBonus = 5;
    }

    // Calculate sum capped between 0 and 100
    const rawSum = sizeScore + revenueScore + statusScore + industryBonus + manualAdjustment;
    const score = Math.max(0, Math.min(100, Math.round(rawSum)));

    return {
      score,
      breakdown: {
        sizeScore,
        revenueScore,
        statusScore,
        industryBonus,
        manualAdjustment
      }
    };
  }

  public static async createCompany(
    tenantId: string,
    userId: string,
    data: CompanyCreateInput,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    if (!data.name || data.name.trim() === '') {
      throw new Error("Company name is required.");
    }
    if (!data.domain || !data.domain.includes('.')) {
      throw new Error("Valid internet domain coordinates (e.g. acme.com) are required.");
    }

    const industry = data.industry || 'Unknown';
    const size = Number(data.size) || 1;
    const revenue = Number(data.revenue) || 0;
    const status = data.status || 'Lead';
    const manualAdjustment = Number(data.manualAdjustment) || 0;

    // Run scoring calculator
    const scoredOutput = this.calculateCompanyScore(size, revenue, status, industry, manualAdjustment);

    const company = await DatabaseClient.createCompany(tenantId, {
      name: data.name.trim(),
      domain: data.domain.trim().toLowerCase(),
      industry: industry.trim(),
      size,
      revenue,
      city: data.city?.trim() || null,
      country: data.country?.trim() || null,
      status,
      score: scoredOutput.score,
      scoringBreakdown: {
        ...scoredOutput.breakdown,
        calculatedAt: new Date()
      }
    });

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "COMPANY_RECORD_CREATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Company registered: ${company.name} (${company.domain}) in industry ${company.industry} with score ${company.score}`
    });

    return company;
  }

  public static async updateCompany(
    tenantId: string,
    id: string,
    userId: string,
    data: CompanyUpdateInput,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    const existing = await DatabaseClient.findCompanyById(tenantId, id);
    if (!existing) {
      throw new Error("Company not found or belongs to another workspace tenant context.");
    }

    // Gather modified elements
    const name = data.name !== undefined ? data.name.trim() : existing.name;
    const domain = data.domain !== undefined ? data.domain.trim().toLowerCase() : existing.domain;
    const industry = data.industry !== undefined ? data.industry.trim() : existing.industry;
    const size = data.size !== undefined ? Number(data.size) : existing.size;
    const revenue = data.revenue !== undefined ? Number(data.revenue) : existing.revenue;
    const status = data.status !== undefined ? data.status : existing.status;
    const manualAdjustment = data.manualAdjustment !== undefined ? Number(data.manualAdjustment) : existing.scoringBreakdown.manualAdjustment;

    // Recompute Score
    const scoredOutput = this.calculateCompanyScore(size, revenue, status, industry, manualAdjustment);

    const updated = await DatabaseClient.updateCompany(tenantId, id, {
      name,
      domain,
      industry,
      size,
      revenue,
      city: data.city !== undefined ? (data.city?.trim() || null) : existing.city,
      country: data.country !== undefined ? (data.country?.trim() || null) : existing.country,
      status,
      score: scoredOutput.score,
      scoringBreakdown: {
        ...scoredOutput.breakdown,
        calculatedAt: new Date()
      }
    });

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "COMPANY_RECORD_UPDATE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Company updated: ID ${id}. Scoring updated dynamically to ${updated.score} (Adj: ${manualAdjustment})`
    });

    return updated;
  }

  public static async addCompanyNote(
    tenantId: string,
    id: string,
    userId: string,
    content: string,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    if (!content || content.trim() === '') {
      throw new Error("Discussion note content cannot be empty.");
    }

    const user = await DatabaseClient.findUserById(userId);
    const authorName = user ? user.name : "Authorized Team Member";

    const note = await DatabaseClient.addCompanyNote(tenantId, id, {
      content: content.trim(),
      authorId: userId,
      authorName
    });

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "COMPANY_ADD_NOTE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Note added to company ${id}: "${content.substring(0, 30)}..."`
    });

    return note;
  }

  public static async deleteCompany(
    tenantId: string,
    id: string,
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<void> {
    const existing = await DatabaseClient.findCompanyById(tenantId, id);
    if (!existing) {
      throw new Error("Company profile not found or belongs to another workspace tenant context.");
    }

    await DatabaseClient.deleteCompany(tenantId, id);

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "COMPANY_RECORD_DELETE_SOFT",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Company soft deleted: ${existing.name} (${existing.domain}) - ID ${id}`
    });
  }

  public static async restoreCompany(
    tenantId: string,
    id: string,
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<any> {
    const existing = await DatabaseClient.findCompanyById(tenantId, id);
    if (!existing) {
      throw new Error("Company profile not found or belongs to another workspace tenant context.");
    }

    const restored = await DatabaseClient.restoreCompany(tenantId, id);

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "COMPANY_RECORD_RESTORE",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `Company restored from archiving systems: ${existing.name}`
    });

    return restored;
  }

  public static async importCompaniesCSV(
    tenantId: string,
    userId: string,
    csvContent: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{ count: number; companies: any[] }> {
    if (!csvContent || csvContent.trim() === '') {
      throw new Error("CSV raw stream coordinates are empty or corrupted.");
    }

    const lines = csvContent.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (lines.length < 2) {
      throw new Error("CSV streams must yield at least one headers list and one data values line.");
    }

    const header = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Find column indexes
    const nameIdx = header.indexOf('name');
    const domainIdx = header.indexOf('domain');
    const industryIdx = header.indexOf('industry');
    const sizeIdx = header.indexOf('size');
    const revenueIdx = header.indexOf('revenue');
    const cityIdx = header.indexOf('city');
    const countryIdx = header.indexOf('country');
    const statusIdx = header.indexOf('status');
    const adjustmentIdx = header.indexOf('adjustment');

    if (nameIdx === -1 || domainIdx === -1) {
      throw new Error("CSV parameters mismatch: At least 'name' and 'domain' columns are required.");
    }

    const companyObjectsToCreate: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => {
        let val = col.trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1).trim();
        }
        return val;
      });

      const name = cols[nameIdx];
      const domain = cols[domainIdx];

      if (!name || !domain) {
        errors.push(`Line ${i + 1}: Missing name or domain credentials.`);
        continue;
      }

      const industry = industryIdx !== -1 && cols[industryIdx] ? cols[industryIdx] : "SaaS";
      const size = sizeIdx !== -1 && cols[sizeIdx] ? Number(cols[sizeIdx]) || 10 : 10;
      const revenue = revenueIdx !== -1 && cols[revenueIdx] ? Number(cols[revenueIdx]) || 120000 : 120000;
      const city = cityIdx !== -1 ? cols[cityIdx] || null : null;
      const country = countryIdx !== -1 ? cols[countryIdx] || null : null;
      
      let status: CompanyStatus = 'Lead';
      if (statusIdx !== -1 && cols[statusIdx]) {
        const inputStatus = cols[statusIdx].trim();
        const validStatuses: CompanyStatus[] = ['Lead', 'Prospect', 'Customer', 'Churned', 'Inactive'];
        const matched = validStatuses.find(s => s.toLowerCase() === inputStatus.toLowerCase());
        if (matched) {
          status = matched;
        }
      }

      const manualAdjustment = adjustmentIdx !== -1 && cols[adjustmentIdx] ? Number(cols[adjustmentIdx]) || 0 : 0;

      // Score this item before creation
      const scoreOutput = this.calculateCompanyScore(size, revenue, status, industry, manualAdjustment);

      companyObjectsToCreate.push({
        name,
        domain,
        industry,
        size,
        revenue,
        city,
        country,
        status,
        score: scoreOutput.score,
        scoringBreakdown: {
          ...scoreOutput.breakdown,
          calculatedAt: new Date()
        }
      });
    }

    if (companyObjectsToCreate.length === 0) {
      throw new Error(`Import aborted. No valid organizational rows were compiled. Details: ${errors.join('; ')}`);
    }

    const imported = await DatabaseClient.bulkCreateCompanies(tenantId, companyObjectsToCreate);

    // Record Audit Log
    await DatabaseClient.recordAuditEntry({
      action: "COMPANY_CSV_BULK_IMPORT",
      userId,
      tenantId,
      status: "SUCCESS",
      ipAddress,
      userAgent,
      reason: `CSV Import completed successfully: Created ${imported.length} new company profiles.`
    });

    return {
      count: imported.length,
      companies: imported
    };
  }

  public static async listCompanies(
    tenantId: string,
    options: { search?: string; status?: string; industry?: string; includeDeleted?: boolean } = {}
  ): Promise<any[]> {
    return DatabaseClient.listCompanies(tenantId, options);
  }

  public static async listIndustries(): Promise<any[]> {
    return DatabaseClient.listIndustries();
  }
}
