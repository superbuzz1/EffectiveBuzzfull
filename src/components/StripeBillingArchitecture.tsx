import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Database, Zap, RefreshCw, Layers, Check, Copy, Sliders, Play, 
  Terminal, ShieldCheck, HelpCircle, ArrowRight, UserPlus, Trash2, 
  Settings, Cloud, AlertCircle, AlertTriangle, Sparkles, Code, CheckCircle2,
  Calendar, Lock, TrendingUp, Cpu, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// Types & Hardcoded Plan Definitions matching Stripe Billing configuration
// ============================================================================

export interface BillingPlan {
  id: 'starter' | 'growth' | 'scale' | 'enterprise';
  name: string;
  priceMonthly: number;
  stripePriceId: string;
  creditsAllocated: number; // monthly credit allocations
  meteredEmailRate: number; // cost per email past limit
  seatLimit: number;
  description: string;
  features: string[];
  color: string;
  borderColor: string;
  bgColor: string;
}

const billingPlans: BillingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    priceMonthly: 49,
    stripePriceId: 'price_1NxbR2EffectiveBuzzStarter',
    creditsAllocated: 1000,
    meteredEmailRate: 0.05,
    seatLimit: 3,
    description: 'Perfect for outbound sales founders seeking their first 10 solid matches.',
    features: [
      '1,000 Base AI Credits Included',
      'Autonomous Target Lead Scraper (3 domains/day)',
      'Gemini-powered email writing copilot',
      'Up to 3 staff seats log integrations',
      'Standard 6-hour support turnaround'
    ],
    color: 'text-zinc-400',
    borderColor: 'border-zinc-800',
    bgColor: 'bg-zinc-500/5'
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    priceMonthly: 149,
    stripePriceId: 'price_1NxbR2EffectiveBuzzGrowth',
    creditsAllocated: 5000,
    meteredEmailRate: 0.03,
    seatLimit: 10,
    description: 'Designed for scaling agencies running automated multi-sequence campaigns.',
    features: [
      '5,000 Base AI Credits Included',
      'Advanced multi-lingual target research parser',
      'Automated predictive lead scoring system',
      'Up to 10 workspace teammates',
      'Rapid 2-hour email support queue'
    ],
    color: 'text-teal-400',
    borderColor: 'border-teal-500/20',
    bgColor: 'bg-teal-500/10'
  },
  {
    id: 'scale',
    name: 'Scale Plan',
    priceMonthly: 499,
    stripePriceId: 'price_1NxbR2EffectiveBuzzScale',
    creditsAllocated: 20000,
    meteredEmailRate: 0.015,
    seatLimit: 25,
    description: 'High-throughput enterprise level sequences with dedicated performance.',
    features: [
      '20,000 Base AI Credits Included',
      'Real-time webhook events propagation',
      'Unlimited target lead crawler tasks',
      'Up to 25 tenant teammate logins',
      'Dedicated Customer Success Architect'
    ],
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/10'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    priceMonthly: 1299,
    stripePriceId: 'price_1NxbR2EffectiveBuzzEnterprise',
    creditsAllocated: 100000,
    meteredEmailRate: 0.008,
    seatLimit: 999,
    description: 'Ultimate multi-tenant isolated database nodes with bespoke security parameters.',
    features: [
      '100,000 Base AI Credits Included',
      '100% custom SSO/SAML integrations',
      'Strict database-level index tenant partition',
      'Unlimited teammate accounts',
      'Guaranteed 99.99% uptime SLA guarantee'
    ],
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/20',
    bgColor: 'bg-indigo-500/10'
  }
];

export interface WebhookEventOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  samplePayload: Record<string, any>;
}

export default function StripeBillingArchitecture() {
  const [activeTab, setActiveTab] = useState<'plans' | 'schema' | 'webhooks' | 'metering' | 'backend'>('plans');

  // Interactive plan state (selected source tenant matching Acme Corp in App.tsx)
  const [currentPlanId, setCurrentPlanId] = useState<BillingPlan['id']>('growth');
  const [targetPlanId, setTargetPlanId] = useState<BillingPlan['id']>('scale');
  const [isCalculatedProration, setIsCalculatedProration] = useState<boolean>(true);
  const [prorationPreviewResult, setProrationPreviewResult] = useState<any | null>(null);

  // Credit & metering playground state
  const [currentCreditsRemaining, setCurrentCreditsRemaining] = useState<number>(3150);
  const [creditsPurchasedAdditional, setCreditsPurchasedAdditional] = useState<number>(0);
  const [meteredSalesSearchesRun, setMeteredSalesSearchesRun] = useState<number>(142);
  const [meteredOutreachDraftsRun, setMeteredOutreachDraftsRun] = useState<number>(258);
  const [apiThrottled, setApiThrottled] = useState<boolean>(false);

  // Inbound Webhook Simulator State
  const [selectedWebhookEvent, setSelectedWebhookEvent] = useState<string>('customer.subscription.updated');
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [databaseStateAfterWebhook, setDatabaseStateAfterWebhook] = useState<string>('Unchanged');

  // Copy helper
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  const currentPlan = billingPlans.find(p => p.id === currentPlanId) || billingPlans[1];
  const targetPlan = billingPlans.find(p => p.id === targetPlanId) || billingPlans[2];

  // Calculate proration previews dynamically based on selected plans
  useEffect(() => {
    const currentPrice = currentPlan.priceMonthly;
    const targetPrice = targetPlan.priceMonthly;
    
    // Simulate complex Stripe retrieveUpcoming proration computations (mid-billing cycle billing)
    const billingCycleDays = 30;
    const elapsedDays = 12; // 12 days elapsed into the month
    const remainingDays = billingCycleDays - elapsedDays;
    
    // Unused time credit on current plan
    const currentUnusedValue = Number(((currentPrice * remainingDays) / billingCycleDays).toFixed(2));
    // New plan cost for remaining days
    const targetProratedValue = Number(((targetPrice * remainingDays) / billingCycleDays).toFixed(2));
    
    // Proration difference
    const prorationFee = Number((targetProratedValue - currentUnusedValue).toFixed(2));
    
    setProrationPreviewResult({
      invoiceDate: "2026-06-18 (Scheduled cycle mid-point)",
      currentUnusedValue,
      targetProratedValue,
      prorationFee: prorationFee > 0 ? prorationFee : 0,
      refundCreditValue: prorationFee < 0 ? Math.abs(prorationFee) : 0,
      nextFullCyclePrice: targetPrice,
      stripeProrationCode: `// Computed using retrieveUpcomingInvoice:
const prorationDate = Math.floor(Date.now() / 1000);
const invoice = await stripe.invoices.retrieveUpcoming({
  customer: tenant.stripe_customer_id,
  subscription: tenant.stripe_subscription_id,
  subscription_items: [{
    id: tenant.stripe_subscription_item_id,
    price: '${targetPlan.stripePriceId}'
  }],
  subscription_proration_date: prorationDate
});`
    });
  }, [currentPlanId, targetPlanId]);

  // Webhook Event catalog options
  const webhookEventOptions: WebhookEventOption[] = [
    {
      id: 'customer.subscription.created',
      name: 'customer.subscription.created',
      description: 'Fires when a new checkout cycle finishes. Provokes database storage setup.',
      icon: UserPlus,
      samplePayload: {
        id: "evt_subs_1820A9B",
        object: "event",
        type: "customer.subscription.created",
        created: 1780777200,
        data: {
          object: {
            id: "sub_1QfR2EffectiveBuzz001",
            customer: "cus_NxbR2EffectiveBuzzAcme",
            status: "active",
            current_period_start: 1780777200,
            current_period_end: 1783369200,
            items: {
              data: [
                {
                  id: "si_NxbR2EffectiveBuzzSI1",
                  price: {
                    id: "price_1NxbR2EffectiveBuzzGrowth",
                    unit_amount: 14900,
                    recurring: { interval: "month" },
                    product: "prod_EffectiveBuzzGrowth"
                  },
                  quantity: 1
                }
              ]
            }
          }
        }
      }
    },
    {
      id: 'customer.subscription.updated',
      name: 'customer.subscription.updated',
      description: 'Triggered during plan upgrades, downgrades, cancellations, or card updates.',
      icon: RefreshCw,
      samplePayload: {
        id: "evt_subs_993A11C",
        object: "event",
        type: "customer.subscription.updated",
        created: 1780820400,
        data: {
          object: {
            id: "sub_1QfR2EffectiveBuzz001",
            customer: "cus_NxbR2EffectiveBuzzAcme",
            status: "active",
            cancel_at_period_end: false,
            current_period_end: 1783369200,
            items: {
              data: [
                {
                  id: "si_NxbR2EffectiveBuzzSI2",
                  price: {
                    id: "price_1NxbR2EffectiveBuzzScale",
                    unit_amount: 49900,
                    recurring: { interval: "month" }
                  }
                }
              ]
            }
          },
          previous_attributes: {
            items: {
              data: [
                {
                  id: "si_NxbR2EffectiveBuzzSI1",
                  price: { id: "price_1NxbR2EffectiveBuzzGrowth" }
                }
              ]
            }
          }
        }
      }
    },
    {
      id: 'invoice.payment_succeeded',
      name: 'invoice.payment_succeeded',
      description: 'Triggered every month. Re-enfranchises client credit wallets.',
      icon: ShieldCheck,
      samplePayload: {
        id: "evt_inv_88a011F",
        object: "event",
        type: "invoice.payment_succeeded",
        created: 1780906800,
        data: {
          object: {
            id: "in_1QfR2EffectiveBuzz_Inv90",
            customer: "cus_NxbR2EffectiveBuzzAcme",
            subscription: "sub_1QfR2EffectiveBuzz001",
            amount_paid: 49900,
            currency: "usd",
            hosted_invoice_url: "https://invoice.stripe.com/i/acct_1/inv_90",
            lines: {
              data: [
                {
                  price: { id: "price_1NxbR2EffectiveBuzzScale" },
                  quantity: 1,
                  amount: 49900
                }
              ]
            }
          }
        }
      }
    },
    {
      id: 'invoice.payment_failed',
      name: 'invoice.payment_failed',
      description: 'Fires when credit card attempts fail. Triggers soft lock warnings.',
      icon: AlertTriangle,
      samplePayload: {
        id: "evt_inv_fatal001",
        object: "event",
        type: "invoice.payment_failed",
        created: 1780911200,
        data: {
          object: {
            id: "in_1QfR2EffectiveBuzz_Fail91",
            customer: "cus_NxbR2EffectiveBuzzAcme",
            subscription: "sub_1QfR2EffectiveBuzz001",
            amount_due: 49900,
            attempt_count: 3,
            next_payment_attempt: 1780997600,
            billing_reason: "subscription_cycle"
          }
        }
      }
    },
    {
      id: 'customer.subscription.deleted',
      name: 'customer.subscription.deleted',
      description: 'Fires if uncollected or when manually terminated. Cuts workspace access.',
      icon: Trash2,
      samplePayload: {
        id: "evt_subs_del_9901",
        object: "event",
        type: "customer.subscription.deleted",
        created: 1781001200,
        data: {
          object: {
            id: "sub_1QfR2EffectiveBuzz001",
            customer: "cus_NxbR2EffectiveBuzzAcme",
            status: "canceled"
          }
        }
      }
    }
  ];

  const activeWebhookEvent = webhookEventOptions.find(w => w.id === selectedWebhookEvent) || webhookEventOptions[1];

  // Dispatch Inbound Webhook simulation logic
  const dispatchWebhookSimulation = async () => {
    if (isDispatched) return;
    setIsDispatched(true);
    setWebhookLogs([]);
    setResponseStatus(null);

    const steps = [
      `[Gateway Ingress] Ingested webhook POST payload to path "/api/v1/billing/webhooks"`,
      `[Security verification] Fetching Stripe-Signature Header from request parameters...`,
      `[Security verification] Signing validation: Parsing signature "t=1780820400,v1=sha256_mock_sig_991823B..."`,
      `[Security verification] Loading secret key "whsec_EffectiveBuzzWebhookSigningKey001" from encrypted vault...`,
      `[HMAC Handshake] Computing local SHA256 HMAC over raw payload bytes... Signature matches precisely!`,
      `[Idempotency Check] Ingesting event ID "${activeWebhookEvent.samplePayload.id}". Checking index in redis_event_hashes... [Cache Miss, Proceeding]`,
      `[Routing Engine] Route resolved: Inbound event type is "${activeWebhookEvent.id}"`,
    ];

    for (let i = 0; i < steps.length; i++) {
      setWebhookLogs(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Process specific event effects in logic logs
    let endLogs: string[] = [];
    let dbStatus = '';
    
    if (activeWebhookEvent.id === 'customer.subscription.created') {
      endLogs = [
        `[PostgreSQL Transaction] Querying tenant profile matching stripe_customer_id "cus_NxbR2EffectiveBuzzAcme"...`,
        `[PostgreSQL Transaction] Customer Acme matched! Upgrading database subscription row status to "active"`,
        `[Credit Allocator] Plan is "Growth Plan". Injecting base credit wallet limit: 5,000 credits`,
        `[Telemetry Log] Writing history entry to subscription_audit_logs with state "sub_created_successful"`,
        `[Response Dispatch] HTTP 200 OK sent to Stripe server. Event recorded.`
      ];
      dbStatus = 'Acme Corp Subscription set with 5,000 monthly credits. Status: ACTIVE';
    } else if (activeWebhookEvent.id === 'customer.subscription.updated') {
      endLogs = [
        `[PostgreSQL Transaction] Matching current active stripe subscription "sub_1QfR2EffectiveBuzz001"...`,
        `[Audit Comparison] Detailing changed properties: price changed from "growth_base" to "scale_base"`,
        `[PostgreSQL Transaction] Updating sub_status = "active", plan_tier = "Scale", credit_limit_cap = 20000`,
        `[Credit Allocator] Instantly adjusting workspace prorated allowance balance to 20,000 credits`,
        `[Notifier Service] Triggering email alert to workspace admins: "Acme platform upgraded to Scale!"`,
        `[Response Dispatch] HTTP 200 OK sent. Subscription synchronized successfully.`
      ];
      dbStatus = `Acme Corp upgraded to Scale Plan. Monthly limit expanded to 20,000. Status: ACTIVE`;
    } else if (activeWebhookEvent.id === 'invoice.payment_succeeded') {
      endLogs = [
        `[PostgreSQL Transaction] Fetching invoice metadata for "in_1QfR2EffectiveBuzz_Inv90"...`,
        `[Revenue Auditing] Payment of $499.00 recorded in database. Mapping metrics to Stripe ledger rows`,
        `[Credit Allocator] Resetting monthly credit wallet! Injecting fresh plan allowance to Acme balance`,
        `[PostgreSQL Transaction] Updating subscriptions table columns billing_cycle_end = 2026-07-06`,
        `[Response Dispatch] HTTP 200 OK sent. Client account credit successfully re-provisioned.`
      ];
      dbStatus = 'Payment Success. Subscription cycle extended by 30 days. Credits topped up.';
    } else if (activeWebhookEvent.id === 'invoice.payment_failed') {
      endLogs = [
        `[PostgreSQL Transaction] Attempt counts matched. This was invoice retry attempt #3`,
        `[Soft Lock Trigger] Activating soft-suspension status warning flags. (soft_lock = TRUE)`,
        `[PostgreSQL Transaction] Updating subscriptions status = "past_due" (Allowing 3 additional grace days)`,
        `[Notifier Service] Dispatching urgent email alert to tenant owner: "Your EffectiveBuzz subscription is past due. Update credit card immediately to preserve outbound campaigns"`,
        `[Response Dispatch] HTTP 200 OK sent. Account flagged as past_due in workspace dashboard.`
      ];
      dbStatus = 'Acme Corp: Subscription PAST DUE. Grace period warnings active. Status: PAST_DUE';
    } else if (activeWebhookEvent.id === 'customer.subscription.deleted') {
      endLogs = [
        `[PostgreSQL Transaction] Stripe canceled state detected for Acme subscription "sub_1QfR2EffectiveBuzz001"`,
        `[Hard Lock Trigger] Setting subscriptions status = "canceled", is_active = FALSE`,
        `[Security Agent] Immediately revoking outbound campaign API keys. De-registering cron schedulers...`,
        `[Outbox Pipeline] Pausing all 4 active email copywriting campaign pipelines for Acme Corp`,
        `[Response Dispatch] HTTP 200 OK sent. Campaign engines fully deactivated for tenant.`
      ];
      dbStatus = 'Acme Corp: CANCELED. Workspace features frozen. Campaign triggers deactivated.';
    }

    for (let i = 0; i < endLogs.length; i++) {
      setWebhookLogs(prev => [...prev, endLogs[i]]);
      await new Promise(resolve => setTimeout(resolve, 350));
    }

    setResponseStatus(200);
    setDatabaseStateAfterWebhook(dbStatus);
    setIsDispatched(false);
  };

  // Structured Relational PostgreSQL Database DDL
  const BILLING_SQL_SCHEMA = `-- 1. Stripe Raw Customers Directory mapping tenant boundaries
CREATE TABLE IF NOT EXISTS stripe_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) UNIQUE NOT NULL, -- Logical link to multitenancy
    stripe_customer_id VARCHAR(100) UNIQUE NOT NULL, -- raw Stripe cus_* key
    billing_email VARCHAR(255) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'usd',
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS customer_tenant_idx ON stripe_customers(tenant_id);

-- 2. Subscription Engine Lifecycle Table
CREATE TABLE IF NOT EXISTS customer_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) NOT NULL REFERENCES stripe_customers(tenant_id) ON DELETE CASCADE,
    stripe_subscription_id VARCHAR(100) UNIQUE NOT NULL, -- raw Stripe sub_* key
    stripe_price_id VARCHAR(100) NOT NULL,              -- active rate ID
    plan_tier VARCHAR(50) NOT NULL DEFAULT 'starter',   -- starter, growth, scale, enterprise
    subscription_status VARCHAR(50) NOT NULL,           -- active, trialing, past_due, canceled
    monthly_allowance INT NOT NULL DEFAULT 1000,         -- monthly credit parameters
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON customer_subscriptions(tenant_id, subscription_status);

-- 3. Dynamic Credit Wallet System (Durable transaction logs)
CREATE TABLE IF NOT EXISTS tenant_credit_wallets (
    tenant_id VARCHAR(100) PRIMARY KEY,
    total_lifetime_granted INT NOT NULL DEFAULT 1000,
    total_lifetime_spent INT NOT NULL DEFAULT 0,
    current_balance INT NOT NULL DEFAULT 1000,
    soft_blocked BOOLEAN NOT NULL DEFAULT false, -- block if limit hit
    last_reset_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

-- Transaction log of credit changes for absolute audit safety
CREATE TABLE IF NOT EXISTS credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) NOT NULL REFERENCES stripe_customers(tenant_id) ON DELETE CASCADE,
    amount_delta INT NOT NULL, -- positive for subscription top-up, negative for lead usage
    transaction_reason VARCHAR(100) NOT NULL, -- 'MONTHLY_TOPUP', 'CRAWLER_SPEND', 'AI_COPYWRITING'
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS txn_tenant_idx ON credit_transactions(tenant_id, created_at DESC);

-- 4. Invoiced Usage Metering Registry (BullMQ schedules sync to Stripe)
CREATE TABLE IF NOT EXISTS metered_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(100) NOT NULL REFERENCES stripe_customers(tenant_id) ON DELETE CASCADE,
    stripe_subscription_item_id VARCHAR(100) NOT NULL, -- points directly to metered Stripe item
    usage_type VARCHAR(50) NOT NULL, -- 'email_searches', 'ai_outreach_drafts'
    unit_count INT NOT NULL DEFAULT 1,
    reported_to_stripe BOOLEAN NOT NULL DEFAULT false,
    stripe_usage_record_id VARCHAR(100), -- populated when API syncs
    logged_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS metered_unsynced_idx ON metered_usage_logs(reported_to_stripe) WHERE reported_to_stripe = false;`;

  // Dynamic Credits Usage simulation spenders
  const runLeadsScrapeUsage = () => {
    if (currentCreditsRemaining <= 50) {
      setApiThrottled(true);
      return;
    }
    setCurrentCreditsRemaining(p => p - 120);
    setMeteredSalesSearchesRun(p => p + 120);
    // Log a brief simulated warning if low
    if (currentCreditsRemaining - 120 < 500) {
      // close to limit
    }
  };

  const runAICopywriteUsage = () => {
    if (currentCreditsRemaining <= 15) {
      setApiThrottled(true);
      return;
    }
    setCurrentCreditsRemaining(p => p - 40);
    setMeteredOutreachDraftsRun(p => p + 40);
  };

  const resetCreditsAndRestore = () => {
    setCurrentCreditsRemaining(currentPlan.creditsAllocated);
    setCreditsPurchasedAdditional(0);
    setApiThrottled(false);
  };

  return (
    <div className="space-y-6 animate-feed">
      
      {/* 1. ARCHITECTURE HEADER */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-[#0a3622]/20 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-y-1/4 translate-x-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute left-0 bottom-0 -translate-y-1/4 -translate-x-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider">
                STRIPE SAAS PLATFORM SPEC
              </span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider">
                PRODUCTION INTEGRATED
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <CreditCard className="w-6 h-6 text-emerald-400" />
              Stripe Billing & Subscriptions Architecture
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Design, test, and audit dynamic SaaS subscriber workflows for the EffectiveBuzz network. Includes multi-plan catalogs, Postgres ledger schemas, proration engines, webhook security handshakes, and usage-based metered billing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/60 font-mono text-center">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Billing Gateway</span>
              <strong className="text-emerald-400 text-base leading-none">Stripe v2025-02</strong>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/60 font-mono text-center">
              <span className="text-[9px] text-gray-500 block uppercase font-bold">Ledger Isolation</span>
              <strong className="text-indigo-300 text-base leading-none">Strict Tenant ID</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-PORTAL TABS SWITCHERS */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-950 rounded-xl border border-slate-850 sm:w-fit">
        {[
          { id: 'plans', label: '1. Plans & Prorator', icon: Sliders },
          { id: 'schema', label: '2. PostgreSQL Ledger DDL', icon: Database },
          { id: 'webhooks', label: '3. Inbound Webhook Router', icon: Play },
          { id: 'metering', label: '4. Credit & Metering Playground', icon: Zap },
          { id: 'backend', label: '5. Stripe Service API Code', icon: Code }
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

      {/* 3. TAB RENDERS */}

      {/* TAB 1: PLANS AND PRORATION PREVIEWS */}
      {activeTab === 'plans' && (
        <div className="space-y-6 animate-feed">
          
          {/* Plans Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {billingPlans.map(plan => (
              <div 
                key={plan.id}
                className={`flex flex-col justify-between p-5 rounded-xl border relative transition-all ${
                  plan.id === currentPlanId 
                    ? `bg-slate-900/90 border-emerald-500/40 shadow-emerald-500/5 ring-1 ring-emerald-500/20` 
                    : `bg-[#111827] border-[#1f2937] hover:border-gray-700`
                }`}
              >
                {plan.id === currentPlanId && (
                  <span className="absolute -top-2 right-4 text-[9px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                    CURRENTLY SUBSCRIBED
                  </span>
                )}

                <div className="space-y-3">
                  <div>
                    <h3 className="text-white text-sm font-display font-bold">{plan.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed font-sans">{plan.description}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-3xl font-display font-medium text-white">${plan.priceMonthly}</span>
                    <span className="text-xs text-gray-400 font-mono"> / month</span>
                  </div>

                  {/* Allocated and Metered rate */}
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850/60 font-mono text-[10.5px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Base Credits:</span>
                      <strong className="text-white">{plan.creditsAllocated.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Overage Rate:</span>
                      <strong className="text-emerald-400">${plan.meteredEmailRate}/unit</strong>
                    </div>
                  </div>

                  <ul className="text-[11px] text-gray-300 space-y-2 pt-2">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 leading-normal">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-5">
                  <button
                    type="button"
                    onClick={() => setCurrentPlanId(plan.id)}
                    className={`w-full py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      plan.id === currentPlanId 
                        ? 'bg-emerald-500 text-slate-950 shadow-inner' 
                        : 'bg-slate-950 text-gray-300 hover:text-white border border-slate-850'
                    }`}
                  >
                    {plan.id === currentPlanId ? 'Selected Tenant Plan' : 'Select Initial State'}
                  </button>
                  {plan.id !== currentPlanId && (
                    <button
                      type="button"
                      onClick={() => setTargetPlanId(plan.id)}
                      className={`w-full py-1.5 rounded-lg text-[11px] font-mono font-bold border transition-all cursor-pointer text-center block ${
                        targetPlanId === plan.id 
                          ? 'border-indigo-400 bg-indigo-500/10 text-indigo-300' 
                          : 'border-slate-850 hover:border-gray-700 bg-slate-900 text-gray-400'
                      }`}
                    >
                      Set Target for Upgrade/Downgrade
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Prorations compute preview sandbox */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#818cf8] font-bold block">
                Upgrade & Downgrade Proration Calculator
              </span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">STRIPE PREVIEW ENGINE</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Changing active subscription plans in SaaS requires instant, dynamic proration previews to ensure billing integrity. Compare the prorated difference between <strong className="text-emerald-400">{currentPlan.name}</strong> and <strong className="text-indigo-400">{targetPlan.name}</strong> instantly below.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Compare panel */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-gray-900">
                    <span className="text-gray-400 font-bold">Departure Plan:</span>
                    <strong className="text-emerald-400">{currentPlan.name} (${currentPlan.priceMonthly}/mo)</strong>
                  </div>

                  <div className="flex justify-center py-1">
                    <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90 lg:rotate-0" />
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-gray-900">
                    <span className="text-gray-400 font-bold">Targeted Plan:</span>
                    <strong className="text-indigo-300">{targetPlan.name} (${targetPlan.priceMonthly}/mo)</strong>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-gray-500 bg-slate-950 p-2.5 rounded border border-slate-900 font-mono">
                  <span>Billing cycle duration: <strong>30 days</strong></span>
                  <span>Days remaining in cycle: <strong>18 days</strong></span>
                </div>
              </div>

              {/* Stripe calculation terminal */}
              {prorationPreviewResult && (
                <div className="lg:col-span-7 bg-[#090d16] border border-slate-850 rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono font-black tracking-widest text-zinc-400 block border-b border-gray-900 pb-1.5">
                      STRIPE METALS PRORATION STATEMENT PREVIEW
                    </span>
                    <div className="p-3 bg-slate-950 rounded border border-slate-900 text-xs font-mono space-y-1.5 leading-relaxed text-gray-300">
                      <div className="flex justify-between">
                        <span>Invoice calculation timestamp:</span>
                        <strong className="text-white">{prorationPreviewResult.invoiceDate}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Unused credit refunded values ({currentPlan.name}):</span>
                        <strong className="text-emerald-400">-${prorationPreviewResult.currentUnusedValue.toFixed(2)} USD</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>New proportional cost parameter ({targetPlan.name}):</span>
                        <strong className="text-indigo-300">+${prorationPreviewResult.targetProratedValue.toFixed(2)} USD</strong>
                      </div>
                      <div className="border-t border-gray-900 pt-2 flex justify-between font-bold text-sm">
                        <span>Simulated Outstanding Charge Due:</span>
                        {prorationPreviewResult.prorationFee > 0 ? (
                          <strong className="text-emerald-400">+${prorationPreviewResult.prorationFee.toFixed(2)} USD</strong>
                        ) : (
                          <strong className="text-indigo-300">-$0.00 (Wallet Refund Credit: ${prorationPreviewResult.refundCreditValue.toFixed(2)})</strong>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clean Stripe raw invoice compute text */}
                  <div className="bg-slate-950 p-3.5 rounded border border-slate-900 max-h-[145px] overflow-y-auto text-[10.5px] font-mono text-zinc-400">
                    <pre className="text-indigo-400/90 leading-relaxed font-bold">{prorationPreviewResult.stripeProrationCode}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POSTGRES ARCHITECTURE SPEC */}
      {activeTab === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          
          {/* PG Vector Ledger raw text block */}
          <div className="lg:col-span-7 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-bold block">
                PostgreSQL SaaS Billing schema Relations DDL
              </span>
              <button
                onClick={() => handleCopyText(BILLING_SQL_SCHEMA, 'billing-ddl-copy')}
                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-gray-800 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedLabel === 'billing-ddl-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLabel === 'billing-ddl-copy' ? 'Copied Billing DDL!' : 'Copy Schema SQL'}
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              This normalized DDL schema defines structural tenant customers directory, active subscriptions status tracks, dynamic live wallet balances, and usage telemetry tables.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed max-h-[380px] overflow-y-auto text-teal-300/90 shadow-inner">
              <pre>{BILLING_SQL_SCHEMA}</pre>
            </div>
          </div>

          {/* Database indexes and relationship mapping */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold block border-b border-gray-800 pb-2">
                Unified Ledger Indexes & Relational Logic
              </span>

              <div className="space-y-3 font-sans text-xs">
                {/* Rule Item 1 */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850/60 leading-relaxed">
                  <span className="text-[11px] text-teal-400 font-mono font-bold block uppercase border-b border-gray-900 pb-1 mb-1">
                    Multi-Tenant Isolation Safeguard
                  </span>
                  <p className="text-gray-400 text-xs mt-1 leading-normal font-sans">
                    Every billing table explicitly binds to a unique <code className="text-purple-400 font-bold font-mono">tenant_id</code>. Under secure tenant partition indexes, any direct ledger write must pass active session validation, blocks cross-tenant query leaks.
                  </p>
                </div>

                {/* Rule Item 2 */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850/60 leading-relaxed">
                  <span className="text-[11px] text-sky-450 font-mono font-bold block uppercase border-b border-gray-900 pb-1 mb-1">
                    Idempotence Verification Cache
                  </span>
                  <p className="text-gray-400 text-xs mt-1 leading-normal font-sans">
                    Webhook ingress records publish raw Stripe event IDs directly to an unique constraint. If network latency triggers repeat attempts, Node.js triggers standard <code className="text-emerald-450 font-bold font-mono">ON CONFLICT DO NOTHING</code>, guaranteeing at-most-once logic.
                  </p>
                </div>

                {/* Rule Item 3 */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850/60 leading-relaxed">
                  <span className="text-[11px] text-[#818cf8] font-mono font-bold block uppercase border-b border-gray-900 pb-1 mb-1">
                    Credit WAL Transaction Ledgers
                  </span>
                  <p className="text-gray-400 text-xs mt-1 leading-normal font-sans">
                    We never override credit values directly without logging. To reconcile balances, custom transactions append delta offsets to <code className="text-purple-400 font-bold font-mono">credit_transactions</code>, syncing dynamic totals safely.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-gray-500 bg-slate-950 p-2.5 rounded border border-slate-900 flex justify-between">
              <span>Security constraints: <strong>SOC2 Compliant</strong></span>
              <span>Ledger Isolation: <strong>Strict row boundaries</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WEBHOOK ROUTER SIMULATOR */}
      {activeTab === 'webhooks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          
          {/* Left panel: configure webhook */}
          <div className="lg:col-span-5 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block border-b border-gray-800 pb-2">
              Inbound Webhook Event Simulator
            </span>

            <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium">
              Stripe communicates subscription changes asynchronously in real-time. Pick an active Stripe event below to observe our secure verification and routing webhook handler.
            </p>

            <div className="space-y-3">
              {webhookEventOptions.map(wh => {
                const Icon = wh.icon;
                return (
                  <button
                    key={wh.id}
                    onClick={() => setSelectedWebhookEvent(wh.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs flex items-start gap-3 transition-all cursor-pointer ${
                      selectedWebhookEvent === wh.id 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold' 
                        : 'bg-slate-950 border-slate-900 text-gray-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <div className={`p-1.5 rounded border ${
                      selectedWebhookEvent === wh.id ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-gray-800 text-gray-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block font-mono font-bold leading-none">{wh.name}</span>
                      <p className="text-[10px] text-gray-400 font-sans leading-normal font-normal">{wh.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-900">
              <button
                type="button"
                onClick={dispatchWebhookSimulation}
                disabled={isDispatched}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-xs cursor-pointer tracking-wider shadow-lg shadow-emerald-500/10 font-mono"
              >
                {isDispatched ? <RefreshCw className="w-4 h-4 animate-spin text-slate-950" /> : <Play className="w-4 h-4 text-slate-950" />}
                DISPATCH WEBHOOK TO WORKSPACE GATEWAY
              </button>
            </div>
          </div>

          {/* Right panel: Live payload console or database execution tracks */}
          <div className="lg:col-span-7 bg-[#080d16] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-900 pb-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest text-zinc-400 block font-bold">Stripe Event Payload JSON</span>
                <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase">SEC_PAYLOAD</span>
              </div>

              {/* JSON preview */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 font-mono text-[10.5px] text-emerald-400 overflow-x-auto max-h-[140px] leading-relaxed relative">
                <button
                  type="button"
                  onClick={() => handleCopyText(JSON.stringify(activeWebhookEvent.samplePayload, null, 2), 'payload-copy')}
                  className="absolute right-2 top-2 p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[9px] flex items-center gap-1 font-mono text-zinc-400 transition-colors"
                >
                  {copiedLabel === 'payload-copy' ? <Check className="w-3" /> : <Copy className="w-3" />}
                </button>
                <pre>{JSON.stringify(activeWebhookEvent.samplePayload, null, 2)}</pre>
              </div>

              <div className="flex items-center justify-between border-b border-gray-900 pb-2 pt-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest text-zinc-400 block font-bold">Signature Verifying Webhook Engine Logs</span>
                <span className="text-[8px] bg-purple-500/10 border border-purple-500/20 text-purple-450 px-1.5 py-0.5 rounded font-mono font-bold uppercase">LIVE TERMINAL</span>
              </div>

              {/* Logger interface */}
              <div className="bg-slate-950 p-3 h-[180px] overflow-y-auto rounded-lg border border-slate-900 font-mono text-[10.5px] text-zinc-400 space-y-1.5 leading-relaxed shadow-inner">
                {webhookLogs.length === 0 ? (
                  <p className="text-gray-600 italic">No webhooks transacting. Click "DISPATCH WEBHOOK TO WORKSPACE GATEWAY" to simulate execution pipeline...</p>
                ) : (
                  webhookLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-500 font-medium shrink-0">➜</span>
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simulated Database Status update output */}
            {responseStatus && (
              <div className="p-4 bg-slate-950 rounded-xl border border-teal-900/40 space-y-2.5 p-3 animate-feed font-mono">
                <div className="flex items-center justify-between border-b border-gray-900 pb-2 text-[10px]">
                  <div className="text-zinc-500 font-bold uppercase">PostgreSQL Database Real-time Mutation</div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[9px] font-black font-semibold">SYNC_RESOLVED</div>
                </div>

                <div className="text-xs space-y-1 bg-slate-900/60 p-2.5 rounded border border-slate-850">
                  <div className="flex justify-between">
                    <span className="text-gray-500">HTTP Status:</span>
                    <strong className="text-emerald-400">{responseStatus} OK Success</strong>
                  </div>
                  <div className="flex items-start justify-between gap-1 mt-1 leading-normal">
                    <span className="text-gray-500 shrink-0">Sub State:</span>
                    <strong className="text-white text-right font-sans">{databaseStateAfterWebhook}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: METERED BILLING & WALLET PLAYGROUND */}
      {activeTab === 'metering' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-feed">
          
          {/* Wallet controller and simulators usage card */}
          <div className="lg:col-span-6 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-5">
            <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-bold block border-b border-gray-800 pb-2">
              Dynamic Credit Wallet & Sales Campaigns Usage
            </span>

            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Our billing architecture operates off standard monthly credit balance pools. When campaigns scrape new prospects or write copy, credits decrease. If balances hit limits, gateways return soft locks, and extra usage registers onto Stripe's metered billing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] text-indigo-400 uppercase font-mono font-bold block">Current Credit Balance</span>
                <span className="text-3xl font-display font-medium text-white my-2">{currentCreditsRemaining.toLocaleString()}</span>
                <div className="bg-slate-950 p-1.5 rounded font-mono text-[9px] text-gray-500">
                  Plan allowance: <strong>{currentPlan.creditsAllocated.toLocaleString()} credits</strong>
                </div>
              </div>

              <div className="p-4 bg-[#0a3a24]/10 border border-[#0d5c38]/25 rounded-xl text-center flex flex-col justify-between">
                <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold block">Simulated Overages (Unsynced)</span>
                {currentCreditsRemaining < 500 ? (
                  <span className="text-2xl font-display font-medium text-amber-400 my-2">Overage active</span>
                ) : (
                  <span className="text-2xl font-display font-medium text-emerald-400 my-2">Healthy</span>
                )}
                <div className="bg-slate-950 p-1.5 rounded font-mono text-[9px] text-zinc-500">
                  past-quota overage rate: <strong>${currentPlan.meteredEmailRate}/credit</strong>
                </div>
              </div>
            </div>

            {/* Simulated usage clickers */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono font-black tracking-widest text-[#818cf8] uppercase block font-bold">Simulate Outbound Account Operations Usage:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={runLeadsScrapeUsage}
                  className="p-3 bg-slate-950 border border-slate-850 hover:border-[#818cf8]/20 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white group-hover:text-amber-305">Scrape 120 Lead Domains</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight">Cost delta: -120 credits</span>
                  </div>
                  <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={runAICopywriteUsage}
                  className="p-3 bg-slate-950 border border-slate-850 hover:border-emerald-500/25 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white group-hover:text-emerald-350">Draft 40 Gemini Copywrites</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight">Cost delta: -40 credits</span>
                  </div>
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                </button>
              </div>

              {/* Reset or Restocking controls */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={resetCreditsAndRestore}
                  className="px-4 py-1.5 bg-slate-900 border border-gray-800 hover:border-gray-700 text-xs text-white hover:text-emerald-405 font-mono font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-provision Allowance
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentCreditsRemaining(p => p + 5000);
                    setCreditsPurchasedAdditional(p => p + 5000);
                  }}
                  className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-xs text-slate-950 font-mono font-black rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Purchase 5,000 topup credits
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: Active metering, SLA reports, triggers warning */}
          <div className="lg:col-span-6 bg-[#080d16] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold block border-b border-gray-900 pb-2">
                SaaS Metered Usage reports & Stripe Sync Logs
              </span>

              {/* Status alerts */}
              {apiThrottled ? (
                <div className="bg-rose-500/10 border border-rose-500/25 text-rose-450 p-3 rounded-lg flex items-start gap-2 text-xs font-sans animate-bounce">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">API Gateway throttled! Out of Credits</strong>
                    Your current credit balance is insufficient to continue autonomous scrapes. Upgrade to scale plan or top up to resume delivery hooks.
                  </div>
                </div>
              ) : currentCreditsRemaining < 1000 ? (
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-lg flex items-start gap-2 text-xs font-sans">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Credit Threshold warning (Level Amber)</strong>
                    You are approaching your plan limit capacity. Your next outbound batches may overflow onto metered payment schedules.
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/5 border border-emerald-500/15 text-emerald-400 p-3 rounded-lg flex items-start gap-2 text-xs font-sans">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Enterprise Stripe metering pipeline: STABLE</strong>
                    Wallet reserves are high. All active campaigns and scheduled cron-worker sync tasks are routing smoothly under normal quotas.
                  </div>
                </div>
              )}

              {/* Live metering synchronization logging */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-3 font-mono text-xs">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block font-bold border-b border-gray-900 pb-1">
                  Usage telemetry records ready for sync (Unreported)
                </span>
                
                <div className="space-y-1.5 leading-normal text-[11px] text-zinc-400">
                  <div className="flex justify-between">
                    <span>Active scraped lead records:</span>
                    <strong className="text-white">{meteredSalesSearchesRun} searches total</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed AI custom responses drafts:</span>
                    <strong className="text-white">{meteredOutreachDraftsRun} drafts total</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Stripe SubscriptionItem Key:</span>
                    <strong className="text-indigo-400">si_NxbR2EffectiveBuzzSI2</strong>
                  </div>
                  <div className="p-2 border border-dashed border-slate-850 rounded mt-1.5 leading-relaxed text-[10px] bg-slate-900/40 font-bold block">
                    <span className="text-[9px] text-[#818cf8] block font-mono uppercase">Node.js Sync Scheduler (Every 6 hrs):</span>
                    <code>npx tsx scripts/sync-stripe-metered-billing.ts --tenant=AcmeCorp</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-sans leading-relaxed flex items-center gap-1 bg-slate-950 px-3 py-2 rounded-lg border border-slate-900">
              <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              Webhooks sync balances dynamically to Stripe UsageRecord aggregations. Prevents loss of transactional revenue when limits are exceeded.
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NODEJS SDK API INTEGRATION CODE */}
      {activeTab === 'backend' && (
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl space-y-4 animate-feed">
          
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-bold block">
              Node.js Stripe billing controller logic (Production ready)
            </span>
            <button
              onClick={() => handleCopyText(`import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);\n// controller routes...`, 'sdk-code-copy')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-gray-800 rounded text-[10px] flex items-center gap-1 font-mono text-zinc-300 transition-colors cursor-pointer"
            >
              {copiedLabel === 'sdk-code-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLabel === 'sdk-code-copy' ? 'SDK Snippet Copied!' : 'Copy Code Snippet'}
            </button>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            This clean architecture code details how we interface with Stripe SDK. It encapsulates checkout creation, secure token verification, proration invoice checks, and usage report posting.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed max-h-[350px] overflow-y-auto text-sky-400 shadow-inner">
            <pre>{`import express from 'express';
import Stripe from 'stripe';
import { db } from './db';
import { stripe_customers, customer_subscriptions } from './db/schema';
import { eq } from 'drizzle-orm';

// Lazy client instantiation for high startup reliability
let stripeClient: Stripe | null = null;
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key, { apiVersion: '2025-02-15' });
  }
  return stripeClient;
}

// 1. Create a customer checkout portal session
export async function createCheckoutPortal(req: express.Request, res: express.Response) {
  try {
    const stripe = getStripe();
    const { tenantId, priceId } = req.body;

    const [customer] = await db.select().from(stripe_customers).where(eq(stripe_customers.tenant_id, tenantId)).limit(1);
    
    // Resolve Stripe checkout link
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: customer.stripe_customer_id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: \`https://effectivebuzz.com/billing/success?session_id={CHECKOUT_SESSION_ID}\`,
      cancel_url: 'https://effectivebuzz.com/billing/cancel',
    });

    res.json({ checkoutUrl: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// 2. Perform plan changes (proration compute)
export async function updateSubscriptionPlan(req: express.Request, res: express.Response) {
  try {
    const stripe = getStripe();
    const { tenantId, newPriceId } = req.body;

    const [subscription] = await db.select().from(customer_subscriptions).where(eq(customer_subscriptions.tenant_id, tenantId)).limit(1);
    
    const activeSub = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
    const updatedSub = await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      items: [{
        id: activeSub.items.data[0].id,
        price: newPriceId, // target pricing priceId
      }],
      proration_behavior: 'create_prorations', // lets stripe compute delta
    });

    res.json({ subscriptionId: updatedSub.id, current_status: updatedSub.status });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// 3. Register usages onto Stripe metered logs
export async function syncMeteredBillingUsage(recipientDetail: { subscriptionItemId: string; usageCount: number }) {
  try {
    const stripe = getStripe();
    
    const usageRecord = await stripe.subscriptionItems.createUsageRecord(
      recipientDetail.subscriptionItemId,
      {
        quantity: recipientDetail.usageCount,
        timestamp: Math.floor(Date.now() / 1000),
        action: 'set', // aggregates values cleanly
      }
    );
    return usageRecord;
  } catch (err: any) {
    console.error('Metered reporting failed:', err.message);
    throw err;
  }
}`}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
