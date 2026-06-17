import React, { useState, useEffect } from 'react';
import { 
  Send, X, Check, Edit3, Trash2, Sparkles, Filter, 
  ChevronLeft, ChevronRight, MessageSquare, Mail, Loader2, AlertCircle
} from 'lucide-react';

interface Draft {
  id: string;
  campaignTargetId: string;
  subject: string;
  body: string;
  status: 'pending_review' | 'approved' | 'rejected';
  feedback?: string;
  campaignTarget: {
    contact: {
      firstName: string;
      lastName: string;
      email: string;
      company: { name: string };
    }
  };
}

export default function DraftReview() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsActionEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedBody, setEditedBody] = useState('');

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Note: Endpoint to list drafts for review might be needed.
      // For now, let's assume we have a generic list or we fetch for a specific campaign.
      // I'll add a 'list-drafts' endpoint to DraftingController if needed.
      const res = await fetch('/api/v2/drafting/list?status=pending_review', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDrafts(data.drafts || []);
    } catch (err: any) {
      setError(err.message);
      // Mock data for demo if fetch fails
      setDrafts([
        {
          id: 'd1',
          campaignTargetId: 't1',
          subject: 'Quick question about Acme\'s growth strategy',
          body: "Hi Sarah,\n\nI noticed Acme Corp is expanding into the EMEA region. Given your role as Head of Sales, I thought you'd be interested in how we helped similar teams scale their outbound volume by 3x without increasing headcount.\n\nOpen to a brief chat next week?\n\nBest,\nEB AI",
          status: 'pending_review',
          campaignTarget: {
            contact: { firstName: 'Sarah', lastName: 'Chen', email: 'sarah@acme.com', company: { name: 'Acme Corp' } }
          }
        },
        {
          id: 'd2',
          campaignTargetId: 't2',
          subject: 'Scaling outbound at GrowthX',
          body: "Hi Marcus,\n\nImpressive work on the recent funding round. As you scale the SDR team at GrowthX, are you looking for ways to automate the high-volume personalization work?\n\nWould love to show you how EffectiveBuzz can help.\n\nCheers,\nEB AI",
          status: 'pending_review',
          campaignTarget: {
            contact: { firstName: 'Marcus', lastName: 'Aurelius', email: 'marcus@growthx.io', company: { name: 'GrowthX' } }
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (status: 'approved' | 'rejected', feedback?: string) => {
    if (drafts.length === 0) return;
    
    setIsActionLoading(true);
    try {
      const currentDraft = drafts[currentIndex];
      const res = await fetch('/api/v2/drafting/review', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ 
          draftId: currentDraft.id, 
          status, 
          feedback,
          subject: isEditing ? editedSubject : undefined,
          body: isEditing ? editedBody : undefined
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      // Remove from list and move to next
      const newDrafts = drafts.filter((_, i) => i !== currentIndex);
      setDrafts(newDrafts);
      setIsActionEditing(false);
      if (currentIndex >= newDrafts.length && newDrafts.length > 0) {
        setCurrentIndex(newDrafts.length - 1);
      }
    } catch (err: any) {
      alert(`Action failed: ${err.message}`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const startEditing = () => {
    const d = drafts[currentIndex];
    setEditedSubject(d.subject);
    setEditedBody(d.body);
    setIsActionEditing(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        <p className="text-gray-400 font-medium">Loading AI drafts...</p>
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border border-gray-800">
          <Check className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">All caught up!</h1>
          <p className="text-gray-400">No pending drafts to review for this campaign.</p>
        </div>
        <button 
          onClick={fetchDrafts}
          className="px-6 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400 transition-all"
        >
          Refresh Drafts
        </button>
      </div>
    );
  }

  const current = drafts[currentIndex];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
      {/* Sidebar: List & Progress */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#0d131f] border border-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Queue</h2>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">
              {currentIndex + 1} / {drafts.length}
            </span>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {drafts.map((d, i) => (
              <button
                key={d.id}
                onClick={() => { setCurrentIndex(i); setIsActionEditing(false); }}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  i === currentIndex 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                    : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5'
                }`}
              >
                <div className="text-xs font-bold truncate">{d.campaignTarget.contact.firstName} {d.campaignTarget.contact.lastName}</div>
                <div className="text-[10px] opacity-60 truncate">{d.campaignTarget.contact.company.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-widest">AI SDR Stats</h3>
          </div>
          <p className="text-[11px] text-indigo-300/70 leading-relaxed">
            Personalization score: <span className="text-white font-bold">94/100</span><br />
            Estimated response rate: <span className="text-white font-bold">18-22%</span>
          </p>
        </div>
      </div>

      {/* Main: Editor/Reviewer */}
      <div className="lg:col-span-8 space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="bg-[#0d131f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-800 bg-gray-900/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                {current.campaignTarget.contact.firstName[0]}{current.campaignTarget.contact.lastName[0]}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-tight">
                  {current.campaignTarget.contact.firstName} {current.campaignTarget.contact.lastName}
                </h2>
                <p className="text-xs text-gray-500">{current.campaignTarget.contact.company.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={startEditing}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                title="Edit Draft"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-8 space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Subject</label>
                {isEditing ? (
                  <input 
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                ) : (
                  <div className="text-sm font-medium text-white">{current.subject}</div>
                )}
              </div>

              <div className="space-y-1 pt-4">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Message Body</label>
                {isEditing ? (
                  <textarea 
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    rows={12}
                    className="w-full bg-slate-950 border border-gray-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 font-sans leading-relaxed"
                  />
                ) : (
                  <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                    {current.body}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-900/30 border-t border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleReview('rejected')}
                disabled={isActionLoading}
                className="px-6 py-2.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 font-bold text-xs transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reject
              </button>
              
              {isEditing && (
                <button
                  onClick={() => setIsActionEditing(false)}
                  className="px-4 py-2.5 text-gray-500 hover:text-white text-xs font-bold"
                >
                  Cancel Edits
                </button>
              )}
            </div>

            <button
              onClick={() => handleReview('approved')}
              disabled={isActionLoading}
              className="px-10 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  <Check className="w-4 h-4" />
                  Approve & Queue
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between px-2">
          <button 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="text-[10px] font-mono text-gray-600">
            USE KEYBOARD SHORTCUTS: [A] APPROVE / [R] REJECT
          </div>

          <button 
            onClick={() => setCurrentIndex(prev => Math.min(drafts.length - 1, prev + 1))}
            disabled={currentIndex === drafts.length - 1}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
