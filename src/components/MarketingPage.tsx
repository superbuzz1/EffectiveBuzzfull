import React, { useState } from 'react';
import { ShieldCheck, Mail, Sparkles, TrendingUp, Users, Target, ArrowRight, CheckCircle2, Zap, DollarSign, Cpu } from 'lucide-react';

interface MarketingPageProps {
  onStartApp: () => void;
}

export default function MarketingPage({ onStartApp }: MarketingPageProps) {
  const [emailVolume, setEmailVolume] = useState<number>(5000);
  const [selectedPlan, setSelectedPlan] = useState<'growth' | 'professional' | 'enterprise'>('professional');

  // Pricing Calculation matching typical Stripe pricing bands
  const calculatePrice = () => {
    let base = 0;
    let ratePerThousand = 0;
    if (selectedPlan === 'growth') {
      base = 49;
      ratePerThousand = 15; // $15 per 1,000 emails
      return base + Math.floor((emailVolume / 1000) * ratePerThousand);
    } else if (selectedPlan === 'professional') {
      base = 149;
      ratePerThousand = 10;
      return base + Math.floor((emailVolume / 1000) * ratePerThousand);
    } else {
      base = 499;
      ratePerThousand = 6;
      return base + Math.floor((emailVolume / 1000) * ratePerThousand);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative text-center py-10 md:py-16 overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[200px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto space-y-6 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen AI Outbound Sales Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight leading-[1.12]">
            Turn Prospecting into <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Predictable Outbound Revenue
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            EffectiveBuzz combines deep web search filters, autonomous CRM leads qualifying networks, and real Gemini-powered copywriting to draft email campaigns that read like human dialog.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartApp}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-sm shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 group"
            >
              Open SaaS Platform Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-gray-800 hover:border-gray-700 text-gray-300 rounded-lg text-sm transition-all text-center"
            >
              Estimate Stripe Rates
            </a>
          </div>

          {/* Social Proof metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-gray-900 mt-10 text-center">
            <div>
              <span className="block text-2xl font-bold font-display text-white">4.2x</span>
              <span className="text-xs text-gray-400">Increase in Reply Rate</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-display text-white">12.5 hrs</span>
              <span className="text-xs text-gray-400">Saved Per Campaign</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-display text-white">&lt;0.5%</span>
              <span className="text-xs text-gray-400">Spam Complaint Margin</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-display text-white">100%</span>
              <span className="text-xs text-gray-400">Stripe RBAC Isolation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modular Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {[
          {
            icon: Target,
            title: "1. Autonomous Target Scraping",
            desc: "Queues autonomous scrapers that traverse business registries, public blog posts, and active social media footprints to context-score your recipient candidates.",
            badge: "Deep Grounding"
          },
          {
            icon: Cpu,
            title: "2. Google Gemini Orchestration",
            desc: "Utilizes the gemini-2.5-flash model on Express servers, combining historical custom templates and profile criteria to write hyper-focused sales letters.",
            badge: "Context API"
          },
          {
            icon: ShieldCheck,
            title: "3. Enterprise Tenant Security",
            desc: "Our architecture enforces absolute multitenant database row checks and multi-role RBAC scopes to keep sensitive outbound CRM records completely isolated.",
            badge: "Prisma RBAC"
          }
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl hover:border-gray-700 transition-all flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-slate-800 text-gray-300 px-2.5 py-0.5 rounded-full border border-gray-700">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-base font-display font-medium text-white">{feature.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                Production-configured and ready
              </div>
            </div>
          );
        })}
      </div>

      {/* Stripe Interactive Pricing Calculator Section */}
      <div id="pricing" className="bg-[#111827] border border-[#1f2937] rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-display font-medium text-white">Stripe Core Billing Rate Estimator</h2>
            <p className="text-xs text-gray-400">
              Calculate sliding variable outbound target volume costs and tier structures before executing checkout triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Left side controller */}
            <div className="space-y-6">
              {/* Plan Choice selector */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Step 1: Choose Subscription Tier</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'growth', label: 'Growth Plan', base: '$49/mo' },
                    { id: 'professional', label: 'Professional', base: '$149/mo' },
                    { id: 'enterprise', label: 'Enterprise', base: '$499/mo' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedPlan(tier.id as any)}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                        selectedPlan === tier.id
                          ? 'bg-emerald-500/10 border-emerald-500/60 text-white'
                          : 'bg-[#182235]/40 border-slate-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-semibold leading-none">{tier.label}</span>
                      <span className="text-[10px] font-mono text-emerald-400 mt-1">{tier.base} base</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for volume */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-gray-400 uppercase tracking-wider">Step 2: Monthly Outbound Target</span>
                  <span className="font-mono text-emerald-400 bg-slate-800/80 px-2 py-0.5 rounded border border-gray-700 font-semibold text-xs">
                    {emailVolume.toLocaleString()} targets / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={emailVolume}
                  onChange={(e) => setEmailVolume(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>1,000 / mo</span>
                  <span>25,000 / mo</span>
                  <span>50,000 / mo</span>
                </div>
              </div>
            </div>

            {/* Right side billing card overview */}
            <div className="bg-[#182235]/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#818cf8] font-semibold">
                  Estimated Stripe Cost Breakdown
                </span>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Base Tier Fee</span>
                    <span className="font-mono">
                      {selectedPlan === 'growth' && '$49.00'}
                      {selectedPlan === 'professional' && '$149.00'}
                      {selectedPlan === 'enterprise' && '$499.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Variable Outbound Tolls ({emailVolume / 1000}k targets)</span>
                    <span className="font-mono">
                      ${(emailVolume / 1000 * (selectedPlan === 'growth' ? 15 : selectedPlan === 'professional' ? 10 : 6)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-300 pb-2 border-b border-gray-800">
                    <span>Stripe Tax Processing (3.2%)</span>
                    <span className="font-mono">
                      ${(calculatePrice() * 0.032).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-white pt-1">
                    <span>Total Billable Sub-Total</span>
                    <span className="text-emerald-300 font-mono text-base font-bold">
                      ${(calculatePrice() * 1.032).toFixed(2)}<span className="text-xs text-gray-400 font-normal">/mo</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Automatic recurring Stripe Webhook syncs
                </div>
                <button
                  onClick={onStartApp}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Confirm Subscription & Initialize Console
                  <Zap className="w-3 h-3 fill-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Architecture teaser */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-display text-white font-medium">Under the Hood Architecture</h3>
            <p className="text-xs text-gray-400 mt-1">
              EffectiveBuzz runs on a robust production-class cluster topology designed for multi-tenant SaaS.
            </p>
          </div>
          <button
            onClick={onStartApp}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            Review Full Architecture Drawer
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-[#818cf8] uppercase tracking-wide block font-semibold mb-1 text-[10px]">Node & Express Router</span>
            REST API services run on Cloud Run containing modular routers, RBAC guards, and error middleware frameworks.
          </div>
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-emerald-400 uppercase tracking-wide block font-semibold mb-1 text-[10px]">Prisma & PostgreSQL</span>
            Standard relational schema tables isolated with secure database context, hosting indexes built for high-speed indexing.
          </div>
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-amber-400 uppercase tracking-wide block font-semibold mb-1 text-[10px]">Redis Caching Engine</span>
            Standard Memorystore key caches store API rate-limit slide matrices and temporary auth contexts.
          </div>
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-purple-400 uppercase tracking-wide block font-semibold mb-1 text-[10px]">Google Gemini API</span>
            The agent hooks up directly with gemini-2.5-flash server-side API proxy controllers for high-fidelity writing.
          </div>
        </div>
      </div>

    </div>
  );
}
