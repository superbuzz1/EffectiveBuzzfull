import React from 'react';
import { 
  Trophy, Users, DollarSign, Target, Activity, Rocket, Zap, Crown
} from 'lucide-react';

export default function PathToPMFRoadmap() {
  const milestones = [
    {
      id: 1,
      title: 'First Paying Customer',
      metric: '1 Customer',
      description: 'The hardest dollar to make. Validates that the problem is real and the solution has non-zero value.',
      icon: Trophy,
      status: 'completed',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 2,
      title: '10 Paying Customers',
      metric: '10 Customers',
      description: 'Validates that the first customer was not a fluke. Establishes the initial Ideal Customer Profile (ICP).',
      icon: Users,
      status: 'active',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50'
    },
    {
      id: 3,
      title: '$1,000 MRR',
      metric: '$1k MRR',
      description: 'The "Ramen Profitability" of validation. The acquisition motion is beginning to show repeatable patterns.',
      icon: DollarSign,
      status: 'pending',
      color: 'text-slate-400',
      bgColor: 'bg-slate-900',
      borderColor: 'border-slate-700'
    },
    {
      id: 4,
      title: '25 Paying Customers',
      metric: '25 Customers',
      description: 'The product is holding up to volume. Edge cases are smoothed out. Churn is the primary metric to defend.',
      icon: Target,
      status: 'pending',
      color: 'text-slate-400',
      bgColor: 'bg-slate-900',
      borderColor: 'border-slate-700'
    },
    {
      id: 5,
      title: '$5,000 MRR',
      metric: '$5k MRR',
      description: 'Sufficient capital to reinvest continuously into paid acquisition or developer resources. The flywheel spins faster.',
      icon: Activity,
      status: 'pending',
      color: 'text-slate-400',
      bgColor: 'bg-slate-900',
      borderColor: 'border-slate-700'
    },
    {
      id: 6,
      title: '50 Paying Customers',
      metric: '50 Customers',
      description: 'Statistically significant cohorts to run genuine growth experiments, A/B tests, and complex funnel optimizations.',
      icon: Rocket,
      status: 'pending',
      color: 'text-slate-400',
      bgColor: 'bg-slate-900',
      borderColor: 'border-slate-700'
    },
    {
      id: 7,
      title: '$10,000 MRR',
      metric: '$10k MRR',
      description: 'The golden milestone. The business is a self-sustaining entity with predictable revenue and acquisition costs.',
      icon: Zap,
      status: 'pending',
      color: 'text-slate-400',
      bgColor: 'bg-slate-900',
      borderColor: 'border-slate-700'
    },
    {
      id: 8,
      title: 'Product-Market Fit',
      metric: 'PMF',
      description: 'Growth becomes organic. The market pulls the product out of you. Focus shifts from survival strictly to scaling.',
      icon: Crown,
      status: 'pending',
      color: 'text-slate-400',
      bgColor: 'bg-slate-900',
      borderColor: 'border-slate-700'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Target className="w-4 h-4" />
          The Milestones
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          Path to Product-Market Fit
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The strict, sequential milestones required to scale from a single validation point to true Product-Market Fit.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative py-8">
        {/* Continuous Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-800"></div>

        <div className="space-y-8">
          {milestones.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isPending = step.status === 'pending';
            
            return (
              <div key={step.id} className="relative flex items-start gap-8 group">
                
                {/* Node */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step.bgColor} ${step.borderColor} transition-colors`}>
                    <Icon className={`w-6 h-6 ${step.color} transition-colors`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-5 rounded-xl border ${isCompleted ? 'bg-[#0b101b] border-emerald-900/30' : isActive ? 'bg-blue-900/10 border-blue-900/50' : 'bg-[#0b101b] border-slate-800/80 hover:border-slate-700'} transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold ${isCompleted ? 'text-emerald-400' : isActive ? 'text-blue-400' : 'text-slate-300'}`}>
                      {step.title}
                    </h3>
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded ${isCompleted ? 'bg-emerald-500/10 text-emerald-500' : isActive ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-900 text-slate-500'}`}>
                      {step.metric}
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
