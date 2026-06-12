export enum SequenceStepType {
  EMAIL = 'EMAIL',
  CALL = 'CALL',
  DELAY = 'DELAY',
  CONDITION = 'CONDITION',
  TASK = 'TASK'
}

export interface SequenceStepAction {
  // EMAIL / TASK
  templateId?: string;
  body?: string;
  subject?: string;
  
  // DELAY
  delayMinutes?: number;

  // CONDITION
  conditionField?: string;
  conditionOperator?: 'EQUALS' | 'CONTAINS' | 'IS_EMPTY' | 'GREATER_THAN' | 'LESS_THAN';
  conditionValue?: string;
  trueStepId?: string;
  falseStepId?: string;
}

export interface SequenceStep {
  id: string;
  sequenceId: string;
  name: string;
  type: SequenceStepType;
  action: SequenceStepAction;
  nextStepId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sequence {
  id: string;
  tenantId: string;
  name: string;
  isActive: boolean;
  steps: SequenceStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SequenceTemplate {
  id: string;
  tenantId: string;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
