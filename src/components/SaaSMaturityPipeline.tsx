import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, PlayCircle, Milestone, 
  Search, FileText, Code2, ShieldAlert, Rocket, 
  Users, DollarSign, Award, ChevronRight, Zap, 
  HelpCircle, Activity, ArrowRight, Layers
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  type: 'prompt' | 'business' | 'revenue';
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  pithyDefinition: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  deliverables?: string[];
}

export default function SaaSMaturityPipeline() {
  const [filter, setFilter] = useState<'all' | 'technical' | 'commercial'>('all');
  const [selectedStageId, setSelectedStageId] = useState<string>('c2-10');

  const stages: Stage[] = [
    {
      id: 'p36',
      name: 'Prompt 36 Complete',
      type: 'prompt',
      status: 'completed',
      description: 'Validation of early infrastructure setup, telemetry tracking, and basic architecture hooks.',
      pithyDefinition: 'Infrastructure Baseline Established',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Telemetry collection hooks', 'Global routing system', 'Early-stage state definitions']
    },
    {
      id: 'p37-1',
      name: 'Prompt 37.1 Repository Audit',
      type: 'prompt',
      status: 'completed',
      description: 'Comprehensive screening of existing code repository to isolate architectural debris and identify refactoring vectors.',
      pithyDefinition: 'Source Code Intelligence Map',
      icon: Search,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Asset cleanups', 'TypeScript validation checks', 'Redundancy isolation analysis']
    },
    {
      id: 'p37-2',
      name: 'Prompt 37.2 Closed Beta Execution Plan',
      type: 'prompt',
      status: 'completed',
      description: 'Designing the onboarding funnel and target cohort selectors for the first group of early adopters.',
      pithyDefinition: 'Strategic Intake Protocol',
      icon: FileText,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Target user profiling', 'Beta cohort limits', 'Engagement tracking parameters']
    },
    {
      id: 'p37-3',
      name: 'Prompt 37.3 Launch Sprint Generator',
      type: 'prompt',
      status: 'completed',
      description: 'A smart agent-guided launcher creating surgical developer sprint sequences based on repository gaps.',
      pithyDefinition: 'Automated Intent-to-Task Engine',
      icon: Layers,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Work breakdown structure', 'Resource allotment guidance', 'Pre-launch critical-path roadmap']
    },
    {
      id: 'p37-4',
      name: 'Prompt 37.4 Sprint 1 Tasks',
      type: 'prompt',
      status: 'completed',
      description: 'Defining and scheduling discrete technical, customer, and product tasks to establish operational momentum.',
      pithyDefinition: 'Development Backbone Defined',
      icon: Code2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Jira-style task parameters', 'Definition of Done guidelines', 'Velocity limits']
    },
    {
      id: 'p37-5',
      name: 'Prompt 37.5 Task Prioritization',
      type: 'prompt',
      status: 'completed',
      description: 'Allocating human bandwidth strictly to tasks mitigating maximum risk, deferring all feature-noise suggestions.',
      pithyDefinition: 'Brutal Bottleneck Isolation',
      icon: ShieldAlert,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Complexity mapping matrix', 'Context-switching cost minimizer']
    },
    {
      id: 'p37-6',
      name: 'Prompt 37.6 Implementation Specification',
      type: 'prompt',
      status: 'completed',
      description: 'Detailed code architecture specifications, design patterns, and entity relationships before typing production lines.',
      pithyDefinition: 'Architectural Blueprint Protocol',
      icon: FileText,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Type declarations', 'Model schemas', 'Data-security assertions']
    },
    {
      id: 'p37-7',
      name: 'Prompt 37.7 Production Code',
      type: 'prompt',
      status: 'completed',
      description: 'Deploying robust, modular, and non-simulated TypeScript code adhering to state-persistence and latency limits.',
      pithyDefinition: 'Syntactically Precise Execution',
      icon: Code2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Clean, modular components', 'Durable cloud-sync systems']
    },
    {
      id: 'p37-8',
      name: 'Prompt 37.8 Code Review',
      type: 'prompt',
      status: 'completed',
      description: 'A strict multi-layer code sanity audit targeting memory leak prevention, security holes, and code formatting violations.',
      pithyDefinition: 'Zero-Tolerance Quality Check',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Automated linter validation', 'Complexity reviews']
    },
    {
      id: 'p37-9',
      name: 'Prompt 37.9 QA Validation',
      type: 'prompt',
      status: 'completed',
      description: 'Validating end-to-end functionality of user-flows to ensure that the core willingness-to-pay feature works cleanly.',
      pithyDefinition: 'Deterministic UX Testing',
      icon: ShieldAlert,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Regression test mapping', 'Boundary value assertions']
    },
    {
      id: 'p38-0',
      name: 'Prompt 38.0 Staging Readiness',
      type: 'prompt',
      status: 'completed',
      description: 'Packaging assets, environment variable blueprints, and deployment scripts to assure zero-downtime server operations.',
      pithyDefinition: 'Release Package Compilation',
      icon: Milestone,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Docker configurations', 'Asset optimization wrappers']
    },
    {
      id: 'p38-1',
      name: 'Prompt 38.1 Staging Deployment',
      type: 'prompt',
      status: 'completed',
      description: 'Deploying to a secure production-identical server. Resolving DNS records and initial reverse-proxy routes.',
      pithyDefinition: 'Environment Ingress Integrity',
      icon: Rocket,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['SSL auto-renew protocols', 'Container health metrics checks']
    },
    {
      id: 'p38-2',
      name: 'Prompt 38.2 Closed Beta Review',
      type: 'prompt',
      status: 'completed',
      description: 'Aggregating quantitative sign-up rates, API latencies, and qualitative user friction to isolate retention holes.',
      pithyDefinition: 'First Cohort Reality Sync',
      icon: Search,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Telemetry log scans', 'Support-ticket priority triage']
    },
    {
      id: 'p38-3',
      name: 'Prompt 38.3 Closed Beta Launch',
      type: 'prompt',
      status: 'completed',
      description: 'Unlocking platform access gates and handoff to target sales SDRs to prove immediate value.',
      pithyDefinition: 'Gate Opening Protocol',
      icon: Rocket,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Transactional email triggers', 'Live user-activity alerting']
    },
    {
      id: 'paying-cust-1',
      name: 'First Paying Customer',
      type: 'revenue',
      status: 'completed',
      description: 'The critical transition step where the first customer enters a credit card and begins active paid subscription.',
      pithyDefinition: 'Willingness-to-Pay Validated',
      icon: Award,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deliverables: ['Stripe billing live integration', 'Value-receipt handoff', 'Qualitative Post-Mortem log']
    },
    {
      id: 'c2-10',
      name: 'Customer #2–#10',
      type: 'business',
      status: 'current',
      description: 'Unlocking scalable customer acquisition and finding standard, repeatable channels beyond direct founder networks.',
      pithyDefinition: 'Scaling Initial Cohort Acquisition',
      icon: Users,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50',
      deliverables: ['Chrome Extension seamless integration', 'Targeted cold sequences outbound engine', 'Interactive user analytics capture']
    },
    {
      id: 'mrr1k',
      name: '$1,000 MRR Milestone',
      type: 'revenue',
      status: 'upcoming',
      description: 'Proving sustained baseline commercial velocity and moving toward a predictable, healthy SaaS run-rate.',
      pithyDefinition: 'Predictable Growth Runway',
      icon: DollarSign,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/30',
      deliverables: ['Reinvestment velocity formulas', 'Expansion pricing models', 'Anti-churn defense scripts']
    }
  ];

  const filteredStages = stages.filter(stage => {
    if (filter === 'technical') return stage.type === 'prompt';
    if (filter === 'commercial') return stage.type !== 'prompt';
    return true;
  });

  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[stages.length - 2];

  const completedCount = stages.filter(s => s.status === 'completed').length;
  const totalCount = stages.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4" />
            Operational Cadence Map
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            SaaS Maturity & Prompt Execution Pipeline
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            The hyper-detailed, step-by-step roadmap tracing the product from primary codebase repository audits up to the pivotal $1,000 MRR target. No visual abstractions, just strict process synchronization.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 px-5 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
              Pipeline Convergence
            </div>
            <div className="text-xl font-black text-emerald-400 flex items-center gap-3">
              <span>{completedCount} / {totalCount} Done</span>
              <span className="text-sm font-normal text-slate-400">({progressPercent}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-colors ${
              filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Tracks
          </button>
          <button 
            onClick={() => setFilter('technical')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-colors ${
              filter === 'technical' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Technical Prompts Only
          </button>
          <button 
            onClick={() => setFilter('commercial')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-md transition-colors ${
              filter === 'commercial' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Commercial Goals Only
          </button>
        </div>
        
        <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Completed
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span> Target
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/50"></span> Coming
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Progression Tree / Stepper */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5 shadow-xl">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Milestone className="w-4 h-4 text-indigo-400" /> Progression Pipeline Flow
            </h2>
            
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredStages.map((stage, idx) => {
                const StageIcon = stage.icon;
                const isSelected = selectedStageId === stage.id;
                
                return (
                  <div 
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3.5 relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-indigo-950/30 border-indigo-500 shadow-md translate-x-1' 
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    {/* Status side borders */}
                    <div className={`absolute top-0 left-0 w-1 h-full ${
                      stage.status === 'completed' ? 'bg-emerald-500' :
                      stage.status === 'current' ? 'bg-amber-500' : 'bg-indigo-500/20'
                    }`} />

                    {/* Stage icon circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                      stage.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      stage.status === 'current' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      <StageIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[13px] font-bold tracking-tight block ${
                          stage.status === 'completed' ? 'text-slate-200' :
                          stage.status === 'current' ? 'text-amber-400 font-extrabold' : 'text-slate-500'
                        }`}>
                          {stage.name}
                        </span>
                        
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                            stage.type === 'prompt' ? 'bg-slate-900 text-indigo-400 border border-slate-800' : 'bg-slate-900 text-emerald-400 border border-slate-800'
                          }`}>
                            {stage.type}
                          </span>
                        </div>
                      </div>
                      
                      <span className="text-[11px] text-slate-400 block mt-1 truncate max-w-md font-sans">
                        {stage.pithyDefinition}
                      </span>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${
                      isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-700 group-hover:text-slate-500'
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Deep-Dive Card Spec Panel */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${selectedStage.bgColor} rounded-bl-full -z-10 opacity-30`}></div>
            
            <div className="flex items-center gap-3.5 mb-5 border-b border-slate-800 pb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedStage.bgColor} ${selectedStage.borderColor}`}>
                {React.createElement(selectedStage.icon, { className: `w-6 h-6 ${selectedStage.color}` })}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-0.5">Stage Specification Profile</span>
                <h2 className="text-lg font-black text-white leading-tight">{selectedStage.name}</h2>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block mb-1">State Definition</span>
                <p className="text-slate-300 leading-relaxed font-sans">{selectedStage.pithyDefinition}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block mb-1">Functional Impact</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{selectedStage.description}</p>
              </div>

              {selectedStage.deliverables && (
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block mb-2">Core Deliverables & Assertions</span>
                  <ul className="space-y-2">
                    {selectedStage.deliverables.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">Execution Status</span>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  selectedStage.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  selectedStage.status === 'current' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' :
                  'bg-slate-904 text-slate-500 border border-slate-800'
                }`}>
                  {selectedStage.status}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Active Goal Alert Callout */}
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <div className="flex gap-3.5">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-mono font-black text-amber-400 uppercase tracking-wider mb-1">CONCURRENT CONSTRAINTS TRIGGER</h3>
                <p className="text-xs text-amber-100/80 leading-relaxed">
                  We are actively navigating the <strong className="text-white font-semibold">Customer #2–#10</strong> onboarding milestone. The focus remains exclusively on converting SDRs through high-touch white-glove installations.
                </p>
              </div>
            </div>
          </section>
        </div>

      </div>

    </div>
  );
}
