import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Globe, 
  Ship, 
  Menu, 
  X, 
  ShieldCheck, 
  Calculator,
  Search,
  PhoneCall,
  Lock,
  User,
  HelpCircle,
  Settings
} from 'lucide-react';
import { SiteSectionConfig } from '../types';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenAdminPortal: () => void;
  onOpenClientPortal: () => void;
  onNavigateSection: (sectionId: string) => void;
  sections?: SiteSectionConfig[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  onOpenAdminPortal,
  onOpenClientPortal,
  onNavigateSection,
  sections
}) => {
  const { theme, toggleTheme, language, toggleLanguage, t } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSectionEnabled = (id: string) => {
    if (!sections) return true;
    const sec = sections.find(s => s.id === id);
    return sec ? sec.isEnabled : true;
  };

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand wordmark */}
        <a 
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Ship className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-950 dark:text-white whitespace-nowrap">
              {language === 'ar' ? 'سما كابيتال للاستيراد' : 'Sama Capital Logistics'}
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium whitespace-nowrap -mt-1 hidden sm:inline">
              {language === 'ar' ? 'الصين ⇄ اليمن' : 'China ⇄ Yemen Trade'}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs 2xl:text-sm font-semibold text-slate-700 dark:text-slate-200">
          {isSectionEnabled('services') && (
            <button 
              onClick={() => handleNavClick('services')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t('navServices')}
            </button>
          )}
          {isSectionEnabled('routes') && (
            <button 
              onClick={() => handleNavClick('routes')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t('navRoutes')}
            </button>
          )}
          {isSectionEnabled('fleet') && (
            <button 
              onClick={() => handleNavClick('fleet')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t('navFleet')}
            </button>
          )}
          {isSectionEnabled('tracking') && (
            <button 
              onClick={() => handleNavClick('tracking')}
              className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-amber-600 dark:text-amber-400 font-bold"
            >
              <Search className="w-4 h-4" />
              <span>{t('navTracking')}</span>
            </button>
          )}
          {isSectionEnabled('calculator') && (
            <button 
              onClick={() => handleNavClick('calculator')}
              className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{t('navCalculator')}</span>
            </button>
          )}
          {isSectionEnabled('about') && (
            <button 
              onClick={() => handleNavClick('about')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t('navAbout')}
            </button>
          )}
          {isSectionEnabled('faq') && (
            <button 
              onClick={() => handleNavClick('faq')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t('navFaq')}
            </button>
          )}
          {/* Custom added sections links if any */}
          {sections && sections.filter(s => s.isCustom && s.isEnabled).slice(0, 2).map(cs => (
            <button
              key={cs.id}
              onClick={() => handleNavClick(cs.id)}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline transition-all whitespace-nowrap shrink-0 cursor-pointer text-xs px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20"
            >
              {language === 'ar' ? cs.nameAr : cs.nameEn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Client Portal launcher button */}
          <button
            onClick={onOpenClientPortal}
            title={t('navClientPortal')}
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
            aria-label="Client Portal"
          >
            <User className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('navClientPortal')}</span>
          </button>

          {/* 1. Settings / Control Panel Button (الإعدادات) */}
          <button
            onClick={onOpenAdminPortal}
            title={language === 'ar' ? 'لوحة تحكم وإعدادات الموقع' : 'Site Settings & Control Panel'}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs active:scale-95 shrink-0"
            aria-label={t('navAdmin')}
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 transition-transform duration-300 hover:rotate-45" />
            <span>{t('navAdmin')}</span>
          </button>

          {/* 2. Language Toggle Button (الترجمة) */}
          <button
            onClick={toggleLanguage}
            title={language === 'ar' ? 'التحويل إلى اللغة الإنجليزية (Switch to English)' : 'التحويل إلى العربية (Switch to Arabic)'}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors border border-amber-300/70 dark:border-amber-700/70 cursor-pointer active:scale-95 shrink-0"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
            <span className="font-semibold">{language === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {/* 3. Theme Toggle Button (الوضع النهاري والليلي) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? (language === 'ar' ? 'تفعيل الوضع النهاري' : 'Switch to Light Mode') : (language === 'ar' ? 'تفعيل الوضع الليلي' : 'Switch to Dark Mode')}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95 shrink-0"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                <span className="text-amber-400 font-semibold">{language === 'ar' ? 'نهاري' : 'Light'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 dark:text-slate-200" />
                <span className="text-slate-700 dark:text-slate-200 font-semibold">{language === 'ar' ? 'ليلي' : 'Dark'}</span>
              </>
            )}
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenOrderModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('ctaRequestQuote')}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 shrink-0 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200">
          
          {/* Prominent Quick Controls in Mobile Menu */}
          <div className="grid grid-cols-2 gap-2 p-2 mb-3 bg-slate-100/90 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* Mobile Language Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-xs border border-amber-300 dark:border-amber-700/60 shadow-xs cursor-pointer active:scale-95"
            >
              <Globe className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Mobile Theme Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-xs border border-slate-300 dark:border-slate-600 shadow-xs cursor-pointer active:scale-95"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400">{language === 'ar' ? 'الوضع النهاري ☀️' : 'Light Mode ☀️'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                  <span>{language === 'ar' ? 'الوضع الليلي 🌙' : 'Dark Mode 🌙'}</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            {t('navHome')}
          </button>
          {isSectionEnabled('services') && (
            <button
              onClick={() => handleNavClick('services')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {t('navServices')}
            </button>
          )}
          {isSectionEnabled('routes') && (
            <button
              onClick={() => handleNavClick('routes')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {t('navRoutes')}
            </button>
          )}
          {isSectionEnabled('fleet') && (
            <button
              onClick={() => handleNavClick('fleet')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {t('navFleet')}
            </button>
          )}
          {isSectionEnabled('tracking') && (
            <button
              onClick={() => handleNavClick('tracking')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-between"
            >
              <span>{t('navTracking')}</span>
              <Search className="w-4 h-4" />
            </button>
          )}
          {isSectionEnabled('calculator') && (
            <button
              onClick={() => handleNavClick('calculator')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center justify-between"
            >
              <span>{t('navCalculator')}</span>
              <Calculator className="w-4 h-4" />
            </button>
          )}
          {isSectionEnabled('about') && (
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {t('navAbout')}
            </button>
          )}
          {isSectionEnabled('gallery') && (
            <button
              onClick={() => handleNavClick('gallery')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {t('navGallery')}
            </button>
          )}
          {isSectionEnabled('testimonials') && (
            <button
              onClick={() => handleNavClick('testimonials')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              {t('navTestimonials')}
            </button>
          )}
          {isSectionEnabled('faq') && (
            <button
              onClick={() => handleNavClick('faq')}
              className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center justify-between"
            >
              <span>{t('navFaq')}</span>
              <HelpCircle className="w-4 h-4 text-amber-500" />
            </button>
          )}
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-start px-3 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
          >
            {t('navContact')}
          </button>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenClientPortal(); }}
              className="w-full py-2.5 rounded-lg text-center font-bold text-xs text-amber-500 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{t('navClientPortal')}</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOrderModal(); }}
              className="w-full py-3 rounded-lg text-center font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-600 shadow-sm"
            >
              {t('ctaRequestQuote')}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdminPortal(); }}
              className="w-full py-2.5 rounded-lg text-center font-bold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-amber-500" />
              <span>{t('navAdmin')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
