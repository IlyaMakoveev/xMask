
import React, { useState } from 'react';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  { id: '1m', name: 'Lite', price: 199, duration: '1 месяц', description: 'Базовая скорость, 1 устройство' },
  { id: '3m', name: 'Standard', price: 499, duration: '3 месяца', description: 'Высокая скорость, 3 устройства', popular: true },
  { id: '1y', name: 'Infinity', price: 1490, duration: '1 год', description: 'Макс. скорость, 5 устройств, приоритет' },
];

interface PaymentProps {
  userId: string;
  onBack: () => void;
  onDemoSuccess?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ userId, onBack, onDemoSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDemoPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (onDemoSuccess) onDemoSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 active:scale-90 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-black text-slate-900">Выбор тарифа</h2>
      </div>

      <div className="space-y-3">
        {PLANS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`w-full p-5 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden ${
              selectedPlan.id === plan.id 
                ? 'border-[#33b5ff] bg-blue-50/30 shadow-lg' 
                : 'border-transparent glass'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#33b5ff] text-white text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                Best
              </div>
            )}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[10px] font-black text-[#33b5ff] uppercase tracking-wider mb-1">{plan.name}</div>
                <div className="text-lg font-black text-slate-900">{plan.duration}</div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">{plan.description}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">{plan.price}₽</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-2">
        <button 
          onClick={handleDemoPay}
          disabled={isProcessing}
          className="w-full py-5 bg-[#33b5ff] text-white text-[14px] font-black rounded-[1.5rem] shadow-2xl shadow-blue-400/40 active:scale-[0.98] transition-all uppercase flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : `Оплатить ${selectedPlan.price}₽`}
        </button>
        <p className="text-center text-[9px] text-slate-400 mt-4 px-6 leading-relaxed">
          В демонстрационном режиме оплата не списывается. Нажмите кнопку выше для имитации успешной транзакции.
        </p>
      </div>
    </div>
  );
};

export default Payment;
