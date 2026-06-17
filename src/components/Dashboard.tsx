import React, { useState, useEffect } from 'react';
import { Target, Users, Mail, Percent, Play, Plus, Search, Sparkles, Send, Loader2, Info, AlertTriangle, CheckCircle, RefreshCw, FileEdit } from 'lucide-react';
import { Campaign, Lead } from '../types';
import DraftReview from '../app/components/DraftReview';

interface DashboardProps {
  currentTenant: { id: string; name: string; plan: string };
  rbacRole: string;
}

export default function Dashboard({ currentTenant, rbacRole }: DashboardProps) {
  const [view, setView] = useState<'overview' | 'draft_review'>('overview');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Custom campaign creator state
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignAudience, setNewCampaignAudience] = useState('');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [isSubmittingCampaign, setIsSubmittingCampaign] = useState(false);

  // AI outreach agent generation state
  const [customPromptGuide, setCustomPromptGuide] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [generatedSubject, setGeneratedSubject] = useState('');
  const [generatedBody, setGeneratedBody] = useState('');
  const [generationMetadata, setGenerationMetadata] = useState<{ mode: string; elapsedMs?: number; error?: string } | null>(null);

  // Load campaigns first on mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();
      setCampaigns(data);
      if (data.length > 0 && !selectedCampaign) {
        setSelectedCampaign(data[0]);
      }
    } catch (err) {
      console.error('Failed to resolve campaigns:', err);
    }
  };

  // Fetch leads whenever campaign selection shifts
  useEffect(() => {
    if (selectedCampaign) {
      fetchLeads(selectedCampaign.id);
    }
  }, [selectedCampaign]);

  const fetchLeads = async (campaignId: string) => {
    try {
      const res = await fetch(`/api/leads/${campaignId}`);
      const data = await res.json();
      setLeads(data);
      if (data.length > 0) {
        setSelectedLead(data[0]);
      } else {
        setSelectedLead(null);
      }
      setGeneratedSubject('');
      setGeneratedBody('');
      setGenerationMetadata(null);
    } catch (err) {
      console.error('Failed to fetch leads for campaign:', err);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName) return;

    if (rbacRole === 'Agent') {
      alert("RBAC ACCESS VIOLATION: Users assigned to the 'Agent' role are unauthorized to construct new campaigns.");
      return;
    }

    setIsSubmittingCampaign(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCampaignName,
          targetAudience: newCampaignAudience || "SaaS Founders"
        })
      });
      const data = await res.json();
      setCampaigns(prev => [...prev, data]);
      setSelectedCampaign(data);
      setNewCampaignName('');
      setNewCampaignAudience('');
      setIsCreatingCampaign(false);
    } catch (err) {
      console.error('Failed to persist campaign:', err);
    } finally {
      setIsSubmittingCampaign(false);
    }
  };

  const handleGenerateAIOutreach = async () => {
    if (!selectedCampaign || !selectedLead) return;

    setIsGeneratingEmail(true);
    setGeneratedSubject('');
    setGeneratedBody('');
    setGenerationMetadata(null);

    try {
      const res = await fetch('/api/ai/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName: selectedCampaign.name,
          targetAudience: selectedCampaign.targetAudience + (customPromptGuide ? ` (Guide constraints: ${customPromptGuide})` : ''),
          leadName: `${selectedLead.firstName} ${selectedLead.lastName}`,
          company: selectedLead.company,
          title: selectedLead.title
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setGeneratedSubject(data.subject);
        setGeneratedBody(data.body);
        setGenerationMetadata({
          mode: data.mode,
          elapsedMs: data.durationMs,
          error: data.error
        });
        
        setLeads(prev => prev.map(ld => {
          if (ld.id === selectedLead.id) {
            return { ...ld, status: 'Emailed', personalizedEmail: data.body };
          }
          return ld;
        }));
      }
    } catch (err: any) {
      console.error('API outreach generation failure:', err);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Multi-Tenant context info */}
      <div className="bg-[#182235]/40 border border-[#1f2937] rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <div className="text-xs">
            Current Tenant: <strong className="text-white text-sm font-display font-medium ml-1">{currentTenant.name}</strong> 
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded ml-2 uppercase">
              {currentTenant.plan} Client
            </span>
          </div>
        </div>
        <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded">
          RBAC Authorization: <strong className="text-emerald-400 font-bold uppercase">{rbacRole}</strong>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-800">
        <button 
          onClick={() => setView('overview')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
            view === 'overview' 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          Overview
        </button>
        <button 
          onClick={() => setView('draft_review')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
            view === 'draft_review' 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          Draft Review
        </button>
      </div>

      {view === 'draft_review' ? (
        <DraftReview />
      ) : (
        <>
          {/* Grid of microstats indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Campaigns", val: campaigns.length, icon: Target, c: "text-blue-400" },
              { label: "Candidates Tracked", val: leads.length, icon: Users, c: "text-amber-400" },
              { label: "Campaign Emails Sent", val: selectedCampaign ? selectedCampaign.emailsSent : 0, icon: Mail, c: "text-emerald-400" },
              { label: "Average Reply Score", val: selectedCampaign ? `${selectedCampaign.conversionRate}%` : '0%', icon: Percent, c: "text-purple-400" }
            ].map((met, i) => (
              <div key={i} className="bg-[#111827] border border-[#1f2937] p-4 rounded-xl flex items-center gap-4 shadow-lg">
                <div className={`w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center ${met.c} border border-gray-800`}>
                  <met.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">{met.label}</span>
                  <h4 className="text-lg font-display font-bold text-white mt-0.5">{met.val}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Side campaigns drawer and CRM Lead list */}
            <div className="lg:col-span-4 space-y-6">
              {/* Campaigns Manager Card */}
              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#818cf8] font-bold">1. Campaigns</span>
                  <button
                    onClick={() => setIsCreatingCampaign(!isCreatingCampaign)}
                    className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all text-[11px] font-bold flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>

                {isCreatingCampaign && (
                  <form onSubmit={handleCreateCampaign} className="p-3 bg-slate-900 border border-gray-800 rounded-lg space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Campaign Title"
                      value={newCampaignName}
                      onChange={(e) => setNewCampaignName(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Target Audience"
                      value={newCampaignAudience}
                      onChange={(e) => setNewCampaignAudience(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => setIsCreatingCampaign(false)} className="text-[10px] text-gray-500">Cancel</button>
                      <button type="submit" className="bg-emerald-500 text-slate-950 px-2 py-1 rounded text-[10px] font-bold">Create</button>
                    </div>
                  </form>
                )}

                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {campaigns.map((cmp) => (
                    <button
                      key={cmp.id}
                      onClick={() => setSelectedCampaign(cmp)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs flex flex-col justify-between transition-all ${
                        selectedCampaign?.id === cmp.id
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate pr-2">{cmp.name}</span>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          {cmp.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CRM Prospect List Card */}
              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-4 shadow-xl">
                <span className="text-xs uppercase font-mono tracking-widest text-[#f59e0b] font-bold block pb-2 border-b border-gray-800">
                  2. CRM Target Leads ({leads.length})
                </span>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {leads.map((ld) => (
                    <button
                      key={ld.id}
                      onClick={() => setSelectedLead(ld)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                        selectedLead?.id === ld.id
                          ? 'bg-blue-500/10 border-blue-500/40 text-white'
                          : 'bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-850'
                      }`}
                    >
                      <div>
                        <h5 className="font-semibold">{ld.firstName} {ld.lastName}</h5>
                        <span className="text-[10px] text-gray-400 truncate max-w-[140px] block">{ld.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Lead Details & AI Agent Workspace */}
            <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl">
              {selectedLead ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-none">{selectedLead.firstName} {selectedLead.lastName}</h3>
                      <p className="text-[10px] text-gray-400 mt-1">{selectedLead.title} @ <strong className="text-gray-300">{selectedLead.company}</strong></p>
                    </div>
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="space-y-4">
                    <textarea 
                      placeholder="Prompt Guidelines..."
                      value={customPromptGuide}
                      onChange={(e) => setCustomPromptGuide(e.target.value)}
                      className="w-full h-24 bg-slate-950 border border-gray-800 rounded-xl p-3 text-xs text-white"
                    />
                    <button 
                      onClick={handleGenerateAIOutreach}
                      disabled={isGeneratingEmail}
                      className="w-full py-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                    >
                      {isGeneratingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                      Generate AI Draft
                    </button>
                  </div>

                  {generatedSubject && (
                    <div className="space-y-4 pt-4 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-2">
                      <div className="bg-slate-950 p-3 rounded-lg border border-gray-800">
                        <span className="text-[10px] text-gray-500 uppercase block mb-1">Subject:</span>
                        <div className="text-xs font-medium text-white">{generatedSubject}</div>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-lg border border-gray-800 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-sans min-h-[150px]">
                        {generatedBody}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
                  <Sparkles className="w-10 h-10 mb-4 opacity-20" />
                  <p className="text-xs font-mono">Select a lead to start drafting outreach.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
