import React, { useState, useEffect } from 'react';
import { 
  Zap, Sliders, Play, Database, Layers, Cpu, Activity, Check, Copy, 
  ChevronRight, ArrowRight, AlertTriangle, Clock, Settings, Terminal, 
  Brain, Network, Slack, Mail, UserCheck, Calendar, TrendingUp, 
  RotateCw, List, Plus, Trash2, ShieldCheck, FileCode, CheckCircle2,
  GitPullRequest, GitMerge, FileJson, AlertCircle, HelpCircle, Trophy, Globe, PhoneCall, Users, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// Types and Static Definitions for the Workflow Engine
// ============================================================================

export interface TriggerDefinition {
  id: 'new_prospect' | 'reply_received' | 'meeting_booked' | 'deal_won' | 'website_visited' | 'invoice_paid';
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  samplePayload: Record<string, any>;
}

export interface ConditionRule {
  id: string;
  field: string;
  operator: 'greater_than' | 'less_than' | 'equals' | 'contains' | 'is_true';
  value: string;
}

export interface ActionDefinition {
  id: 'send_email' | 'slack_alert' | 'ai_classification' | 'update_crm' | 'webhook_dispatch' | 'wait_delay' | 'sms_dispatch' | 'linkedin_connect' | 'generate_contract';
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  payloadTemplate: Record<string, any>;
}

const triggerOptions: TriggerDefinition[] = [
  {
    id: 'new_prospect',
    name: 'New Prospect Created',
    description: 'Fires immediately when a lead is captured in the CRM workspace.',
    icon: UserCheck,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    samplePayload: {
      event_type: "prospect.created",
      prospect_id: "prp_883011A",
      fullName: "Alexander Finch",
      company: "ApexCloud Platforms Inc.",
      jobTitle: "VP of Cloud Architecture",
      score: 87,
      country: "US",
      estimated_revenue: 12500000,
      captured_at: "2026-06-06T18:32:00Z"
    }
  },
  {
    id: 'reply_received',
    name: 'Email Reply Received',
    description: 'Triggered when an outbound email receives an incoming response.',
    icon: Mail,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    samplePayload: {
      event_type: "email.reply_received",
      prospect_id: "prp_554091B",
      campaign_id: "cmp_outbound_902",
      reply_text: "Hey there! This looks quite interesting. Let's find 15 mins for a Zoom chat on Tuesday afternoon.",
      sentiment: "Positive / High Intent",
      lead_qualified: true,
      sender_domain: "growthx-software.co",
      reply_received_at: "2026-06-06T19:12:45Z"
    }
  },
  {
    id: 'meeting_booked',
    name: 'Meeting Booked on Zoom',
    description: 'Fires when a meeting invite is confirmed on GCal / Outlook Calendar.',
    icon: Calendar,
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    samplePayload: {
      event_type: "meeting.scheduled",
      meeting_id: "mtg_calendar_0093",
      prospect_id: "prp_221084F",
      topic: "EffectiveBuzz Platform Discovery Session",
      duration_minutes: 30,
      zoom_link: "https://zoom.us/j/44910283412",
      calendar_provider: "google_workspace_calendar",
      booking_utc_time: "2026-06-09T14:30:00Z"
    }
  },
  {
    id: 'deal_won',
    name: 'Opportunity Closed Won',
    description: 'Fires when a deal stage is marked as Closed Won in the CRM.',
    icon: Trophy,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    samplePayload: {
      event_type: "deal.won",
      opportunity_id: "opp_1048B",
      amount: 45000,
      currency: "USD",
      closed_by: "usr_sarah_jenkins_ae"
    }
  },
  {
    id: 'website_visited',
    name: 'High Intent Site Visit',
    description: 'Triggered when a prospect visits a high-value page (e.g. Pricing).',
    icon: Globe,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    samplePayload: {
      event_type: "page.visited",
      url: "https://effectivebuzz.online/pricing",
      time_on_page_seconds: 145,
      ip_address: "192.168.1.1"
    }
  }
];

const availableConditionFields: Record<TriggerDefinition['id'], { value: string; label: string; operators: string[] }[]> = {
  new_prospect: [
    { value: 'score', label: 'Lead Score Score', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'estimated_revenue', label: 'Estimated Annual Revenue ($)', operators: ['greater_than', 'less_than'] },
    { value: 'country', label: 'Country / Location Code', operators: ['equals', 'contains'] },
    { value: 'jobTitle', label: 'Prospect Job Title', operators: ['contains', 'equals'] }
  ],
  reply_received: [
    { value: 'sentiment', label: 'NLP AI Sentiment Score', operators: ['equals', 'contains'] },
    { value: 'lead_qualified', label: 'AI Lead Qualified Status', operators: ['is_true'] },
    { value: 'reply_text', label: 'Email Content Length Keywords', operators: ['contains'] }
  ],
  meeting_booked: [
    { value: 'duration_minutes', label: 'Meeting Duration (mins)', operators: ['greater_than', 'equals'] },
    { value: 'calendar_provider', label: 'Calendar Cloud Service', operators: ['equals'] },
    { value: 'topic', label: 'Meeting Subject Title', operators: ['contains'] }
  ],
  deal_won: [
    { value: 'amount', label: 'Opportunity Amount ($)', operators: ['greater_than', 'less_than'] },
    { value: 'currency', label: 'Currency', operators: ['equals'] }
  ],
  website_visited: [
    { value: 'time_on_page_seconds', label: 'Time on Page (Seconds)', operators: ['greater_than'] },
    { value: 'url', label: 'URL Path', operators: ['contains', 'equals'] }
  ],
  invoice_paid: [
    { value: 'amount', label: 'Invoice Amount', operators: ['greater_than', 'less_than'] }
  ]
};

const actionOptions: ActionDefinition[] = [
  {
    id: 'slack_alert',
    name: 'Send Slack Alert',
    description: 'Post structural JSON payload to designated Slack owner channels.',
    icon: Slack,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    payloadTemplate: {
      webhook_url: "https://api.slack.com/webhook/placeholder-example",
      channel: "#sales-alerts-high-tier",
      blocks_layout: "Slack Markdown Hero block detailing custom parameters and variables."
    }
  },
  {
    id: 'send_email',
    name: 'Dispatch AI Sequence Outreach',
    description: 'Leverages Gemini and Outreach modules to draft custom response templates.',
    icon: Mail,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    payloadTemplate: {
      template_id: "tpl_ai_outbound_intro_v4",
      fallback_subject: "Slicing egress bandwidth by 45% for :company",
      gemini_temperature: 0.25,
      rate_limit_throttle: "Max 1 per 6 hours"
    }
  },
  {
    id: 'update_crm',
    name: 'Update CRM Opportunity',
    description: 'Mutates lead deal stages in PostgreSQL workspace CRM directories.',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    payloadTemplate: {
      opportunity_stage: "Discovery Scheduled / Hot Lead",
      assignee_id: "usr_sarah_jenkins_ae",
      lead_score_increment: 15
    }
  },
  {
    id: 'webhook_dispatch',
    name: 'Trigger Client Webhook',
    description: 'Publishes secure HTTP POST hook out to client custom API URLs.',
    icon: Play,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    payloadTemplate: {
      endpoint_url: "https://api.client.com/webhooks/v1/workspaces",
      auth_type: "Bearer Token Secret Key",
      security_signature: "SHA256 HMACS Signature key verification"
    }
  },
  {
    id: 'wait_delay',
    name: 'Wait Throttle Delay',
    description: 'Enqueues delayed Job in Redis scheduler to resume execution stack.',
    icon: Clock,
    color: 'text-zinc-400',
    bgColor: 'bg-zinc-500/10',
    borderColor: 'border-zinc-500/20',
    payloadTemplate: {
      delay_duration_hours: 24,
      skip_weekends: true
    }
  },
  {
    id: 'sms_dispatch',
    name: 'Dispatch SMS Message',
    description: 'Sends an automated text message via Twilio infrastructure.',
    icon: PhoneCall,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    payloadTemplate: {
      recipient_phone: "+15550192834",
      message: "Hi {{firstName}}, looking forward to our call tomorrow!"
    }
  },
  {
    id: 'linkedin_connect',
    name: 'Auto LinkedIn Connect',
    description: 'Fires an automated LinkedIn connection request with a custom note.',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-600/20',
    payloadTemplate: {
      linkedin_url: "{{prospect.linkedin}}",
      note: "Hey {{firstName}}, noticed you lead engineering at {{company}}. Let's connect."
    }
  },
  {
    id: 'generate_contract',
    name: 'Generate Legal Contract',
    description: 'Auto-fills and generates a PDF contract template via DocuSign/PandaDoc.',
    icon: FileText,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-600/10',
    borderColor: 'border-indigo-600/20',
    payloadTemplate: {
      template_id: "doc_nda_enterprise_v2",
      signers: ["{{prospect.email}}", "{{assignee.email}}"],
      variables: {
        company_name: "{{company}}",
        deal_amount: "{{deal.amount}}"
      }
    }
  }
];

export default function WorkflowAutomationEngine() {
  const [activeTab, setActiveTab ] = useState<'playground' | 'schema' | 'execution' | 'queue'>('playground');
  
  // Custom Workflow Builder States
  const [workflowName, setWorkflowName] = useState<string>('Enterprise Lead Ingestion Dispatcher');
  const [selectedTriggerId, setSelectedTriggerId] = useState<TriggerDefinition['id']>('new_prospect');
  const [conditions, setConditions] = useState<ConditionRule[]>([
    { id: 'cond-1', field: 'score', operator: 'greater_than', value: '80' },
    { id: 'cond-2', field: 'jobTitle', operator: 'contains', value: 'VP' }
  ]);
  const [selectedActionId, setSelectedActionId] = useState<ActionDefinition['id']>('slack_alert');

  // Interactive Simulator Engine States
  const [pulseLogs, setPulseLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<'success' | 'filtered' | 'failure' | null>(null);
  const [simulatedJobPayload, setSimulatedJobPayload] = useState<any>(null);

  // Queue Analytics Live Simulator states (randomized fluctuation slightly)
  const [queueMetrics, setQueueMetrics] = useState({
    activeWorkers: 12,
    jobsInFlight: 4,
    jobsProcessedCount: 42809,
    jobsFailedCount: 38,
    avgLatencyMs: 14.5
  });

  const [dbWorkflows, setDbWorkflows] = useState<any[]>([]);
  const [dbExecutions, setDbExecutions] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/v2/workflows', { headers: { 'Authorization': `Bearer mock-token` } });
      const data = await res.json();
      if (data.success) {
        setDbWorkflows(data.data);
        if (data.data.length > 0) {
          fetchExecutions(data.data[0].id);
        }
      }
    } catch (err) {}
  };

  const fetchExecutions = async (workflowId: string) => {
    try {
      const res = await fetch(`/api/v2/workflows/${workflowId}/executions`, { headers: { 'Authorization': `Bearer mock-token` } });
      const data = await res.json();
      if (data.success) {
        setDbExecutions(data.data);
      }
    } catch (err) {}
  };

  const handleSaveToDb = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: workflowName,
        description: 'Auto-generated via AI SDR Engine.',
        trigger: selectedTriggerId,
        nodes: [{ type: 'action', id: selectedActionId, config: {} }],
        edges: []
      };
      await fetch('/api/v2/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer mock-token` },
        body: JSON.stringify(payload)
      });
      await fetchWorkflows();
    } catch (err) {}
    setIsSaving(false);
  };

  useEffect(() => {
    fetchWorkflows();
    // Small background fluctuation for stats realism
    const interval = setInterval(() => {
      setQueueMetrics(prev => ({
        ...prev,
        jobsInFlight: Math.max(1, Math.min(15, prev.jobsInFlight + (Math.random() > 0.5 ? 1 : -1))),
        avgLatencyMs: Number((12.5 + Math.random() * 4).toFixed(1)),
        jobsProcessedCount: prev.jobsProcessedCount + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeTrigger = triggerOptions.find(t => t.id === selectedTriggerId) || triggerOptions[0];
  const activeAction = actionOptions.find(a => a.id === selectedActionId) || actionOptions[0];

  // Modify Conditions Logic
  const handleTriggerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value as TriggerDefinition['id'];
    setSelectedTriggerId(nextId);
    // Reset conditions based on available fields
    const defaultField = availableConditionFields[nextId][0].value;
    const defaultOperator = availableConditionFields[nextId][0].operators[0] as ConditionRule['operator'];
    setConditions([
      { id: 'cond-default', field: defaultField, operator: defaultOperator, value: '80' }
    ]);
  };

  const addConditionRule = () => {
    const fields = availableConditionFields[selectedTriggerId];
    setConditions(prev => [
      ...prev,
      {
        id: `cond-${Date.now()}`,
        field: fields[0].value,
        operator: fields[0].operators[0] as ConditionRule['operator'],
        value: 'Value'
      }
    ]);
  };

  const removeConditionRule = (id: string) => {
    if (conditions.length <= 1) return; // Must have at least 1
    setConditions(prev => prev.filter(c => c.id !== id));
  };

  const updateConditionRule = (id: string, updates: Partial<ConditionRule>) => {
    setConditions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  // Helper Copy To Clipboard
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2500);
  };

  // Run Visual DAG Pipeline simulation
  const runWorkflowSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setPulseLogs([]);
    setSimulationResult(null);

    const steps = [
      `[Trigger Gateway] Webhook received payload for Event ID: EV-00${Math.floor(Math.random() * 9000 + 1000)}`,
      `[Trigger Gateway] Match found! Tenant Workspace active workflow matches triggering criteria [${activeTrigger.name}]`,
      `[Ingest Queue] Pushing job payload into Redis Job Queue "queue:ingest-broker" with idempotency key: EB_IDEM_${Date.now()}`,
      `[Broker Worker #04] Job picked up correctly by Worker Node [pid=${Math.floor(Math.random()*8000+23000)}]`,
      `[Execution Gateway] Querying dynamic rule conditions from multi-tenant workflows backend... [PostgreSQL Lookup Successful]`,
      `[AST Evaluator] Resolving abstract syntax tree compiler for rule validation...`,
    ];

    for (let i = 0; i < steps.length; i++) {
      setPulseLogs(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 350));
    }

    // Custom check based on condition variables to see if mock evaluation passes
    let passConditions = true;
    const computedConditionsLogs = conditions.map(rule => {
      let payloadValue = activeTrigger.samplePayload[rule.field];
      let operatorLabel = rule.operator.replace('_', ' ');
      let matches = true;

      if (rule.operator === 'greater_than') {
        matches = Number(payloadValue) > Number(rule.value);
      } else if (rule.operator === 'less_than') {
        matches = Number(payloadValue) < Number(rule.value);
      } else if (rule.operator === 'equals') {
        matches = String(payloadValue).toLowerCase() === String(rule.value).toLowerCase();
      } else if (rule.operator === 'contains') {
        matches = String(payloadValue).toLowerCase().includes(String(rule.value).toLowerCase());
      } else if (rule.operator === 'is_true') {
        matches = payloadValue === true;
      }

      if (!matches) passConditions = false;

      return `[AST Evaluator] Rule Check: Value (${payloadValue}) ${operatorLabel} (${rule.value}) ➜ ${matches ? 'PASS' : 'FAIL'}`;
    });

    for (let i = 0; i < computedConditionsLogs.length; i++) {
      setPulseLogs(prev => [...prev, computedConditionsLogs[i]]);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    if (passConditions) {
      const positiveSteps = [
        `[AST Evaluator] All condition thresholds met. Triggering active dispatcher block...`,
        `[Action Queue] Pushing job into Redis queue "queue:action-worker" for high priority handling...`,
        `[Action Execution] Launching execution task for Action type: [${activeAction.name}]`,
        `[Action Delivery DB] Inserting running telemetry records to PostgreSQL workflow_executions (Status: SUCCESS)`,
        `[Transactional Check] Committing changes cleanly to Workspace database. Execution resolved [Latency: 140ms]`,
      ];
      for (let i = 0; i < positiveSteps.length; i++) {
        setPulseLogs(prev => [...prev, positiveSteps[i]]);
        await new Promise(resolve => setTimeout(resolve, 350));
      }
      setSimulationResult('success');
      setSimulatedJobPayload({
        trigger_meta: activeTrigger.samplePayload,
        workflow_id: "wfl_active_0991b3x",
        name: workflowName,
        conditions_passed: true,
        action_dispatched: activeAction.id,
        action_payload_emitted: activeAction.payloadTemplate,
        job_id: `job_bullmq_${Date.now()}`,
        telemetry: {
          queue_lag_ms: 1.4,
          runner_lag_ms: 32,
          total_evaluation_ms: 122,
          retry_count: 0
        }
      });
    } else {
      const filterSteps = [
        `[AST Evaluator] Verification failed! One or more conditional triggers failed boundaries checks.`,
        `[Pipeline Resolved] DAG evaluation concluded. Pipeline safely filtered out. No actions enqueued.`,
        `[Action Delivery DB] Writing telemetry record to PostgreSQL workflow_executions (Status: FILTERED)`
      ];
      for (let i = 0; i < filterSteps.length; i++) {
        setPulseLogs(prev => [...prev, filterSteps[i]]);
        await new Promise(resolve => setTimeout(resolve, 350));
      }
      setSimulationResult('filtered');
    }

    setIsSimulating(false);
  };

  // Complete clean Relational DDL Postgres script
  const WORKFLOW_SQL_SCHEMA = `-- 1. Unified Multi-Tenant Workflows Master Table
CREATE TABLE IF NOT EXISTS tenant_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- Indexing for multi-tenant isolation lookup speeds
CREATE INDEX IF NOT EXISTS wfl_tenant_idx ON tenant_workflows(tenant_id, is_active);

-- 2. Workflow Trigger Declarations (Standardizes sources like webhooks or schedulers)
CREATE TABLE IF NOT EXISTS workflow_triggers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES tenant_workflows(id) ON DELETE CASCADE,
    trigger_type VARCHAR(100) NOT NULL, -- e.g. "new_prospect", "reply_received"
    idempotency_path VARCHAR(255),       -- JSONPath expressions pointing to unique event hashes
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- Unique composite index representation to prevent redundant triggers
CREATE UNIQUE INDEX IF NOT EXISTS wfl_trigger_unique_idx ON workflow_triggers(workflow_id, trigger_type);

-- 3. Conditions Abstract Syntax Tree (AST) Rules Block
CREATE TABLE IF NOT EXISTS workflow_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES tenant_workflows(id) ON DELETE CASCADE,
    logical_operator VARCHAR(10) NOT NULL DEFAULT 'AND', -- 'AND' or 'OR'
    rules_tree JSONB NOT NULL, -- e.g. [{"field": "score", "operator": "greater_than", "value": "80"}]
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- 4. Dynamic Action Chains Nodes Schema
CREATE TABLE IF NOT EXISTS workflow_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES tenant_workflows(id) ON DELETE CASCADE,
    step_sequence INT NOT NULL DEFAULT 1,
    action_type VARCHAR(100) NOT NULL, -- e.g. "slack_alert", "send_email", "wait_delay"
    payload_template JSONB NOT NULL,  -- Structured variables mapping for replacement: {"channel": ":channel"}
    error_policy VARCHAR(50) NOT NULL DEFAULT 'RETRY_EXPONENTIAL', -- retry strategies
    max_retries INT DEFAULT 3,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS wfl_actions_seq_idx ON workflow_actions(workflow_id, step_sequence);

-- 5. Execution Telemetry auditing log directory
CREATE TABLE IF NOT EXISTS workflow_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) NOT NULL,
    workflow_id UUID NOT NULL REFERENCES tenant_workflows(id) ON DELETE CASCADE,
    triggering_event_id VARCHAR(255) NOT NULL, -- Hook Ingress Identifiers (At-Most-Once verification)
    execution_status VARCHAR(50) NOT NULL,       -- 'PENDING', 'RUNNING', 'SUCCESS', 'FILTERED', 'FAILED'
    current_step INT NOT NULL DEFAULT 0,
    input_payload JSONB NOT NULL,
    output_state JSONB DEFAULT '{}'::jsonb,
    error_log TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    resolved_at TIMESTAMPTZ,
    duration_milliseconds INT,
    idempotency_key VARCHAR(255) UNIQUE NOT NULL
);

-- Strict indexing mapping for tenancy checks and alerts metrics
CREATE INDEX IF NOT EXISTS wfl_exec_tenant_status_idx ON workflow_executions(tenant_id, execution_status);
CREATE INDEX IF NOT EXISTS wfl_exec_duration_idx ON workflow_executions(duration_milliseconds) WHERE execution_status = 'SUCCESS';`;

  return (
    <div className="space-y-6 animate-feed">
      
      {/* Page Title Header card */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-y-1/4 translate-x-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-0 bottom-0 -translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider">
                COGNITIVE PIPELINE SPECIFICATION
              </span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider">
                COMPLIANT MULTI-TENANCY
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <GitPullRequest className="w-6 h-6 text-emerald-400" />
              Workflow Automation Engine Architect
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Design, test, and audit dynamic SaaS event-action execution graphs. Our high-throughput distributed system couples a schema compiled rules compiler with asynchronous Redis job queues to guarantee at-least-once delivery boundaries.
            </p>
          </div>

          {/* Quick Stats Summary badges */}
          <div className="grid grid-cols-2 gap-3 min-w-[260px]">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/60 font-mono text-center">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Active Workers</span>
              <strong className="text-emerald-400 text-lg">{queueMetrics.activeWorkers} threads</strong>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/60 font-mono text-center">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">AVG Broker Lag</span>
              <strong className="text-indigo-300 text-lg">{queueMetrics.avgLatencyMs}ms</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Switchers */}
      <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-850 sm:w-fit">
        {[
          { id: 'playground', label: '1. Workflow Builder & Simulator', icon: Sliders },
          { id: 'schema', label: '2. Postgres DDL Database Schema', icon: Database },
          { id: 'execution', label: '3. Core Execution Architecture', icon: Layers },
          { id: 'queue', label: '4. Distributed Queue & SLA Spec', icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-slate-900 border border-slate-700 text-white shadow'
                  : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE TAB */}
      
      {/* 1. INTERACTIVE PLAYGROUND BUILDER */}
      {activeTab === 'playground' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Rule Composer Node tree */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold tracking-widest block">Workflow DAG Blueprint</span>
                <input 
                  type="text" 
                  value={workflowName} 
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="font-display font-medium text-white text-base bg-transparent border-b border-transparent hover:border-gray-800 focus:border-emerald-500 focus:outline-none transition-all px-0 w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSaveToDb} 
                  disabled={isSaving}
                  className="text-[10px] bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-3 py-1 rounded font-mono font-bold uppercase shrink-0 flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Database className="w-3 h-3" />
                  {isSaving ? 'Deploying...' : 'Deploy to Production'}
                </button>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold uppercase shrink-0">AST Draft</span>
              </div>
            </div>

            {/* STEP 1: TRIGGER NODE CARD */}
            <div className="relative border-l-2 border-dashed border-slate-800 pl-6 ml-4 pb-6 space-y-3">
              <div className="absolute -left-[11px] top-1 bg-emerald-500 rounded-full w-5 h-5 flex items-center justify-center text-slate-950 border border-slate-900 text-[10px] font-black font-mono">1</div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest block">1. Define Event Ingress Trigger:</span>
                <span className="text-[10px] text-gray-500 font-mono">INGRESS_WEBHOOK</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono font-bold block uppercase">Trigger Type</label>
                  <select
                    value={selectedTriggerId}
                    onChange={handleTriggerChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {triggerOptions.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 flex items-center gap-2">
                  <div className={`p-2 rounded-md ${activeTrigger.bgColor} ${activeTrigger.color} border border-slate-800`}>
                    <activeTrigger.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-mono">Payload fields:</span>
                    <strong className="text-white text-[11px] font-mono">{Object.keys(activeTrigger.samplePayload).length} params</strong>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-1">
                {activeTrigger.description}
              </p>
            </div>

            {/* STEP 2: CONDITIONS CARD */}
            <div className="relative border-l-2 border-dashed border-slate-800 pl-6 ml-4 pb-6 space-y-4">
              <div className="absolute -left-[11px] top-1 bg-indigo-500 rounded-full w-5 h-5 flex items-center justify-center text-slate-950 border border-slate-900 text-[10px] font-black font-mono">2</div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest block">2. Configure Evaluation Rules (Logical AND):</span>
                <button
                  type="button"
                  onClick={addConditionRule}
                  className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-300 transition-colors cursor-pointer"
                >
                  <Plus className="w-3" /> Add Rule
                </button>
              </div>

              {/* Dynamic Rules rows */}
              <div className="space-y-2.5">
                {conditions.map((rule, idx) => {
                  const allowedFields = availableConditionFields[selectedTriggerId];
                  const currentFieldSpec = allowedFields.find(f => f.value === rule.field) || allowedFields[0];
                  
                  return (
                    <div key={rule.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-2.5 bg-slate-950/70 rounded-lg border border-slate-850 flex items-center">
                      {/* Param Field select */}
                      <div className="sm:col-span-4">
                        <select 
                          value={rule.field} 
                          onChange={(e) => {
                            const newF = e.target.value;
                            const spec = allowedFields.find(f => f.value === newF) || allowedFields[0];
                            updateConditionRule(rule.id, { 
                              field: newF, 
                              operator: spec.operators[0] as ConditionRule['operator'] 
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none cursor-pointer"
                        >
                          {allowedFields.map(f => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Operator select */}
                      <div className="sm:col-span-3">
                        <select 
                          value={rule.operator} 
                          onChange={(e) => updateConditionRule(rule.id, { operator: e.target.value as any })}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none cursor-pointer"
                        >
                          {currentFieldSpec.operators.map(op => (
                            <option key={op} value={op}>{op.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </div>

                      {/* Value Input */}
                      <div className="sm:col-span-4">
                        {rule.operator === 'is_true' ? (
                          <div className="text-xs font-mono text-emerald-400 bg-slate-900 px-2.5 py-1 text-center rounded border border-slate-800 uppercase font-black tracking-widest">
                            True
                          </div>
                        ) : (
                          <input 
                            type="text" 
                            value={rule.value} 
                            onChange={(e) => updateConditionRule(rule.id, { value: e.target.value })}
                            placeholder="Threshold value..." 
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none placeholder-gray-600"
                          />
                        )}
                      </div>

                      {/* Delete */}
                      <div className="sm:col-span-1 justify-center flex">
                        <button
                          type="button"
                          onClick={() => removeConditionRule(rule.id)}
                          disabled={conditions.length <= 1}
                          className="p-1 text-gray-500 hover:text-rose-400 disabled:opacity-30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: ACTION NODE CARD */}
            <div className="relative pl-6 ml-4 space-y-3">
              <div className="absolute -left-[11px] top-1 bg-sky-400 rounded-full w-5 h-5 flex items-center justify-center text-slate-950 border border-slate-900 text-[10px] font-black font-mono">3</div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest block">3. Define Dispatch Action Target:</span>
                <span className="text-[10px] text-gray-500 font-mono">OUTPUT_ROUTER</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono font-bold block uppercase">Select Action</label>
                  <select
                    value={selectedActionId}
                    onChange={(e) => setSelectedActionId(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {actionOptions.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 flex items-center gap-2">
                  <div className={`p-2 rounded-md ${activeAction.bgColor} ${activeAction.color} border border-slate-800`}>
                    <activeAction.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-mono">Schema fields:</span>
                    <strong className="text-white text-[11px] font-mono">{Object.keys(activeAction.payloadTemplate).length} variables</strong>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans mt-1">
                {activeAction.description}
              </p>
            </div>

            {/* Simulated execution trigger */}
            <div className="pt-4 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={runWorkflowSimulation}
                disabled={isSimulating}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all text-xs cursor-pointer tracking-wider shadow-lg shadow-emerald-500/10"
              >
                {isSimulating ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                RUN AST WORKFLOW SIMULATION
              </button>
            </div>

            {dbWorkflows.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  Deployed Workflows
                </h4>
                <div className="space-y-3">
                  {dbWorkflows.map(wf => (
                    <div key={wf.id} className="bg-slate-900 border border-gray-800 rounded p-3 flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm font-semibold">{wf.name}</div>
                        <div className="text-xs text-gray-500">Trigger: {wf.trigger}</div>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded">Active</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Live Logger & Terminal side console */}
          <div className="lg:col-span-5 bg-[#080d16] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest text-zinc-400 block">Ingestion Payload Vector Packet</span>
                <span className="text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-1 px-1.5 py-0.5 rounded font-mono font-bold uppercase">JSON</span>
              </div>

              {/* Display mock input parsed payload */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-[140px] leading-relaxed relative">
                <button
                  onClick={() => handleCopyText(JSON.stringify(activeTrigger.samplePayload, null, 2), 'payload-copy')}
                  className="absolute right-2 top-2 p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-400 transition-colors cursor-pointer"
                >
                  {copiedLabel === 'payload-copy' ? <Check className="w-3" /> : <Copy className="w-3" />}
                </button>
                <pre>{JSON.stringify(activeTrigger.samplePayload, null, 2)}</pre>
              </div>

              <div className="flex items-center justify-between border-b border-gray-900 pb-2 pt-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest text-zinc-400 block font-bold">Execution Broker Pipeline Console</span>
                <span className="text-[8px] bg-[#1a142e] border border-dashed border-[#7c3aed]/20 text-purple-300 px-1 px-1.5 py-0.5 rounded font-mono font-bold uppercase">LIVE LOGS</span>
              </div>

              {/* Logger display */}
              <div className="bg-slate-950 p-3 h-[200px] overflow-y-auto rounded-lg border border-slate-900 font-mono text-[10px] text-gray-400 space-y-1.5 leading-relaxed shadow-inner">
                {pulseLogs.length === 0 ? (
                  <p className="text-gray-600 italic">No simulator event detected. Click "RUN AST WORKFLOW SIMULATION" to compile and dispatch event paths...</p>
                ) : (
                  pulseLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-500 font-medium shrink-0">➜</span>
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Result container */}
            {simulationResult && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-3 p-3 animate-feed">
                <div className="flex items-center justify-between border-b border-gray-900 pb-2 text-[10px] font-mono">
                  <div className="text-gray-400">Compiler Evaluator State</div>
                  {simulationResult === 'success' ? (
                    <div className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">SUCCESS</div>
                  ) : simulationResult === 'filtered' ? (
                    <div className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">FILTERED OUT</div>
                  ) : (
                    <div className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">ERROR</div>
                  )}
                </div>

                {simulationResult === 'success' && simulatedJobPayload ? (
                  <div className="space-y-3 text-[11px] font-mono">
                    <p className="text-gray-400 font-sans leading-normal">
                      The triggers compiler successfully dispatched action payload onto <strong className="text-purple-400">BullMQ message workers</strong>! Read evaluation variables returned:
                    </p>
                    <div className="p-3 bg-slate-900/40 rounded border border-slate-850 space-y-1.5 leading-relaxed">
                      <div className="flex justify-between"><span>Trigger Type:</span> <strong className="text-white">{simulatedJobPayload.trigger_meta.event_type}</strong></div>
                      <div className="flex justify-between"><span>Action Mutated:</span> <strong className="text-emerald-300">{simulatedJobPayload.action_dispatched}</strong></div>
                      <div className="flex justify-between"><span>Latency SLA:</span> <strong className="text-indigo-400">{simulatedJobPayload.telemetry.total_evaluation_ms}ms total</strong></div>
                      <div className="flex justify-between"><span>Job ID Payload:</span> <strong className="text-white">{simulatedJobPayload.job_id}</strong></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 font-sans text-xs leading-relaxed">
                    Condition compiler concluded boundaries evaluations. Because lead attributes did not meet logical conditions, the pipeline stopped routing safely under policy structures.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SQL SCHEMA TAB */}
      {activeTab === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          
          {/* Relational DDL text block */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-bold block">
                PostgreSQL Core ERD Schema Definition
              </span>
              <button
                onClick={() => handleCopyText(WORKFLOW_SQL_SCHEMA, 'ddl-copy')}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-gray-800 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedLabel === 'ddl-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLabel === 'ddl-copy' ? 'Schemas Copied!' : 'Copy SQL Script'}
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              This complete DDL schema implements the workflow master catalogs, AST trigger trees, and historical audits list. It enforces physical database isolation with <code className="text-purple-400">tenant_id</code> queries index hashes.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed max-h-[380px] overflow-y-auto text-teal-300/90 shadow-inner">
              <pre>{WORKFLOW_SQL_SCHEMA}</pre>
            </div>
          </div>

          {/* Schema Metadata / ERD diagram card */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold block border-b border-gray-800 pb-2">
                Unified Relational Database ERD Relations
              </span>
              
              <div className="space-y-3 font-mono text-xs">
                {/* Table block 1 */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                  <div className="flex justify-between items-center text-white border-b border-gray-900 pb-1 mb-1.5 font-bold">
                    <span className="text-emerald-400 uppercase">tenant_workflows</span>
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase bg-slate-900 px-1 border rounded">Table Master</span>
                  </div>
                  <ul className="text-gray-400 text-[11px] space-y-1">
                    <li>🔑 <strong className="text-gray-300">id</strong> : UUID (Primary Key)</li>
                    <li>💼 <strong className="text-gray-300">tenant_id</strong> : VARCHAR (Tenancy Divider Index)</li>
                    <li>🏷️ <strong className="text-gray-300">name</strong> : VARCHAR (Workflow label)</li>
                    <li>🔒 <strong className="text-gray-300">is_active</strong> : BOOLEAN</li>
                  </ul>
                </div>

                {/* Table block 2 */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                  <div className="flex justify-between items-center text-white border-b border-gray-900 pb-1 mb-1.5 font-bold">
                    <span className="text-sky-400 uppercase">workflow_triggers</span>
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase bg-slate-900 px-1 border rounded">FK Relational</span>
                  </div>
                  <ul className="text-gray-400 text-[11px] space-y-1">
                    <li>🔑 <strong className="text-gray-305">id</strong> : UUID (Primary Key)</li>
                    <li>🔗 <strong className="text-gray-303">workflow_id</strong> : UUID ➔ References workflows.id</li>
                    <li>⚡ <strong className="text-gray-303">trigger_type</strong> : VARCHAR ("new_prospect", "reply_received")</li>
                    <li>📦 <strong className="text-gray-303">config</strong> : JSONB (Variable matching limits)</li>
                  </ul>
                </div>

                {/* Table block 3 */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                  <div className="flex justify-between items-center text-white border-b border-gray-900 pb-1 mb-1.5 font-bold">
                    <span className="text-purple-400 uppercase">workflow_executions</span>
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase bg-slate-900 px-1 border rounded">Audits / Logs</span>
                  </div>
                  <ul className="text-gray-400 text-[11px] space-y-1">
                    <li>🔑 <strong className="text-gray-303">id</strong> : UUID (Primary key)</li>
                    <li>🔗 <strong className="text-gray-303">workflow_id</strong> : UUID ➔ References workflows.id</li>
                    <li>🔄 <strong className="text-gray-303">execution_status</strong> : VARCHAR ("PENDING", "SUCCESS", "FAILED")</li>
                    <li>🛠️ <strong className="text-gray-303">idempotency_key</strong> : VARCHAR (Unique Constraint Protection)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-[10.5px] font-mono text-gray-500 flex justify-between bg-slate-950 p-2.5 rounded border border-slate-900">
              <span>Primary-to-Foreign Keys logic: <strong>1:Many Cascade</strong></span>
              <span>Transactional engine: <strong>ACID Compliant</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* 3. EXECUTION ARCHITECTURE GRAPH */}
      {activeTab === 'execution' && (
        <div className="space-y-6 animate-feed">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block border-b border-gray-800 pb-2">
              DAG Execution Pipeline Architecture Diagram
            </h3>
            
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Workflows are evaluated using an Abstract Syntax Tree (AST) compiler. When an injection trigger fires, the event parameters are parsed on ingress, matched to multi-tenant rules, enqueued for priority execution, and delivered transactional-safe.
            </p>

            {/* Visual SVG diagram mapping the lifecycle pipeline */}
            <div className="relative aspect-[16/6] w-full bg-[#0d131f] rounded-lg border border-slate-850/70 p-4 flex flex-col justify-center items-center overflow-x-auto">
              <svg className="w-full h-full min-w-[700px] max-h-[300px]" viewBox="0 0 800 300">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
                  </marker>
                </defs>

                {/* Grid Lines */}
                <line x1="140" y1="150" x2="260" y2="150" stroke="#4B5563" strokeDasharray="4" markerEnd="url(#arrow)" />
                <line x1="380" y1="150" x2="480" y2="150" stroke="#4B5563" markerEnd="url(#arrow)" />
                <line x1="600" y1="150" x2="680" y2="150" stroke="#4B5563" markerEnd="url(#arrow)" strokeDasharray="2" />

                {/* Node 1: Webhook Ingress */}
                <rect x="20" y="100" width="120" height="100" rx="6" fill="#1e1b4b" stroke="#312e81" strokeWidth="1.5" />
                <text x="80" y="130" fill="#a5b4fc" fontSize="11" fontStyle="mono" fontWeight="bold" textAnchor="middle">EVENT TRIGGER</text>
                <text x="80" y="150" fill="#9ca3af" fontSize="9" textAnchor="middle">Ingress Webhook</text>
                <text x="80" y="165" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle">HTTP POST v1</text>

                {/* Node 2: Redis Ingest Broker */}
                <rect x="260" y="100" width="120" height="100" rx="6" fill="#111827" stroke="#374151" strokeWidth="1.5" />
                <text x="320" y="130" fill="#f87171" fontSize="11" fontStyle="mono" fontWeight="bold" textAnchor="middle">INGEST QUEUE</text>
                <text x="320" y="150" fill="#9ca3af" fontSize="9" textAnchor="middle">Redis Ingestion</text>
                <text x="320" y="165" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">BullMQ Broker</text>

                {/* Node 3: Rules Compiler */}
                <rect x="480" y="100" width="120" height="100" rx="6" fill="#064e3b" stroke="#065f46" strokeWidth="1.5" />
                <text x="540" y="130" fill="#34d399" fontSize="11" fontStyle="mono" fontWeight="bold" textAnchor="middle">RULES AST</text>
                <text x="540" y="150" fill="#34d399" fontSize="9" textAnchor="middle">Condition Compiler</text>
                <text x="540" y="165" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Postgres Rules Match</text>

                {/* Node 4: Action Dispatcher */}
                <rect x="660" y="100" width="120" height="100" rx="6" fill="#0c4a6e" stroke="#075985" strokeWidth="1.5" />
                <text x="720" y="130" fill="#38bdf8" fontSize="11" fontStyle="mono" fontWeight="bold" textAnchor="middle">ACTION GATEWAY</text>
                <text x="720" y="150" fill="#9ca3af" fontSize="9" textAnchor="middle">Slack/Outreach API</text>
                <text x="720" y="165" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">HTTP Payload Dispatch</text>

              </svg>
            </div>
          </div>

          {/* Technical Specs breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] font-black uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Webhook Ingress Gateway
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Unified webhook controller isolates payloads using individual authentication headers. Validates signatures before processing triggers to verify ingress safety boundaries.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-mono text-[11px] font-black uppercase tracking-wider">
                <Sliders className="w-4 h-4 shrink-0" />
                AST Compiler engine
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Dynamic evaluation tree evaluates variables against parameter schemas using custom JS compiler engines, reducing the risk of unsafe evaluation injections.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Distributed Job Dispatcher
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-sans">
                Action items represent self-contained task nodes dispatched on threads pool arrays. High availability is held with strict exponential retry timers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. QUEUE ARCHITECTURE & DELIVERY BRONKER */}
      {activeTab === 'queue' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-feed">
          
          {/* Queue Design breakdown */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-5">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-400 font-bold block border-b border-gray-800 pb-2">
              Distributed Queue & Message Delivery Pipeline
            </span>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              To guarantee that client workflows survive high traffic fluctuations or external platform API crashes, our architecture decouples trigger reception from evaluation nodes using a Redis-backed BullMQ message system.
            </p>

            <div className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <h4 className="font-bold text-white uppercase font-mono text-[11px] tracking-wide text-rose-300">1. At-Least-Once Delivery SLA</h4>
                <p className="text-gray-400 leading-relaxed">
                  Every payload enqueued generates a SHA256 <code className="text-slate-200">idempotency_key</code> computed from tenant-id, workflow-id, and client request IDs. If a worker node crashes or times out midway through routing, the scheduler reassigns the job with zero duplicate risk.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-white uppercase font-mono text-[11px] tracking-wide text-rose-300">2. Dead-Letter Queues & Failures</h4>
                <p className="text-gray-400 leading-relaxed">
                  Jobs reaching maximum retry scopes (Defaults to 3 times under exponential backoff) are isolated straight to the safe <strong className="text-rose-400 font-mono">Dead Letter Queue (DLQ)</strong>. This guarantees that isolated corrupt parameters do not cascade bottlenecks on normal lanes.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-white uppercase font-mono text-[11px] tracking-wide text-rose-300">3. Workspace Rate Limiting Policies</h4>
                <p className="text-gray-400 leading-relaxed">
                  Actions targeting strict, rate-limited public APIs (like Slack channels hooks or email SMTPs) flow through isolated consumer limits queues configured using Redis token buckets, protecting system integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Queue telemetry simulations monitor */}
          <div className="bg-[#080d16] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#f43f5e] block">BullMQ Message Broker Telemetry</span>
                <span className="text-[8px] bg-red-500/10 border border-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase">Active Stream</span>
              </div>

              {/* Grid with telemetry stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-850">
                  <span className="text-[9px] text-gray-450 uppercase font-mono block">Accumulated processed Jobs:</span>
                  <strong className="text-white text-lg font-mono">{queueMetrics.jobsProcessedCount.toLocaleString()}</strong>
                  <span className="text-[9px] text-emerald-400 block font-mono mt-1">99.99% Execution Delivery rate</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-850">
                  <span className="text-[9px] text-gray-450 uppercase font-mono block">Active jobs in Flight:</span>
                  <strong className="text-white text-lg font-mono">{queueMetrics.jobsInFlight} jobs</strong>
                  <span className="text-[9px] text-zinc-500 block font-mono mt-1">Routing load: Normal status</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-850">
                  <span className="text-[9px] text-gray-450 uppercase font-mono block">Dead-Letter Queue size:</span>
                  <strong className="text-rose-400 text-lg font-mono">{queueMetrics.jobsFailedCount}</strong>
                  <span className="text-[9px] text-rose-400/70 block font-mono mt-1">Requires manual evaluation resolution</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-850">
                  <span className="text-[9px] text-gray-450 uppercase font-mono block">AVG Network Latency SLA:</span>
                  <strong className="text-sky-300 text-lg font-mono">{queueMetrics.avgLatencyMs}ms</strong>
                  <span className="text-[9px] text-emerald-400 block font-mono mt-1">Exceeds SoC2 latency SLA requirements</span>
                </div>
              </div>
            </div>

            {/* Quick alert notifications box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-950/40 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-300 font-mono text-[10.5px] font-black uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-300 shrink-0 animate-pulse" />
                Dead-Letter Queue alert notification summary
              </div>
              <p className="text-gray-400 font-sans leading-relaxed text-[10.5px]">
                3 jobs failed delivery to client custom Webhook URL today due to destination HTTP 504 Gateway Status timeouts. Redis backup rescheduled, logged, and isolated parameters cleanly.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
