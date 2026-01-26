
import React from 'react';
import { MOCK_USER, ICONS } from '../constants';

const Dashboard: React.FC = () => {
  const trafficPercent = (MOCK_USER.usedTraffic / MOCK_USER.totalTraffic) * 100;
  
  // Logic for days remaining
  const daysRemaining = 12; 
  const totalDays = 30; 

  const statusMap: Record<string, string> = {
    'active': 'Активен',
    'expired': 'Истек',
    'suspended': 'Приостановлен'
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-4">
      {/* Traffic Stats Card */}
      <div className="glass rounded-[2rem] p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#33b5ff]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Общий объем</div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">{MOCK_USER.usedTraffic}</span>
              <span className="text-slate-400 text-lg font-semibold italic">/ {MOCK_USER.totalTraffic}GB</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-[11px] font-extrabold shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            {statusMap[MOCK_USER.status]?.toUpperCase() || MOCK_USER.status.toUpperCase()}
          </div>
        </div>

        <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#33b5ff] to-[#0084ff] rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(51,181,255,0.4)]"
            style={{ width: `${trafficPercent}%` }}
          ></div>
        </div>

        {/* Calendar-Style Subscription Block */}
        <div className="bg-white rounded-2xl p-5 flex items-center justify-between border border-slate-100/80 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#33b5ff]/5 blur-[30px] rounded-full -mr-12 -mt-12 group-hover:bg-[#33b5ff]/10 transition-all duration-700"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl px-3 py-3 border border-slate-100 shadow-sm w-16">
              <span className="text-[#33b5ff] text-2xl font-black leading-none">{daysRemaining}</span>
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-tight mt-1.5">Дней</span>
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm tracking-tight mb-0.5">Премиум План</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#33b5ff]"></span>
                <span className="text-slate-400 text-[10px] font-bold">Истекает {MOCK_USER.expiryDate}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-1 relative z-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i < (totalDays - daysRemaining) 
                    ? 'bg-slate-100' 
                    : i === (totalDays - daysRemaining) 
                      ? 'bg-[#33b5ff] shadow-[0_0_10px_#33b5ff] scale-125' 
                      : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pay Now Button - Large Accent */}
      <div className="px-1">
        <button 
          className="w-full py-5 bg-[#33b5ff] text-white text-[13px] font-black rounded-[1.5rem] hover:bg-[#2da3e5] transition-all active:scale-[0.97] shadow-2xl shadow-blue-400/30 uppercase tracking-[0.2em] relative overflow-hidden group"
          onClick={() => alert('Перенаправление на платежный шлюз xMask...')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          Продлить подписку
        </button>
      </div>

      {/* Subscription Information Block */}
      <div className="glass rounded-[2rem] p-7 border border-slate-100/50">
        <div className="mb-6">
          <h4 className="text-xs font-black flex items-center gap-2.5 text-slate-400 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-[#33b5ff] rounded-full"></div>
            Конфиг подписки
          </h4>
        </div>

        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between mb-5 group">
          <code className="text-[10px] text-slate-500 truncate max-w-[180px] font-mono font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            {MOCK_USER.subscriptionLink}
          </code>
          <button 
            className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 active:scale-90"
            onClick={() => {
              navigator.clipboard.writeText(MOCK_USER.subscriptionLink);
              alert('Скопировано в буфер обмена!');
            }}
          >
            <ICONS.Copy className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-slate-200 text-[12px] uppercase tracking-[0.15em]"
          onClick={() => {
            navigator.clipboard.writeText(MOCK_USER.subscriptionLink);
            alert('Скопировано в буфер обмена!');
          }}
        >
          Копировать ключ доступа
        </button>
      </div>
    </div>
  );
};

export default Dashboard;