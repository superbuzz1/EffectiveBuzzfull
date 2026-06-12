import React from 'react';
import { 
  MessageSquare, BrainCircuit, ListOrdered, 
  Wrench, Activity, ShieldCheck, TrendingUp, RefreshCw,
  GitMerge
} from 'lucide-react';

export default function ProductIterationFlywheel() {
  const steps = [
    {
      id: 1,
      title: 'Customer Feedback',
      icon: MessageSquare,
      status: 'active',
      description: 'Ingest raw qualitative and quantitative feedback from user interviews, support tickets, and direct requests.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/50'
    },
    {
      id: 2,
      title: 'Analyze Patterns',
      icon: BrainCircuit,
      status: 'active',
      description: 'Aggregate unstructured data into distinct themes. Identify recurring friction points and unmet ICP needs.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50'
    },
    {
      id: 3,
      title: 'Prioritize Features',
      icon: ListOrdered,
      status: 'active',
      description: 'Run themes through the prioritization matrix (Revenue Impact + Customer Impact - Engineering Effort). Lock the sprint.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50'
    },
    {
      id: 4,
      title: 'Build Improvements',
      icon: Wrench,
      status: 'active',
      description: 'Execute rapid 2-week engineering sprints. Deploy high-fidelity solutions targeting the prioritized root causes.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 5,
      title: 'Measure Adoption',
      icon: Activity,
      status: 'active',
      description: 'Track feature-specific telemetry. Validate if the shipped improvement actually altered user behavior.',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50'
    },
    {
      id: 6,
      title: 'Increase Retention',
      status: 'outcome',
      icon: ShieldCheck,
      description: 'Observe compounding effects on 30-day and 60-day cohort retention rates as product value aligns with user needs.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
      borderColor: 'border-rose-500/50'
    },
    {
      id: 7,
      title: 'Grow Revenue',
      icon: TrendingUp,
      status: 'outcome',
      description: 'Leverage improved retention (LTV) and new feature unlocks (Upsells) to drive net revenue retention above 100%.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 8,
      title: 'Repeat',
      icon: RefreshCw,
      status: 'continuous',
      description: 'Feed the expanded customer base and new revenue back into the top of the feedback engine. Accelerate the loop.',
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/20',
      borderColor: 'border-slate-500/50'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <GitMerge className="w-4 h-4" />
          The Growth Engine
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          Product Iteration Flywheel
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The continuous operational loop tying customer intelligence directly to product engineering and compound revenue growth.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative py-8">
        {/* Continuous Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-800"></div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isOutcome = step.status === 'outcome';
            const isContinuous = step.status === 'continuous';
            
            return (
              <div key={step.id} className="relative flex items-start gap-8 group">
                
                {/* Node */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step.bgColor} ${step.borderColor} transition-colors`}>
                    <Icon className={`w-6 h-6 ${step.color} transition-colors`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-5 rounded-xl border ${isOutcome ? 'bg-[#0b101b] border-emerald-900/30' : isContinuous ? 'bg-slate-900/30 border-slate-800/80' : 'bg-[#0b101b] border-slate-800/80 hover:border-slate-700'} transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold ${step.color}`}>
                      {step.title}
                    </h3>
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-900 text-slate-500`}>
                      {step.status}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
