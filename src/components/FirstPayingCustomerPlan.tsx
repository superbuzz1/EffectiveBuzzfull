import React from 'react';
import { 
  Trophy, DollarSign, Target, PhoneCall, Mail, 
  CheckCircle, ArrowRight, Star, ArrowUpRight,
  UserCheck, Zap
} from 'lucide-react';

export default function FirstPayingCustomerPlan() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Trophy className="w-4 h-4" />
          Revenue Generation Sprint
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight">
          First Paying Customer (FPC) Strategy
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
          The tactical playbook to convert our highest-engaged Beta user into our first paying, referenceable logo. Validating willingness-to-pay (WTP) and establishing our initial revenue baseline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Section 1: Identifying the Target */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Target className="w-4 h-4 text-blue-400" />
            1. Prospect Selection (The Warmest Lead)
          </h2>
          <div className="bg-slate-900 border border-blue-900/30 rounded-lg p-5 mb-5 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/50">
              <UserCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">"The Power User" Persona</h3>
              <p className="text-sm text-slate-400 mt-1">
                We do not cold-sell our first account. We identify the Beta user extracting the most disproportionate value.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[#0b101b] border border-slate-800 p-3 rounded">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">Usage Criteria</span>
                  <span className="font-bold text-slate-200 text-sm">&gt; 5 active campaigns</span>
                </div>
                <div className="bg-[#0b101b] border border-slate-800 p-3 rounded">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">Automation Value</span>
                  <span className="font-bold text-slate-200 text-sm">&gt; 100 AI replies sent</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic">
            * We have identified 3 Beta users meeting this criteria. We will approach Candidate A (B2B SaaS Founder) first.
          </p>
        </section>

        {/* Section 2: The Offer */}
        <section className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Star className="w-4 h-4 text-emerald-400" />
            2. The Charter Offer
          </h2>
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-slate-800">
              <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2">Discounted Lifetime Rate</div>
              <div className="text-4xl font-black text-emerald-400 tracking-tight">$49<span className="text-xl text-slate-500 font-medium">/mo</span></div>
              <div className="text-[10px] text-slate-400 line-through mt-1">Standard: $99/mo</div>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Unlimited AI Generations</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Priority Support (Direct Slack)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Custom integrations on request</li>
            </ul>
            <div className="bg-slate-950 p-3 rounded border border-emerald-900/30 text-[10px] text-emerald-500/80 leading-relaxed font-mono">
              Hypothesis validation: If they won't pay $49/mo for something they use daily, the pain point isn't acute enough.
            </div>
          </div>
        </section>

        {/* Section 3: The Pitch Sequence */}
        <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6 lg:col-span-3">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider">
            <Zap className="w-4 h-4 text-amber-400" />
            3. Execution Workflow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* The Email */}
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 lg:col-span-1">
              <div className="flex items-center gap-2 text-amber-500 font-bold mb-3">
                <Mail className="w-4 h-4" /> Step 1: The Email
              </div>
              <div className="bg-[#0b101b] p-3 rounded border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
{`Hi [First Name],

I've been reviewing beta usage this week and noticed you've been one of our most active users.

It's been great seeing the volume of campaigns you've launched and the engagement you're generating through EffectiveBuzz.

We're wrapping up the free beta on Friday and moving into our first paid customer phase. Because you've been an early user and have provided valuable feedback, I'd like to offer you a Charter Member rate of $49/month that will never increase for as long as you remain a customer.

Before we finalize anything, I'd love to spend 10 minutes reviewing the results you've seen so far, hearing what's working (and what's not), and showing you what's coming next.

Would you be available for a quick call tomorrow?

Thanks again for being one of the users helping shape EffectiveBuzz.

Best,
Rakib`}
              </div>
            </div>
            
            {/* The Call */}
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 lg:col-span-1 border-t-4 border-t-blue-500">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                <PhoneCall className="w-4 h-4" /> Step 2: The Call Agenda
              </div>
              <ol className="space-y-3 text-xs text-slate-300">
                <li className="flex gap-2">
                  <span className="font-bold text-blue-400">1.</span>
                  <div>
                    <strong className="block text-slate-200">Review Activity:</strong>
                    Campaigns launched, prospects contacted, replies generated, and time saved.
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-400">2.</span>
                  <div>
                    <strong className="block text-slate-200">Ask:</strong>
                    "What's the most valuable feature?", "What would make this indispensable?"
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-400">3.</span>
                  <div>
                    <strong className="block text-slate-200">Confirm Value:</strong>
                    Quantify time saved and meetings/replies generated.
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-400">4.</span>
                  <div>
                    <strong className="block text-slate-200">Present Offer:</strong>
                    Charter Member, $49/mo forever, Priority support, Early access to features.
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-blue-400">5.</span>
                  <div>
                    <strong className="block text-slate-200">Close:</strong>
                    Share Stripe checkout link directly in Zoom.
                  </div>
                </li>
              </ol>
            </div>

            {/* PMF Validation */}
            <div className="bg-emerald-950/20 p-4 rounded-lg border border-emerald-900/40 relative overflow-hidden flex flex-col justify-between lg:col-span-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                  <Trophy className="w-4 h-4" /> The PMF Goal
                </div>
                <p className="text-xs text-emerald-200/80 leading-relaxed mb-4">
                  Your goal is not just to get the first payment. Your true objective is to secure the first customer who genuinely states:
                </p>
                <div className="bg-[#0b101b] border-l-2 border-emerald-500 p-3 italic text-emerald-300 text-sm mb-4 relative z-10">
                  "I would be disappointed if EffectiveBuzz disappeared tomorrow."
                </div>
                <p className="text-[10px] text-slate-400">
                  This Sean Ellis test response is the earliest definitive signal of true Product-Market Fit.
                </p>
              </div>
              <button className="w-full flex items-center justify-center gap-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/50 py-2 rounded text-xs font-bold transition-colors mt-4">
                Simulate Stripe Webhook <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
