import React from 'react';
import { 
  Chrome, LayoutTemplate, Layers, 
  Zap, Code2, Database, Network,
  ShieldCheck, Webhook, Box, AlertTriangle
} from 'lucide-react';

export default function ChromeExtensionArchitecture() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            Execution Phase: Highest ROI Action
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Chrome Extension Architecture
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            The technical blueprint for injecting EffectiveBuzz directly into the SDR inbox (Gmail & LinkedIn). Unblocking the critical UX friction point and capturing daily active usage.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 px-6 py-4 rounded-xl shrink-0">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Chrome className="w-3.5 h-3.5" /> Target Platform
            </div>
            <div className="text-xl font-black text-white px-1">Manifest V3</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Components */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Layers className="w-4 h-4 text-blue-400" />
              Extension Anatomy (Manifest V3)
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Content Scripts
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Injected directly into mail.google.com and linkedin.com. Responsible for observing the DOM, scraping the current email thread, and injecting the "Draft with AI" button next to native reply buttons.
                </p>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">manifest.json » content_scripts</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                  <Network className="w-4 h-4" /> Service Worker
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  The background event page. Handles OAuth token management, intercepts API requests securely, and communicates with the EffectiveBuzz Node.js backend.
                </p>
                <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">manifest.json » background</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-violet-400 font-bold mb-2 flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4" /> Shadow DOM
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Used to isolate EffectiveBuzz UI styles (Tailwind) from the host page's CSS. Ensures our injected sidebars and buttons do not break Gmail's layout or inherit unexpected styles.
                </p>
                 <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">Web Components » attachShadow</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Auth Strategy
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Single Sign-On (SSO) bridging. Uses the chrome.identity API to get an OAuth token, validating against the main SaaS database to ensure the user has an active $49/mo subscription.
                </p>
                 <div className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">chrome.identity.launchWebAuthFlow</div>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Webhook className="w-4 h-4 text-emerald-400" />
              The Injection Workflow
            </h2>
            <div className="space-y-4">
               <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <span className="text-sm font-bold text-slate-200">DOM Observation</span>
                    <p className="text-xs text-slate-400 mt-1">MutationObserver watches for the Gmail "Compose" window or LinkedIn "Message" thread to appear.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <span className="text-sm font-bold text-slate-200">Context Extraction</span>
                    <p className="text-xs text-slate-400 mt-1">Extract recipient name, previous email bodies (removing quoted trails), and sender signature.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <span className="text-sm font-bold text-slate-200">Backend AI Generation</span>
                    <p className="text-xs text-slate-400 mt-1">Sends context payload securely via Service Worker to `api.effectivebuzz.com/generate`. Returns streaming text.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                  <div>
                    <span className="text-sm font-bold text-slate-200">Value Execution</span>
                    <p className="text-xs text-slate-400 mt-1">Insert generated text directly into the Gmail contenteditable div. Logs the successful operation in the CRM.</p>
                  </div>
               </div>
            </div>
          </section>

        </div>

        {/* Right Column: Risks & Tooling */}
        <div className="space-y-6">

          <section className="bg-[#0b101b] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <Box className="w-4 h-4 text-indigo-400" />
              Build Tooling
            </h2>
            <ul className="text-xs text-slate-300 space-y-3">
              <li><strong>Framework:</strong> React + Vite</li>
              <li><strong>Bundler:</strong> CRXJS Vite Plugin (enables HMR for Chrome Extensions)</li>
              <li><strong>Styling:</strong> Tailwind CSS (scoped via Shadow DOM)</li>
              <li><strong>State:</strong> Zustand (lightweight context sharing between popups/scripts)</li>
            </ul>
          </section>

          <section className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-6">
            <h2 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase font-mono tracking-wider border-b border-rose-900/50 pb-3">
              <AlertTriangle className="w-4 h-4" />
              Deployment Risks
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Chrome Web Store Review</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Reviews take 1-3 days. Updates are not instantaneous. Must push critical logic to the backend to avoid extension update delays.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block">DOM Brittleness</span>
                <p className="text-[10px] text-slate-400 mt-0.5">If Gmail or LinkedIn changes their CSS classes (e.g., `div.A7`), the content script breaks instantly. Need fallback identification logic.</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block">Content Security Policy (CSP)</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Manifest V3 restricts external code execution. All logic must be bundled locally. Cannot load external scripts dynamically.</p>
              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
