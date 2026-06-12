// src/backend/types/company.ts

export interface CompanyNote {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

export interface IndustryData {
  name: string;
  growthRate: number;      // e.g., 14.2 for 14.2% YoY
  baseWeight: number;      // weight modifier added to company health scoring formulas
  marketCapBillion: number; // industry size in Billions
  keyTrend: string;        // e.g., "Generative AI", "DeFi Regulation"
  description: string;
}

export type CompanyStatus = 'Lead' | 'Prospect' | 'Customer' | 'Churned' | 'Inactive';

export interface CompanyScoringBreakdown {
  sizeScore: number;
  revenueScore: number;
  statusScore: number;
  industryBonus: number;
  manualAdjustment: number;
  calculatedAt: string;
}

export interface Company {
  id: string;
  tenantId: string;
  name: string;
  domain: string;
  industry: string;
  size: number; // employee headcount
  revenue: number; // annual recurring revenue in USD
  city: string | null;
  country: string | null;
  status: CompanyStatus;
  score: number; // calculated value from 0 to 100
  scoringBreakdown: CompanyScoringBreakdown;
  notes: CompanyNote[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // soft-delete timestamp
}

export interface CompanyCreateInput {
  name: string;
  domain: string;
  industry: string;
  size: number;
  revenue: number;
  city?: string | null;
  country?: string | null;
  status?: CompanyStatus;
  manualAdjustment?: number;
}

export interface CompanyUpdateInput {
  name?: string;
  domain?: string;
  industry?: string;
  size?: number;
  revenue?: number;
  city?: string | null;
  country?: string | null;
  status?: CompanyStatus;
  manualAdjustment?: number;
}
