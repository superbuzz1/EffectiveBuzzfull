import React, { useState, useEffect } from 'react';
import { Calendar, Link, CheckCircle } from 'lucide-react';

export default function MeetingBookingConsole() {
  const [calendars, setCalendars] = useState<any[]>([]);

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const res = await fetch('/api/v2/meetings', { headers: { 'Authorization': `Bearer mock-token` } });
      const data = await res.json();
      if (data.success) setCalendars(data.data);
    } catch (err) {}
  };

  const connect = async (provider: string) => {
    try {
      await fetch(`/api/v2/meetings/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer mock-token` },
        body: JSON.stringify({ bookingLink: `https://cal.com/effectivebuzz-${provider}` })
      });
      fetchCalendars();
    } catch (err) {}
  };

  const disconnect = async (provider: string) => {
    try {
      await fetch(`/api/v2/meetings/${provider}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer mock-token` }
      });
      fetchCalendars();
    } catch (err) {}
  };

  const renderCard = (provider: string, name: string) => {
    const calendar = calendars.find(c => c.provider === provider);
    const isConnected = !!calendar;

    return (
      <div className="bg-[#182235] border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white">{name}</h3>
          </div>
          {isConnected && <CheckCircle className="w-5 h-5 text-emerald-500" />}
        </div>
        
        <p className="text-sm text-gray-400">
          {isConnected ? `Booking Link: ${calendar.bookingLink}` : 'Not connected'}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-800">
          {isConnected ? (
            <button onClick={() => disconnect(provider)} className="text-red-400 hover:text-red-300 text-sm font-semibold">
              Disconnect
            </button>
          ) : (
            <button onClick={() => connect(provider)} className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Link className="w-4 h-4" /> Connect Calendar
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-400" />
          Meeting Booking AI
        </h2>
        <p className="text-gray-400 text-sm mt-1">Connect your calendar so the AI SDR can book meetings directly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderCard('calcom', 'Cal.com')}
        {renderCard('google', 'Google Calendar')}
        {renderCard('outlook', 'Outlook Calendar')}
      </div>
    </div>
  );
}
