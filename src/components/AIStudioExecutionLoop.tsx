import React from 'react';
import { 
  CheckSquare, Download, Activity, Search, 
  Zap, BarChart3, RefreshCw, Cpu
} from 'lucide-react';

export default function AIStudioExecutionLoop() {
  const steps = [
    {
      id: 1,
      title: 'Finish AI Studio Output',
      icon: CheckSquare,
      status: 'complete',
      description: 'Finalize the current generation of structural documents, roadmaps, and architecture plans within the AI Studio environment.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/50'
    },
    {
      id: 2,
      title: 'Export All Reports',
      icon: Download,
      status: 'extract',
      description: 'Export all generated documentation into the company knowledge base (Notion, GitHub, etc.) to establish the canonical state.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50'
    },
    {
      id: 3,
      title: 'Create Current Status Report',
      icon: Activity,
      status: 'reality check',
      description: 'Log exact current telemetry: Active users, MRR, working features, and known bugs. Update the state payload.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50'
    },
    {
      id: 4,
      title: 'Run Reality-Based CTO Review',
      icon: Search,
      status: 'diagnose',
      description: 'Feed the Current Status Report into the Next Action Engine. Brutally isolate the singular highest ROI constraint.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/50'
    },
    {
      id: 5,
      title: 'Execute Highest-Priority Action',
      icon: Zap,
      status: 'build',
      description: 'Ignore all other roadmap items. Deploy engineering and growth resources exclusively against the single unblocking action.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
      borderColor: 'border-rose-500/50'
    },
    {
      id: 6,
      title: 'Measure Results',
      icon: BarChart3,
      status: 'observe',
      description: 'Track the impact of the deployed action on the core constraint. Did UX friction decrease? Did MRR increase?',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50'
    },
    {
      id: 7,
      title: 'Repeat Weekly',
      icon: RefreshCw,
      status: 'compound',
      description: 'Return to Step 3. Establish the new reality baseline and run the CTO review again. Continuous compounding execution.',
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/20',
      borderColor: 'border-slate-500/50'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6 text-center items-center">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Cpu className="w-4 h-4" />
          The Meta-Rhythm
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight leading-tight">
          AI Studio Execution Loop
        </h1>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
          The overarching operational rhythm for leveraging AI Studio to continuously unblock and scale the business, transitioning from planning to execution.
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
