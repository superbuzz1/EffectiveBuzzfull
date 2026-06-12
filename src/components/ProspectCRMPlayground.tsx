// src/components/ProspectCRMPlayground.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, UserPlus, Trash2, Edit, Save, ArrowLeft, Search, Filter, Tag, Plus, 
  FileSpreadsheet, UploadCloud, CheckCircle, AlertCircle, StickyNote, BookOpen, 
  Sparkles, Layers, ShieldCheck, Terminal, RefreshCw, Eye, Check, X, Clipboard
} from 'lucide-react';

interface ProspectNote {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

interface Prospect {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  company: string | null;
  title: string | null;
  phone: string | null;
  status: 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Nurturing';
  tags: string[];
  notes: ProspectNote[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export default function ProspectCRMPlayground() {
  const seedAccounts = [
    { email: 'alex@acme.com', name: 'Alex Rivera (Owner)', role: 'Owner', tenantId: 'tenant-1' },
    { email: 'sarah@acme.com', name: 'Sarah Chen (Admin)', role: 'Admin', tenantId: 'tenant-1' }
  ];

  // Core Session State
  const [accessToken, setAccessToken] = useState<string>('');
  const [activeUser, setActiveUser] = useState<any>(null);

  // Lists & Filtering
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [showTrash, setShowTrash] = useState<boolean>(false);

  // Active form management (Create / Edit)
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    company: '',
    title: '',
    phone: '',
    status: 'New' as Prospect['status'],
    tagsString: ''
  });

  // Note management drawer state
  const [selectedProspectNotes, setSelectedProspectNotes] = useState<Prospect | null>(null);
  const [newNoteContent, setNewNoteContent] = useState<string>('');

  // CSV Drag-and-Drop & import modal
  const [showCSVModal, setShowCSVModal] = useState<boolean>(false);
  const [csvInputText, setCsvInputText] = useState<string>('');
  const [csvFileError, setCsvFileError] = useState<string | null>(null);

  // Monitor metrics & Terminal Stream
  const [terminalLogs, setTerminalLogs] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'fail' | 'info'; text: string } | null>({
    type: 'info',
    text: 'Access granted under the multi-tenant key. Connect to active session above to fetch and interact with Prospects lists.'
  });

  // Unique tags list extracted for filter dropdown
  const [allTags, setAllTags] = useState<string[]>([]);

  const writeToConsole = (msg: string) => {
    const time = new Date().toISOString().substring(11, 19);
    setTerminalLogs(prev => `[${time}] ${msg}\n${prev}`);
  };

  // Perform backend handshake on login
  const authenticateUser = async (email: string) => {
    setStatusMsg({ type: 'info', text: `Initiating multi-tenant JWT credentials verification for ${email}...` });
    writeToConsole(`API_CALL -> POST /api/v2/auth/login [Authenticating Context]`);
    
    try {
      const res = await fetch('/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      const resBody = await res.json();

      if (!res.ok) {
        throw new Error(resBody.error || "Workspace credentials rejected.");
      }

      setAccessToken(resBody.accessToken);
      setActiveUser(resBody.user);
      writeToConsole(`SUCCESS -> Token acquired. JTI: ${resBody.jti || 'unassigned'}, Role clearance: ${resBody.user.role}`);
      setStatusMsg({ type: 'ok', text: `Handshake Complete: Secure session initialized for ${resBody.user.name}.` });

      // Refresh prospects ledger immediately
      fetchProspects(resBody.accessToken, false);

    } catch (err: any) {
      writeToConsole(`API_FAULT -> authentication rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // Main CRUD requests
  const fetchProspects = async (token: string, includeDeleted: boolean) => {
    writeToConsole(`API_CALL -> GET /api/v2/prospects?includeDeleted=${includeDeleted}&search=${search}&status=${statusFilter}&tag=${tagFilter}`);
    try {
      const url = `/api/v2/prospects?includeDeleted=${includeDeleted}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(statusFilter)}&tag=${encodeURIComponent(tagFilter)}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Cannot retrieve prospects records.");

      setProspects(data.prospects || []);
      
      // Compute unique tags for filter
      const tagsSet = new Set<string>();
      (data.prospects || []).forEach((p: Prospect) => {
        p.tags.forEach(t => tagsSet.add(t));
      });
      setAllTags(Array.from(tagsSet));

      writeToConsole(`SUCCESS -> Loaded ${data.prospects?.length || 0} prospect entries.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> fetch failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // Trigger search filters on edit changes
  useEffect(() => {
    if (accessToken) {
      fetchProspects(accessToken, showTrash);
    }
  }, [search, statusFilter, tagFilter, showTrash]);

  const handleOpenCreateModal = () => {
    setEditingProspect(null);
    setFormFields({
      name: '',
      email: '',
      company: '',
      title: '',
      phone: '',
      status: 'New',
      tagsString: ''
    });
    setShowFormModal(true);
  };

  const handleOpenEditModal = (p: Prospect) => {
    setEditingProspect(p);
    setFormFields({
      name: p.name,
      email: p.email,
      company: p.company || '',
      title: p.title || '',
      phone: p.phone || '',
      status: p.status,
      tagsString: p.tags.join('; ')
    });
    setShowFormModal(true);
  };

  const handleSaveProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    const tagsArray = formFields.tagsString
      .split(/[;,]/)
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      name: formFields.name,
      email: formFields.email,
      company: formFields.company || null,
      title: formFields.title || null,
      phone: formFields.phone || null,
      status: formFields.status,
      tags: tagsArray
    };

    const isExisting = !!editingProspect;
    const url = isExisting ? `/api/v2/prospects/${editingProspect.id}` : '/api/v2/prospects';
    const method = isExisting ? 'PUT' : 'POST';

    setStatusMsg({ type: 'info', text: 'Committing prospect record...' });
    writeToConsole(`API_CALL -> ${method} ${url}`);

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

      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Prospect saved. ID: ${data.prospect?.id}`);
      setStatusMsg({ type: 'ok', text: `Prospect "${formFields.name}" successfully committed to database ledger.` });
      setShowFormModal(false);
      fetchProspects(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> submission failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleDeleteProspect = async (id: string, name: string) => {
    if (!accessToken) return;
    if (!confirm(`Are you sure you want to soft delete the prospect "${name}"? It will be removed from your active leads and archived in the trashbin.`)) return;

    setStatusMsg({ type: 'info', text: 'Soft deleting prospect entry...' });
    writeToConsole(`API_CALL -> DELETE /api/v2/prospects/${id}`);

    try {
      const res = await fetch(`/api/v2/prospects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Soft deleted prospect successfully.`);
      setStatusMsg({ type: 'ok', text: `Prospect "${name}" archived in trashbin.` });
      fetchProspects(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> soft delete rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleRestoreProspect = async (id: string, name: string) => {
    if (!accessToken) return;
    setStatusMsg({ type: 'info', text: 'Restoring back state records...' });
    writeToConsole(`API_CALL -> POST /api/v2/prospects/${id}/restore`);

    try {
      const res = await fetch(`/api/v2/prospects/${id}/restore`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Revived soft deleted prospect.`);
      setStatusMsg({ type: 'ok', text: `Prospect "${name}" returned to active leads workspace.` });
      fetchProspects(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> restore rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // Notes Addition
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !selectedProspectNotes || !newNoteContent.trim()) return;

    setStatusMsg({ type: 'info', text: 'Appending note text block...' });
    writeToConsole(`API_CALL -> POST /api/v2/prospects/${selectedProspectNotes.id}/notes`);

    try {
      const res = await fetch(`/api/v2/prospects/${selectedProspectNotes.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ content: newNoteContent })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Added note content successfully.`);
      setStatusMsg({ type: 'ok', text: 'A conversation note entry has been attached.' });
      setNewNoteContent('');
      
      // Reload this prospect state to reflect notes list
      const refreshedList = await fetch(`/api/v2/prospects?includeDeleted=${showTrash}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const listData = await refreshedList.json();
      if (refreshedList.ok) {
        setProspects(listData.prospects || []);
        const nextProspect = (listData.prospects || []).find((p: Prospect) => p.id === selectedProspectNotes.id);
        if (nextProspect) {
          setSelectedProspectNotes(nextProspect);
        }
      }

    } catch (err: any) {
      writeToConsole(`API_FAULT -> note upload failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // CSV Imports Handler
  const handleCSVImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !csvInputText.trim()) return;

    setStatusMsg({ type: 'info', text: 'Parsing raw csv stream data...' });
    writeToConsole(`API_CALL -> POST /api/v2/prospects/import-csv [Processing string batch]`);

    try {
      const res = await fetch('/api/v2/prospects/import-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ csvContent: csvInputText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Imported CSV payload. Count: ${data.count}`);
      setStatusMsg({ type: 'ok', text: `Successful CSV parse: Created ${data.count} prospect accounts.` });
      setCsvInputText('');
      setShowCSVModal(false);
      fetchProspects(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> CSV parsing aborted: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // Bulk Import click (array format)
  const handleBulkImportDemo = async () => {
    if (!accessToken) return;

    const mockProspects = [
      {
        name: "Arthur Dent",
        email: "arthur@galaxy-hitchhiker.com",
        company: "Betelgeuse Inc",
        title: "Sandwich Maker",
        phone: "+44 4242 4242",
        status: "Nurturing",
        tags: ["space", "tea", "earth-refug"]
      },
      {
        name: "Ford Prefect",
        email: "ford.prefect@guidebook.org",
        company: "Megadodo Publications",
        title: "Field Researcher",
        phone: "+44 9999 5555",
        status: "Contacted",
        tags: ["space", "guide", "towel"]
      },
      {
        name: "Zaphod Beeblebrox",
        email: "president@galaxy-hq.org",
        company: "Imperial Cyberworks",
        title: "Ex-President",
        phone: "+99 0000 1111",
        status: "New",
        tags: ["high-value", "vip", "two-heads"]
      }
    ];

    setStatusMsg({ type: 'info', text: 'Pushing dynamic bulk array load...' });
    writeToConsole(`API_CALL -> POST /api/v2/prospects/import-bulk [Processing prospect array]`);

    try {
      const res = await fetch('/api/v2/prospects/import-bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ prospects: mockProspects })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Bulk Array payload parsed. Created count: ${data.count}`);
      setStatusMsg({ type: 'ok', text: `Array Import processed: Added ${data.count} interstellar prospect profiles.` });
      fetchProspects(accessToken, showTrash);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> bulk list rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // Pre-seed dynamic mock CSV string
  const handleLoadDemoCSV = () => {
    const csvMock = `name,email,company,title,status,tags
Clara Oswald,clara@tardis.com,Time Agency,Companion,Contacted,traveler;retro
Jack Harkness,jack@torchwood.org,Torchwood Hub,Director,Qualified,immortal;growth;leader
Rory Williams,rory@nurse.nhs.uk,NHS London,Nurse,Nurturing,centurion;retro`;
    setCsvInputText(csvMock);
  };

  // DragnDrop handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setCsvFileError("Dropped file format unsupported. Submit a valid text/csv format.");
        return;
      }
      setCsvFileError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvInputText(text);
        writeToConsole(`CLIENT -> CSV file drag-and-drop read complete: ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title */}
      <div className="relative p-6 rounded-xl border border-dashed border-gray-800 bg-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-display font-medium text-white tracking-tight">Enterprise Multi-Tenant Prospect CRM</h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mt-1">
            Build high-value leads folders with secure Row-Level isolation. Features bulk arrays, CSV drag-and-drop parsers, soft deletes, and conversation history notes.
          </p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button 
            onClick={handleBulkImportDemo}
            disabled={!accessToken}
            className="px-3.5 py-1.5 text-xs bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-semibold font-mono rounded-lg hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Layers className="w-3.5 h-3.5" />
            Quick Bulk Array Import
          </button>
          
          <button 
            onClick={() => setShowCSVModal(true)}
            disabled={!accessToken}
            className="px-3.5 py-1.5 text-xs bg-sky-600/10 text-sky-400 border border-sky-500/20 font-semibold font-mono rounded-lg hover:bg-sky-600 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Upload CSV File
          </button>
        </div>
      </div>

      {/* Multi-tenant Handshake Selector */}
      <div className="bg-[#0b101b] border border-gray-800 rounded-xl p-5">
        <label className="text-xs uppercase tracking-wider font-mono text-[#a1a1aa] block font-bold mb-3">
          1. Authenticate with SaaS Subscriber Profile (Multi-Tenant Isolation)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seedAccounts.map((ac) => {
            const isCurrent = activeUser?.email === ac.email;
            return (
              <button
                key={ac.email}
                onClick={() => authenticateUser(ac.email)}
                className={`p-3.5 text-left rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isCurrent 
                    ? 'bg-indigo-950/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-indigo-500/10 shadow-lg'
                    : 'bg-slate-900/35 border-gray-800 text-gray-400 hover:bg-slate-900/70 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                    isCurrent ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/35' : 'bg-slate-950 border-gray-800 text-gray-500'
                  }`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block group-hover:text-white transition-colors">{ac.name}</span>
                    <span className="text-[10px] text-gray-500 block leading-none font-mono tracking-tight mt-0.5">{ac.email}</span>
                  </div>
                </div>
                {isCurrent ? (
                  <span className="text-[9px] uppercase font-mono tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Tenant-1 Active
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-500 group-hover:text-gray-300 font-mono transition-transform group-hover:translate-x-1">
                    Connect Context
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sandbox CRM Workspace */}
      {!accessToken ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0b101b] border border-gray-800 rounded-xl min-h-[350px]">
          <AlertCircle className="w-9 h-9 text-indigo-400 animate-pulse mb-3" />
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-widest">Multi-Tenant Gateway Isolated</h3>
          <p className="text-xs text-gray-400 max-w-sm mt-1.5 leading-relaxed">
            Attach a subscriber session handshake using the connections above to load leads folders, design filters, and process bulk imports safely under your tenant.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* CRM Dashboard Table Area */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Filters panel block */}
            <div className="bg-[#0b101b] border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search prospects by name, company, title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Status and Tag dropdown filters */}
              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 text-white border border-gray-800 rounded-lg px-2.5 py-2 text-xs focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unqualified">Unqualified</option>
                  <option value="Nurturing">Nurturing</option>
                </select>

                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="bg-slate-950 text-white border border-gray-800 rounded-lg px-2.5 py-2 text-xs focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">All Tags</option>
                  {allTags.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                {/* Show Trash toggle */}
                <button
                  onClick={() => setShowTrash(!showTrash)}
                  className={`px-3 py-2 text-xs rounded-lg border flex items-center gap-1.5 transition-all ${
                    showTrash 
                      ? 'bg-red-950/20 border-red-500/40 text-red-300' 
                      : 'bg-slate-900 border-gray-800 text-gray-400 hover:bg-slate-800'
                  }`}
                  title="Toggle archived/soft-deleted rows"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Trashbin ({prospects.filter(p => p.deletedAt).length})
                </button>

                {/* Create Lead Button */}
                <button
                  onClick={handleOpenCreateModal}
                  className="px-3.5 py-2 bg-indigo-500 text-white hover:bg-indigo-400 font-semibold text-xs rounded-lg flex items-center gap-1 shadow-md shadow-indigo-500/20 ml-2"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Add Lead
                </button>
              </div>

            </div>

            {/* Prospects Results List */}
            <div className="bg-[#0b101b] border border-gray-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-gray-850 text-[#a1a1aa] font-mono tracking-wider font-bold">
                      <th className="p-4">Contact Particulars</th>
                      <th className="p-4">Enterprise / Position</th>
                      <th className="p-4">Clearance Status</th>
                      <th className="p-4">Labeling Tags</th>
                      <th className="p-4 text-right">Operational Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-850">
                    {prospects.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-gray-500">
                          <Users className="w-7 h-7 text-gray-600 block mx-auto mb-2" />
                          <span className="font-semibold block uppercase tracking-wide text-xs">No prospects found.</span>
                          <p className="text-[11px] text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                            No lead profiles matches your queries. Register a new contact or utilize CSV/Array bulk imports.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      prospects.map((p) => {
                        const isDeleted = p.deletedAt !== null;
                        return (
                          <tr key={p.id} className={`hover:bg-slate-900/30 transition-colors ${
                            isDeleted ? 'bg-red-950/5 text-gray-500 opacity-70' : 'text-gray-300'
                          }`}>
                            <td className="p-4">
                              <div className="font-semibold text-white leading-relaxed">{p.name}</div>
                              <div className="font-mono text-[10px] text-gray-400">{p.email}</div>
                              {p.phone && <div className="text-[10px] text-gray-500 mt-0.5">{p.phone}</div>}
                            </td>
                            <td className="p-4">
                              <div className="font-semibold text-gray-200">{p.company || 'N/A'}</div>
                              <div className="text-[11px] text-gray-400">{p.title || 'N/A'}</div>
                            </td>
                            <td className="p-4">
                              {isDeleted ? (
                                <span className="px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider font-bold rounded-full bg-red-950/50 text-red-400 border border-red-500/20">
                                  Deleted Trashbin
                                </span>
                              ) : (
                                <span className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider font-bold rounded-full border ${
                                  p.status === 'New' 
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                                    : p.status === 'Contacted'
                                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                                      : p.status === 'Qualified'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                                        : p.status === 'Nurturing'
                                          ? 'bg-[#a855f7]/10 text-[#a855f7]/40 border-[#a855f7]/25'
                                          : 'bg-gray-500/10 text-gray-400 border-gray-500/25'
                                }`}>
                                  {p.status}
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-[150px]">
                                {p.tags.length === 0 ? (
                                  <span className="text-[10px] text-gray-600 italic">No labels</span>
                                ) : (
                                  p.tags.map(t => (
                                    <span key={t} className="px-1.5 py-0.5 rounded bg-slate-900 border border-gray-800 text-[10px] font-mono leading-none">
                                      {t}
                                    </span>
                                  ))
                                )}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                
                                {/* Notes button */}
                                <button
                                  onClick={() => setSelectedProspectNotes(p)}
                                  className="p-1.5 bg-slate-950 border border-gray-800 hover:border-indigo-500 hover:text-white rounded transition-colors text-[10px] flex items-center gap-1"
                                  title="Add notes/history"
                                >
                                  <StickyNote className="w-3.5 h-3.5 text-indigo-400" />
                                  Notes ({p.notes.length})
                                </button>

                                {isDeleted ? (
                                  <button
                                    onClick={() => handleRestoreProspect(p.id, p.name)}
                                    className="p-1.5 bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded transition-all text-[10px] font-semibold"
                                  >
                                    Restore
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleOpenEditModal(p)}
                                      className="p-1.5 bg-slate-950 border border-gray-800 hover:border-amber-400 text-gray-400 hover:text-white rounded transition-colors"
                                      title="Edit contact fields"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>

                                    <button
                                      onClick={() => handleDeleteProspect(p.id, p.name)}
                                      className="p-1.5 bg-slate-950 border border-gray-800 hover:border-red-500 text-red-400 hover:text-white rounded transition-colors"
                                      title="Soft-delete contact"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}

                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Area: Notes Panel / Logs Monitor */}
          <div className="lg:col-span-4 space-y-6">

            {/* Selected Prospect Notes drawer card */}
            {selectedProspectNotes && (
              <div className="bg-[#0b101b] border border-indigo-500/30 shadow-indigo-500/5 shadow-2xl rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-indigo-400 font-bold block">History & Notes</span>
                    <span className="text-sm font-semibold text-white mt-1 block truncate max-w-[200px]">{selectedProspectNotes.name}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProspectNotes(null)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* List of notes */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {selectedProspectNotes.notes.length === 0 ? (
                    <div className="py-6 text-center text-gray-600 italic">
                      No customer engagement log entries entered yet. Write a prompt below to track discussions.
                    </div>
                  ) : (
                    selectedProspectNotes.notes.map((n) => (
                      <div key={n.id} className="bg-slate-950 p-2.5 rounded border border-gray-850 text-[11px] leading-relaxed relative">
                        <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono border-b border-gray-900 pb-1 mb-1">
                          <span className="font-bold text-gray-400">{n.authorName}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-300">{n.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Form to add note */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    maxLength={200}
                    placeholder="Enter team touchpoint updates..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-lg border border-gray-850 p-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder:text-gray-600"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Attach Team Note
                  </button>
                </form>
              </div>
            )}

            {/* Quick status toast */}
            {statusMsg && (
              <div className={`p-4 rounded-xl border flex items-start gap-2.5 text-[11px] font-sans ${
                statusMsg.type === 'ok' 
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                  : statusMsg.type === 'fail' 
                    ? 'bg-red-950/20 border-red-500/20 text-red-300' 
                    : 'bg-slate-900 border-gray-800 text-gray-400'
              }`}>
                <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${
                  statusMsg.type === 'ok' ? 'text-emerald-400' : statusMsg.type === 'fail' ? 'text-red-400' : 'text-gray-500'
                }`} />
                <div className="flex-1 leading-normal">
                  {statusMsg.text}
                </div>
              </div>
            )}

            {/* Terminal monitor */}
            <div className="bg-[#0b101b] border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 flex items-center gap-1.5 leading-none">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  REST API Terminal logs
                </label>
                <button 
                  onClick={() => setTerminalLogs('')}
                  className="text-gray-600 hover:text-white transition-colors text-[9px] font-mono leading-none uppercase"
                >
                  Clear
                </button>
              </div>
              <div className="bg-slate-950/95 p-3 rounded border border-gray-850 h-44 overflow-y-auto font-mono text-[10px] text-gray-400 leading-relaxed">
                {terminalLogs === '' ? (
                  <div className="h-full flex items-center justify-center text-gray-700 italic select-none">
                    Terminal idle. Complete CRM actions above to trigger.
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{terminalLogs}</pre>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* --- MODAL 1: CREATE / EDIT PROSPECT FORM --- */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b101b] border border-gray-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white font-display">
                {editingProspect ? 'Modify Prospect Credentials' : 'Create New Client Prospect'}
              </h3>
              <button 
                onClick={() => setShowFormModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProspect} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Donna Noble"
                  value={formFields.name}
                  onChange={(e) => setFormFields(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 @apply focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Email Coordinates *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. donna@ Chiswick.co"
                  value={formFields.email}
                  onChange={(e) => setFormFields(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Chiswick Hub"
                    value={formFields.company}
                    onChange={(e) => setFormFields(f => ({ ...f, company: e.target.value }))}
                    className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Office Manager"
                    value={formFields.title}
                    onChange={(e) => setFormFields(f => ({ ...f, title: e.target.value }))}
                    className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +44 20 7946 0192"
                    value={formFields.phone}
                    onChange={(e) => setFormFields(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Outreach Status</label>
                  <select
                    value={formFields.status}
                    onChange={(e) => setFormFields(f => ({ ...f, status: e.target.value as any }))}
                    className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Unqualified">Unqualified</option>
                    <option value="Nurturing">Nurturing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  Tags (Separated by semi-colon ";")
                </label>
                <input
                  type="text"
                  placeholder="e.g. high-value; expansion; tech"
                  value={formFields.tagsString}
                  onChange={(e) => setFormFields(f => ({ ...f, tagsString: e.target.value }))}
                  className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-850 flex justify-end gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 text-gray-400 bg-slate-900 border border-gray-800 rounded-lg hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Prospect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: UPLOAD CSV FILE DRAWERS --- */}
      {showCSVModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b101b] border border-gray-800 rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold text-white font-display">Bulk CSV Data Parsing Hub</h3>
              </div>
              <button 
                onClick={() => {
                  setShowCSVModal(false);
                  setCsvFileError(null);
                }}
                className="text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drag & drop file parser box */}
            <div 
              onDragOver={onDragOver}
              onDrop={onDropFile}
              className="border-2 border-dashed border-gray-800 rounded-xl p-6 bg-slate-950/50 hover:bg-slate-950/80 hover:border-sky-500/50 transition-all text-center group cursor-pointer"
            >
              <UploadCloud className="w-10 h-10 text-gray-600 group-hover:text-sky-400 transition-colors mx-auto mb-3" />
              <span className="text-xs font-semibold text-white block">Drag and drop client contacts .CSV here</span>
              <span className="text-[10px] text-gray-500 mt-1 block">Or copy-paste your raw records directly into the text terminal input below.</span>
              
              {csvFileError && (
                <div className="text-xs text-red-400 mt-2 font-mono flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {csvFileError}
                </div>
              )}
            </div>

            <form onSubmit={handleCSVImport} className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                <span>Copy-paste CSV inputs</span>
                <button
                  type="button"
                  onClick={handleLoadDemoCSV}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  [Load Demo CSV String template]
                </button>
              </div>

              <textarea
                rows={5}
                required
                placeholder="name,email,company,title,status,tags&#10;Arthur,arthur@tea.com,Earth,Guide,Nurturing,space;vintage"
                value={csvInputText}
                onChange={(e) => setCsvInputText(e.target.value)}
                className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 px-3 py-2 text-xs font-mono focus:ring-1 focus:ring-indigo-500 focus:outline-none leading-relaxed placeholder:text-gray-600"
              />

              <div className="text-[10px] text-gray-500 leading-normal bg-slate-950/40 p-3 rounded-lg border border-gray-900 font-mono">
                <strong>Format requirements:</strong> Subject column line 1 must register "name" and "email" headers. Explode tags strings using semicolons ';' (e.g. high-value;AE;leader).
              </div>

              <div className="pt-3 border-t border-gray-850 flex justify-end gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setShowCSVModal(false);
                    setCsvFileError(null);
                  }}
                  className="px-4 py-2 text-gray-400 bg-slate-900 border border-gray-800 rounded-lg hover:text-white"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={!csvInputText.trim()}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  Compile and Submit Records
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
