import React from 'react';
import { 
  BarChart, MessageSquare, Wrench, DollarSign, 
  FlaskConical, RefreshCw, Activity, CalendarDays
} from 'lucide-react';

export default function WeeklyExecutionLoop() {
  const steps = [
    {
      id: 1,
      title: 'Weekly Metrics Review',
      icon: BarChart,
      status: 'analyze',
      description: 'Review the founder dashboard. Assess active contextual replies sent, MRR shifts, churn indicators, and demo volume.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50'
    },
    {
      id: 2,
      title: 'Customer Feedback Review',
      icon: MessageSquare,
      status: 'listen',
      description: 'Process incoming support tickets, onboarding friction logs, and churn exit interviews. Identify the core friction theme of the week.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/50'
    },
    {
      id: 3,
      title: 'Product Improvements',
      icon: Wrench,
      status: 'build',
      description: 'Ship the highest-ROI bug fix or feature unblock identified in the previous week. Deploy directly to the active cohort.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 4,
      title: 'Revenue Review',
      icon: DollarSign,
      status: 'monetize',
      description: 'Audit the conversion funnel. Did the latest product improvements unblock stalled trials or accelerate the demo-to-close rate?',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50'
    },
    {
      id: 5,
      title: 'Growth Experiments',
      icon: FlaskConical,
      status: 'scale',
      description: 'Launch one new acquisition test based on revenue insights. (e.g., Tweaking the cold email sequence, launching a new referral incentive).',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50'
    },
    {
      id: 6,
      title: 'Repeat',
      icon: RefreshCw,
      status: 'compound',
      description: 'Reset the loop. The output of the growth experiments becomes the input for next week\'s metrics review.',
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/20',
      borderColor: 'border-slate-500/50'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <CalendarDays className="w-4 h-4" />
          Operating Rhythm
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          Weekly Execution Loop
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The strict, repeatable weekly cadence connecting data, feedback, engineering, and revenue growth into a single continuous compounding cycle.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative py-8">
        {/* Continuous Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-800"></div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative flex items-start gap-8 group">
                
                {/* Node */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${step.bgColor} ${step.borderColor} transition-colors`}>
                    <Icon className={`w-6 h-6 ${step.color} transition-colors`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-5 rounded-xl border bg-[#0b101b] border-slate-800/80 hover:border-slate-700 transition-colors`}>
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
