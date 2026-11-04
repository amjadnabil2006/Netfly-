import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CompanyGeneralSettings } from '../types';
import { AlertCircle, Bell, ArrowRight, ArrowLeft } from 'lucide-react';

interface AnnouncementBarProps {
  settings: CompanyGeneralSettings;
  onOpenOrderModal: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  settings,
  onOpenOrderModal
}) => {
  const { language, isRtl } = useTheme();

  if (!settings.showAnnouncementBar) return null;

  const text = language === 'ar' ? settings.announcementBarTextAr : settings.announcementBarTextEn;
  if (!text) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-2 px-4 text-xs font-semibold shadow-inner border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
            <Bell className="w-3 h-3 animate-pulse" />
          </div>
          <span className="truncate">
            {text}
          </span>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 text-amber-400 hover:text-white hover:bg-slate-900 transition-colors text-[11px] font-bold cursor-pointer"
        >
          <span>{language === 'ar' ? 'حجز فوري' : 'Book Now'}</span>
          {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
