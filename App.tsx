
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
    username: 'xmask_demo',
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
          <div className="relative glass rounded-[2.5rem] p-8 overflow-hidden border-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#33b5ff]/10 to-transparent opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-[#33b5ff]/10 shadow-lg mb-4 p-4">
                 <ICONS.WhaleLogo className="w-full h-full" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-1 leading-none">{userData.name}</h2>
              <p className="text-[#33b5ff] text-[10px] font-black uppercase tracking-widest mb-6">Premium Status</p>
              
              <div className="bg-white/50 border border-white p-3 px-8 rounded-2xl text-center backdrop-blur-sm shadow-sm">
                <div className="text-slate-400 text-[8px] font-black uppercase mb-0.5">ID Аккаунта</div>
                <div className="text-slate-700 font-extrabold text-[11px] font-mono">#{userData.id}</div>
              </div>
            </div>
          </div>

          {/* Servers Section */}
          <ServerList />

          {/* Action List */}
          <div className="glass rounded-[2rem] p-2 space-y-1">
            <ProfileItem label="История платежей" subLabel="Последний: 199₽ (Карта РФ)" />
            <ProfileItem label="Настройки" subLabel="Смена протокола и SNI" />
            <ProfileItem label="Поддержка" subLabel="Связаться в Telegram" />
          </div>
        </div>
      );
      default: return <Dashboard onRenew={() => setActiveView('payment')} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-5 pt-8 pb-32 relative overflow-hidden flex flex-col">
      {/* Notification Toast */}
      {showNotification.show && (
        <div className="fixed top-6 left-5 right-5 z-[100] animate-in slide-in-from-top-full duration-500">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10">
            <p className="font-black text-[10px] uppercase tracking-widest">{showNotification.msg}</p>
          </div>
        </div>
      )}

      {/* Decor */}
      <div className="absolute top-[-5%] left-[-15%] w-[350px] h-[350px] bg-[#33b5ff]/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-5%] right-[-15%] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <header className="flex items-center justify-between mb-8 relative z-10 px-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <ICONS.WhaleLogo className="w-full h-full" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900 italic"></span>
        </div>
        <div className="text-[10px] font-black bg-blue-50 text-[#33b5ff] px-3 py-1.5 rounded-full border border-blue-100 uppercase tracking-tight">Demo Mode</div>
      </header>

      <main className="relative z-10 flex-1">
        {renderView()}
      </main>

      {activeView !== 'payment' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[300px] z-50">
          <nav className="glass bg-white/90 rounded-[2.5rem] p-2 flex justify-between items-center shadow-2xl border border-white/50 backdrop-blur-2xl">
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

const ProfileItem: React.FC<{ label: string; subLabel: string; onClick?: () => void }> = ({ label, subLabel, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 rounded-2xl transition-all group text-left">
    <div>
      <div className="text-sm font-extrabold text-slate-800 group-hover:text-[#33b5ff]">{label}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{subLabel}</div>
    </div>
    <div className="text-slate-300 group-hover:text-slate-500 transform group-hover:translate-x-1 transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </button>
);

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center transition-all duration-500 px-6 py-3.5 rounded-full ${active ? 'bg-[#33b5ff] text-white shadow-xl shadow-blue-400/40 flex-[1.6]' : 'text-slate-400 flex-1'}`}
  >
    <div className="flex items-center justify-center gap-2">
      {icon}
      {active && <span className="text-[12px] font-black tracking-tight">{label}</span>}
    </div>
  </button>
);

export default App;
