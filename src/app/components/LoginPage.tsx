import React, { useState } from 'react';
import { Mail, Sparkles, ArrowRight, Loader2, ShieldCheck, Github } from 'lucide-react';
import { BrandMark } from '../../shared/BrandMark';

interface LoginPageProps {
  onLoginSuccess: (data: any) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [magicTokenSandbox, setMagicTokenSandbox] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'email' | 'onboarding' | 'verify'>('email');

  const handleRequestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v2/auth/magic-link-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          name: name || undefined,
          tenantName: tenantName || undefined,
          workspaceName: workspaceName || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to request magic link');

      setMagicTokenSandbox(data.magicTokenSandbox);
      setStep('verify');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!magicTokenSandbox) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v2/auth/magic-link-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: magicTokenSandbox })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      // Store token locally if needed (though it's in httpOnly cookie now)
      localStorage.setItem('accessToken', data.accessToken);
      onLoginSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center">
            <BrandMark className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-display font-medium text-white tracking-tight">
            Welcome to EffectiveBuzz
          </h1>
          <p className="text-sm text-gray-400">
            AI Revenue Technology for Predictable Growth
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0d131f] border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-emerald-500/5 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              {error}
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('onboarding'); }} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-600">
                  <span className="bg-[#0d131f] px-2 tracking-widest">Or social login</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-slate-950 border border-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-3"
              >
                <Github className="w-5 h-5" />
                Sign in with GitHub
              </button>
            </form>
          )}

          {step === 'onboarding' && (
            <form onSubmit={handleRequestMagicLink} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                    Your Name
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full bg-slate-950 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tenant" className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                    Company Name
                  </label>
                  <input
                    id="tenant"
                    required
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full bg-slate-950 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="workspace" className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                    Workspace Hub Name
                  </label>
                  <input
                    id="workspace"
                    required
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="Outbound Growth"
                    className="w-full bg-slate-950 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 group"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Create Account & Workspace
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Back to email
              </button>
            </form>
          )}

          {step === 'verify' && (
            <div className="text-center space-y-6 py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-medium text-white">Check your inbox</h2>
              <p className="text-sm text-gray-400 max-w-[280px] mx-auto leading-relaxed">
                We've sent a magic link to <span className="text-emerald-400 font-medium">{email}</span>. Click it to log in instantly.
              </p>

              {/* Sandbox Interception Simulation */}
              {magicTokenSandbox && (
                <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    Sandbox Intercept
                  </div>
                  <p className="text-[10px] text-gray-500 text-left">
                    In this sandbox environment, we intercept the magic link for you.
                  </p>
                  <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Claim Token & Proceed →'}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-xs text-gray-550 hover:text-gray-400 font-medium tracking-wide flex items-center justify-center gap-1 mx-auto"
              >
                Entered wrong email?
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
          Secured by EffectiveBuzz Guard System v2.0
        </p>
      </div>
    </div>
  );
}
