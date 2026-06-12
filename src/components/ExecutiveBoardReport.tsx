import React, { useState } from 'react';
import { 
  Users, BarChart3, ShieldAlert, Sparkles, TrendingUp, Cpu, 
  Settings, DollarSign, Activity, FileText, CheckCircle2, 
  ArrowRight, Landmark, RefreshCw, AlertTriangle, Shield, Check, Scale, BookOpen, ChevronRight
} from 'lucide-react';

export default function ExecutiveBoardReport() {
  const [activeSection, setActiveSection] = useState<number>(8);
  const [metricsTab, setMetricsTab] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [reportInputs, setReportInputs] = useState({
    annualRecurringRevenue: 1248000,
    salesPipeline: 4850000,
    logoChurnPercentage: 0.72,
    customerHealthScore: 88,
    dailyActiveUsers: 68,
    monthlyApisLogged: 4200000,
    infrastructureCosts: 12412,
  });

  const totalCalculatedRevenue = reportInputs.annualRecurringRevenue;
  const logoChurnAmount = reportInputs.logoChurnPercentage;
  const pipeValue = reportInputs.salesPipeline;
  const scoreFactor = Math.floor((reportInputs.customerHealthScore + reportInputs.dailyActiveUsers) / 2);
  const totalModelCost = Math.round(reportInputs.monthlyApisLogged * 0.00186);

  // Computed metrics
  const monthlyRecurringRevenue = Math.round(totalCalculatedRevenue / 12);
  const directProfitMargin = Math.round(((totalCalculatedRevenue - (reportInputs.infrastructureCosts * 12 + totalModelCost * 12)) / totalCalculatedRevenue) * 100);

  const sections = [
    { id: 8, title: 'SECTION 8: CEO & Board 15 Key Metrics', icon: BarChart3, role: 'CEO & Board Advisor' },
    { id: 1, title: 'SECTION 1: Executive Summary', icon: Landmark, role: 'Chief Executive Officer (CEO)' },
    { id: 2, title: 'SECTION 2: Top 5 Risks', icon: ShieldAlert, role: 'Chief Operating Officer (COO)' },
    { id: 3, title: 'SECTION 3: Top 5 Opportunities', icon: Sparkles, role: 'Chief Revenue Officer (CRO)' },
    { id: 4, title: 'SECTION 4: Revenue & Pipeline', icon: DollarSign, role: 'Chief Financial Officer (CFO)' },
    { id: 5, title: 'SECTION 5: Product & AI Analytics', icon: Cpu, role: 'Chief Product Officer (CPO)' },
    { id: 6, title: 'SECTION 6: Engineering & Infrastructure', icon: Activity, role: 'Chief Technology Officer (CTO)' },
    { id: 7, title: 'SECTION 7: Recommended Actions', icon: CheckCircle2, role: 'Executive Leadership Team (ELT)' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-emerald-500/5 to-transparent border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
                Enterprise Executive Room
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Prepared: Q2 Board of Directors Meeting</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-display">
              EffectiveBuzz Q2 Board-Ready Report Dashboard
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Simulate enterprise metrics and inspect the co-signed strategic outcomes from the Chief Executive Officer, Chief Technology Officer, Chief Revenue Officer, Chief Financial Officer, Chief Product Officer, and Chief Operating Officer.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs font-mono text-emerald-400">
            <Landmark className="w-4 h-4 text-emerald-400" />
            <span>Scope: Confidential / Board Review</span>
          </div>
        </div>
      </div>

      {/* Slide Interactive Inputs & Live Impact Telemetry */}
      <div className="bg-[#111827] border border-[#1f2937] p-5 rounded-xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2.5">
          <Settings className="w-5 h-5 text-indigo-400" />
          <div>
            <h4 className="text-sm font-semibold text-white font-display">Interactive Operational & Financial Inputs</h4>
            <p className="text-[10px] text-gray-400 font-mono">Modify live operational metrics to see how they impact the co-signed board dashboard metrics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* ARR Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase block">Annual Recurring Revenue (ARR):</label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400">$</span>
              <input
                type="number"
                value={reportInputs.annualRecurringRevenue}
                onChange={(e) => setReportInputs(prev => ({ ...prev, annualRecurringRevenue: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-gray-800 p-1.5 rounded text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-gray-500 block font-mono">Monthly Run-rate: ${(monthlyRecurringRevenue).toLocaleString()} MRR</span>
          </div>

          {/* Active Sales Pipeline Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase block">Sales Pipeline (Weighted):</label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400">$</span>
              <input
                type="number"
                value={reportInputs.salesPipeline}
                onChange={(e) => setReportInputs(prev => ({ ...prev, salesPipeline: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-gray-800 p-1.5 rounded text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-gray-500 block font-mono">Pipeline-to-ARR: {(pipeValue / Math.max(1, totalCalculatedRevenue)).toFixed(1)}x coverage</span>
          </div>

          {/* Churn Rate Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase block">Monthly Logo Churn (%):</label>
            <input
              type="text"
              value={reportInputs.logoChurnPercentage}
              onChange={(e) => setReportInputs(prev => ({ ...prev, logoChurnPercentage: parseFloat(e.target.value) || 0 }))}
              className="w-full bg-slate-950 border border-gray-800 p-1.5 rounded text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
            />
            <span className="text-[9px] text-gray-500 block font-mono">Sub-1% denotes upper quartile</span>
          </div>

          {/* Infrastructure Costs Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-gray-400 uppercase block">Monthly Cloud Ops ($):</label>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400">$</span>
              <input
                type="number"
                value={reportInputs.infrastructureCosts}
                onChange={(e) => setReportInputs(prev => ({ ...prev, infrastructureCosts: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-950 border border-gray-800 p-1.5 rounded text-xs font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <span className="text-[9px] text-gray-500 block font-mono">Est. Gross Profit: {directProfitMargin}%</span>
          </div>
        </div>

        {/* Mini Slider Controls for Product/AI Usage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t border-gray-800/60">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">Customer Health Index:</span>
              <span className="text-white font-bold">{reportInputs.customerHealthScore}/100</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="1"
              value={reportInputs.customerHealthScore}
              onChange={(e) => setReportInputs(prev => ({ ...prev, customerHealthScore: parseInt(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">Product Activity Run Rate (DAU/MAU):</span>
              <span className="text-white font-bold">{reportInputs.dailyActiveUsers}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              step="1"
              value={reportInputs.dailyActiveUsers}
              onChange={(e) => setReportInputs(prev => ({ ...prev, dailyActiveUsers: parseInt(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-indigo-400"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-gray-400 uppercase">AI Sequences / Logged API Calls:</span>
              <span className="text-white font-bold">{(reportInputs.monthlyApisLogged / 1000000).toFixed(1)}M / mo</span>
            </div>
            <input
              type="range"
              min="500000"
              max="15000000"
              step="250000"
              value={reportInputs.monthlyApisLogged}
              onChange={(e) => setReportInputs(prev => ({ ...prev, monthlyApisLogged: parseInt(e.target.value) }))}
              className="w-full h-1 bg-slate-950 rounded appearance-none cursor-pointer accent-teal-400"
            />
          </div>
        </div>
      </div>

      {/* Main Board deck panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-gray-900 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
            Report Chapters
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {sections.map((sec) => {
              const SecIcon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                    activeSection === sec.id
                      ? 'bg-[#111827] border-indigo-500/50 text-white shadow-lg'
                      : 'bg-transparent border-slate-900 text-gray-400 hover:bg-[#111827]/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <SecIcon className={`w-4 h-4 ${activeSection === sec.id ? 'text-indigo-400' : 'text-gray-500'}`} />
                    <span className="text-xs font-bold font-display">{sec.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                    <span>Custodian: {sec.role}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-slate-950 border border-gray-900 rounded-xl space-y-2.5 font-mono text-[10.5px]">
            <span className="text-[9px] text-[#818cf8] uppercase tracking-wider font-bold block">Board Verification Status</span>
            <div className="flex justify-between items-center text-zinc-400 border-b border-gray-900 pb-1.5">
              <span>GDPR Safe Pod:</span>
              <span className="text-emerald-400 font-bold">Frankfurt AWS</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400 border-b border-gray-900 pb-1.5">
              <span>SLA Target:</span>
              <span className="text-emerald-400 font-bold">99.99%</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Report Security:</span>
              <span className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-indigo-300 font-bold">Classified</span>
            </div>
          </div>
        </div>

        {/* Content slide viewport */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] p-5 lg:p-6 rounded-xl shadow-xl space-y-6">
          
          {/* Header of specific slide */}
          <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-mono font-bold uppercase tracking-wider border border-amber-500/20">
                  Secretariat Document
                </span>
                <span className="text-xs font-mono text-indigo-300">Chapter {activeSection} of 8</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display mt-1">
                {sections.find(s => s.id === activeSection)?.title}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono text-gray-500 uppercase block">OWNER / PRESENTING</span>
              <strong className="text-xs font-mono text-emerald-400 block mt-0.5">
                {sections.find(s => s.id === activeSection)?.role}
              </strong>
            </div>
          </div>

          {/* Section Render Viewports */}
          {activeSection === 8 && (
            <div className="space-y-6">
              {/* Strategic Context from Board Advisor */}
              <div className="p-4 bg-indigo-950/15 border border-indigo-900/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-indigo-400">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-sm font-semibold font-display">Advisor Board-Deck Memo: The 15 SaaS Guardrails</h4>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  "Members of the Board, our top line run-rate is protected by highly efficient capital recovery dynamics. To sustain high-multiple valuation metrics, we track 15 key operational/financial indicators grouped by reporting rhythm—Daily Operational Pulse, Weekly Pipeline Yields, and Monthly Financial Standings."
                </p>
              </div>

              {/* Dashboard Tab Selector */}
              <div className="flex border-b border-slate-800 font-mono text-xs">
                {[
                  { id: 'daily', label: 'Daily Pulse Dashboard', desc: 'Real-time actions & telemetry' },
                  { id: 'weekly', label: 'Weekly Growth Dashboard', desc: 'Mid-term velocity & yield' },
                  { id: 'monthly', label: 'Monthly Board Ledger', desc: 'Financial health & core multipliers' }
                ].map((mTab) => (
                  <button
                    key={mTab.id}
                    onClick={() => setMetricsTab(mTab.id as any)}
                    className={`flex-1 pb-3 text-center transition-all cursor-pointer border-b-2 ${
                      metricsTab === mTab.id
                        ? 'border-indigo-500 text-white font-bold'
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span className="block text-xs">{mTab.label}</span>
                    <span className="block text-[9px] text-gray-500 font-normal mt-0.5">{mTab.desc}</span>
                  </button>
                ))}
              </div>

              {/* Render Selected Dashboard Tab */}
              <div className="space-y-4 animate-fadeIn">
                
                {/* DAILY METRICS DASHBOARD */}
                {metricsTab === 'daily' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-gray-900 font-mono text-[10.5px]">
                      <span className="text-zinc-500 uppercase">SYSTEM STATUS TRACKING STATUS</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        LIVE INSTANT SYNC ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Metric 1: Daily Active Users */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-indigo-500/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">1. Daily Engagement Level (DAU/MAU)</span>
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 rounded text-[9px] font-bold">DAILY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">{reportInputs.dailyActiveUsers}% / mo</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Tracks of overall monthly subscriber cohort who access the platform daily. Core stickiness proxy.
                        </p>
                      </div>

                      {/* Metric 2: User Activation Rate */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-indigo-500/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">2. User Activation Rate</span>
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 rounded text-[9px] font-bold">DAILY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">74.5%</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Percentage of self-serve accounts completed DNS warming setup within 48 hours of onboarding.
                        </p>
                      </div>

                      {/* Metric 3: Daily Demo Bookings */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-indigo-500/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">3. Daily Booked Demo Volume</span>
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 rounded text-[9px] font-bold">DAILY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">6 Demos / day</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Absolute outbound top-of-funnel booking velocity. Measures raw outreach resonance.
                        </p>
                      </div>

                      {/* Metric 4: Lead response velocity */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-indigo-500/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">4. Lead Response Time</span>
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 rounded text-[9px] font-bold">DAILY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">4.2 Minutes</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Speed from trial signup to auto-generated playbook outreach delivery.
                        </p>
                      </div>

                      {/* Metric 5: Active API payload */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-indigo-500/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">5. Daily Campaign Completion</span>
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1 rounded text-[9px] font-bold">DAILY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">91.2%</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Proxy domain compliance checks. Measures percentage of campaigns completed without spam alarms.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* WEEKLY GROWTH DASHBOARD */}
                {metricsTab === 'weekly' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Metric 6: Demo Rate */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-[#818cf8]/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">6. MQL-to-Demo Conversion (Demo Rate)</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded text-[9px] font-bold">WEEKLY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">18.5%</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Efficiency rate transitions from scraping list records into scheduled platform walk-throughs.
                        </p>
                      </div>

                      {/* Metric 7: Win Rate */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-[#818cf8]/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">7. Demo-to-Close Win Rate</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded text-[9px] font-bold">WEEKLY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">24.0%</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Closing efficiency ratios on qualified enterprise and agency demos. Target is 20%+.
                        </p>
                      </div>

                      {/* Metric 8: Sourced Pipeline */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-[#818cf8]/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">8. Weekly Sourced New Pipeline</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded text-[9px] font-bold">WEEKLY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">${(pipeValue / 20).toLocaleString()}</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Dynamic weekly growth of qualified CRM pipeline coverage. Scaled live with input controls.
                        </p>
                      </div>

                      {/* Metric 9: Weekly Cohort Retention */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-[#818cf8]/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">9. W4 Week active cohort retention</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded text-[9px] font-bold">WEEKLY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">86.2%</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Subscribers retained after 4 weeks of platform usage. Prevalent marker of high core value.
                        </p>
                      </div>

                      {/* Metric 10: Weekly Cash Burn */}
                      <div className="bg-slate-950 border border-gray-900 rounded-xl p-4 space-y-2 hover:border-[#818cf8]/20 transition-all font-mono">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] text-gray-500 uppercase">10. Weekly Net Cash Burn Rate</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded text-[9px] font-bold">WEEKLY</span>
                        </div>
                        <div className="text-lg font-bold text-white font-display">${Math.round(reportInputs.infrastructureCosts * 0.25).toLocaleString()}</div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          Net technical operational burn rate calculations. Keeps infrastructure dynamic and visible.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* MONTHLY CENTRAL LEDGER BOARD REPORT */}
                {metricsTab === 'monthly' && (
                  <div className="space-y-4 font-mono text-xs">
                    
                    {/* Live Recalculating Unit Economics Overview */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 border border-gray-900 rounded-xl font-mono text-xs">
                      <div>
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wide">Avg ACV</span>
                        <strong className="text-white text-base block mt-0.5">$1,140</strong>
                        <span className="text-[8.5px] text-zinc-500">Subscription average</span>
                      </div>
                      <div className="border-l border-zinc-900 pl-3">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wide">Customer LTV</span>
                        <strong className="text-indigo-400 text-base block mt-0.5">$3,458</strong>
                        <span className="text-[8.5px] text-zinc-500">Gross margin weighted</span>
                      </div>
                      <div className="border-l border-zinc-900 pl-3">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wide">Blended CAC</span>
                        <strong className="text-[#a855f7] text-base block mt-0.5">$380</strong>
                        <span className="text-[8.5px] text-zinc-500">Outbound marketing spend</span>
                      </div>
                      <div className="border-l border-zinc-900 pl-3">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wide">LTV:CAC Ratio</span>
                        <strong className="text-emerald-400 text-base block mt-0.5">9.1x</strong>
                        <span className="text-[8.5px] text-zinc-500">High efficiency target</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Metric 11: MRR */}
                      <div className="bg-[#0f172a]/40 border border-slate-900 p-4 rounded-xl space-y-1 hover:border-indigo-500/10 transition-all">
                        <div className="flex justify-between items-start text-zinc-500 text-[10px] uppercase">
                          <span>11. Monthly Recurring Revenue (MRR)</span>
                          <span className="text-indigo-400 font-bold">MONTHLY</span>
                        </div>
                        <div className="text-xl font-semibold text-white font-display">${monthlyRecurringRevenue.toLocaleString()}/mo</div>
                        <p className="text-[10.5px] text-zinc-405 leading-relaxed pt-1.5">
                          Consistent, contractually tied predictability run-rate. Extrapolated live from active inputs.
                        </p>
                      </div>

                      {/* Metric 12: ARR */}
                      <div className="bg-[#0f172a]/40 border border-slate-900 p-4 rounded-xl space-y-1 hover:border-indigo-500/10 transition-all">
                        <div className="flex justify-between items-start text-zinc-500 text-[10px] uppercase">
                          <span>12. Annual Recurring Revenue (ARR)</span>
                          <span className="text-indigo-400 font-bold">MONTHLY</span>
                        </div>
                        <div className="text-xl font-semibold text-white font-display">${totalCalculatedRevenue.toLocaleString()}/yr</div>
                        <p className="text-[10.5px] text-zinc-450 leading-relaxed pt-1.5">
                          Raw annualized enterprise indicator determining general enterprise valuation multipliers.
                        </p>
                      </div>

                      {/* Metric 13: Customer Churn */}
                      <div className="bg-[#0f172a]/40 border border-slate-900 p-4 rounded-xl space-y-1 hover:border-indigo-500/10 transition-all">
                        <div className="flex justify-between items-start text-zinc-500 text-[10px] uppercase">
                          <span>13. Monthly Logo Churn Rate</span>
                          <span className="text-indigo-400 font-bold">MONTHLY</span>
                        </div>
                        <div className="text-xl font-semibold text-red-400 font-display">{logoChurnAmount}%</div>
                        <p className="text-[10.5px] text-zinc-455 leading-relaxed pt-1.5">
                          Logo contraction velocity. Maintaining sub-1% keeps the company within highest SaaS tier cohorts.
                        </p>
                      </div>

                      {/* Metric 14: Net Revenue Retention */}
                      <div className="bg-[#0f172a]/40 border border-slate-900 p-4 rounded-xl space-y-1 hover:border-indigo-500/10 transition-all">
                        <div className="flex justify-between items-start text-zinc-500 text-[10px] uppercase">
                          <span>14. Net Dollar / Net Revenue Retention (NRR)</span>
                          <span className="text-indigo-400 font-bold">MONTHLY</span>
                        </div>
                        <div className="text-xl font-semibold text-emerald-400 font-display">112.5%</div>
                        <p className="text-[10.5px] text-zinc-450 leading-relaxed pt-1.5">
                          Checks overall user base expansion value. Reflects secondary seat bookings exceeding standard churn.
                        </p>
                      </div>

                      {/* Metric 15: Cash Runway & Efficiency */}
                      <div className="bg-[#0f172a]/40 border border-slate-900 p-4 rounded-xl space-y-1 md:col-span-2 hover:border-indigo-500/10 transition-all">
                        <div className="flex justify-between items-start text-zinc-500 text-[10px] uppercase">
                          <span>15. Secured Cash Runway Month-ledger</span>
                          <span className="text-emerald-400 font-bold">MONTHLY</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-semibold text-white font-display border-b border-gray-900 pb-2 mb-2">
                          <span>26.0 Months Secure</span>
                          <span className="text-xs text-zinc-400 font-normal">SaaS Quick Ratio: <strong className="text-emerald-400">4.2x</strong></span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-[10px] text-zinc-400 pt-0.5">
                          <p>
                            <strong>CAC payback period:</strong> 4.1 Months (extremely safe unit breakeven timeline).
                          </p>
                          <p>
                            <strong>Cash Burn Buffer:</strong> Preserves baseline resources for advanced localized regional database pods deployment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-5 text-zinc-300 text-xs font-mono leading-relaxed">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-lg text-emerald-400 text-xs">
                <strong>Executive Takeaway:</strong> We are scaling rapidly from $1M ARR to a stable $10M target. Growth is highly capital-efficient, protected by active domain shields, and has achieved a high performance telemetry grade.
              </div>
              <p>
                To the Members of the Board of Directors,
              </p>
              <p>
                EffectiveBuzz has officially passed **${(totalCalculatedRevenue).toLocaleString()} ARR** on a run-rate basis. Under our direct oversight, we have established a robust dual-tiered model routing structure that enables uncopyable outreach sequences while keeping blended gross operating margins at **{directProfitMargin}%**.
              </p>
              <p>
                Our core customer churn remains low at **{logoChurnAmount}% per month**, and our customer engagement telemetry shows a highly active base running {(reportInputs.monthlyApisLogged / 1000000).toFixed(1)} Million API processes monthly.
              </p>
              <p>
                In the following sections, our executive leadership presents deep operational deep-dives across our financial models, proprietary technical architectures, risk maps, and direct action plans.
              </p>
              <div className="border-t border-gray-800 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-zinc-500 block">CO-SIGNED EXECUTIVE SPARK</span>
                  <span className="text-indigo-400 font-bold block mt-1">"Focus on deep workflow integrations to ensure long-term product stickiness."</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">TELEMETRY GRADE</span>
                  <span className="text-emerald-400 font-bold block mt-1 text-sm">Excellent — {(scoreFactor > 80) ? 'Strong Moats Activated' : 'Progressing'}</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 2 && (
            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="flex gap-2 bg-red-500/5 border border-red-500/20 p-3 rounded-lg text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p><strong>Strict Audit Focus:</strong> All system risks are monitored via automatic DNS and delivery rate triggers.</p>
              </div>

              {[
                { title: '1. Mailbox Warmups & Delivery Rates', desc: 'SDR outbound accounts are subject to ISP spam restrictions if email volume spikes abruptly.', mit: 'Configured a Pre-Flight Deliverability Shield that blocks emails containing high-risk words.' },
                { title: '2. API Model Dependency & Costs', desc: 'Relying strictly on single-supplier LLM systems is a risk for platform margins and reliability.', mit: 'Build a dual-tier model architecture. Routes standard tasks to fast, cost-effective models.' },
                { title: '3. Data Sovereignty Laws (GDPR / KSA NDMO)', desc: 'Enterprise customers cannot permit customer records or logs to reside on un-zoned US servers.', mit: 'Provisioning AWS Frankfurt (eu-central-1) and localized Dubai Moro Hub namespaces.' },
                { title: '4. Direct Lower-Cost Competitors', desc: 'A surge of cheap wrapper sites with standard templates can undercut system pricing.', mit: 'Establish deep, bidirectional data syncing with CRM platforms like Salesforce and HubSpot.' },
                { title: '5. Technical Talent Retention', desc: 'Critical development blocks depend on preserving senior cognitive engineering expertise.', mit: 'Structure incentives, options, and recruit globally via verified agency partnerships.' }
              ].map((risk, index) => (
                <div key={index} className="p-3 bg-slate-950/50 border border-gray-900 rounded-lg space-y-1 hover:border-gray-800 transition-all">
                  <strong className="text-white text-xs block">{risk.title}</strong>
                  <p className="text-zinc-400 text-xs">{risk.desc}</p>
                  <p className="text-emerald-400 text-[10.5px] pt-1"><strong>Action:</strong> {risk.mit}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 3 && (
            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="p-3 bg-indigo-500/5 border border-indigo-500/15 rounded-lg text-indigo-400">
                <strong>CRO Expansion Directive:</strong> Focus on high-margin corporate setups that generate stable lifetime values (LTV).
              </div>

              {[
                { title: '1. Middle Eastern Sovereign Enterprise Accounts', details: 'Sovereign wealth holdings and ministries represent $5,000/mo Custom contracts.', growth: 'Will double regional enterprise pipelines within 6 months.' },
                { title: '2. Unified "Autonomous Revenue Engineer" Certifications', details: 'Establishing accredited educational tracks turns sales operators into active advocates.', growth: 'Builds organic referral loops and decreases overall CAC.' },
                { title: '3. Salesforce AppExchange Native Sync Integration', details: 'Standardize seamless bidirectional syncing of contacts and communication notes.', growth: 'Increases product stickiness and protects against competitor undercutting.' },
                { title: '4. Local European Reseller Programs (VARs)', details: 'Establish certified partnership networks in DACH, Nordics, and France.', growth: 'Expands localized sales footprints without increasing our domestic team headcount.' },
                { title: '5. High-Margin Domain Reputation Monitoring Packages', details: 'Package reputation management as an addon during workspace onboarding.', growth: 'Generates incremental, highly capital-efficient monthly recurring revenue (MRR).' }
              ].map((opp, i) => (
                <div key={i} className="p-3 bg-slate-950/50 border border-gray-900 rounded-lg space-y-1 hover:border-[#818cf8]/20 transition-all">
                  <div className="flex justify-between items-center">
                    <strong className="text-white text-xs block">{opp.title}</strong>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Growth: +35%</span>
                  </div>
                  <p className="text-zinc-400 text-xs">{opp.details}</p>
                  <p className="text-indigo-300 text-[10.5px] pt-1"><strong>Strategic Play:</strong> {opp.growth}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 4 && (
            <div className="space-y-4 font-mono text-xs text-zinc-300">
              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg">
                  <span className="text-gray-500 uppercase text-[9px]">LTV Weighted Sales Pipeline</span>
                  <strong className="text-base font-bold text-white block mt-1">${(pipeValue).toLocaleString()}</strong>
                  <span className="text-[9px] text-zinc-500">Active enterprise deals in pipeline</span>
                </div>
                <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg">
                  <span className="text-gray-500 uppercase text-[9px]">Calculated Cash Runway</span>
                  <strong className="text-emerald-400 text-base font-bold block mt-1">26 Months Secure</strong>
                  <span className="text-[9px] text-zinc-500">Under accelerated roadmap hiring</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/40 border border-gray-900 rounded-lg space-y-2">
                <h5 className="font-bold text-white uppercase text-[10px]">CFO Performance Commentary</h5>
                <p className="text-xs leading-relaxed text-zinc-400">
                  With a blended Customer Acquisition Cost (CAC) of **$380**, and an average Customer Lifetime Value (LTV) of **$3,480**, our **LTV-to-CAC ratio of 9.1x** shows a highly efficient growth engine.
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  We are standardizing multi-currency Stripe checkout routers to simplify payments across global accounts. This structure processes custom regional taxation models directly inside active workspace dashboards.
                </p>
              </div>

              <div className="p-3.5 bg-[#1e293b]/20 border border-indigo-500/10 rounded-lg">
                <span className="text-indigo-400 text-[9px] font-bold uppercase block mb-1">Contract Pipeline Value Focus:</span>
                <p className="text-[11px] text-zinc-300">
                  Target custom agreements with 2 new enterprise accounts starting at $3,500/mo. Spanning international manufacturing and high-growth B2B fintech verticals in North America and Western Europe.
                </p>
              </div>
            </div>
          )}

          {activeSection === 5 && (
            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2.5 bg-slate-950 border border-gray-900 rounded-lg text-center">
                  <span className="text-gray-500 uppercase text-[9px] block">Engagement DAU/MAU</span>
                  <strong className="text-sm font-bold text-white block mt-0.5">{reportInputs.dailyActiveUsers}%</strong>
                </div>
                <div className="p-2.5 bg-slate-950 border border-gray-900 rounded-lg text-center">
                  <span className="text-gray-500 uppercase text-[9px] block">HITL Verification</span>
                  <strong className="text-sm font-bold text-white block mt-0.5">88.2% Auto-Approved</strong>
                </div>
                <div className="p-2.5 bg-slate-950 border border-gray-900 rounded-lg text-center">
                  <span className="text-gray-500 uppercase text-[9px] block">Avg Edit Distance</span>
                  <strong className="text-sm font-bold text-indigo-300 block mt-0.5">10.5% (Levenshtein)</strong>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/40 border border-gray-900 rounded-lg space-y-2">
                <h5 className="font-bold text-white uppercase text-[10px]">CPO AI Prompt Calibration Analysis</h5>
                <p className="text-xs leading-relaxed text-zinc-400">
                  The average edit distance has dropped from **28% to 10.5%** over the last 12 months. This demonstrates that our prompt chains are continuously improving as SDRs review and refine suggestions, keeping manual edits minimal.
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  By routing standard classification tasks to efficient models and reserving complex work for advanced systems, we maintain high system performance and keep operating costs competitive.
                </p>
              </div>
            </div>
          )}

          {activeSection === 6 && (
            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg">
                  <span className="text-gray-500 uppercase text-[9px]">Model Server Run-Rate (Last Month)</span>
                  <strong className="text-base font-bold text-indigo-300 block mt-1">${totalModelCost.toLocaleString()}</strong>
                  <span className="text-[9px] text-zinc-500">Based on routing {(reportInputs.monthlyApisLogged / 1000000).toFixed(1)}M processes</span>
                </div>
                <div className="p-3 bg-slate-950 border border-gray-900 rounded-lg">
                  <span className="text-gray-500 uppercase text-[9px]">Total Monthly Ops Costs</span>
                  <strong className="text-emerald-400 text-base font-bold block mt-1">${(reportInputs.infrastructureCosts + totalModelCost).toLocaleString()}</strong>
                  <span className="text-[9px] text-zinc-500">Server compute + model API bills</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/40 border border-gray-900 rounded-lg space-y-2">
                <h5 className="font-bold text-white uppercase text-[10px]">CTO Infrastructure Analysis</h5>
                <p className="text-xs leading-relaxed text-zinc-400">
                  We use PostgreSQL with pgvector, maintaining sub-30ms search latency on standard queries. Our physical European database is physically isolated inside our target EU Frankfurt AWS pod, ensuring strict compliance.
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  By routing standard tasks to fast, cost-effective models, we have reduced our average generation cost to **$1.86 per 1,000 requests** (a 64% year-over-year cost improvement).
                </p>
              </div>
            </div>
          )}

          {activeSection === 7 && (
            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 rounded-lg text-emerald-400">
                <strong>Executive Board Recommendation:</strong> Co-signed and approved by all ELT members. Focus on accelerating high-margin, sovereign global expansion.
              </div>

              {[
                { title: '1. Deploy AWS Frankfurt (eu-central-1) Pod immediately', act: 'Allocate $35,000 for server setup to secure GDPR compliance and clear the DACH pipeline.' },
                { title: '2. Productize Deliverability Shields as standard workspace add-ons', act: 'Offer reputation warming and monitoring services as standard add-ons to increase MRR and user safety.' },
                { title: '3. Accelerate VAR commission agreements for certified consultants', act: 'Form formal partnerships with 10 prominent regional RevOps consultants to build our ecosystem and drive organic sales volume.' }
              ].map((rec, i) => (
                <div key={i} className="p-3 bg-slate-950/50 border border-gray-900 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-1.5 text-white">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <strong>{rec.title}</strong>
                  </div>
                  <p className="text-zinc-400 text-xs pl-5">{rec.act}</p>
                </div>
              ))}
              
              <p className="text-xs text-zinc-500 text-center pt-2">
                All initiatives are officially co-signed and submitted for board review.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
