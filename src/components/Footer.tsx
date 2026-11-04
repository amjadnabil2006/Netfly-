import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Ship, Lock, Phone, MessageCircle, Mail, MapPin, User, HelpCircle, Sun, Moon, Globe, Settings } from 'lucide-react';

interface FooterProps {
  onOpenAdminPortal: () => void;
  onOpenClientPortal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminPortal,
  onOpenClientPortal,
  onNavigateSection
}) => {
  const { t, language, theme, toggleTheme, toggleLanguage } = useTheme();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Ship className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white">
                {language === 'ar' ? 'سما كابيتال للاستيراد' : 'Sama Capital Logistics'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('brandTagline')}. الشريك الاستراتيجي لرجال الأعمال والمستوردين من مصانع الصين إلى موانئ ومدن اليمن.
            </p>
            <p className="text-[11px] text-slate-500">
              {t('footerLegalNotice')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navServices')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('routes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navRoutes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('fleet')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navFleet')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tracking')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navTracking')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navCalculator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t('navFaq')}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenClientPortal}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('navClientPortal')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              فروع العمليات اللوجستية
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{t('footerChinaOffices')}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{t('footerYemenOffices')}</span>
              </p>
            </div>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              الدعم المباشر
            </h4>
            <div className="space-y-2">
              <a
                href="https://api.whatsapp.com/send?phone=967777912345"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>+967 777 912 345 (WhatsApp)</span>
              </a>
              <a
                href="tel:+9672245880"
                className="flex items-center gap-2 hover:text-white font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+967 2 245 880 (Aden)</span>
              </a>
              <a
                href="mailto:info@samacapital.ye"
                className="flex items-center gap-2 hover:text-white font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>info@samacapital.ye</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500">
            {t('footerRights')} {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-3">
            {/* Footer Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-[11px] font-bold border border-slate-800 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Footer Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors text-[11px] font-bold border border-slate-800 cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? 'الوضع النهاري' : 'Light Mode'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}</span>
                </>
              )}
            </button>

            {/* Footer Settings / Admin */}
            <button
              onClick={onOpenAdminPortal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors text-[11px] font-bold border border-slate-800 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('navAdmin')}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
