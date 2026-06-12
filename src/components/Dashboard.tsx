import React, { useState, useEffect } from 'react';
import { Target, Users, Mail, Percent, Play, Plus, Search, Sparkles, Send, Loader2, Info, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { Campaign, Lead } from '../types';

interface DashboardProps {
  currentTenant: { id: string; name: string; plan: string };
  rbacRole: string;
}

export default function Dashboard({ currentTenant, rbacRole }: DashboardProps) {
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

    // RBAC Rule check simulated on frontend early
    if (rbacRole === 'Agent') {
      alert("RBAC ACCESS VIOLATION: Users assigned to the 'Agent' role are unauthorized to construct new campaigns (Requires Owner or Admin permissions). Please switch your role in the Admin Portal.");
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
        
        // Update local lead status to Emailed
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

      {/* Main Section */}
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
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Campaign Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise HR VP outreach"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-gray-400">Target Segment Description</label>
                  <input
                    type="text"
                    placeholder="e.g. HR leaders with scale teams"
                    value={newCampaignAudience}
                    onChange={(e) => setNewCampaignAudience(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-end gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCampaign(false)}
                    className="px-2.5 py-1 bg-slate-850 hover:bg-slate-800 text-gray-400 text-[10px] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingCampaign}
                    className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] rounded font-bold transition-all disabled:opacity-55"
                  >
                    {isSubmittingCampaign ? "Saving..." : "Create"}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {campaigns.map((cmp) => (
                <button
                  key={cmp.id}
                  onClick={() => setSelectedCampaign(cmp)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs flex flex-col justify-between transition-all ${
                    selectedCampaign?.id === cmp.id
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-gray-300 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate pr-2">{cmp.name}</span>
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                      cmp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                      cmp.status === 'Paused' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {cmp.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1.5">
                    <span>Segment: <strong>{cmp.targetAudience}</strong></span>
                    <span>Leads: {cmp.leadsCount}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Leads Board Grid selector */}
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3.5 shadow-xl">
            <span className="text-xs uppercase font-mono tracking-widest text-[#818cf8] font-bold block pb-2 border-b border-gray-800">
              2. CRM Target Lead Bank ({leads.length})
            </span>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {leads.length === 0 ? (
                <div className="text-[11px] text-gray-500 text-center py-4 font-mono">
                  No targets found for this campaign.
                </div>
              ) : (
                leads.map((ld) => (
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
                      <span className="text-[10px] text-gray-400 truncate max-w-[140px] block">{ld.title} at <strong>{ld.company}</strong></span>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1 font-mono">
                      <span className={`text-[8px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded ${
                        ld.status === 'Replied' ? 'bg-purple-500/20 text-purple-300' :
                        ld.status === 'Emailed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-gray-400'
                      }`}>
                        {ld.status}
                      </span>
                      <span className="text-[9px] text-[#818cf8] font-mono leading-none">Fit: {ld.score}%</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side Outbound AI Agent Panel */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1f2937] rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#818cf8] font-bold block">
                  3. Outbound AI Agent Simulator
                </span>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Secure server-side outbound email copywriting engine.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>

            {selectedLead ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Outbound Parameters */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-[#182235]/40 border border-slate-850 p-4 rounded-xl space-y-3 text-xs leading-relaxed">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block border-b border-gray-800 pb-1">
                      Recipient Specifications
                    </span>
                    <div className="space-y-1.5 text-[11px]">
                      <div>Name: <strong className="text-white">{selectedLead.firstName} {selectedLead.lastName}</strong></div>
                      <div>Role: <strong className="text-white">{selectedLead.title}</strong></div>
                      <div>Company: <strong className="text-[#818cf8] font-semibold">{selectedLead.company}</strong></div>
                      <div>Contact: <strong className="text-gray-300 font-mono">{selectedLead.email}</strong></div>
                      <div>CRM Campaign: <strong className="text-gray-300">{selectedCampaign?.name}</strong></div>
                      <div>Target segment: <strong className="text-gray-300">{selectedCampaign?.targetAudience}</strong></div>
                    </div>
                  </div>

                  {/* Prompt Guidelines */}
                  <div className="space-y-1.5 text-xs">
                    <label className="text-[10px] uppercase font-mono text-gray-400">Custom Broker Guidelines</label>
                    <textarea
                      placeholder="e.g. Focus on our 14-day ROI guarantee, write with a direct but friendly peer-to-peer tone."
                      value={customPromptGuide}
                      onChange={(e) => setCustomPromptGuide(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/80 leading-relaxed placeholder-gray-600 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerateAIOutreach}
                    disabled={isGeneratingEmail}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-55 group"
                  >
                    {isGeneratingEmail ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Generating Outline...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 fill-slate-950 group-hover:scale-105 transition-transform" />
                        Generate AI outreach draft
                      </>
                    )}
                  </button>
                </div>

                {/* Email Terminal Codebox Output */}
                <div className="md:col-span-7 bg-[#0d131f] border border-gray-850 rounded-xl p-4 flex flex-col justify-between min-h-[300px]">
                  {isGeneratingEmail ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 my-12">
                      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                      <div>
                        <span className="text-xs font-mono text-emerald-400 block animate-pulse">EXECUTING SERVER-SIDE GEMINI API DIALOGUE</span>
                        <span className="text-[10px] text-gray-500 block mt-1 font-mono">Routing through Node REST proxy, masking keys safely...</span>
                      </div>
                    </div>
                  ) : generatedBody ? (
                    <div className="space-y-3.5">
                      {/* Generation Mode indicator */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
                        <span className="text-[9px] uppercase font-mono bg-slate-800 text-gray-300 px-2.5 py-0.5 rounded border border-gray-700">
                          Mode: <strong className={generationMetadata?.mode === 'live' ? 'text-emerald-400' : 'text-amber-400'}>{generationMetadata?.mode === 'live' ? 'LIVE AI' : 'SIMULATED'}</strong>
                        </span>
                        <span className="text-[9px] font-mono text-gray-500">
                          Duration: {generationMetadata?.elapsedMs}ms
                        </span>
                      </div>

                      <div className="space-y-1 bg-slate-950 p-2.5 rounded border border-gray-900">
                        <span className="text-[10px] font-mono text-gray-500 uppercase">Subject:</span>
                        <h4 className="text-xs font-medium text-white">{generatedSubject}</h4>
                      </div>

                      <div className="bg-slate-950 p-3 rounded border border-gray-900 border-dashed text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-wrap max-h-[180px] overflow-y-auto">
                        {generatedBody}
                      </div>

                      {/* Info warning concerning keys if in simulated fallback */}
                      {generationMetadata?.mode === 'simulated' && (
                        <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-1.5 text-[10px] text-amber-300 leading-relaxed font-mono">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                          <span>
                            <strong>Note:</strong> Gemini unconfigured. We returned simulated text for demo continuity. Set your custom credentials inside **Secrets panel** to unlock true generative AI flows.
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-2 h-full py-16">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-emerald-400 border border-gray-800">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="text-center max-w-sm">
                        <span className="text-xs font-semibold text-white block">Copywriter Console is Ready</span>
                        <p className="text-[10px] text-gray-400 leading-relaxed mt-1">
                          Select any candidate lead on the left navigation panel, add guidelines in the text box details as desired, and click the trigger button to draft a cold lead-letter instantly.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-gray-900 flex items-center justify-between text-[9px] text-gray-500 font-mono">
                    <span>Broker: <strong>gemini-2.5-flash</strong></span>
                    <span>Format: <strong>Plaintext markdown</strong></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 text-xs font-mono">
                Please construct at least one campaign above of target prospects.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
