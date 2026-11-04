import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { language, isRtl } = useTheme();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const text = encodeURIComponent(
      language === 'ar'
        ? 'السلام عليكم شركة سما كابيتال، أرغب في الاستفسار عن الشحن والاستيراد من الصين إلى اليمن.'
        : 'Hello Sama Capital Logistics, I want to inquire about importing from China to Yemen.'
    );
    window.open(`https://api.whatsapp.com/send?phone=967777912345&text=${text}`, '_blank');
  };

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-40 flex items-center gap-3`}>
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span>{language === 'ar' ? 'تحدث مع استشاري الشحن عبر واتساب' : 'Chat with Logistics Advisor'}</span>
          <button
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/40 cursor-pointer"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-emerald-500 group-hover:scale-105 transition-transform" />
      </button>
    </div>
  );
};
