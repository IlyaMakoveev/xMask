
import React from 'react';

const SERVERS = [
  { id: '1', name: 'Frankfurt-01', flag: '🇩🇪', ping: '42ms', load: 12, status: 'Online' },
  { id: '2', name: 'Warsaw-VIP', flag: '🇵🇱', ping: '28ms', load: 45, status: 'Online' },
  { id: '3', name: 'Helsinki-Main', flag: '🇫🇮', ping: '56ms', load: 88, status: 'Full' },
  { id: '4', name: 'Amsterdam-UDP', flag: '🇳🇱', ping: '38ms', load: 5, status: 'Online' },
];

const ServerList: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Доступные локации</h3>
        <span className="text-[10px] font-bold text-[#33b5ff]">{SERVERS.length} Онлайн</span>
      </div>
      
      {SERVERS.map((server) => (
        <div key={server.id} className="glass p-4 rounded-2xl flex items-center justify-between group cursor-pointer transition-all hover:border-[#33b5ff]/30">
          <div className="flex items-center gap-4">
            <div className="text-2xl">{server.flag}</div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">{server.name}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">VLESS • REALITY</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-xs font-black ${parseInt(server.ping) < 40 ? 'text-emerald-500' : 'text-amber-500'}`}>{server.ping}</div>
            <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div 
                className={`h-full rounded-full ${server.load > 80 ? 'bg-rose-400' : 'bg-[#33b5ff]'}`} 
                style={{ width: `${server.load}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServerList;
