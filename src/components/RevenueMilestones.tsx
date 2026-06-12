import React from 'react';
import { 
  DollarSign, Users, Target, Rocket, 
  Crown, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';

export default function RevenueMilestones() {
  const milestones = [
    {
      id: 1,
      title: 'First Paying Customer',
      metric: 'Validation',
      status: 'completed',
      description: 'Proving the willingness-to-pay hypothesis. Moving from "nice to have" to "I will pay for this."',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 2,
      title: '$1,000 MRR',
      metric: 'Traction',
      status: 'current',
      description: 'Establishing a baseline of predictable recurring revenue. Surviving the initial churn barrier.',
      icon: DollarSign,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50'
    },
    {
      id: 3,
      title: '10 Customers',
      metric: 'Repeatability',
      status: 'upcoming',
      description: 'Proving that the acquisition channel works predictably outside of founder-led network sales.',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50'
    },
    {
      id: 4,
      title: '$5,000 MRR',
      metric: 'Scale',
      status: 'upcoming',
      description: 'Systematizing the engine. Paid acquisition models become mathematically viable with an established LTV.',
      icon: Rocket,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50'
    },
    {
      id: 5,
      title: 'Product-Market Fit',
      metric: 'Escape Velocity',
      status: 'upcoming',
      description: 'Retention plateau established. Customers refer others organically. The product is pulled from the market rather than pushed.',
      icon: Crown,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
      borderColor: 'border-rose-500/50'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Target className="w-4 h-4" />
          The Milestones
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          Roadmap to Product-Market Fit
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The sequential revenue stages of a SaaS startup. Skipping stages leads to premature scaling. Focus entirely on the immediate next milestone.
        </p>
      </div>

      <div className="py-8">
        <div className="space-y-6">
          {milestones.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative group">
                
                <div className={`p-6 rounded-2xl border bg-[#0b101b] ${
                  step.status === 'completed' ? 'border-emerald-500/30' : 
                  step.status === 'current' ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] shadow-amber-500/10' : 
                  'border-slate-800'
                } transition-all flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden`}
                >
                  {/* Current Active Indicator */}
                  {step.status === 'current' && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 animate-pulse"></div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    step.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                    step.status === 'current' ? 'bg-amber-500/10 border-amber-500 text-amber-400' :
                    'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                       <h3 className={`text-xl font-bold tracking-tight ${
                        step.status === 'completed' ? 'text-white' :
                        step.status === 'current' ? 'text-amber-400' :
                        'text-slate-400'
                       }`}>
                         {step.title}
                       </h3>
                       <div className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                        step.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        step.status === 'current' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' :
                        'bg-slate-900 text-slate-500 border border-slate-800'
                       }`}>
                         {step.metric}
                       </div>
                    </div>
                    <p className={`text-sm leading-relaxed max-w-3xl ${
                      step.status === 'completed' ? 'text-slate-400' :
                      step.status === 'current' ? 'text-amber-100/80' :
                      'text-slate-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Status Badges */}
                  <div className="shrink-0 hidden md:block">
                     {step.status === 'completed' && (
                       <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                         <CheckCircle2 className="w-4 h-4" /> Done
                       </span>
                     )}
                     {step.status === 'current' && (
                       <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-widest bg-amber-400 px-3 py-1.5 rounded-lg">
                         <Zap className="w-4 h-4" /> Next Target
                       </span>
                     )}
                  </div>

                </div>

                {/* Connector Line */}
                {index < milestones.length - 1 && (
                  <div className="flex items-center justify-center h-8 relative">
                    <div className={`w-px h-full ${
                      step.status === 'completed' ? 'bg-emerald-500/50' :
                      'bg-slate-800'
                    }`}></div>
                    <ChevronRight className={`absolute rotate-90 w-4 h-4 ${
                      step.status === 'completed' ? 'text-emerald-500' :
                      'text-slate-700'
                    }`} />
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
