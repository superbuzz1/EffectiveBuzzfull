// src/components/CompanyManagementPlayground.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Plus, Edit, Trash2, ArrowUpRight, Search, Filter, 
  ArrowLeft, CheckCircle, AlertCircle, StickyNote, FileSpreadsheet, 
  UploadCloud, Play, RotateCcw, Heart, Building, BarChart3, TrendingUp, 
  ShieldCheck, HelpCircle, UserPlus, Sliders, Check, X, Layers, Terminal
} from 'lucide-react';

interface CompanyNote {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

interface CompanyScoringBreakdown {
  sizeScore: number;
  revenueScore: number;
  statusScore: number;
  industryBonus: number;
  manualAdjustment: number;
  calculatedAt: string;
}

interface Company {
  id: string;
  tenantId: string;
  name: string;
  domain: string;
  industry: string;
  size: number;
  revenue: number;
  city: string | null;
  country: string | null;
  status: 'Lead' | 'Prospect' | 'Customer' | 'Churned' | 'Inactive';
  score: number;
  scoringBreakdown: CompanyScoringBreakdown;
  notes: CompanyNote[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface IndustryData {
  name: string;
  growthRate: number;      // YoY growth
  baseWeight: number;      // formula multiplier
  marketCapBillion: number; // in Billions
  keyTrend: string;
  description: string;
}

export default function CompanyManagementPlayground() {
  const seedAccounts = [
    { email: 'alex@acme.com', name: 'Alex Rivera (Owner)', role: 'Owner', tenantId: 'tenant-1' },
    { email: 'sarah@acme.com', name: 'Sarah Chen (Admin)', role: 'Admin', tenantId: 'tenant-1' }
  ];

  // Core Authentication Context
  const [accessToken, setAccessToken] = useState<string>('');
  const [activeUser, setActiveUser] = useState<any>(null);

  // Lists & Filtering
  const [companies, setCompanies] = useState<Company[]>([]);
  const [industries, setIndustries] = useState<IndustryData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [industryFilter, setIndustryFilter] = useState<string>('');
  const [showTrash, setShowTrash] = useState<boolean>(false);

  // Active form management (Create / Edit)
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formFields, setFormFields] = useState({
    name: '',
    domain: '',
    industry: 'SaaS',
    size: 250,
    revenue: 5000000,
    city: '',
    country: '',
    status: 'Lead' as Company['status'],
    manualAdjustment: 0
  });

  // Note management drawer state
  const [selectedCompanyNotes, setSelectedCompanyNotes] = useState<Company | null>(null);
  const [newNoteContent, setNewNoteContent] = useState<string>('');

  // CSV Drag-and-Drop & import modal
  const [showCSVModal, setShowCSVModal] = useState<boolean>(false);
  const [csvInputText, setCsvInputText] = useState<string>('');
  const [csvFileError, setCsvFileError] = useState<string | null>(null);

  // Audit Logs Terminal Stream
  const [terminalLogs, setTerminalLogs] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'fail' | 'info'; text: string } | null>({
    type: 'info',
    text: 'Access Granted under security sandbox key. Connect an active session above to lease workspace metrics.'
  });

  const writeToConsole = (msg: string) => {
    const time = new Date().toISOString().substring(11, 19);
    setTerminalLogs(prev => `[${time}] ${msg}\n${prev}`);
  };

  // Connect seed credentials
  const authenticateUser = async (email: string) => {
    setStatusMsg({ type: 'info', text: `Initiating multi-tenant JWT credentials handshake for ${email}...` });
    writeToConsole(`API_CALL -> POST /api/v2/auth/login [Acquiring Sandbox Token]`);
    
    try {
      const res = await fetch('/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      const resBody = await res.json();

      if (!res.ok) {
        throw new Error(resBody.error || "Workspace key validation failed.");
      }

      setAccessToken(resBody.accessToken);
      setActiveUser(resBody.user);
      writeToConsole(`SUCCESS -> JWT Token secure leases. Subject: ${resBody.user.id}, Tenancy: ${resBody.user.tenantId}`);
      setStatusMsg({ type: 'ok', text: `Handshake Completed: Multi-tenant session started for ${resBody.user.name}.` });

      // Refresh data assets immediately
      fetchCompanies(resBody.accessToken, false);
      fetchIndustries(resBody.accessToken);

    } catch (err: any) {
      writeToConsole(`API_FAULT -> Auth negotiation rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // Main list requests
  const fetchCompanies = async (token: string, includeDeleted: boolean) => {
    writeToConsole(`API_CALL -> GET /api/v2/companies?includeDeleted=${includeDeleted}&search=${search}&status=${statusFilter}&industry=${industryFilter}`);
    try {
      const url = `/api/v2/companies?includeDeleted=${includeDeleted}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(statusFilter)}&industry=${encodeURIComponent(industryFilter)}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not query company records.");

      setCompanies(data.companies || []);

      // Keep notes drawer synced if any notes drawer was opened
      if (selectedCompanyNotes) {
        const freshlyLoaded = (data.companies || []).find((c: Company) => c.id === selectedCompanyNotes.id);
        if (freshlyLoaded) {
          setSelectedCompanyNotes(freshlyLoaded);
        }
      }

      writeToConsole(`SUCCESS -> Pulled ${data.companies?.length || 0} company records under active tenant context.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Fetch failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const fetchIndustries = async (token: string) => {
    writeToConsole(`API_CALL -> GET /api/v2/companies/industries`);
    try {
      const res = await fetch('/api/v2/companies/industries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Cannot retrieve industry classifications.");

      setIndustries(data.industries || []);
      writeToConsole(`SUCCESS -> Loaded ${data.industries?.length || 0} standardized industry reference profiles.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Industries lookup failed: ${err.message}`);
    }
  };

  // Search filter trigger block
  useEffect(() => {
    if (accessToken) {
      fetchCompanies(accessToken, showTrash);
    }
  }, [search, statusFilter, industryFilter, showTrash]);

  const handleOpenCreateModal = () => {
    setEditingCompany(null);
    setFormFields({
      name: '',
      domain: '',
      industry: industries[0]?.name || 'SaaS',
      size: 150,
      revenue: 2500000,
      city: '',
      country: '',
      status: 'Lead',
      manualAdjustment: 0
    });
    setShowFormModal(true);
  };

  const handleOpenEditModal = (c: Company) => {
    setEditingCompany(c);
    setFormFields({
      name: c.name,
      domain: c.domain,
      industry: c.industry,
      size: c.size,
      revenue: c.revenue,
      city: c.city || '',
      country: c.country || '',
      status: c.status,
      manualAdjustment: c.scoringBreakdown.manualAdjustment
    });
    setShowFormModal(true);
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    const payload = {
      name: formFields.name,
      domain: formFields.domain,
      industry: formFields.industry,
      size: Number(formFields.size),
      revenue: Number(formFields.revenue),
      city: formFields.city || null,
      country: formFields.country || null,
      status: formFields.status,
      manualAdjustment: Number(formFields.manualAdjustment)
    };

    const isExisting = !!editingCompany;
    const url = isExisting ? `/api/v2/companies/${editingCompany.id}` : '/api/v2/companies';
    const method = isExisting ? 'PUT' : 'POST';

    writeToConsole(`API_CALL -> ${method} ${url} [Payload Sent]`);
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save rejected near verification filters.");

      writeToConsole(`SUCCESS -> Company save accepted. Target ID: ${data.company?.id}, Score Computed: ${data.company?.score}`);
      setStatusMsg({ type: 'ok', text: `Success: Company '${payload.name}' record updated. Computed lead health score: ${data.company?.score}/100.` });
      
      setShowFormModal(false);
      fetchCompanies(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Cannot save company record: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleDeleteCompany = async (id: string, name: string) => {
    if (!accessToken) return;
    writeToConsole(`API_CALL -> DELETE /api/v2/companies/${id} [Soft Delete Trigger]`);
    try {
      const res = await fetch(`/api/v2/companies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete action rejected.");

      writeToConsole(`SUCCESS -> Soft deleted company record: ${name}.`);
      setStatusMsg({ type: 'ok', text: `Archived: '${name}' soft-deleted. File placed in recovery trash.` });
      fetchCompanies(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Delete transaction failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleRestoreCompany = async (id: string, name: string) => {
    if (!accessToken) return;
    writeToConsole(`API_CALL -> POST /api/v2/companies/${id}/restore [Rescue Record]`);
    try {
      const res = await fetch(`/api/v2/companies/${id}/restore`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Recovery process failed.");

      writeToConsole(`SUCCESS -> Resurrected company profile: ${name}.`);
      setStatusMsg({ type: 'ok', text: `Restored: '${name}' is back inside main active sales loops.` });
      fetchCompanies(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Restore transaction failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !selectedCompanyNotes || !newNoteContent.trim()) return;

    const companyId = selectedCompanyNotes.id;
    writeToConsole(`API_CALL -> POST /api/v2/companies/${companyId}/notes [Log Discussion Item]`);
    try {
      const res = await fetch(`/api/v2/companies/${companyId}/notes`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ content: newNoteContent })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not log meeting touchpoint.");

      writeToConsole(`SUCCESS -> Pinned discussion note on Company: ${selectedCompanyNotes.name}. ID: ${data.note?.id}`);
      setNewNoteContent('');
      fetchCompanies(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Notes dispatch failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleCSVImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    if (!csvInputText.trim()) {
      setCsvFileError("Raw text input or dragged spreadsheet rows cannot be left blank.");
      return;
    }

    writeToConsole(`API_CALL -> POST /api/v2/companies/import-csv [Transferring multi-line strings]`);
    try {
      const res = await fetch('/api/v2/companies/import-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ csvContent: csvInputText })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "CSV parsing service aborted.");

      writeToConsole(`SUCCESS -> CSV parsed and deployed. New Company accounts injected: ${data.count}`);
      setStatusMsg({ type: 'ok', text: `Injected: Successfully ingested ${data.count} organizational profiles via binary block loader.` });
      
      setCsvInputText('');
      setShowCSVModal(false);
      setCsvFileError(null);
      fetchCompanies(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Stream breakdown encountered: ${err.message}`);
      setCsvFileError(err.message);
    }
  };

  const loadCSVSample = () => {
    const sample = `name,domain,industry,size,revenue,city,country,status,adjustment
"Cyberdyne Corp","cyberdyne.ai","SaaS",1400,38000000,"Sunnyvale","United States","Lead",5
"Massive Dynamic","massivedynamic.co","Fintech",12500,4500000000,"Boston","United States","Prospect",15
"Tyrell Genomics","tyrell.jp","Healthcare",800,12000000,"Tokyo","Japan","Customer",-10
"Initech Systems","initech.com","E-Commerce",45,850000,"Austin","United States","Inactive",0`;
    setCsvInputText(sample);
    writeToConsole(`INFO -> Seeded template CSV data points to editor buffer.`);
  };

  const formatRevenue = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B ARR`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M ARR`;
    }
    return `$${value.toLocaleString()} ARR`;
  };

  // Dynamic style badge mapping
  const getStatusBadge = (status: Company['status']) => {
    switch(status) {
      case 'Customer':
        return <span className='px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-800/80 inline-flex items-center gap-1'><span className='h-1.5 w-1.5 rounded-full bg-emerald-400'></span>Customer</span>;
      case 'Prospect':
        return <span className='px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-950/40 text-blue-400 border border-blue-800/80 inline-flex items-center gap-1'><span className='h-1.5 w-1.5 rounded-full bg-blue-400'></span>Prospect</span>;
      case 'Lead':
        return <span className='px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-950/40 text-amber-400 border border-amber-800/80 inline-flex items-center gap-1'><span className='h-1.5 w-1.5 rounded-full bg-amber-400'></span>Lead</span>;
      case 'Churned':
        return <span className='px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-950/40 text-rose-400 border border-rose-800/80 inline-flex items-center gap-1'><span className='h-1.5 w-1.5 rounded-full bg-rose-400'></span>Churned</span>;
      default:
        return <span className='px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-400 border border-slate-700 inline-flex items-center gap-1'><span className='h-1.5 w-1.5 rounded-full bg-slate-400'></span>Inactive</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-800 bg-emerald-950/20';
    if (score >= 50) return 'text-amber-400 border-amber-800 bg-amber-950/20';
    return 'text-rose-400 border-rose-800 bg-rose-950/20';
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-950 border border-indigo-500/30 rounded-lg text-indigo-400">
              <Building2 className="h-6 w-6" id="com-icon" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                Company Account Directory
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">Row Isolation v2</span>
              </h2>
              <p className="text-sm text-slate-400">
                Multi-tenant organizational indexes, algorithmic scoring evaluators, notes logs, and audit logging databases.
              </p>
            </div>
          </div>

          {/* Quick Handshake Auth Presets */}
          <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 font-mono pl-1">Sign-In Lease:</span>
            {seedAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => authenticateUser(acc.email)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all inline-flex items-center gap-1.5 ${
                  activeUser?.email === acc.email
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${activeUser?.email === acc.email ? 'bg-emerald-400' : 'bg-slate-400'}`}></div>
                {acc.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Operational Banner alerts */}
        {statusMsg && (
          <div className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs transition duration-200 ${
            statusMsg.type === 'ok' 
              ? 'bg-emerald-950/30 border-emerald-805 text-emerald-300' 
              : statusMsg.type === 'fail' 
              ? 'bg-rose-950/30 border-rose-805 text-rose-300' 
              : 'bg-indigo-950/20 border-indigo-800 text-indigo-300'
          }`}>
            {statusMsg.type === 'ok' ? (
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
            ) : statusMsg.type === 'fail' ? (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            ) : (
              <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-400 mt-0.5" />
            )}
            <p className="leading-relaxed">{statusMsg.text}</p>
          </div>
        )}
      </div>

      {accessToken ? (
        <>
          {/* Industry Classification Data Cards Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Industry Trend & Base Weight Indices</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {industries.length > 0 ? (
                industries.map((ind, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 font-mono text-sm">{ind.name}</span>
                      <span className="text-xs px-1.5 py-0.5 font-bold rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">
                        +{ind.growthRate}% YoY
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] line-clamp-2">
                      {ind.description}
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Cap: ${ind.marketCapBillion}B</span>
                      <span className="text-indigo-400">Bonus weight: +{ind.baseWeight}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-4 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
                  Awaiting connection validation...
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main CRM Ledger list */}
            <div className="lg:col-span-8 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
              
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search company or domain..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 pr-4 py-2 text-xs font-mono rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 w-48 transition"
                    />
                  </div>

                  {/* Status filter */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 text-xs font-semibold rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none"
                    >
                      <option value="">All Statuses</option>
                      <option value="Lead">Lead</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Customer">Customer</option>
                      <option value="Churned">Churned</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Industry list filter */}
                  <div className="relative">
                    <select
                      value={industryFilter}
                      onChange={(e) => setIndustryFilter(e.target.value)}
                      className="px-3 py-2 text-xs font-semibold rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none"
                    >
                      <option value="">All Industries</option>
                      {industries.map((ind, id) => (
                        <option key={id} value={ind.name}>{ind.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Recycle trash lock toggle */}
                  <button
                    onClick={() => setShowTrash(!showTrash)}
                    className={`px-3 py-2 text-xs rounded transition font-medium inline-flex items-center gap-1.5 ${
                      showTrash 
                        ? 'bg-rose-950 text-rose-400 border border-rose-800' 
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {showTrash ? "Show Active Only" : "Show Soft-Deleted"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCSVModal(true)}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-850 rounded text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    CSV Bulk Load
                  </button>
                  <button
                    onClick={handleOpenCreateModal}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Company
                  </button>
                </div>
              </div>

              {/* Records table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-850 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Company Profile</th>
                      <th className="py-3 px-4">Industry / Domain</th>
                      <th className="py-3 px-4">Firmographics</th>
                      <th className="py-3 px-4">Lead score</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/50 text-slate-300">
                    {companies.length > 0 ? (
                      companies.map((c) => (
                        <tr 
                          key={c.id} 
                          className={`hover:bg-slate-850/20 transition-all ${
                            selectedCompanyNotes?.id === c.id ? 'bg-indigo-950/10' : ''
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-400 shrink-0">
                                <Building className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="font-bold text-slate-100 block">{c.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono block">
                                  ID: {c.id}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <span className="text-xs px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-850 inline-block mb-1">
                                {c.industry}
                              </span>
                              <a 
                                href={`https://${c.domain}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs text-indigo-400 font-mono flex items-center gap-0.5 hover:underline"
                              >
                                {c.domain}
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-0.5">
                              <span className="text-xs block font-semibold text-slate-400">
                                {c.size.toLocaleString()} headcount
                              </span>
                              <span className="text-[10px] block font-mono text-slate-500">
                                {formatRevenue(c.revenue)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-mono">
                            <div className="flex items-center gap-2">
                              <div className={`px-2 py-1 text-xs font-bold rounded-lg border flex items-center gap-1 ${getScoreColor(c.score)}`}>
                                <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                                {c.score}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(c.status)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {/* Open notes discussion drawer */}
                              <button
                                onClick={() => setSelectedCompanyNotes(c)}
                                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-amber-400 transition"
                                title="Engagement Notes"
                              >
                                <StickyNote className="h-4 w-4" />
                              </button>

                              {!c.deletedAt ? (
                                <>
                                  <button
                                    onClick={() => handleOpenEditModal(c)}
                                    className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-indigo-400 transition"
                                    title="Edit Profile"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCompany(c.id, c.name)}
                                    className="p-1.5 hover:bg-rose-950/50 rounded text-slate-400 hover:text-rose-400 transition"
                                    title="Soft-Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleRestoreCompany(c.id, c.name)}
                                  className="p-1 bg-slate-950 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-800 text-indigo-400 rounded text-xs shrink-0 font-bold transition px-2 py-1 flex items-center gap-0.5"
                                  title="Resuscitate record"
                                >
                                  <RotateCcw className="h-3 w-3" />
                                  Restore
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                          {search || statusFilter || industryFilter 
                            ? "No entries matched your currently configured search filter scopes." 
                            : "Account ledger currently empty. Add direct companies or upload a bulk CSV segment at the top right to start."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side-panel details layout for selected company notes or scoring breakdown */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Dynamic Score Calculator Interactive Playroom */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-sm uppercase font-mono">
                    <Sliders className="h-4 w-4" />
                    <span>Real-Time Lead Analyzer</span>
                  </div>
                  <HelpCircle className="h-4 w-4 text-slate-500 hover:text-indigo-400 cursor-pointer transition" title="Score variables layout details" />
                </div>

                {selectedCompanyNotes ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">Inspecting Scoring:</span>
                      <span className="text-xs font-bold font-mono text-indigo-400">{selectedCompanyNotes.name}</span>
                    </div>

                    {/* Circular dial gauge SVG info */}
                    <div className="flex flex-col items-center py-2 space-y-1 bg-slate-950 border border-slate-850 rounded-lg">
                      <div className="relative h-24 w-24">
                        <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-850"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="transparent"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-indigo-500 transition-all duration-700"
                            strokeWidth="3.5"
                            strokeDasharray={`${selectedCompanyNotes.score}, 100`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-slate-100 font-mono tracking-tighter">
                            {selectedCompanyNotes.score}
                          </span>
                          <span className="text-[8px] uppercase text-slate-500 font-bold font-mono">HEALTH</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest pt-1">
                        Algorithmic Health
                      </span>
                    </div>

                    {/* Horizontal score breakdown weights */}
                    <div className="space-y-2.5 text-xs">
                      {/* Sizemetric */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-400">
                          <span>Size Headcount Score:</span>
                          <span className="text-slate-200">{selectedCompanyNotes.scoringBreakdown.sizeScore}/35 pts</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all"
                            style={{ width: `${(selectedCompanyNotes.scoringBreakdown.sizeScore / 35) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Revenue */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-400">
                          <span>Contract Valuation (ARR):</span>
                          <span className="text-slate-200">{selectedCompanyNotes.scoringBreakdown.revenueScore}/40 pts</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all"
                            style={{ width: `${(selectedCompanyNotes.scoringBreakdown.revenueScore / 40) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-400">
                          <span>Sales Funnel Status:</span>
                          <span className="text-slate-200">{selectedCompanyNotes.scoringBreakdown.statusScore}/15 pts</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all"
                            style={{ width: `${(selectedCompanyNotes.scoringBreakdown.statusScore / 15) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Industry segment growth */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-400">
                          <span>Growth Bonus:</span>
                          <span className="text-slate-200">+{selectedCompanyNotes.scoringBreakdown.industryBonus}/10 pts</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all"
                            style={{ width: `${(selectedCompanyNotes.scoringBreakdown.industryBonus / 10) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Manual Overlay risk indicator */}
                      <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-[11px] text-slate-400 font-mono">
                        <span>Risk Dial (Manual Adjustment):</span>
                        <span className={`font-bold ${selectedCompanyNotes.scoringBreakdown.manualAdjustment >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                          {selectedCompanyNotes.scoringBreakdown.manualAdjustment >= 0 ? '+' : ''}
                          {selectedCompanyNotes.scoringBreakdown.manualAdjustment} pts
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <Sliders className="h-8 w-8 text-slate-700 mx-auto" />
                    <p className="text-xs text-slate-500 font-mono leading-relaxed px-4">
                      Select any company to verify visual representation of weights, bonuses, manual risk sliders, and dynamic audits.
                    </p>
                  </div>
                )}
              </div>

              {/* Engagement Notes Log timeline section */}
              {selectedCompanyNotes && (
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm uppercase font-mono">
                      <StickyNote className="h-4 w-4" />
                      <span>Engagement touchpoints</span>
                    </div>
                    <button
                      onClick={() => setSelectedCompanyNotes(null)}
                      className="text-slate-500 hover:text-slate-300 font-bold font-mono text-xs"
                    >
                      Close ×
                    </button>
                  </div>

                  {/* Notes Timeline feed */}
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                    {selectedCompanyNotes.notes.length > 0 ? (
                      selectedCompanyNotes.notes.map((n, idx) => (
                        <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-1.5">
                          <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {n.content}
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span className="text-indigo-400 font-semibold">{n.authorName}</span>
                            <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-6 text-xs text-slate-500 font-mono">
                        No discussion touchpoints logged for {selectedCompanyNotes.name}.
                      </p>
                    )}
                  </div>

                  {/* Add note interface */}
                  <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-850">
                    <textarea
                      placeholder="Add conversation summary, timeline update, or next action triggers..."
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 text-xs rounded bg-slate-950 border border-slate-800 focus:outline-none focus:border-indigo-500 font-sans text-slate-200 placeholder-slate-600 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={!newNoteContent.trim()}
                      className="w-full py-1.5 bg-indigo-600 border border-indigo-500/20 disabled:opacity-40 disabled:hover:bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold tracking-tight transition"
                    >
                      Pin Account Note
                    </button>
                  </form>
                </div>
              )}

              {/* Terminal audit logs streaming */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase font-mono">
                    <Terminal className="h-4 w-4 shrink-0" />
                    <span>Compliance & Security Trails</span>
                  </div>
                  <button
                    onClick={() => {
                      setTerminalLogs('');
                      writeToConsole("Cleared session log buffer.");
                    }}
                    className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
                  >
                    Clear Logs
                  </button>
                </div>
                
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 h-[180px] font-mono text-[10px] text-emerald-500 overflow-y-auto leading-relaxed">
                  {terminalLogs ? (
                    <pre className="whitespace-pre-wrap">{terminalLogs}</pre>
                  ) : (
                    <span className="text-slate-600 italic">No backend operations executed under this session. Run actions to stream audit trails.</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </>
      ) : (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl max-w-xl mx-auto space-y-4">
          <Building2 className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">Connect Workspace Session</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Company record directories are protected under row-level multi-tenant security layers. Select one of our pre-authorized subscription accounts in the header presets to initialize secure tokens and fetch indices.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-2">
            {seedAccounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => authenticateUser(acc.email)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-300 border border-slate-800 hover:text-white rounded-lg transition-all flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                Sign in as {acc.name.split(' (')[0]} ({acc.role})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CREATE & EDIT DISK MODAL CONTAINER */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                <Building className="h-4 w-4 text-indigo-400" />
                {editingCompany ? `Modify Profile: ${editingCompany.name}` : "Register New Portfolio Company"}
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-slate-500 hover:text-slate-300 font-semibold font-mono text-xs"
              >
                Close ×
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">Company Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">Domain coordinate:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. acme.com"
                    value={formFields.domain}
                    onChange={(e) => setFormFields({ ...formFields, domain: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">Industry classification:</label>
                  <select
                    value={formFields.industry}
                    onChange={(e) => setFormFields({ ...formFields, industry: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-250 focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    {industries.map((ind, id) => (
                      <option key={id} value={ind.name}>{ind.name}</option>
                    ))}
                    <option value="Manual / Other">Manual / Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">Size headcount (Headcount):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formFields.size}
                    onChange={(e) => setFormFields({ ...formFields, size: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">Annual Revenue ARR (USD):</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formFields.revenue}
                    onChange={(e) => setFormFields({ ...formFields, revenue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">City Location:</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco"
                    value={formFields.city}
                    onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono">Country Location:</label>
                  <input
                    type="text"
                    placeholder="e.g. United States"
                    value={formFields.country}
                    onChange={(e) => setFormFields({ ...formFields, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 font-mono block">Active Lifecycle Status:</label>
                  <div className="flex gap-2">
                    {['Lead', 'Prospect', 'Customer', 'Churned', 'Inactive'].map((statusOption) => (
                      <button
                        key={statusOption}
                        type="button"
                        onClick={() => setFormFields({ ...formFields, status: statusOption as Company['status'] })}
                        className={`flex-1 py-1.5 rounded text-xs font-semibold border transition ${
                          formFields.status === statusOption
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {statusOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-none">
                    <span>Account Manual adjust (sales dial):</span>
                    <span className={`font-bold font-mono text-xs ${formFields.manualAdjustment >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {formFields.manualAdjustment >= 0 ? '+' : ''}{formFields.manualAdjustment} points
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    step="1"
                    value={formFields.manualAdjustment}
                    onChange={(e) => setFormFields({ ...formFields, manualAdjustment: Number(e.target.value) })}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500 font-sans block leading-tight">
                    Add or subtract rating adjustments as risk overrides based on relationship depth or strategic goals.
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded shadow-lg transition inline-flex items-center gap-1"
                >
                  <Check className="h-3.5 w-3.5" />
                  Save Company Records
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV INTEGRATED MASS LOADER MODAL CONTAINER */}
      {showCSVModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 space-y-6 animate-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-emerald-400 mr-0.5" />
                CSV Bulk Import Engine
              </h3>
              <button
                onClick={() => {
                  setShowCSVModal(false);
                  setCsvFileError(null);
                }}
                className="text-slate-500 hover:text-slate-300 font-semibold font-mono text-xs"
              >
                Close ×
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Drag spreadsheet data or paste comma-separated content directly in the workspace below. Columns must map to <code className="text-indigo-400 font-mono px-1 py-0.5 rounded bg-slate-950">name,domain,industry,size,revenue,city,country,status,adjustment</code>.
            </p>

            {csvFileError && (
              <div className="p-3 rounded bg-rose-950/30 border border-rose-805 text-rose-300 text-xs">
                {csvFileError}
              </div>
            )}

            <form onSubmit={handleCSVImport} className="space-y-4">
              <div className="space-y-1 bg-slate-950 border border-slate-850 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">CSV Input Workspace</span>
                  <button
                    type="button"
                    onClick={loadCSVSample}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline font-mono"
                  >
                    Load Seed Template
                  </button>
                </div>
                <textarea
                  placeholder='paste standard commas block...'
                  value={csvInputText}
                  onChange={(e) => setCsvInputText(e.target.value)}
                  rows={8}
                  className="w-full p-2.5 text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800 rounded focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setShowCSVModal(false);
                    setCsvFileError(null);
                  }}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 font-medium rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold inline-flex items-center gap-1 shadow-lg transition"
                >
                  <UploadCloud className="h-4 w-4" />
                  Launch CRM Import Parser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
