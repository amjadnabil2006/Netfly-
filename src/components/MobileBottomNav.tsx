import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Search, 
  Calculator, 
  MessageCircle, 
  ShieldCheck,
  Settings,
  Layers,
  Menu
} from 'lucide-react';

interface MobileBottomNavProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenOrderModal: () => void;
  onOpenAdminPortal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onNavigateSection,
  onOpenOrderModal,
  onOpenAdminPortal
}) => {
  const { language, t } = useTheme();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      language === 'ar'
        ? 'مرحباً شركة سما كابيتال، أرغب في الاستفسار عن خدمات الاستيراد والشحن من الصين إلى اليمن.'
        : 'Hello Sama Capital, I would like to inquire about importing and freight services from China to Yemen.'
    );
    window.open(`https://api.whatsapp.com/send?phone=967777912345&text=${message}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-colors">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* 1. Home */}
        <button
          onClick={() => onNavigateSection('home')}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors active:scale-95"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </button>

        {/* 2. Tracking */}
        <button
          onClick={() => onNavigateSection('tracking')}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors active:scale-95"
        >
          <Search className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-bold mt-0.5 text-amber-600 dark:text-amber-400">{language === 'ar' ? 'التتبع' : 'Track'}</span>
        </button>

        {/* 3. Center Elevated Quote CTA */}
        <button
          onClick={onOpenOrderModal}
          className="relative -top-3.5 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white dark:border-slate-900 active:scale-95 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold text-slate-900 dark:text-white mt-0.5 whitespace-nowrap">
            {language === 'ar' ? 'طلب شحن' : 'Quote'}
          </span>
        </button>

        {/* 4. Calculator */}
        <button
          onClick={() => onNavigateSection('calculator')}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors active:scale-95"
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">{language === 'ar' ? 'الحاسبة' : 'Calculator'}</span>
        </button>

        {/* 5. WhatsApp Direct */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center p-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
        </button>

      </div>
    </div>
  );
};
