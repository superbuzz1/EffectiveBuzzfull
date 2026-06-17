import React, { useState } from 'react';
import { 
  Cpu, Zap, Database, ArrowRight, ShieldCheck, 
  Activity, ArrowDownCircle, Coins, Clock, Box
} from 'lucide-react';

export default function AnthropicCachingOptimizer() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [stats, setStats] = useState({
    cacheHits: 4892,
    cacheMisses: 124,
    costSaved: 284.50,
    latencyReduction: 840
  });

  const runSimulation = () => {
    setIsSimulating(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setStats(prev => ({
        cacheHits: prev.cacheHits + Math.floor(Math.random() * 5),
        cacheMisses: prev.cacheMisses + (Math.random() > 0.8 ? 1 : 0),
        costSaved: prev.costSaved + 0.15,
        latencyReduction: prev.latencyReduction
      }));
      iterations++;
      if (iterations > 20) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 150);
  };

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <Box className="w-3 h-3" /> INFRASTRUCTURE OPTIMIZATION
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-orange-400" />
              Anthropic Prompt Caching
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              By caching the massive System Prompts (Knowledge Base, ICP definitions, and Persona traits) at the Anthropic API layer, we reduce token input costs by up to 50% and decrease LLM response latency.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 font-mono uppercase block mb-2">Total Cache Hits</span>
          <div className="text-3xl font-bold text-white tracking-tight">{stats.cacheHits.toLocaleString()}</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> +14% this week</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 font-mono uppercase block mb-2">Cost Saved (USD)</span>
          <div className="text-3xl font-bold text-emerald-400 tracking-tight">${stats.costSaved.toFixed(2)}</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ArrowDownCircle className="w-3 h-3" /> -48% LLM Spend</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 font-mono uppercase block mb-2">Avg. Latency Reduction</span>
          <div className="text-3xl font-bold text-orange-400 tracking-tight">{stats.latencyReduction}ms</div>
          <div className="text-xs text-orange-400/80 mt-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Faster replies</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-center relative overflow-hidden group cursor-pointer" onClick={runSimulation}>
          <div className={`absolute inset-0 bg-orange-500/10 transition-opacity ${isSimulating ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          <div className="relative z-10 flex flex-col items-center text-center">
            {isSimulating ? (
              <Activity className="w-8 h-8 text-orange-400 animate-pulse mb-2" />
            ) : (
              <Zap className="w-8 h-8 text-orange-400 mb-2" />
            )}
            <span className="text-sm font-bold text-white">Simulate Request</span>
            <span className="text-[10px] text-gray-400 mt-1">Generate dummy traffic</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden p-6 lg:p-8">
        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider font-mono">Caching Architecture</h3>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main flow line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 hidden md:block" />
          
          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8">
            
            {/* Step 1 */}
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-5 flex flex-col items-center text-center relative">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 mb-4 z-10">
                <Database className="w-5 h-5 text-gray-400" />
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Agent Context payload</h4>
              <p className="text-[10px] text-gray-400 bg-slate-950 p-2 rounded w-full font-mono text-left">
                System Prompt (14k tokens)<br/>
                Company Docs (45k tokens)<br/>
                Objection rules (8k tokens)
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col justify-center text-orange-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            {/* Step 2 (Cache) */}
            <div className="flex-1 bg-gradient-to-b from-orange-900/20 to-slate-900 border border-orange-500/30 rounded-xl p-5 flex flex-col items-center text-center relative shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              {isSimulating && <div className="absolute inset-0 bg-orange-400/5 animate-pulse rounded-xl" />}
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50 mb-4 z-10">
                <ShieldCheck className="w-5 h-5 text-orange-400" />
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Anthropic Cache Layer</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Stores the 67k static token prefix in Anthropic's high-speed memory for 5 minutes.
              </p>
              <div className="mt-4 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] text-orange-400 font-mono font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> TTL: 300s
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col justify-center text-emerald-400">
              <ArrowRight className="w-6 h-6" />
            </div>

            {/* Step 3 (Execution) */}
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-5 flex flex-col items-center text-center relative">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 mb-4 z-10">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-white font-bold text-sm mb-2">Dynamic Inference</h4>
              <p className="text-[10px] text-gray-400 bg-slate-950 p-2 rounded w-full font-mono text-left mb-2">
                User Reply (120 tokens)<br/>
                Current Date (5 tokens)
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                <Coins className="w-3 h-3" /> Billed only for 125 tokens
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ArrowUpRight icon component helper
function ArrowUpRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}
