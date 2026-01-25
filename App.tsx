
import React, { useState } from 'react';
import { ViewState } from './types';
import { ICONS } from './constants';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'profile': return (
        <div className="p-8 text-center glass rounded-3xl animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-[#33b5ff] to-[#0084ff] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-xl shadow-blue-500/20 text-white">
            XM
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-8">xMask User</h2>
          <div className="space-y-4">
            <button className="w-full py-3 bg-slate-50 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 active:bg-slate-100 transition-colors">
              Billing History
            </button>
            <button 
              className="w-full py-3 bg-[#33b5ff]/10 rounded-xl text-sm font-bold border border-[#33b5ff]/20 text-[#33b5ff] active:bg-[#33b5ff]/20 transition-colors"
              onClick={() => window.open('https://t.me/your_channel', '_blank')}
            >
              Our Channel
            </button>
            <button 
              className="w-full py-3 bg-[#33b5ff] rounded-xl text-sm font-bold text-white shadow-lg shadow-[#33b5ff]/20 active:scale-[0.98] transition-all"
              onClick={() => window.open('https://t.me/your_support', '_blank')}
            >
              Support Chat
            </button>
          </div>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 pt-6 pb-24 relative overflow-hidden flex flex-col">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-[#33b5ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="flex items-center gap-3 mb-8 relative z-10 px-2">
        <div className="w-10 h-10 flex items-center justify-center text-[#33b5ff]">
          <ICONS.WhaleLogo className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">
            <span className="text-[#33b5ff]">x</span>Mask
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-hidden">
        {renderView()}
      </main>

      {/* Navigation - Refined Aesthetics with Accent Color */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[70%] max-w-[260px] z-50">
        <nav className="glass bg-white/80 rounded-full p-1.5 flex justify-between items-center shadow-[0_20px_40px_rgba(51,181,255,0.15)] border border-white/80">
          <NavButton 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')}
            icon={<ICONS.Dashboard className="w-5 h-5" />}
            label="Home"
          />
          <NavButton 
            active={activeView === 'profile'} 
            onClick={() => setActiveView('profile')}
            icon={<ICONS.Profile className="w-5 h-5" />}
            label="User"
          />
        </nav>
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative overflow-hidden px-5 py-3 rounded-full ${active ? 'bg-[#33b5ff] text-white shadow-lg shadow-[#33b5ff]/40 flex-[1.5]' : 'text-slate-400 hover:text-slate-600 flex-1'}`}
  >
    <div className={`relative z-10 flex items-center justify-center gap-2 ${active ? 'scale-105' : ''}`}>
      {icon}
      <span className={`text-[11px] font-bold transition-all duration-500 overflow-hidden whitespace-nowrap ${active ? 'max-w-[60px] opacity-100' : 'max-w-0 opacity-0'}`}>
        {label}
      </span>
    </div>
  </button>
);

export default App;
