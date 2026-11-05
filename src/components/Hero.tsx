import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SAILING_SCHEDULES, EXCHANGE_RATES } from '../mockData';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Anchor, 
  Plane, 
  Box, 
  MapPin, 
  Calculator,
  Compass,
  CheckCircle2,
  Clock,
  Ship,
  TrendingUp,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onSearchTrack: (code: string) => void;
  onOpenOrderModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchTrack,
  onOpenOrderModal,
  onNavigateSection
}) => {
  const { t, language, isRtl } = useTheme();
  
  // Hub Active Tab: 'track' | 'rate' | 'schedule' | 'fx'
  const [activeHubTab, setActiveHubTab] = useState<'track' | 'rate' | 'schedule' | 'fx'>('track');
  const [trackingInput, setTrackingInput] = useState('');

  // Rate quick inputs
  const [quickService, setQuickService] = useState<'fcl' | 'lcl' | 'air'>('lcl');
  const [quickOrigin, setQuickOrigin] = useState('Guangzhou');
  const [quickDest, setQuickDest] = useState('Aden');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onSearchTrack(trackingInput.trim());
    }
  };

  const verifiedActiveCodes = ['SMC-84920', 'SMC-31950', 'SMC-65210', 'SMC-10842'];

  return (
    <section id="home" className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Hero Image with Dramatic Maritime Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_container_ship_1793753458110.jpg"
          alt="سفينة شحن حاويات عملاقة - سما كابيتال للاستيراد"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-24">
        
        {/* Top Text Group */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          {/* Subtle quiet text kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2.5 tracking-wide">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="line-clamp-1">{t('heroBadge')}</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight mb-4 sm:mb-5">
            {language === 'ar' ? (
              <>
                بوابتك الاحترافية للاستيراد من <span className="text-amber-400 underline decoration-amber-500/50 decoration-wavy underline-offset-4 sm:underline-offset-8">الصين</span> والشحن الآمن إلى <span className="text-amber-400">اليمن</span>
              </>
            ) : (
              <>
                Your Premier Gateway for Importing from <span className="text-amber-400">China</span> & Safe Freight to <span className="text-amber-400">Yemen</span>
              </>
            )}
          </h1>

          {/* Hero Subtitle */}
          <p className="text-xs sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Global Multi-Tab Shipping Command Hub (Like Maersk & Global Portals) */}
        <div className="max-w-4xl bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl shadow-black/80 overflow-hidden mb-8">
          
          {/* Tab Selector Header */}
          <div className="flex border-b border-slate-800 bg-slate-900/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveHubTab('track')}
              className={`py-3.5 px-5 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                activeHubTab === 'track'
                  ? 'border-amber-500 text-amber-400 bg-slate-950/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t('hubTabTrack')}</span>
            </button>

            <button
              onClick={() => setActiveHubTab('rate')}
              className={`py-3.5 px-5 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                activeHubTab === 'rate'
                  ? 'border-amber-500 text-amber-400 bg-slate-950/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{t('hubTabQuote')}</span>
            </button>

            <button
              onClick={() => setActiveHubTab('schedule')}
              className={`py-3.5 px-5 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                activeHubTab === 'schedule'
                  ? 'border-amber-500 text-amber-400 bg-slate-950/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>{t('hubTabSchedule')}</span>
            </button>

            <button
              onClick={() => setActiveHubTab('fx')}
              className={`py-3.5 px-5 text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 ${
                activeHubTab === 'fx'
                  ? 'border-amber-500 text-amber-400 bg-slate-950/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('hubTabExchange')}</span>
            </button>
          </div>

          {/* Tab 1: Live Cargo Tracking */}
          {activeHubTab === 'track' && (
            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400`} />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder={t('heroInputPlaceholder')}
                    className={`w-full py-3.5 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono`}
                  />
                </div>
                <button
                  type="submit"
                  className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>{t('heroTrackBtn')}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              {/* Verified active codes */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-medium text-slate-300">{t('heroQuickLookup')}</span>
                {verifiedActiveCodes.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setTrackingInput(code);
                      onSearchTrack(code);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 font-mono text-xs border border-slate-700/60 transition-colors cursor-pointer"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Quick Rate & Book */}
          {activeHubTab === 'rate' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">نوع الشحن</label>
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="lcl">بحري - تجميع مجزأ (LCL CBM)</option>
                    <option value="fcl">بحري - حاوية كاملة (FCL)</option>
                    <option value="air">شحن جوي سريع (Air Freight)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">ميناء الانطلاق (الصين)</label>
                  <select
                    value={quickOrigin}
                    onChange={(e) => setQuickOrigin(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Guangzhou">كوانزو (Guangzhou)</option>
                    <option value="Yiwu">إيوو (Yiwu Hub)</option>
                    <option value="Ningbo">نينغبو (Ningbo)</option>
                    <option value="Shenzhen">شنتشن (Shenzhen)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">ميناء الوصول (اليمن)</label>
                  <select
                    value={quickDest}
                    onChange={(e) => setQuickDest(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Aden">ميناء عدن الدولي (ACT)</option>
                    <option value="Hodeidah">ميناء الحديدة</option>
                    <option value="Mukalla">ميناء المكلا (حضرموت)</option>
                    <option value="Sanaa">مطار صنعاء / المدينة</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  أسعار تفضيلية مباشرة من الخطوط الملاحية وبدون وسطاء إضافيين.
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateSection('calculator')}
                  className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>فتح تفاصيل الحاسبة وحجز السعر</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Quick Liner Schedule Preview */}
          {activeHubTab === 'schedule' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAILING_SCHEDULES.slice(0, 2).map((sch) => (
                  <div key={sch.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-white block">{sch.vesselName}</span>
                      <span className="text-[11px] text-slate-400">{sch.originPortAr} ➔ {sch.destinationPortAr}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-[11px] font-mono text-emerald-400 block font-semibold">إبحار: {sch.etd}</span>
                      <span className="text-[10px] text-amber-400">وصول: {sch.eta}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">رحلات أسبوعية مستمرة لكل ثلاثاء وخميس.</span>
                <button
                  type="button"
                  onClick={() => onNavigateSection('routes')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>استعراض جدول الرحلات بالكامل</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: Live FX Exchange Benchmark */}
          {activeHubTab === 'fx' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXCHANGE_RATES.map((rate, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-mono">{rate.pair}</span>
                    <span className="text-base font-extrabold font-mono text-amber-400 my-0.5 tabular-nums">{rate.rate}</span>
                    <span className="text-[10px] text-slate-300 truncate">{language === 'ar' ? rate.labelAr : rate.labelEn}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">سما كابيتال تتيح سداد المصانع الصينية باليوان أو الدولار بحماية مصرفية.</span>
                <button
                  type="button"
                  onClick={onOpenOrderModal}
                  className="text-xs font-bold text-amber-400 hover:underline"
                >
                  طلب سداد فاتورة مصنع
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenOrderModal}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-slate-950" />
            <span>{t('ctaRequestQuote')}</span>
          </button>

          <button
            onClick={() => onNavigateSection('routes')}
            className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-700 backdrop-blur-sm transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Ship className="w-4 h-4 text-amber-400" />
            <span>{t('navRoutes')}</span>
          </button>

          <button
            onClick={() => onNavigateSection('fleet')}
            className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-slate-700 backdrop-blur-sm transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Box className="w-4 h-4 text-amber-400" />
            <span>{t('navFleet')}</span>
          </button>
        </div>

      </div>

      {/* 4-Column KPI / Trust Metric Strip */}
      <div className="relative z-10 border-t border-slate-800/90 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {t('statYearsTitle')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {t('statYearsDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {t('statShipmentsTitle')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {t('statShipmentsDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {t('statOfficesTitle')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {t('statOfficesDesc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
                  {t('statSafetyTitle')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {t('statSafetyDesc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
