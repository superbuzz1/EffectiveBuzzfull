import React, { useState } from 'react';
import { 
  Calendar, Link, CheckCircle, Clock, Users,
  Bot, ShieldCheck, Settings, ArrowRight, Video, CalendarDays
} from 'lucide-react';

export default function MeetingBookingConsole() {
  const [calendars, setCalendars] = useState<any[]>([
    { provider: 'calcom', lastSyncAt: new Date().toISOString(), status: 'active', bookingLink: 'cal.com/marcus-ai/discovery', meetingsBooked: 14 }
  ]);
  const [loading, setLoading] = useState(false);

  const connect = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setCalendars([...calendars, { 
        provider, 
        lastSyncAt: new Date().toISOString(), 
        status: 'active', 
        bookingLink: `cal.com/ai-agent/${provider}-demo`,
        meetingsBooked: 0
      }]);
      setLoading(false);
    }, 1500);
  };

  const disconnect = (provider: string) => {
    setCalendars(calendars.filter(c => c.provider !== provider));
  };

  const renderCard = (provider: string, name: string, description: string, color: string) => {
    const calendar = calendars.find(c => c.provider === provider);
    const isConnected = !!calendar;

    return (
      <div className={`bg-[#0f172a] border ${isConnected ? `border-${color}-500/30` : 'border-slate-800'} rounded-xl overflow-hidden relative group transition-all duration-300`}>
        {isConnected && (
          <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500`} />
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${isConnected ? `bg-${color}-500/10 border-${color}-500/20` : 'bg-slate-900 border-slate-800'}`}>
                {provider === 'calcom' && <CalendarDays className={`w-7 h-7 ${isConnected ? `text-${color}-400` : 'text-gray-500'}`} />}
                {provider === 'google' && <Video className={`w-7 h-7 ${isConnected ? `text-${color}-400` : 'text-gray-500'}`} />}
                {provider === 'outlook' && <Calendar className={`w-7 h-7 ${isConnected ? `text-${color}-400` : 'text-gray-500'}`} />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{name}</h3>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
            {isConnected && (
              <span className={`flex items-center gap-1 text-[10px] uppercase font-mono font-bold px-2 py-1 rounded-md border bg-${color}-500/10 text-${color}-400 border-${color}-500/20`}>
                <CheckCircle className="w-3 h-3" /> Active Link
              </span>
            )}
          </div>

          {isConnected ? (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">AI Booking Link</span>
                <a href={`https://${calendar.bookingLink}`} target="_blank" rel="noreferrer" className="text-xs font-mono text-indigo-400 hover:underline flex items-center gap-1">
                  {calendar.bookingLink} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Autonomous Books</span>
                  <strong className="text-xl text-white">{calendar.meetingsBooked} <span className="text-xs text-gray-500 font-normal">meetings</span></strong>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-[10px] text-gray-500 font-mono uppercase block mb-1">Next Availability</span>
                  <strong className="text-sm text-emerald-400 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" /> Tomorrow 2PM
                  </strong>
                </div>
              </div>

              <div className="flex gap-3">
                <button className={`flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors`}>
                  <Settings className="w-4 h-4" /> Rules
                </button>
                <button 
                  onClick={() => disconnect(provider)} 
                  className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-sm font-semibold transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => connect(provider)} 
                disabled={loading} 
                className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Link className="w-4 h-4" /> Connect AI Scheduler
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-feed relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                <Bot className="w-3 h-3" /> AUTONOMOUS CALENDAR AGENT
              </span>
            </div>
            <h1 className="text-2xl font-display font-medium text-white tracking-tight flex items-center gap-2.5">
              <Calendar className="w-6 h-6 text-purple-400" />
              AI Meeting Booking Scheduler
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Connect your Cal.com or Google Calendar instance. Our AI SDRs will read your availability in real-time, negotiate meeting times with leads via email, and securely book calendar events without any human intervention.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
             <div className="space-y-1">
              <span className="text-[10px] text-gray-500 font-mono uppercase block">Total Meetings Booked</span>
              <strong className="text-white font-mono text-sm">14 Demos</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderCard('calcom', 'Cal.com API', 'Native webhooks and OAuth routing for autonomous multi-user scheduling.', 'indigo')}
        {renderCard('google', 'Google Workspace', 'Direct Read/Write access to Google Calendar via secure OAuth 2.0.', 'emerald')}
        {renderCard('outlook', 'Microsoft Outlook', 'Exchange graph API sync for enterprise team availability.', 'blue')}
      </div>
      
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex items-start gap-4">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Timezone & Availability Protection</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            The AI SDR is programmed with strict timezone-aware logic. It will never propose a meeting outside of your designated <strong>Working Hours</strong> (9 AM - 5 PM local time) and will always cross-reference conflicting blocks before finalizing an invitation.
          </p>
        </div>
      </div>
    </div>
  );
}
