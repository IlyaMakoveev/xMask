
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { ICONS } from './constants';
import Dashboard from './components/Dashboard';
import Payment from './components/Payment';

// Расширяем интерфейс Window для работы с Telegram
declare global {
  interface Window {
    Telegram: any;
  }
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    username?: string;
    photoUrl?: string;
  }>({
    id: '882102',
    name: 'xMask Пользователь'
  });

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.expand();
      tg.ready();
      
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserData({
          id: user.id.toString(),
          name: `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`,
          username: user.username,
          photoUrl: user.photo_url
        });
      }
    }
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': 
        return <Dashboard onRenew={() => setActiveView('payment')} />;
      case 'payment': 
        return <Payment userId={userData.id} onBack={() => setActiveView('dashboard')} />;
      case 'profile': return (
        <div className="space-y-6 animate-in zoom-in-95 fade-in duration-500">
          {/* Member Card */}
          <div className="relative glass rounded-[2.5rem] p-8 overflow-hidden group shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#33b5ff]/10 to-transparent opacity-50"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#33b5ff]/5 blur-[60px] rounded-full -mr-20 -mt-20"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="relative flex items-center justify-center">
                  {userData.photoUrl ? (
                    <img 
                      src={userData.photoUrl} 
                      alt="Avatar" 
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ICONS.WhaleLogo className="w-28 h-28 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" />
                  )}
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1 text-center">
                {userData.name}
              </h2>
              {userData.username && (
                <p className="text-[#33b5ff] text-xs font-bold mb-4">@{userData.username}</p>
              )}
              
              <div className="flex justify-center w-full mt-2">
                <div className="bg-white/50 border border-white/80 p-4 px-10 rounded-3xl text-center backdrop-blur-sm min-w-[140px] shadow-sm">
                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-normal mb-1">ID пользователя</div>
                  <div className="text-slate-700 font-extrabold text-sm font-mono tracking-tight">#{userData.id}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action List */}
          <div className="glass rounded-[2rem] p-2 space-y-1 shadow-sm">
            <ProfileItem label="История платежей" subLabel="Посмотреть все транзакции" />
            <ProfileItem label="Наш канал" subLabel="Последние новости и обновления" onClick={() => window.open('https://t.me/your_channel', '_blank')} />
            <ProfileItem label="Управление устройствами" subLabel="2 активные сессии" />
            <div className="mt-4 p-4">
              <button 
                className="w-full py-4 bg-gradient-to-r from-[#33b5ff] to-[#0084ff] rounded-2xl text-[13px] font-black text-white shadow-xl shadow-blue-400/30 active:scale-[0.98] transition-all uppercase tracking-normal"
                onClick={() => {
                  const tg = window.Telegram?.WebApp;
                  if (tg) tg.openTelegramLink('https://t.me/your_support');
                  else window.open('https://t.me/your_support', '_blank');
                }}
              >
                Связаться с поддержкой
              </button>
            </div>
          </div>
        </div>
      );
      default: return <Dashboard onRenew={() => setActiveView('payment')} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-5 pt-8 pb-32 relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute top-[-5%] left-[-15%] w-[350px] h-[350px] bg-[#33b5ff]/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-5%] right-[-15%] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <header className="flex items-center justify-between mb-10 relative z-10 px-1">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
            <ICONS.WhaleLogo className="w-full h-full" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        {renderView()}
      </main>

      {/* Bottom Nav */}
      {activeView !== 'payment' && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[75%] max-w-[280px] z-50">
          <nav className="glass bg-white/90 rounded-[2.5rem] p-2 flex justify-between items-center shadow-2xl shadow-blue-900/10 border border-white/50 backdrop-blur-2xl">
            <NavButton 
              active={activeView === 'dashboard'} 
              onClick={() => setActiveView('dashboard')}
              icon={<ICONS.Dashboard className="w-5 h-5" />}
              label="Главная"
            />
            <NavButton 
              active={activeView === 'profile'} 
              onClick={() => setActiveView('profile')}
              icon={<ICONS.Profile className="w-5 h-5" />}
              label="Профиль"
            />
          </nav>
        </div>
      )}
    </div>
  );
};

const ProfileItem: React.FC<{ label: string; subLabel: string; onClick?: () => void }> = ({ label, subLabel, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 rounded-2xl transition-all group"
  >
    <div className="text-left">
      <div className="text-sm font-extrabold text-slate-800 group-hover:text-[#33b5ff] transition-colors">{label}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-normal mt-0.5">{subLabel}</div>
    </div>
    <div className="text-slate-300 group-hover:text-slate-500 transition-all transform group-hover:translate-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] relative overflow-hidden px-6 py-3.5 rounded-full ${active ? 'bg-[#33b5ff] text-white shadow-xl shadow-blue-400/40 flex-[1.6]' : 'text-slate-400 hover:text-slate-600 flex-1'}`}
  >
    <div className={`relative z-10 flex items-center justify-center gap-2.5 ${active ? 'scale-105' : ''}`}>
      {icon}
      <span className={`text-[12px] font-black transition-all duration-700 overflow-hidden whitespace-nowrap tracking-normal ${active ? 'max-w-[70px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 -translate-x-2'}`}>
        {label}
      </span>
    </div>
  </button>
);

export default App;
