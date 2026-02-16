
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { ICONS } from './constants';
import Dashboard from './components/Dashboard';
import Payment from './components/Payment';
import ServerList from './components/ServerList';

declare global {
  interface Window {
    Telegram: any;
  }
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [showNotification, setShowNotification] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });
  const [userData, setUserData] = useState({
    id: '882102',
    name: 'Демо Пользователь',
    username: 'demo_user',
    photoUrl: ''
  });

  useEffect(() => {
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

  const notify = (msg: string) => {
    setShowNotification({ show: true, msg });
    setTimeout(() => setShowNotification({ show: false, msg: '' }), 3000);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': 
        return <Dashboard onRenew={() => setActiveView('payment')} />;
      case 'payment': 
        return <Payment 
          userId={userData.id} 
          onBack={() => setActiveView('dashboard')} 
          onDemoSuccess={() => {
            setActiveView('dashboard');
            notify('Подписка успешно продлена (Демо)');
          }}
        />;
      case 'profile': return (
        <div className="space-y-6 animate-in zoom-in-95 fade-in duration-500 pb-20">
          {/* Profile Card */}
          <div className="relative glass rounded-[2.5rem] p-8 overflow-hidden border-white shadow-xl bg-white/40">
            <div className="absolute inset-0 bg-gradient-to-br from-[#33b5ff]/10 to-transparent opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-[#33b5ff]/10 shadow-lg mb-4 p-4">
                 <ICONS.WhaleLogo className="w-full h-full" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-1 leading-none">{userData.name}</h2>
              <p className="text-[#33b5ff] text-[10px] font-black uppercase tracking-widest mb-6">Premium Identity</p>
              
              <div className="flex gap-2 w-full">
                <div className="flex-1 bg-white/60 border border-white p-3 rounded-2xl shadow-sm">
                  <div className="text-slate-400 text-[8px] font-black uppercase mb-0.5">ID Аккаунта</div>
                  <div className="text-slate-700 font-extrabold text-[11px] font-mono">#{userData.id}</div>
                </div>
                <div className="flex-1 bg-white/60 border border-white p-3 rounded-2xl shadow-sm">
                  <div className="text-slate-400 text-[8px] font-black uppercase mb-0.5">Статус</div>
                  <div className="text-emerald-500 font-extrabold text-[11px]">ACTIVE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Servers Section */}
          <ServerList />

          {/* Action List */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4 mb-1">Настройки и помощь</h3>
            <div className="glass rounded-[2rem] p-2 space-y-1 bg-white/30 border-white">
              <ProfileItem 
                label="История платежей" 
                subLabel="Последний: 199₽ (Карта РФ)" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>}
              />
              <ProfileItem 
                label="Параметры протокола" 
                subLabel="VLESS Reality / gRPC" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>}
              />
              <ProfileItem 
                label="Связаться с поддержкой" 
                subLabel="Помощь 24/7" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
              />
            </div>
          </div>
        </div>
      );
      default: return <Dashboard onRenew={() => setActiveView('payment')} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-5 pt-8 pb-32 relative overflow-hidden flex flex-col bg-[#fcfdfe]">
      {/* Notification Toast */}
      {showNotification.show && (
        <div className="fixed top-6 left-5 right-5 z-[100] animate-in slide-in-from-top-full duration-500">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
            <p className="font-black text-[10px] uppercase tracking-[0.2em]">{showNotification.msg}</p>
          </div>
        </div>
      )}

      {/* Decor */}
      <div className="absolute top-[-5%] left-[-15%] w-[350px] h-[350px] bg-[#33b5ff]/10 rounded-full blur-[100px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-5%] right-[-15%] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <header className="flex items-center justify-between mb-8 relative z-10 px-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <ICONS.WhaleLogo className="w-full h-full" />
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="text-[9px] font-black bg-emerald-50 text-emerald-500 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-tighter">System Online</div>
            <div className="text-[9px] font-black bg-blue-50 text-[#33b5ff] px-3 py-1.5 rounded-full border border-blue-100 uppercase tracking-tighter">Demo</div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {renderView()}
      </main>

      {activeView !== 'payment' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-[60]">
          <nav className="glass bg-white/80 rounded-[2.5rem] p-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 backdrop-blur-3xl">
            <NavButton 
              active={activeView === 'dashboard'} 
              onClick={() => setActiveView('dashboard')}
              icon={<ICONS.Dashboard className="w-5 h-5" />}
              label="Статус"
            />
            <NavButton 
              active={activeView === 'profile'} 
              onClick={() => setActiveView('profile')}
              icon={<ICONS.Profile className="w-5 h-5" />}
              label="Кабинет"
            />
          </nav>
        </div>
      )}
    </div>
  );
};

const ProfileItem: React.FC<{ label: string; subLabel: string; icon?: React.ReactNode; onClick?: () => void }> = ({ label, subLabel, icon, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-white/60 rounded-2xl transition-all group text-left">
    <div className="flex items-center gap-4">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#33b5ff] group-hover:bg-blue-50 transition-all border border-slate-100/50">
          {icon}
        </div>
      )}
      <div>
        <div className="text-sm font-extrabold text-slate-800 group-hover:text-slate-900 leading-tight">{label}</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight">{subLabel}</div>
      </div>
    </div>
    <div className="text-slate-300 group-hover:text-slate-500 transform group-hover:translate-x-1 transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center transition-all duration-500 px-6 py-4 rounded-[2rem] ${active ? 'bg-[#33b5ff] text-white shadow-xl shadow-blue-400/20 flex-[1.8]' : 'text-slate-400 flex-1 hover:text-slate-600'}`}
  >
    <div className="flex items-center justify-center gap-2">
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      {active && <span className="text-[11px] font-black tracking-tight whitespace-nowrap">{label}</span>}
    </div>
  </button>
);

export default App;
