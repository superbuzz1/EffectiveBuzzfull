import React, { useState } from 'react';
import { MessageSquare, Send, X, User, Sparkles, Loader2 } from 'lucide-react';
import { BrandMark } from './BrandMark';

export default function InboundWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'chat' | 'qualified'>('intro');
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Hi! I\'m the EffectiveBuzz assistant. How can I help you grow your revenue today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Simulate AI response for widget demo
    setTimeout(() => {
      setMessages([...newMessages, { role: 'ai', text: "That sounds interesting! To give you the best advice, could you share your work email and company name?" }]);
      setIsLoading(false);
      setStep('chat');
    }, 1000);
  };

  const handleQualify = async () => {
    if (!email) return;
    setIsLoading(true);
    
    try {
      // In this environment, we'll try to get the tenantId from the host or a default
      const res = await fetch('/api/v2/conversational/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: 'tenant-1', // Default tenant for demo purposes
          email,
          transcript: messages,
          status: 'qualified'
        })
      });

      if (res.ok) {
        setStep('qualified');
      }
    } catch (err) {
      console.error("Qualification failed:", err);
      // Fallback for demo
      setStep('qualified');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] bg-[#0d131f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-6 py-4 bg-[#111827] border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandMark className="w-6 h-6" />
              <div>
                <h3 className="text-sm font-bold text-white leading-none">EB Assistant</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-gray-500 font-medium">Online & Ready</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-slate-900 border border-gray-800 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-none">
                  <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                </div>
              </div>
            )}
            
            {step === 'chat' && (
              <div className="pt-4 animate-in fade-in duration-500">
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Quick Connect</span>
                  <input 
                    type="email" 
                    placeholder="Work Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  />
                  <button 
                    onClick={handleQualify}
                    className="w-full py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-all"
                  >
                    Get Personalized Strategy →
                  </button>
                </div>
              </div>
            )}

            {step === 'qualified' && (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold">Awesome!</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    We've matched your profile with a Growth Specialist. Check your inbox for a custom outreach audit.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input */}
          {step !== 'qualified' && (
            <div className="p-4 border-t border-gray-800 bg-[#0d131f]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="w-full bg-slate-950 border border-gray-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/20 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
