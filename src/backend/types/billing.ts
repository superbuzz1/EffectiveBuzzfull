export enum PlanCode {
  STARTER = 'STARTER',
  GROWTH = 'GROWTH',
  SCALE = 'SCALE',
  ENTERPRISE = 'ENTERPRISE'
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: PlanCode;
  priceId: string;
  features: {
    maxUsers: number;
    aiCredits: number;
    includedUsage: number;
  };
}
