import React from 'react';
import { 
  Trophy, FileCheck2, UserPlus, Users, 
  TrendingUp, BarChart, Settings, ArrowDown, Waypoints
} from 'lucide-react';

export default function EarlyTractionRoadmap() {
  const steps = [
    {
      id: 1,
      title: 'First Paying Customer',
      icon: Trophy,
      status: 'completed',
      description: 'Secured the initial validation of willingness-to-pay (WTP) through a high-touch conversion call.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50'
    },
    {
      id: 2,
      title: 'Document Why They Bought',
      icon: FileCheck2,
      status: 'current',
      description: 'Conduct a post-mortem. Identify the core "aha!" moment, exact pain point solved, and winning messaging.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 3,
      title: 'Get Customer #2',
      icon: UserPlus,
      status: 'pending',
      description: 'Replicate the exact pitch used on Customer #1 to a near-identical persona within the beta cohort.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30'
    },
    {
      id: 4,
      title: 'Get Customer #3',
      icon: UserPlus,
      status: 'pending',
      description: 'Prove the process is repeatable. Three identical conversions establish a formal Ideal Customer Profile (ICP).',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30'
    },
    {
      id: 5,
      title: 'Get 10 Paying Customers',
      icon: Users,
      status: 'pending',
      description: 'Transition from unscalable 1:1 sales to repeatable outbound dogfooding and organic distribution mechanisms.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 6,
      title: 'Reach $1k MRR',
      icon: TrendingUp,
      status: 'pending',
      description: 'Optimize the pricing tier ratio between $49/mo (solo) and $99/mo (team) to hit the first major revenue milestone.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      id: 7,
      title: 'Analyze Retention',
      icon: BarChart,
      status: 'pending',
      description: 'Monitor the 30-day and 60-day cohort retention. Ensure the product stickiness holds post-conversion.',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30'
    },
    {
      id: 8,
      title: 'Improve Product',
      icon: Settings,
      status: 'pending',
      description: 'Feed retention analytics and ongoing customer interviews directly back into the engineering sprint cycles.',
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/10',
      borderColor: 'border-slate-500/30'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Waypoints className="w-4 h-4" />
          Strategic Timeline
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          Early Traction Roadmap
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The step-by-step sequential execution plan moving from the first manual sale to systemic, repeatable MRR and product iteration.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative py-8">
        {/* Continuous Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-800"></div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            
            return (
              <div key={step.id} className="relative flex items-start gap-8 group">
                
                {/* Node */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : isCurrent ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse' : 'bg-slate-900 border-slate-700 group-hover:border-slate-500 transition-colors'}`}>
                    <Icon className={`w-6 h-6 ${isCompleted ? 'text-amber-500' : isCurrent ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400 transition-colors'}`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-5 rounded-xl border ${isCurrent ? 'bg-emerald-950/10 border-emerald-900/50 shadow-lg shadow-emerald-900/10' : isCompleted ? 'bg-[#0b101b] border-amber-900/30' : 'bg-[#0b101b] border-slate-800/80'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold ${isCompleted ? 'text-white' : isCurrent ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {step.title}
                    </h3>
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded ${isCompleted ? 'bg-amber-500/10 text-amber-500' : isCurrent ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                      {step.status}
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${isCurrent ? 'text-slate-300' : 'text-slate-400'}`}>
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
