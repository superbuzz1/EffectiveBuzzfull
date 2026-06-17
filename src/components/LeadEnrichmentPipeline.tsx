import React, { useState, useEffect } from 'react';
import { 
  Search, Database, Zap, Globe, Target, CheckCircle2, 
  RefreshCw, Loader2, Play, Users, ChevronRight, Filter, AlertTriangle
} from 'lucide-react';

export default function LeadEnrichmentPipeline() {
  const [isScraping, setIsScraping] = useState(false);
  const [pipelineCount, setPipelineCount] = useState(420);
  const [domainToScrape, setDomainToScrape] = useState('stripe.com');

  const [activeJobs] = useState([
    { id: 'job-1', domain: 'linear.app', status: 'Enriching', found: 42, source: 'Apollo.io' },
    { id: 'job-2', domain: 'vercel.com', status: 'Scraping', found: 18, source: 'Puppeteer Node' },
    { id: 'job-3', domain: 'supabase.com', status: 'Completed', found: 86, source: 'Clearbit' },
  ]);

  const [recentLeads] = useState([
    { name: 'Guillermo Rauch', title: 'CEO', company: 'Vercel', email: 'g@vercel.com', verified: true, score: 98 },
    { name: 'Karri Saarinen', title: 'CEO', company: 'Linear', email: 'karri@linear.app', verified: true, score: 95 },
    { name: 'Paul Copplestone', title: 'CEO', company: 'Supabase', email: 'paul@supabase.com', verified: true, score: 94 },
    { name: 'Patrick Collison', title: 'CEO', company: 'Stripe', email: 'patrick@stripe.com', verified: false, score: 88 }
  ]);

  const handleStartScrape = () => {
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
      setPipelineCount(prev => prev + 14);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Area */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3" /> PHASE 3: INTELLIGENCE ENGINE
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Database className="w-6 h-6 text-cyan-400" />
              Automated Domain Scraping & Enrichment
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Input a target domain and our distributed scraper network will extract decision-makers, verify their B2B emails via Clearbit/Apollo, and pipe them directly into your AI SDR outbound sequences.
            </p>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-6">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 font-mono uppercase block">Total Enriched Leads</span>
              <strong className="text-emerald-400 font-mono text-xl">{pipelineCount.toLocaleString()}</strong>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 font-mono uppercase block">API Cost Savings</span>
              <strong className="text-cyan-400 font-mono text-xl">84%</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input & Jobs */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" /> Initialize Scraper
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase mb-1.5 block">Target Domain or LinkedIn URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    value={domainToScrape}
                    onChange={(e) => setDomainToScrape(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 cursor-pointer hover:border-cyan-500/50 transition-colors">
                  <span className="block text-white text-xs font-bold mb-1">Clearbit API</span>
                  <span className="block text-[10px] text-gray-500">Firmographic enrich</span>
                </div>
                <div className="bg-slate-900 border border-cyan-500/50 rounded-lg p-3 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <span className="block text-white text-xs font-bold mb-1">Waterfall Enum</span>
                  <span className="block text-[10px] text-cyan-400">Apollo + Hunter + Web</span>
                </div>
              </div>

              <button 
                onClick={handleStartScrape}
                disabled={isScraping}
                className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isScraping 
                    ? 'bg-slate-800 text-gray-400 cursor-not-allowed' 
                    : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                }`}
              >
                {isScraping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isScraping ? 'Extraction Pipeline Active...' : 'Launch Enrichment Job'}
              </button>
            </div>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Active Background Jobs</h3>
            </div>
            <div className="divide-y divide-slate-800/50">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-4 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      job.status === 'Completed' ? 'bg-emerald-400' : 
                      job.status === 'Scraping' ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400 animate-pulse'
                    }`} />
                    <div>
                      <div className="text-sm font-bold text-white">{job.domain}</div>
                      <div className="text-[10px] text-gray-500 font-mono uppercase">{job.source}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">+{job.found} leads</div>
                    <div className="text-[10px] text-gray-500">{job.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Results Table */}
        <div className="lg:col-span-2">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden h-full">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Verified Lead Intelligence</h3>
                <p className="text-xs text-gray-500 mt-1">Real-time output from the enrichment waterfall pipeline.</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-md transition-colors flex items-center gap-2">
                <Filter className="w-3 h-3" /> Filter verified
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0b1120] text-xs uppercase font-mono text-gray-500 border-b border-slate-800">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Contact</th>
                    <th className="px-5 py-3 font-semibold">Company</th>
                    <th className="px-5 py-3 font-semibold">Email status</th>
                    <th className="px-5 py-3 font-semibold">ICP Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {recentLeads.map((lead, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{lead.title}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded-md border border-slate-700">
                          {lead.company}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-gray-300">{lead.email}</span>
                          {lead.verified ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                          )}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-1">
                          {lead.verified ? 'SMTP Confirmed' : 'Catch-all / Risky'}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden w-16">
                            <div 
                              className="h-full rounded-full bg-cyan-400"
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-cyan-400">{lead.score}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {isScraping && (
                    <tr className="bg-cyan-900/10 border-l-2 border-cyan-500">
                      <td colSpan={4} className="px-5 py-4 text-center">
                        <Loader2 className="w-5 h-5 text-cyan-400 animate-spin mx-auto mb-2" />
                        <div className="text-xs font-mono text-cyan-400">Extracting new nodes...</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex justify-end">
              <button className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 transition-colors">
                Export to CSV <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
