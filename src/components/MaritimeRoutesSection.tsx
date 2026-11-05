import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SAILING_SCHEDULES, EXCHANGE_RATES } from '../mockData';
import { SailingSchedule } from '../types';
import { 
  Compass, 
  Anchor, 
  Ship, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  MapPin, 
  ShieldCheck,
  Building,
  Navigation
} from 'lucide-react';

interface MaritimeRoutesSectionProps {
  onBookSchedule: (schedule: SailingSchedule) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const MaritimeRoutesSection: React.FC<MaritimeRoutesSectionProps> = ({
  onBookSchedule,
  onNavigateSection
}) => {
  const { t, language, isRtl } = useTheme();
  const [selectedDestFilter, setSelectedDestFilter] = useState<string>('all');

  const filteredSchedules = selectedDestFilter === 'all'
    ? SAILING_SCHEDULES
    : SAILING_SCHEDULES.filter(s => s.destinationPortAr.includes(selectedDestFilter) || s.destinationPortEn.toLowerCase().includes(selectedDestFilter.toLowerCase()));

  return (
    <section id="routes" className="py-24 bg-slate-900 text-white relative overflow-hidden transition-colors">
      
      {/* Background Subtle Grid & Maritime Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2 tracking-wider uppercase">
            <Navigation className="w-4 h-4 text-amber-400" />
            <span>{t('routeKicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t('routeTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t('routeSubtitle')}
          </p>
        </div>

        {/* Live Foreign Exchange & Trade Ticker */}
        <div className="mb-14 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
              <span>مؤشرات أسعار الصرف والتجارة الدولية (الصين - اليمن):</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-1">
              {EXCHANGE_RATES.map((rate, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-mono font-bold text-white">{rate.pair}</span>
                    <span className="font-mono text-emerald-400 text-[10px]">{rate.change}</span>
                  </div>
                  <span className="text-base font-extrabold font-mono text-amber-400 tabular-nums">
                    {rate.rate}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate mt-0.5">
                    {language === 'ar' ? rate.labelAr : rate.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Interactive Maritime Route Map Diagram */}
        <div className="mb-16 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Direct Maritime Corridor
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                خريطة الموانئ الصينية والمنافذ اليمنية
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span>موانئ الانطلاق الصينية</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>المسار البحري الدولي</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>موانئ الوصول في اليمن</span>
              </span>
            </div>
          </div>

          {/* Graphical Corridor Flow */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* China Hubs (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-300">كوانزو · ميناء نانشا (Guangzhou)</span>
                  <span className="text-[10px] font-mono text-slate-400">HUB-GZ</span>
                </div>
                <p className="text-[11px] text-slate-400">مركز البضائع العامة والأجهزة الكهربائية ومستودع التجميع المركزي.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-300">إيوو · سوق الفوتيان التجاري (Yiwu)</span>
                  <span className="text-[10px] font-mono text-slate-400">HUB-YW</span>
                </div>
                <p className="text-[11px] text-slate-400">أكبر مستودع لتجميع البضائع المجزأة (LCL) وتدقيق البضائع الخفيفة.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-300">نينغبو & شنتشن (Ningbo & Shenzhen)</span>
                  <span className="text-[10px] font-mono text-slate-400">PORTS</span>
                </div>
                <p className="text-[11px] text-slate-400">محطات الحاويات العملاقة والرحلات المباشرة لموانئ البحر الأحمر.</p>
              </div>
            </div>

            {/* Maritime Transit Corridor Lane (4 cols) */}
            <div className="md:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <Ship className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  الممر الملاحي: بحر الصين الجنوبي ➔ المحيط الهندي ➔ خليج عدن
                </h4>
                <p className="text-xs text-amber-300/90 font-mono">
                  {t('routeTransitTime')}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                <p>{t('routeDepartureFrequency')}</p>
              </div>
            </div>

            {/* Yemen Seaports (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-300">محطة حاويات ميناء عدن (ACT)</span>
                  <span className="text-[10px] font-mono text-emerald-400">PORT-ADEN</span>
                </div>
                <p className="text-[11px] text-slate-400">المنفذ البحري الرئيسي مع تخليص جمركي فوري وتوزيع لكافة المحافظات.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-300">ميناء الحديدة (Hodeidah Port)</span>
                  <span className="text-[10px] font-mono text-emerald-400">PORT-HOD</span>
                </div>
                <p className="text-[11px] text-slate-400">شحن مباشر للمحافظات الشمالية والغربية وتسهيل الإجراءات الجمركية.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-300">ميناء المكلا ومطار صنعاء الدولي</span>
                  <span className="text-[10px] font-mono text-emerald-400">MUKALLA / SANAA</span>
                </div>
                <p className="text-[11px] text-slate-400">خدمات متخصصة لتجارة حضرموت والشحن الجوي السريع للعينات لصنعاء.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Live Liner Sailing Schedules Table */}
        <div id="schedules" className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {t('scheduleKicker')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t('scheduleTitle')}
              </h3>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedDestFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedDestFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                جميع الموانئ
              </button>
              <button
                onClick={() => setSelectedDestFilter('عدن')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedDestFilter === 'عدن' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ميناء عدن
              </button>
              <button
                onClick={() => setSelectedDestFilter('الحديدة')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedDestFilter === 'الحديدة' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ميناء الحديدة
              </button>
              <button
                onClick={() => setSelectedDestFilter('المكلا')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedDestFilter === 'المكلا' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                المكلا
              </button>
            </div>
          </div>

          {/* Mobile Card View (md:hidden) */}
          <div className="md:hidden space-y-3">
            {filteredSchedules.map((sch) => (
              <div 
                key={sch.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm"
              >
                {/* Header: Vessel & Status */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                      <Ship className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">{sch.vesselName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{sch.voyageNumber}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {sch.status === 'booking_open' ? 'الحجز مفتوح' : 'المقاعد محدودة'}
                  </span>
                </div>

                {/* Ports Route */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block mb-0.5">{t('scheduleColOrigin')}</span>
                    <span className="font-bold text-slate-200">{language === 'ar' ? sch.originPortAr : sch.originPortEn}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                    <span className="text-[10px] text-slate-400 block mb-0.5">{t('scheduleColDest')}</span>
                    <span className="font-bold text-amber-400">{language === 'ar' ? sch.destinationPortAr : sch.destinationPortEn}</span>
                  </div>
                </div>

                {/* Sailing Dates */}
                <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-center pt-1 border-t border-slate-800/60">
                  <div>
                    <span className="text-[10px] text-slate-500 block">إغلاق الشحن</span>
                    <span className="text-rose-400 font-bold">{sch.cargoCutoff}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">الإبحار (ETD)</span>
                    <span className="text-slate-300">{sch.etd}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">الوصول (ETA)</span>
                    <span className="text-emerald-400 font-bold">{sch.eta}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onBookSchedule(sch)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Ship className="w-4 h-4" />
                  <span>حجز مساحة على هذه الرحلة</span>
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Schedules Table (hidden md:block) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-start uppercase font-mono">
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColVessel')}</th>
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColOrigin')}</th>
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColDest')}</th>
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColCutoff')}</th>
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColETD')}</th>
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColETA')}</th>
                  <th className="py-3 px-4 text-start font-semibold">{t('scheduleColStatus')}</th>
                  <th className="py-3 px-4 text-end font-semibold">{t('scheduleColAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredSchedules.map((sch) => (
                  <tr key={sch.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Ship className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span>{sch.vesselName}</span>
                          <span className="block text-[11px] text-slate-400">{sch.voyageNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {language === 'ar' ? sch.originPortAr : sch.originPortEn}
                    </td>
                    <td className="py-4 px-4 text-amber-300 font-semibold">
                      {language === 'ar' ? sch.destinationPortAr : sch.destinationPortEn}
                    </td>
                    <td className="py-4 px-4 font-mono text-rose-400">
                      {sch.cargoCutoff}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {sch.etd}
                    </td>
                    <td className="py-4 px-4 font-mono text-emerald-400 font-bold">
                      {sch.eta}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {sch.status === 'booking_open' ? 'الحجز مفتوح' : 'المقاعد محدودة'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-end">
                      <button
                        onClick={() => onBookSchedule(sch)}
                        className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        حجز الحاوية
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
