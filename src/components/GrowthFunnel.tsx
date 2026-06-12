import React from 'react';
import { 
  Users, DollarSign, Activity, Repeat, 
  TrendingUp, ChevronDown, Filter
} from 'lucide-react';

export default function GrowthFunnel() {
  const steps = [
    {
      id: 1,
      title: 'Users',
      metric: 'Acquisition',
      description: 'Getting people to try the product. Top of funnel metrics, signups, and active beta testers.',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50',
      width: 'w-full max-w-4xl'
    },
    {
      id: 2,
      title: 'Paying Customers',
      metric: 'Conversion',
      description: 'Converting free users into dollars. Proving the core "Willingness to Pay" hypothesis.',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50',
      width: 'w-11/12 max-w-3xl'
    },
    {
      id: 3,
      title: 'MRR',
      metric: 'Predictability',
      description: 'Establishing a predictable baseline. Moving from one-off sales to monthly recurring revenue.',
      icon: Activity,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50',
      width: 'w-5/6 max-w-2xl'
    },
    {
      id: 4,
      title: 'Retention',
      metric: 'Churn Defense',
      description: 'Keeping the MRR you fought to acquire. Solving core UX friction and delivering continuous sticky value.',
      icon: Repeat,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50',
      width: 'w-3/4 max-w-xl'
    },
    {
      id: 5,
      title: 'Growth',
      metric: 'Scale & Compounding',
      description: 'Pouring fuel on the fire. Reinvesting MRR into paid channels with a profitable LTV/CAC ratio.',
      icon: TrendingUp,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
      borderColor: 'border-rose-500/50',
      width: 'w-2/3 max-w-lg'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Filter className="w-4 h-4" />
          The Revenue Engine
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          Core Growth Funnel
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The sequential stages of SaaS maturation. You cannot optimize the next tier of the funnel until the current tier is strictly validated.
        </p>
      </div>

      {/* Funnel Layout */}
      <div className="flex flex-col items-center py-8 space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          
          return (
            <React.Fragment key={step.id}>
              {/* Funnel Layer */}
              <div 
                className={`${step.width} p-5 md:p-6 rounded-2xl border bg-[#0b101b] ${step.borderColor} shadow-lg transition-transform hover:scale-[1.01] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6 relative overflow-hidden group`}
              >
                {/* Background Accent */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${step.bgColor.replace('/20', '')}`}></div>

                {/* Node Icon */}
                <div className="relative z-10 shrink-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step.bgColor} ${step.borderColor}`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:gap-4 gap-2">
                    <h3 className={`text-xl font-black tracking-tight ${step.color}`}>
                      {step.title}
                    </h3>
                    <div className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${step.bgColor} ${step.color} border border-transparent group-hover:${step.borderColor} transition-colors inline-block`}>
                      {step.metric}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow downwards (except after last item) */}
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center h-8">
                  <ChevronDown className="w-6 h-6 text-slate-600 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
