import React, { useState } from 'react';
import { 
  MessageSquare, BrainCircuit, ThumbsUp, AlertCircle, 
  XCircle, ArrowRight, Zap, Inbox, Filter, ShieldAlert
} from 'lucide-react';

export default function NLPSentimentEngine() {
  const [activeTab, setActiveTab] = useState<'queue' | 'analytics'>('queue');
  
  const [inboxEmails] = useState([
    { id: 1, sender: 'david@acmecorp.com', subject: 'Re: Elevate your pipeline', preview: 'This sounds interesting. Can we hop on a quick 15 min call next Tuesday?', sentiment: 'Positive', confidence: 98, action: 'Auto-Booking Sequence' },
    { id: 2, sender: 'sarah@techflow.io', subject: 'Re: TechFlow + EffectiveBuzz', preview: 'We just signed a 12-month contract with a competitor. Please remove me.', sentiment: 'Not Interested', confidence: 95, action: 'DNC & Pause Sequence' },
    { id: 3, sender: 'mike@growthinc.co', subject: 'Re: Quick question', preview: 'What does your pricing look like for a team of 15? Also, do you integrate with Salesforce?', sentiment: 'Objection', confidence: 88, action: 'Draft FAQ Response' },
    { id: 4, sender: 'elena@startup.net', subject: 'Re: Outbound automation', preview: 'I am out of office until Oct 25th. Please reach out then.', sentiment: 'OOO', confidence: 99, action: 'Reschedule Sequence' }
  ]);

  const renderSentimentBadge = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 w-fit"><ThumbsUp className="w-3 h-3"/> Positive</span>;
      case 'Not Interested': return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 w-fit"><XCircle className="w-3 h-3"/> Rejected</span>;
      case 'Objection': return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 w-fit"><AlertCircle className="w-3 h-3"/> Objection</span>;
      case 'OOO': return <span className="bg-slate-700/50 text-slate-300 border border-slate-600 px-2 py-0.5 rounded text-xs font-bold w-fit">OOO</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <BrainCircuit className="w-3 h-3" /> NEURAL PROCESSING
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <MessageSquare className="w-6 h-6 text-fuchsia-400" />
              NLP Sentiment Analysis Engine
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Every incoming email reply is processed through a lightweight LLM router. It classifies intent (Positive, Objection, Rejected, OOO) and instantly routes the conversation to the correct autonomous sub-agent.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Stats Column */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4">Traffic Classification</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-bold">Positive</span>
                  <span className="text-gray-400">12%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[12%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-400 font-bold">Objections / Info</span>
                  <span className="text-gray-400">28%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[28%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-rose-400 font-bold">Not Interested</span>
                  <span className="text-gray-400">45%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400 font-bold">Out of Office (OOO)</span>
                  <span className="text-gray-400">15%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 w-[15%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-900/30 to-slate-900 border border-fuchsia-500/20 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-fuchsia-400" />
              <h4 className="text-sm font-bold text-white">Auto-Routing</h4>
            </div>
            <p className="text-xs text-fuchsia-200/70 leading-relaxed">
              When a <span className="text-emerald-400 font-bold">Positive</span> reply is detected, the AI pauses the sequence and triggers the Meeting Booking webhook automatically.
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl shadow-xl overflow-hidden h-full">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Inbox className="w-4 h-4 text-gray-400" />
                Live Inbox Processing Stream
              </div>
              <button className="px-3 py-1.5 text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-md transition-colors flex items-center gap-2">
                <Filter className="w-3 h-3" /> Filter Intents
              </button>
            </div>
            
            <div className="divide-y divide-slate-800/50">
              {inboxEmails.map(email => (
                <div key={email.id} className="p-5 hover:bg-slate-800/20 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{email.sender}</span>
                        <span className="text-xs text-gray-500 md:hidden">Just now</span>
                      </div>
                      <div className="text-xs font-medium text-gray-300">{email.subject}</div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        "{email.preview}"
                      </p>
                    </div>

                    <div className="w-full md:w-64 shrink-0 flex flex-col items-start md:items-end gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
                      <div className="flex justify-between w-full items-center">
                        {renderSentimentBadge(email.sentiment)}
                        <span className="text-[10px] text-gray-500 font-mono">{email.confidence}% conf.</span>
                      </div>
                      
                      <div className="w-full h-px bg-slate-800" />
                      
                      <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-400 w-full">
                        <ArrowRight className="w-3 h-3 shrink-0" />
                        <span className="truncate">{email.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
