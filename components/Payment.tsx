
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
}

const Payment: React.FC<PaymentProps> = ({ userId, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]);
  const [paymentType, setPaymentType] = useState<'AC' | 'PC'>('AC'); // AC - card, PC - yoomoney wallet

  const handlePay = () => {
    // В реальности receiver должен быть вашим номером кошелька YooMoney
    const receiver = "410011234567890"; 
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://yoomoney.ru/quickpay/confirm.xml';

    const params: Record<string, string> = {
      'receiver': receiver,
      'quickpay-form': 'shop',
      'targets': `Оплата VPN xMask: ${selectedPlan.duration}`,
      'paymentType': paymentType,
      'sum': selectedPlan.price.toString(),
      'label': userId, // Используем ID пользователя для идентификации платежа на бэкенде
      'successURL': window.location.href,
    };

    for (const key in params) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
            className={`w-full p-5 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group ${
              selectedPlan.id === plan.id 
                ? 'border-[#33b5ff] bg-blue-50/30' 
                : 'border-transparent glass'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#33b5ff] text-white text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
                Популярный
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

      <div className="glass rounded-[2rem] p-6 space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Способ оплаты</h4>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setPaymentType('AC')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
              paymentType === 'AC' ? 'border-[#33b5ff] bg-blue-50/50' : 'border-slate-100 bg-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={paymentType === 'AC' ? 'text-[#33b5ff]' : 'text-slate-400'}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            <span className={`text-[10px] font-black uppercase ${paymentType === 'AC' ? 'text-slate-900' : 'text-slate-400'}`}>Карта РФ</span>
          </button>
          <button 
            onClick={() => setPaymentType('PC')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
              paymentType === 'PC' ? 'border-[#33b5ff] bg-blue-50/50' : 'border-slate-100 bg-white'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] ${paymentType === 'PC' ? 'bg-[#33b5ff] text-white' : 'bg-slate-100 text-slate-400'}`}>Ю</div>
            <span className={`text-[10px] font-black uppercase ${paymentType === 'PC' ? 'text-slate-900' : 'text-slate-400'}`}>ЮMoney</span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <button 
          onClick={handlePay}
          className="w-full py-5 bg-[#33b5ff] text-white text-[14px] font-black rounded-[1.5rem] shadow-2xl shadow-blue-400/40 active:scale-[0.98] transition-all uppercase"
        >
          Оплатить {selectedPlan.price}₽
        </button>
        <p className="text-center text-[9px] text-slate-400 mt-4 px-6 leading-relaxed">
          Нажимая кнопку, вы соглашаетесь с условиями оферты и правилами сервиса. Оплата производится через защищенный шлюз YooMoney.
        </p>
      </div>
    </div>
  );
};

export default Payment;
