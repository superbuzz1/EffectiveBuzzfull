import React, { useState, useEffect } from 'react';
import { 
  Globe, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, 
  RefreshCw, Copy, ExternalLink, ShieldAlert, BadgeCheck, Loader2
} from 'lucide-react';

interface DnsRecord {
  type: string;
  host: string;
  value: string;
}

interface DnsRecords {
  spf: DnsRecord;
  dkim: DnsRecord;
  dmarc: DnsRecord;
}

interface DomainStatus {
  domain: string;
  isSpfValid: boolean;
  isDkimValid: boolean;
  isDmarcValid: boolean;
  status: 'pending' | 'verified' | 'partial' | 'failed';
}

export default function SetupWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requiredRecords, setRequiredRecords] = useState<DnsRecords | null>(null);
  const [verificationResult, setVerificationResult] = useState<DomainStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v2/dns/required-records?domain=${domain}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setRequiredRecords(data.records);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v2/dns/verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ domain })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setVerificationResult(data.dbRecord);
      if (data.status === 'verified') {
        setStep(3);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in duration-500">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
              ${step === s ? 'bg-emerald-500 text-slate-950 scale-110 shadow-lg shadow-emerald-500/20' : 
                step > s ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 
                'bg-slate-900 text-gray-500 border border-gray-800'}
            `}>
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-0.5 mx-4 transition-colors ${step > s ? 'bg-emerald-500/30' : 'bg-gray-800'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Globe className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-medium text-white tracking-tight">Connect your domain</h1>
            <p className="text-gray-400">
              We'll analyze your DNS records and provide the configuration needed to reach 99.9% inbox deliverability.
            </p>
          </div>

          <form onSubmit={handleStartSetup} className="space-y-4 pt-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="acme.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-slate-950 border border-gray-800 rounded-xl py-4 px-6 text-white text-lg focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
              />
              <button 
                type="submit"
                disabled={!domain || isLoading}
                className="absolute right-2 top-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold py-2 px-6 rounded-lg transition-all flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>Continue <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 font-mono italic">
              * We support any domain registrar (Cloudflare, GoDaddy, Namecheap, etc.)
            </p>
          </form>
          {error && <p className="text-rose-400 text-sm font-medium">{error}</p>}
        </div>
      )}

      {step === 2 && requiredRecords && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                Configuration for <span className="text-emerald-400">{domain}</span>
              </h1>
              <p className="text-gray-400 text-sm">Add these TXT records to your DNS settings.</p>
            </div>
            <button 
              onClick={handleVerify}
              disabled={isLoading}
              className="px-6 py-2.5 bg-white text-slate-950 font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check DNS Records'}
            </button>
          </div>

          <div className="grid gap-4">
            {requiredRecords && (Object.entries(requiredRecords) as [keyof DnsRecords, DnsRecord][]).map(([key, record]) => {
              const isValid = verificationResult && (
                key === 'spf' ? verificationResult.isSpfValid :
                key === 'dkim' ? verificationResult.isDkimValid :
                verificationResult.isDmarcValid
              );

              return (
                <div key={key} className={`
                  bg-[#0d131f] border rounded-xl overflow-hidden transition-all
                  ${isValid ? 'border-emerald-500/30' : verificationResult ? 'border-rose-500/30' : 'border-gray-800'}
                `}>
                  <div className="px-6 py-4 flex items-center justify-between border-b border-gray-800/50 bg-gray-900/30">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{key} Record</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-gray-800 text-[10px] font-mono text-emerald-400">{record.type}</span>
                    </div>
                    {verificationResult && (
                      <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${isValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                        {isValid ? 'Verified' : 'Not Detected'}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold text-gray-600 uppercase">Host / Name</label>
                      <div className="flex items-center gap-2 group">
                        <code className="text-xs text-indigo-300 font-mono bg-indigo-500/5 px-2 py-1 rounded">{record.host}</code>
                        <button onClick={() => copyToClipboard(record.host)} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white"><Copy className="w-3 h-3" /></button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-9 space-y-1">
                      <label className="text-[10px] font-bold text-gray-600 uppercase">Value / Content</label>
                      <div className="flex items-center gap-2 group">
                        <code className="flex-1 text-xs text-white font-mono bg-black/40 p-2 rounded border border-gray-800 break-all">{record.value}</code>
                        <button onClick={() => copyToClipboard(record.value)} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white shrink-0"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-indigo-300">
            <ExternalLink className="w-4 h-4 shrink-0" />
            <p>
              DNS changes can take up to 24 hours to propagate, but usually appear within minutes. 
              If your records are correct but not yet verified, please wait and try again.
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8 text-center max-w-xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="relative inline-flex mb-4">
            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 rounded-full animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/40">
              <BadgeCheck className="w-12 h-12" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-medium text-white tracking-tight">Domain Verified!</h1>
            <p className="text-gray-400 text-lg">
              <span className="text-emerald-400 font-bold">{domain}</span> is now fully authenticated and optimized for high-performance outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            {[
              { label: 'SPF', desc: 'Authorized' },
              { label: 'DKIM', desc: 'Securely Signed' },
              { label: 'DMARC', desc: 'Policy Enforced' }
            ].map((item) => (
              <div key={item.label} className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{item.label}</div>
                <div className="text-sm font-medium text-white">{item.desc}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-8"
          >
            Launch Outreach Workspace
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
