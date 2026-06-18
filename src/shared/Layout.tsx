import React, { useState } from 'react';
import { BrandMark } from './BrandMark';
import { navigateToSurface, getActiveSurface, Surface } from './router';
import { Menu, X, ChevronRight, BarChart3 } from 'lucide-react';
import InboundWidget from './Widget';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const currentSurface = getActiveSurface();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation: { id: Surface | 'analytics'; label: string }[] = [
    { id: 'marketing', label: 'Home' },
    { id: 'app', label: 'App' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'docs', label: 'Docs' },
    { id: 'admin', label: 'Admin' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 flex flex-col font-sans">
      <header className="border-b border-gray-800 bg-[#0d131f]/95 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigateToSurface('marketing')}
              className="flex items-center gap-2 text-left group"
            >
              <BrandMark />
              <div>
                <span className="font-display font-bold text-white text-base tracking-tight leading-none block">
                  EffectiveBuzz <span className="text-emerald-400 text-xs font-mono font-medium ml-1 uppercase">{currentSurface}</span>
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToSurface(item.id as any)}
                  className={`text-sm font-medium transition-colors ${
                    currentSurface === item.id 
                      ? 'text-emerald-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateToSurface('analytics')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-gray-800 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white transition-all"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Exec Console
            </button>

            <button 
              onClick={() => navigateToSurface('app')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-500/10"
            >
              Launch Platform
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-[#0d131f] p-4 space-y-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateToSurface(item.id as any);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  currentSurface === item.id 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4 sm:px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-gray-800 bg-[#070b13] py-12">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BrandMark className="w-6 h-6" />
                <span className="font-bold text-white">EffectiveBuzz</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                AI Revenue Technology — turn prospecting into predictable revenue. 
                AI runs the scale work; real humans close the loop.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigateToSurface('app')} className="hover:text-emerald-400">Dashboard</button></li>
                <li><button onClick={() => navigateToSurface('analytics')} className="hover:text-emerald-400">Analytics</button></li>
                <li><button onClick={() => navigateToSurface('status')} className="hover:text-emerald-400">System Status</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigateToSurface('docs')} className="hover:text-emerald-400">Documentation</button></li>
                <li><button onClick={() => navigateToSurface('marketing')} className="hover:text-emerald-400">Main Site</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            © 2026 EffectiveBuzz Inc. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Sprint 2: Inbound Growth Loop Widget */}
      <InboundWidget />
    </div>
  );
};
