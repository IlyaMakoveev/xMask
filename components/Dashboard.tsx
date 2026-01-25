
import React from 'react';
import { MOCK_USER, ICONS } from '../constants';

const Dashboard: React.FC = () => {
  const trafficPercent = (MOCK_USER.usedTraffic / MOCK_USER.totalTraffic) * 100;
  
  // Logic for days remaining for other parts of the UI if needed
  const daysRemaining = 12; 

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4">
      {/* Traffic Stats Card */}
      <div className="glass rounded-3xl p-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-4xl font-extrabold text-slate-900">{MOCK_USER.usedTraffic}</span>
            <span className="text-slate-400 text-lg ml-1">/ {MOCK_USER.totalTraffic} GB</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Status</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              {MOCK_USER.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-[#33b5ff] to-[#0084ff] rounded-full transition-all duration-1000"
            style={{ width: `${trafficPercent}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Expires In</div>
            <div className="text-sm font-semibold text-slate-700">{daysRemaining} Days</div>
          </div>
          <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Last Reset</div>
            <div className="text-sm font-semibold text-slate-700">Dec 1, 2024</div>
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      <div className="glass rounded-3xl p-6 bg-white border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800">
            <div className="w-1 h-4 bg-[#33b5ff] rounded-full"></div>
            Subscription Config
          </h4>
          <button 
            className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
            onClick={() => {
              alert('Redirecting to xMask Payment Gateway...');
            }}
          >
            Pay Now
          </button>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between mb-4">
          <code className="text-[10px] text-slate-500 truncate max-w-[200px] font-mono">
            {MOCK_USER.subscriptionLink}
          </code>
          <button 
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 active:scale-90"
            onClick={() => {
              navigator.clipboard.writeText(MOCK_USER.subscriptionLink);
              alert('Copied to clipboard!');
            }}
          >
            <ICONS.Copy className="w-4 h-4" />
          </button>
        </div>
        <button 
          className="w-full py-4 bg-[#33b5ff] text-white font-bold rounded-2xl hover:bg-[#2da3e5] transition-colors active:scale-95 shadow-lg shadow-blue-500/20"
          onClick={() => {
            navigator.clipboard.writeText(MOCK_USER.subscriptionLink);
            alert('Copied to clipboard!');
          }}
        >
          Copy Config Link
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
