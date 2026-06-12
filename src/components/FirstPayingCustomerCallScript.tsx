import React from 'react';
import { 
  PhoneCall, Clock, HeartHandshake, BarChart, 
  Search, Rocket, Star, CreditCard, CheckCircle2,
  Phone
} from 'lucide-react';

export default function FirstPayingCustomerCallScript() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Phone className="w-4 h-4" />
            Conversion Playbook
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            First Paying Customer Call Script
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            A precise 10-minute cadence designed to convert a highly engaged beta user into the first paying customer through value validation and the Charter Member offer.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#0b101b] border border-indigo-500/30 px-6 py-4 rounded-xl shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <div>
            <div className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Target Duration
            </div>
            <div className="text-3xl font-black text-indigo-400">10 Min</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: The Timeline */}
        <div className="md:col-span-8 space-y-6">
          
          <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-4">
            
            {/* Minute 1-2 */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <HeartHandshake className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Thank You</h3>
                  <span className="text-xs font-bold font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">Minute 1–2</span>
                </div>
                <div className="bg-slate-900 border-l-2 border-indigo-500 p-3 italic text-slate-300 text-sm mb-0">
                  "First, thanks for being one of the earliest EffectiveBuzz users. Your feedback has directly influenced the product."
                </div>
              </div>
            </div>

            {/* Minute 2-4 */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <BarChart className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                     Usage Review
                  </h3>
                  <span className="text-xs font-bold font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">Minute 2–4</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Review:</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Campaigns launched</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Prospects researched</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-500" /> AI-generated outreach</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Replies received</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Ask:</h4>
                    <ul className="space-y-2 text-xs text-slate-300 italic">
                      <li className="border-l border-slate-700 pl-2">"What has been most valuable so far?"</li>
                      <li className="border-l border-slate-700 pl-2">"What are you using most often?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Minute 4-6 */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <Search className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                     Pain Discovery
                  </h3>
                  <span className="text-xs font-bold font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">Minute 4–6</span>
                </div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Ask:</h4>
                <div className="space-y-2">
                  <div className="bg-rose-950/10 border border-rose-900/30 p-2.5 rounded text-sm text-slate-300 italic">"What were you doing before EffectiveBuzz?"</div>
                  <div className="bg-rose-950/10 border border-rose-900/30 p-2.5 rounded text-sm text-slate-300 italic">"How much time does this save you?"</div>
                  <div className="bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded text-sm text-emerald-300 font-medium italic">"If EffectiveBuzz disappeared tomorrow, what would you miss?" (The PMF Check)</div>
                </div>
              </div>
            </div>

            {/* Minute 6-8 */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                <Rocket className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="bg-[#0b101b] border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                     Future Vision
                  </h3>
                  <span className="text-xs font-bold font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">Minute 6–8</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Share:</h4>
                     <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-amber-500" /> Upcoming improvements</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-amber-500" /> AI enhancements</li>
                      <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-amber-500" /> Beta roadmap</li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest text-center">Focus on outcomes.<br/>Not features.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minute 8-9 */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <Star className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                     Present Offer
                  </h3>
                  <span className="text-xs font-bold font-mono text-emerald-500 bg-emerald-950/50 px-2 py-1 rounded">Minute 8–9</span>
                </div>
                <div className="bg-[#0b101b] border-l-2 border-emerald-500 p-3 italic text-slate-300 text-sm mb-4">
                  "Because you've been one of our earliest users, I'd like to offer a Charter Member plan."
                </div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Include:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full">$49/month forever</span>
                  <span className="text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full">Priority support</span>
                  <span className="text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full">Early feature access</span>
                </div>
              </div>
            </div>

            {/* Minute 9-10 */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                     Close
                  </h3>
                  <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-950/50 px-2 py-1 rounded">Minute 9–10</span>
                </div>
                <div className="bg-[#0b101b] border border-indigo-900/50 p-3 rounded mb-4 text-sm text-indigo-100 font-medium">
                  "Would you like me to set up your Charter Member account today?"
                </div>
                
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-indigo-900/30 pb-1">If Yes:</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> Send Stripe checkout link immediately in chat.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> Wait on the call while payment is completed.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> Confirm subscription activation in admin panel.</li>
                  <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> Schedule next follow-up.</li>
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* Right Sidebar: Quick Checklist */}
        <div className="md:col-span-4">
          <div className="sticky top-6 bg-[#0b101b] border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Pre-Call Checklist
            </h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 group pointer-events-none">
                <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900 mt-0.5 shrink-0"></div>
                <span className="text-xs text-slate-400 leading-relaxed">Review target user's usage metrics in Analytics dashboard.</span>
              </label>
              <label className="flex items-start gap-3 group pointer-events-none">
                <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900 mt-0.5 shrink-0"></div>
                <span className="text-xs text-slate-400 leading-relaxed">Identify 1 specific campaign of theirs that performed well to reference.</span>
              </label>
              <label className="flex items-start gap-3 group pointer-events-none">
                <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900 mt-0.5 shrink-0"></div>
                <span className="text-xs text-slate-400 leading-relaxed">Generate unique Stripe Checkout link for $49/mo Charter plan.</span>
              </label>
              <label className="flex items-start gap-3 group pointer-events-none">
                <div className="w-4 h-4 rounded border border-slate-600 bg-slate-900 mt-0.5 shrink-0"></div>
                <span className="text-xs text-slate-400 leading-relaxed">Test audio/video setup.</span>
              </label>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-800">
               <div className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-widest mb-2">Failure Mode</div>
               <p className="text-xs text-slate-400 italic">If they hesitate on price, do <strong className="text-slate-300">not</strong> discount further. Revert to exploring the pain point. If WTP is zero, they are not your ICP.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
