import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SiteSectionConfig } from '../types';
import { 
  Megaphone, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  ShieldCheck,
  Ship,
  Layers
} from 'lucide-react';

interface CustomSectionRendererProps {
  section: SiteSectionConfig;
  onOpenOrderModal: () => void;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  onOpenOrderModal
}) => {
  const { language, isRtl } = useTheme();

  const title = language === 'ar' ? (section.titleAr || section.nameAr) : (section.titleEn || section.nameEn);
  const subtitle = language === 'ar' ? section.subtitleAr : section.subtitleEn;
  const badge = language === 'ar' ? (section.customBadgeAr || 'قسم مخصص') : (section.customBadgeEn || 'Special Feature');
  const content = language === 'ar' ? section.customContentAr : section.customContentEn;
  const ctaText = language === 'ar' ? section.customCtaTextAr : section.customCtaTextEn;

  const handleCtaClick = () => {
    if (section.customCtaLink === '#order' || !section.customCtaLink) {
      onOpenOrderModal();
    } else if (section.customCtaLink.startsWith('http')) {
      window.open(section.customCtaLink, '_blank', 'noopener,noreferrer');
    } else if (section.customCtaLink.startsWith('#')) {
      const el = document.getElementById(section.customCtaLink.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const style = section.customStyle || 'card';

  // 1. Alert / Notice Style
  if (style === 'alert') {
    return (
      <section id={section.id} className="py-12 bg-amber-500/10 dark:bg-amber-950/30 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 shadow-lg shadow-amber-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                    {badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                </div>
                {subtitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {subtitle}
                  </p>
                )}
                {content && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 whitespace-pre-line leading-relaxed">
                    {content}
                  </p>
                )}
              </div>
            </div>

            {ctaText && (
              <button
                onClick={handleCtaClick}
                className="shrink-0 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{ctaText}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // 2. High-Impact Maritime Banner Style
  if (style === 'banner') {
    return (
      <section id={section.id} className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-y border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl mx-auto mb-4 text-white">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              {subtitle}
            </p>
          )}

          {content && (
            <div className="max-w-3xl mx-auto mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-xs sm:text-sm text-slate-300 leading-relaxed text-start sm:text-center whitespace-pre-line">
              {content}
            </div>
          )}

          {ctaText && (
            <button
              onClick={handleCtaClick}
              className="px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{ctaText}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </section>
    );
  }

  // 3. Multi-Feature Grid Style
  if (style === 'features') {
    const featureLines = content ? content.split('\n').filter(l => l.trim().length > 0) : [];

    return (
      <section id={section.id} className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
              {badge}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {subtitle}
              </p>
            )}
          </div>

          {featureLines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featureLines.map((line, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-amber-500/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          ) : content ? (
            <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              {content}
            </div>
          ) : null}

          {ctaText && (
            <div className="text-center">
              <button
                onClick={handleCtaClick}
                className="px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{ctaText}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>
      </section>
    );
  }

  // 4. Default: Standard Corporate Card / Showcase
  return (
    <section id={section.id} className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Layers className="w-3.5 h-3.5" />
                <span>{badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {title}
              </h2>

              {subtitle && (
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {subtitle}
                </p>
              )}

              {content && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {content}
                </div>
              )}
            </div>

            {ctaText && (
              <div className="shrink-0 w-full md:w-auto">
                <button
                  onClick={handleCtaClick}
                  className="w-full md:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{ctaText}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
