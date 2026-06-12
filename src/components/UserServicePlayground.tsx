// src/components/UserServicePlayground.tsx
import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Activity, Users, ShieldAlert, Cpu, Terminal, 
  Check, Trash2, Edit, AlertCircle, RefreshCw, Key, ShieldCheck, Mail, Save, Clock, HelpCircle
} from 'lucide-react';

interface Teammate {
  id: string;
  email: string;
  name: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Agent';
  isVerified: boolean;
  avatar: string | null;
  createdAt: string;
  profile: {
    bio: string | null;
    title: string | null;
    department: string | null;
    phoneNumber: string | null;
    timezone: string;
  };
}

interface UserProfile {
  userId: string;
  bio: string | null;
  title: string | null;
  department: string | null;
  phoneNumber: string | null;
  timezone: string;
}

interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  emailMarketing: boolean;
  emailSecurity: boolean;
  emailProductUpdates: boolean;
  defaultWorkspaceId: string | null;
  language: string;
}

interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  userId: string | null;
  tenantId: string | null;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'FAILURE';
  reason: string | null;
}

export default function UserServicePlayground() {
  const seedAccounts = [
    { email: 'alex@acme.com', name: 'Alex Rivera (Owner)', role: 'Owner', tenant: 'Acme Corp (usr-1)' },
    { email: 'sarah@acme.com', name: 'Sarah Chen (Admin)', role: 'Admin', tenant: 'Acme Corp (usr-2)' }
  ];

  // Global Session
  const [activeUser, setActiveUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [currentSection, setCurrentSection] = useState<'profile' | 'preferences' | 'activity' | 'team' | 'tests'>('profile');

  // Forms
  const [profileForm, setProfileForm] = useState<Omit<UserProfile, 'userId'> & { name: string }>({
    name: '',
    bio: '',
    title: '',
    department: '',
    phoneNumber: '',
    timezone: 'UTC'
  });

  const [preferencesForm, setPreferencesForm] = useState<Omit<UserPreferences, 'userId'>>({
    theme: 'dark',
    emailMarketing: false,
    emailSecurity: true,
    emailProductUpdates: true,
    defaultWorkspaceId: null,
    language: 'en'
  });

  const [teamMembers, setTeamMembers] = useState<Teammate[]>([]);
  const [activitiesList, setActivitiesList] = useState<ActivityLog[]>([]);

  // Console Logs
  const [terminalLogs, setTerminalLogs] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'fail' | 'info'; text: string } | null>({
    type: 'info',
    text: 'Tap one of the pre-seeded SaaS accounts below to grant a secure JWT and load User Management assets.'
  });

  // Automated Verification Test Engine
  const [testSuiteLogs, setTestSuiteLogs] = useState<string[]>([]);
  const [testExecutionActive, setTestExecutionActive] = useState(false);
  const [testReport, setTestReport] = useState<any>(null);

  const writeToConsole = (msg: string) => {
    const time = new Date().toISOString().substring(11, 19);
    setTerminalLogs(prev => `[${time}] ${msg}\n${prev}`);
  };

  // Perform background authentication
  const authenticateUser = async (email: string) => {
    setStatusMsg({ type: 'info', text: `Initiating multi-tenant PBKDF2 authentication handshake for ${email}...` });
    writeToConsole(`API_CALL -> POST /api/v2/auth/login [Authenticating Context]`);
    
    try {
      const res = await fetch('/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      const resBody = await res.json();

      if (!res.ok) {
        throw new Error(resBody.error || "Handshake verification rejected.");
      }

      setAccessToken(resBody.accessToken);
      setActiveUser(resBody.user);
      writeToConsole(`SUCCESS -> JWT retrieved. Sub claims: ${resBody.user.id}, Tenant Space: ${resBody.user.tenantId}`);
      setStatusMsg({ type: 'ok', text: `Handshake Secure: Session initialized for ${resBody.user.name} (${resBody.user.role}).` });

      // Auto load initial states
      loadProfileData(resBody.accessToken);
      loadPreferencesData(resBody.accessToken);
      loadActivityData(resBody.accessToken, resBody.user.id);
      loadTeamMembersList(resBody.accessToken);

    } catch (err: any) {
      writeToConsole(`API_FAULT -> login failed: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  // --- API METHODS ---

  const loadProfileData = async (token: string) => {
    writeToConsole(`API_CALL -> GET /api/v2/users/profile [Read profile]`);
    try {
      const res = await fetch('/api/v2/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Profile retrieving fault.");

      // Fetch user general records to extract name
      // Simple lookup find
      const userRec = seedAccounts.find(s => s.email === activeUser?.email) || { name: activeUser?.name || 'Authorized' };

      setProfileForm({
        name: userRec.name.split(' (')[0],
        bio: data.profile.bio || '',
        title: data.profile.title || '',
        department: data.profile.department || '',
        phoneNumber: data.profile.phoneNumber || '',
        timezone: data.profile.timezone || 'UTC'
      });
      writeToConsole(`SUCCESS -> Profile details cached locally.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Cannot fetch profile: ${err.message}`);
    }
  };

  const loadPreferencesData = async (token: string) => {
    writeToConsole(`API_CALL -> GET /api/v2/users/preferences [Read preferences]`);
    try {
      const res = await fetch('/api/v2/users/preferences', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPreferencesForm({
        theme: data.preferences.theme,
        emailMarketing: data.preferences.emailMarketing,
        emailSecurity: data.preferences.emailSecurity,
        emailProductUpdates: data.preferences.emailProductUpdates,
        defaultWorkspaceId: data.preferences.defaultWorkspaceId,
        language: data.preferences.language
      });
      writeToConsole(`SUCCESS -> Preferences synchronized.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Cannot fetch preferences: ${err.message}`);
    }
  };

  const loadActivityData = async (token: string, userId: string) => {
    writeToConsole(`API_CALL -> GET /api/v2/users/activities/${userId} [Audit log search]`);
    try {
      const res = await fetch(`/api/v2/users/activities/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActivitiesList(data.activities);
      writeToConsole(`SUCCESS -> Fetched ${data.activities.length} activity records.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Cannot query activity: ${err.message}`);
    }
  };

  const loadTeamMembersList = async (token: string) => {
    writeToConsole(`API_CALL -> GET /api/v2/users/team [Team catalog]`);
    try {
      const res = await fetch('/api/v2/users/team', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTeamMembers(data.team);
      writeToConsole(`SUCCESS -> Compiled ${data.team.length} teammate files.`);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Cannot query team roster: ${err.message}`);
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setStatusMsg({ type: 'info', text: 'Persisting profile fields under Secure Tenant...' });
    writeToConsole(`API_CALL -> PUT /api/v2/users/profile [Profile update payload]`);

    try {
      const res = await fetch('/api/v2/users/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Profile records synchronized.`);
      setStatusMsg({ type: 'ok', text: 'Your master profile particulars have been successfully recorded.' });
      
      // Reload activity logs
      loadActivityData(accessToken, activeUser.id);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Profile save rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const savePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    setStatusMsg({ type: 'info', text: 'Synchronizing SaaS environmental settings...' });
    writeToConsole(`API_CALL -> PUT /api/v2/users/preferences [Sync settings]`);

    try {
      const res = await fetch('/api/v2/users/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(preferencesForm)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> User layout theme and alerts saved.`);
      setStatusMsg({ type: 'ok', text: 'Visual alignments and product notifications preferences preserved.' });
      
      // Reload activity logs
      loadActivityData(accessToken, activeUser.id);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Preference save rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleRoleChange = async (targetUserId: string, nextRole: 'Owner' | 'Admin' | 'Member' | 'Agent') => {
    if (!accessToken) return;
    setStatusMsg({ type: 'info', text: `Requesting role modification to: ${nextRole}...` });
    writeToConsole(`API_CALL -> PUT /api/v2/users/team/${targetUserId}/role [Role modulation]`);

    try {
      const res = await fetch(`/api/v2/users/team/${targetUserId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ role: nextRole })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Teammate role mutated securely.`);
      setStatusMsg({ type: 'ok', text: 'Corporate personnel clearance authorization updated successfully.' });
      
      // Refresh Lists
      loadTeamMembersList(accessToken);
      loadActivityData(accessToken, activeUser.id);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Role alteration rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const handleDeportTeammate = async (targetUserId: string) => {
    if (!accessToken) return;
    if (!confirm("Are you sure you want to permanently revoke this colleague's access and evict them from the Tenant directory?")) return;

    setStatusMsg({ type: 'info', text: 'Revoking keys and deactivating tenant account...' });
    writeToConsole(`API_CALL -> DELETE /api/v2/users/team/${targetUserId} [Teammate eviction]`);

    try {
      const res = await fetch(`/api/v2/users/team/${targetUserId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      writeToConsole(`SUCCESS -> Teammate evicted and deconstructed cascade records.`);
      setStatusMsg({ type: 'ok', text: 'The employee account has been decommissioned from this SaaS subscriber domain.' });

      // Refresh roster
      loadTeamMembersList(accessToken);
      loadActivityData(accessToken, activeUser.id);
    } catch (err: any) {
      writeToConsole(`API_FAULT -> Deportation rejected: ${err.message}`);
      setStatusMsg({ type: 'fail', text: err.message });
    }
  };

  const executeAutomationTesting = async () => {
    setTestExecutionActive(true);
    setTestSuiteLogs([]);
    setTestReport(null);
    writeToConsole(`SYSTEM -> Booting sandboxed micro-verification pipeline...`);

    try {
      const res = await fetch('/api/v2/auth/run-verification', {
        method: 'POST'
      });
      const data = await res.json();

      setTestSuiteLogs(data.logs || []);
      setTestReport(data.report || null);
      
      if (data.success) {
        writeToConsole(`TESTS -> 100% GREEN! Asserted all backend validation limits.`);
      } else {
        writeToConsole(`TESTS -> Verification failed. Inspect reporting outputs.`);
      }
    } catch (err: any) {
      writeToConsole(`TESTS -> Aborted manually: ${err.message}`);
    } finally {
      setTestExecutionActive(false);
    }
  };

  // Helper check for role hierarchy matching target
  const getRoleLevel = (role: string) => {
    if (role === 'Owner') return 4;
    if (role === 'Admin') return 3;
    if (role === 'Member') return 2;
    if (role === 'Agent') return 1;
    return 0;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="relative p-6 rounded-xl border border-dashed border-gray-800 bg-[#090d16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-display font-medium text-white tracking-tight">SaaS User & Teammate Management Console</h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mt-1">
            Production-grade profile records, UI visual options, real-time security logs, and hierarchical RBAC team structures.
          </p>
        </div>
        
        <button 
          onClick={executeAutomationTesting}
          disabled={testExecutionActive}
          className="px-4 py-2 text-xs bg-violet-600/20 text-violet-400 border border-violet-500/30 font-semibold font-mono rounded-lg hover:bg-violet-600 hover:text-white transition-all flex items-center gap-1.5 self-start md:self-center shrink-0 disabled:opacity-50"
        >
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          {testExecutionActive ? 'Testing Subsystem...' : 'Trigger Automated Verification Suite'}
        </button>
      </div>

      {/* Profile Chooser */}
      <div className="bg-[#0b101b] border border-gray-800 rounded-xl p-5">
        <label className="text-xs uppercase tracking-wider font-mono text-[#a1a1aa] block font-bold mb-3">
          1. Handshake Simulation: Sign in as Teammate
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {seedAccounts.map((ac) => {
            const isCurrent = activeUser?.email === ac.email;
            return (
              <button
                key={ac.email}
                onClick={() => authenticateUser(ac.email)}
                className={`p-3.5 text-left rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isCurrent 
                    ? 'bg-emerald-950/20 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-emerald-500/10 shadow-lg'
                    : 'bg-slate-900/35 border-gray-800 text-gray-400 hover:bg-slate-900/70 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                    isCurrent ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/35' : 'bg-slate-950 border-gray-800 text-gray-500'
                  }`}>
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block group-hover:text-white transition-colors">{ac.name}</span>
                    <span className="text-[10px] text-gray-500 block leading-none font-mono tracking-tight mt-0.5">{ac.email}</span>
                  </div>
                </div>
                {isCurrent ? (
                  <span className="text-[9px] uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Handshake
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-500 group-hover:text-gray-300 font-mono transition-transform group-hover:translate-x-1">
                    Connect
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sandbox Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation panel */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {[
            { id: 'profile', label: 'User Profile details', icon: User },
            { id: 'preferences', label: 'Environmental Prefs', icon: Settings },
            { id: 'activity', label: 'Personal Activity Trail', icon: Activity },
            { id: 'team', label: 'Teammates & RBAC', icon: Users },
            { id: 'tests', label: 'Assertion Tests Console', icon: Cpu }
          ].map((sec) => {
            const Icon = sec.icon;
            const isSelected = currentSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setCurrentSection(sec.id as any)}
                disabled={!activeUser && sec.id !== 'tests'}
                className={`py-2.5 px-3.5 rounded-lg border text-xs font-medium transition-all text-left flex items-center gap-2.5 whitespace-nowrap lg:whitespace-normal shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
                  isSelected 
                    ? 'bg-slate-900 border-gray-700 text-white font-bold'
                    : 'border-transparent text-gray-400 hover:bg-slate-900/30 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-gray-500'}`} />
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic canvas inputs */}
        <div className="lg:col-span-9 bg-[#0b101b] border border-gray-800 rounded-xl p-5 min-h-[380px] flex flex-col justify-between">
          
          {/* SECURED GATE COVER */}
          {!activeUser && currentSection !== 'tests' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950/20 border border-dashed border-gray-800 rounded-lg">
              <ShieldAlert className="w-8 h-8 text-indigo-400 animate-pulse mb-3" />
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-widest">Handshake Security Isolation Active</h3>
              <p className="text-xs text-gray-400 max-w-sm mt-1.5 leading-relaxed">
                Choose Alex Rivera (Owner) or Sarah Chen (Admin) seed profile credentials above to unlock the secure gateway router and initiate real DB REST transactions.
              </p>
            </div>
          ) : (
            <div className="flex-1">
              
              {/* PROFILE SECTION */}
              {currentSection === 'profile' && (
                <form onSubmit={saveProfile} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                    <span className="text-sm font-bold font-display text-white">Edit Master Profile Particulars</span>
                    <span className="text-[10px] font-mono text-gray-400 bg-slate-900 px-2 py-0.5 rounded leading-none">UserID: {activeUser?.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Display Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(v => ({ ...v, name: e.target.value }))}
                        className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Professional Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Lead SDR or Executive"
                        value={profileForm.title || ''}
                        onChange={(e) => setProfileForm(v => ({ ...v, title: e.target.value }))}
                        className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Company Department</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Growth Marketing or Security"
                        value={profileForm.department || ''}
                        onChange={(e) => setProfileForm(v => ({ ...v, department: e.target.value }))}
                        className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Secure Contact Number</label>
                      <input 
                        type="text" 
                        placeholder="+1 (555) XXX-XXXX"
                        value={profileForm.phoneNumber || ''}
                        onChange={(e) => setProfileForm(v => ({ ...v, phoneNumber: e.target.value }))}
                        className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Timezone Coordinates</label>
                    <select 
                      value={profileForm.timezone}
                      onChange={(e) => setProfileForm(v => ({ ...v, timezone: e.target.value }))}
                      className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="UTC">UTC (Universal Coordinates)</option>
                      <option value="America/New_York">EST (America/New_York)</option>
                      <option value="America/Chicago">CST (America/Chicago)</option>
                      <option value="America/Los_Angeles">PST (America/Los_Angeles)</option>
                      <option value="Europe/London">GMT (Europe/London)</option>
                      <option value="Asia/Tokyo">JST (Asia/Tokyo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Professional Biography</label>
                    <textarea 
                      rows={3}
                      maxLength={250}
                      placeholder="Describe your role boundaries and security operational directives..."
                      value={profileForm.bio || ''}
                      onChange={(e) => setProfileForm(v => ({ ...v, bio: e.target.value }))}
                      className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none font-sans leading-relaxed"
                    />
                    <span className="text-[10px] text-gray-500 font-mono italic mt-0.5 block text-right">Max 250 characters.</span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow shadow-emerald-500/20 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Master Profile
                    </button>
                  </div>
                </form>
              )}

              {/* PREFERENCES SECTION */}
              {currentSection === 'preferences' && (
                <form onSubmit={savePreferences} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                    <span className="text-sm font-bold font-display text-white">SaaS Environmental Options & Alerts</span>
                    <span className="text-[10px] font-mono text-gray-400 bg-slate-900 px-2 py-0.5 rounded leading-none">Row ID: usr-preferences</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">Visual Theme Preset</label>
                      <select 
                        value={preferencesForm.theme}
                        onChange={(e) => setPreferencesForm(v => ({ ...v, theme: e.target.value as any }))}
                        className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="dark">Dark Theme (High-Contrast Cobalt)</option>
                        <option value="light">Light Theme (Alpine Slate)</option>
                        <option value="system">Follow System Defaults</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-gray-400 font-bold uppercase block mb-1">System Idiom (Language)</label>
                      <select 
                        value={preferencesForm.language}
                        onChange={(e) => setPreferencesForm(v => ({ ...v, language: e.target.value }))}
                        className="w-full bg-slate-950 text-white rounded-lg border border-gray-800 p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="en">English (US)</option>
                        <option value="es">Español (ES)</option>
                        <option value="fr">Français (FR)</option>
                        <option value="de">Deutsch (DE)</option>
                        <option value="ja">日本語 (JP)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-gray-850">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 block mb-1">Notification Registry Routing Preferences</label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={preferencesForm.emailSecurity}
                        onChange={(e) => setPreferencesForm(v => ({ ...v, emailSecurity: e.target.checked }))}
                        className="mt-0.5 bg-slate-950 text-emerald-500 border-gray-800 rounded checked:bg-emerald-500 checked:border-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block group-hover:text-emerald-300 transition-colors">Critical Infrastructure & Security Bulletins</span>
                        <span className="text-[10px] text-gray-500 block leading-relaxed">Mandatory security alert logs, JWT revocations, IP modifications, and audit violations.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group pt-1 border-t border-gray-900">
                      <input 
                        type="checkbox"
                        checked={preferencesForm.emailProductUpdates}
                        onChange={(e) => setPreferencesForm(v => ({ ...v, emailProductUpdates: e.target.checked }))}
                        className="mt-0.5 bg-slate-950 text-emerald-500 border-gray-800 rounded checked:bg-emerald-500 checked:border-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block group-hover:text-emerald-300 transition-colors">Outbound Campaign Product Delivery Reports</span>
                        <span className="text-[10px] text-gray-500 block leading-relaxed">Weekly summaries from AI agents scoring leads and compiling email reply rates.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group pt-1 border-t border-gray-900">
                      <input 
                        type="checkbox"
                        checked={preferencesForm.emailMarketing}
                        onChange={(e) => setPreferencesForm(v => ({ ...v, emailMarketing: e.target.checked }))}
                        className="mt-0.5 bg-slate-950 text-emerald-500 border-gray-800 rounded checked:bg-emerald-500 checked:border-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block group-hover:text-emerald-300 transition-colors">Promotional Advisory & Discount Marketing</span>
                        <span className="text-[10px] text-gray-500 block leading-relaxed">Special rates for scaling outbound bandwidth, purchasing extra workspace hubs or warm domains.</span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow shadow-emerald-500/20 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Preferences
                    </button>
                  </div>
                </form>
              )}

              {/* ACTIVITY SEC */}
              {currentSection === 'activity' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                    <span className="text-sm font-bold font-display text-white">Your Audited Security Activity Logs</span>
                    <button 
                      onClick={() => activeUser && loadActivityData(accessToken, activeUser.id)}
                      className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase font-mono"
                    >
                      <RefreshCw className="w-3 h-3 hover:rotate-45 transition-transform" />
                      Refresh Log feed
                    </button>
                  </div>

                  {activitiesList.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 border border-dashed border-gray-850 rounded-xl bg-slate-950/20">
                      <Clock className="w-6 h-6 text-gray-600 block mx-auto mb-2" />
                      <span className="text-xs font-semibold block uppercase tracking-wider">No logged operations.</span>
                      <p className="text-[10px] text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">Trigger profile saves or preferences changes above to write new entries into the security ledger.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                      {activitiesList.map((log) => {
                        const isSuccess = log.status === 'SUCCESS';
                        return (
                          <div 
                            key={log.id} 
                            className="bg-slate-950/70 border border-gray-850 p-3 rounded-lg flex items-start gap-3 text-xs"
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 leading-none ${
                              isSuccess ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                              <ShieldCheck className="w-3 h-3" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">{log.action}</span>
                                <span className="text-[9px] text-gray-500 font-mono tracking-tight">{new Date(log.timestamp).toLocaleString()}</span>
                              </div>
                              <p className="text-[11px] text-gray-400 mt-1 leading-normal">{log.reason || 'Cryptographic transaction recorded successfully.'}</p>
                              <div className="flex items-center gap-2 mt-2 pt-1 border-t border-gray-900/40 text-[9px] text-gray-500 font-mono">
                                <span>IP: {log.ipAddress}</span>
                                <span>•</span>
                                <span className="truncate max-w-[200px]">Agent: {log.userAgent}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TEAM SECTION */}
              {currentSection === 'team' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-2">
                    <span className="text-sm font-bold font-display text-white">Hierarchical Teammate Gateways</span>
                    <span className="text-[10px] font-mono leading-none bg-indigo-950/70 border border-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full uppercase">
                      Current Rank: {activeUser?.role} (Rank {getRoleLevel(activeUser?.role)})
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-normal">
                    <HelpCircle className="w-3 h-3 text-emerald-400 inline shrink-0 mr-1 pb-0.5" />
                    <strong>Tenant Clearance Protection Activated:</strong> You can only change permissions or deport personnel whose role rank is <strong className="text-emerald-400">STRICTLY LOWER</strong> than yours. Owners can alter anyone. Admins can alter Members/Agents but not other Admins or Owners.
                  </p>

                  <div className="space-y-3 pt-2">
                    {teamMembers.map((member) => {
                      const isOwnerAct = activeUser?.role === 'Owner';
                      const isSelf = activeUser?.id === member.id;
                      const actorRank = getRoleLevel(activeUser?.role);
                      const targetRank = getRoleLevel(member.role);
                      
                      const canModify = !isSelf && (actorRank > targetRank);

                      return (
                        <div 
                          key={member.id}
                          className="bg-slate-950/45 border border-gray-850 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-gray-800 flex items-center justify-center text-slate-500 shrink-0 font-bold font-mono">
                              {member.avatar ? (
                                <img src={member.avatar} referrerPolicy="no-referrer" alt={member.name} className="w-full h-full rounded-lg object-cover" />
                              ) : (
                                member.name.substring(0, 2)
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-white block leading-none">{member.name} {isSelf && <span className="text-[9px] text-[#22c55e] bg-[#22c55e]/10 px-1 py-0.5 rounded leading-none">You</span>}</span>
                                <span className="text-[9px] font-mono leading-none px-2 py-0.5 rounded uppercase font-bold tracking-tight text-emerald-400 bg-emerald-900/10 border border-emerald-500/20">
                                  {member.role}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-500 block leading-relaxed mt-0.5 font-mono">{member.email}</span>
                              <p className="text-[10px] text-gray-400 leading-normal mt-0.5 italic">{member.profile.bio || 'No profile biography specified yet.'}</p>
                            </div>
                          </div>

                          {/* ACTION BUTTON DRAWERS */}
                          <div className="flex items-center gap-2 self-end md:self-center">
                            {canModify ? (
                              <>
                                <select
                                  value={member.role}
                                  onChange={(e) => handleRoleChange(member.id, e.target.value as any)}
                                  className="bg-slate-950 text-white border border-gray-800 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                                >
                                  <option value="Owner" disabled={actorRank < 4}>Owner</option>
                                  <option value="Admin" disabled={actorRank < 3}>Admin</option>
                                  <option value="Member" disabled={actorRank < 2}>Member</option>
                                  <option value="Agent" disabled={actorRank < 1}>Agent</option>
                                </select>

                                <button
                                  onClick={() => handleDeportTeammate(member.id)}
                                  className="p-1.5 bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-slate-950 rounded transition-all text-xs flex items-center gap-1 font-semibold"
                                  title="Deport employee from tenant subscriber directories"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Evict
                                </button>
                              </>
                            ) : (
                              <div className="text-[10px] text-gray-500 font-mono italic px-2 py-1 bg-slate-950 border border-gray-900 rounded select-none flex items-center gap-1.5">
                                <ShieldAlert className="w-3 h-3 text-gray-600" />
                                Hierarchy Locked
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TESTS RUNNER SECTION */}
              {currentSection === 'tests' && (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
                      <span className="text-sm font-bold font-display text-white">Automated Backend Security Assertion Logs</span>
                      {testReport && (
                        <span className={`text-[10px] font-mono px-2 py-1 rounded font-bold ${
                          testReport.success ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          STATUS: {testReport.success ? '100% SUCCESS' : 'FAILED ASSERTIONS'}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-400 leading-normal mb-3">
                      Execute full simulation suites testing profiles sync default fallbacks, encrypted preferences changes, role-boundary security isolation breaches, and rank team hierarchy access blocks.
                    </p>
                  </div>

                  {/* Test output block */}
                  <div className="bg-slate-950 border border-gray-850 rounded-lg p-4 font-mono text-xs text-gray-300 leading-relaxed overflow-y-auto max-h-[290px] min-h-[180px] select-text">
                    {testSuiteLogs.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-600 italic select-none">
                        No logs streamed. Tap 'Trigger' button above to audit execution.
                      </div>
                    ) : (
                      testSuiteLogs.map((log, idx) => {
                        let col = 'text-gray-300';
                        if (log.startsWith('[PASS]')) col = 'text-emerald-400';
                        if (log.startsWith('[FAIL]') || log.startsWith('[FATAL]')) col = 'text-red-400 font-bold';
                        if (log.includes('TEST PHASE')) col = 'text-[#818cf8] font-bold pt-2 border-t border-gray-900 first:border-none first:pt-0';
                        return <div key={idx} className={`${col} whitespace-pre-wrap`}>{log}</div>;
                      })
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Quick status toast */}
          {statusMsg && (
            <div className={`mt-4 p-3 rounded-lg border flex items-start gap-2.5 text-[11px] font-sans ${
              statusMsg.type === 'ok' 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                : statusMsg.type === 'fail' 
                  ? 'bg-red-950/20 border-red-500/20 text-red-300' 
                  : 'bg-slate-900 border-gray-800 text-gray-400'
            }`}>
              <AlertCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                statusMsg.type === 'ok' ? 'text-emerald-400' : statusMsg.type === 'fail' ? 'text-red-400' : 'text-gray-500'
              }`} />
              <div className="flex-1 leading-normal">
                {statusMsg.text}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Terminal logs monitor at bottom */}
      <div className="bg-[#0b101b] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
          <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400 flex items-center gap-1.5 leading-none">
            <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            Active HTTP & REST Request Terminal Monitor
          </label>
          <button 
            onClick={() => setTerminalLogs('')}
            className="text-gray-600 hover:text-white transition-colors text-[9px] font-mono leading-none uppercase"
          >
            Clear logs
          </button>
        </div>
        <div className="bg-slate-950/95 p-3 rounded border border-gray-850 h-28 overflow-y-auto font-mono text-[10px] text-gray-400 leading-relaxed">
          {terminalLogs === '' ? (
            <div className="h-full flex items-center justify-center text-gray-700 italic select-none">
              Terminal idle. Interactive REST log details will print here.
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">{terminalLogs}</pre>
          )}
        </div>
      </div>

    </div>
  );
}
