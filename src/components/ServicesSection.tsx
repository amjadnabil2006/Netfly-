import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Ship, 
  Box, 
  Plane, 
  CheckCheck, 
  ShieldCheck, 
  FileCheck, 
  CreditCard, 
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenOrderModalWithService: (serviceType: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenOrderModalWithService,
  onNavigateSection
}) => {
  const { t, language, isRtl } = useTheme();

  const services = [
    {
      id: 'sea_fcl',
      number: '01',
      title: t('serviceSeaFclTitle'),
      desc: t('serviceSeaFclDesc'),
      icon: Ship,
      highlightsAr: ['حاويات 20ft و 40ft و 40HQ', 'رحلات بحرية مباشرة لميناء عدن والحديدة', 'أسعار شحن تنافسية وتأمين بحري'],
      highlightsEn: ['20ft, 40ft, and 40HQ containers', 'Direct voyages to Aden & Hodeidah', 'Competitive freight rates & insurance'],
      featured: true,
      serviceKey: 'sea_fcl'
    },
    {
      id: 'sea_lcl',
      number: '02',
      title: t('serviceSeaLclTitle'),
      desc: t('serviceSeaLclDesc'),
      icon: Box,
      highlightsAr: ['تجميع من أسواق كوانزو وإيوو وفوشان', 'شحن بالمتر المكعب CBM بدون حد أدنى تعجيزي', 'فرز وتغليف احترافي في مستودعاتنا'],
      highlightsEn: ['Consolidation in Guangzhou & Yiwu hubs', 'Pay per CBM with no strict minimum', 'Reinforced wrapping & crating'],
      featured: false,
      serviceKey: 'sea_lcl'
    },
    {
      id: 'procurement',
      number: '03',
      title: t('serviceProcureTitle'),
      desc: t('serviceProcureDesc'),
      icon: CheckCheck,
      highlightsAr: ['مرافقة المشتري وتنسيق الزيارات الميدانية', 'تدقيق عقود الموردين بالصين', 'التفاوض للحصول على أفضل سعر وجودة'],
      highlightsEn: ['Factory liaison & procurement escort', 'Contract verification & dispute shield', 'Direct factory discount negotiation'],
      featured: false,
      serviceKey: 'commercial_procurement'
    },
    {
      id: 'qc_inspection',
      number: '04',
      title: t('serviceQcTitle'),
      desc: t('serviceQcDesc'),
      icon: ShieldCheck,
      highlightsAr: ['فحص عينات عشوائي أو شامل 100%', 'تقارير صور وفيديو تفصيلية قبل الشحن', 'تجنب استلام بضائع تالفة أو غير مطابقة'],
      highlightsEn: ['100% or random batch inspection', 'Detailed high-res photo/video reporting', 'Zero tolerance for defective inventory'],
      featured: false,
      serviceKey: 'commercial_procurement'
    },
    {
      id: 'customs_clearance',
      number: '05',
      title: t('serviceCustomsTitle'),
      desc: t('serviceCustomsDesc'),
      icon: FileCheck,
      highlightsAr: ['تخليص سريع في ميناء عدن والحديدة والمكلا', 'تجهيز المستندات وشهادات المنشأ', 'نقل داخلي مؤمن لباب متجرك'],
      highlightsEn: ['Rapid clearance at Aden, Hodeidah & Mukalla', 'Official origin certificates & manifests', 'Secured inland transport to your door'],
      featured: true,
      serviceKey: 'customs_clearance'
    },
    {
      id: 'air_express',
      number: '06',
      title: t('serviceAirTitle'),
      desc: t('serviceAirDesc'),
      icon: Plane,
      highlightsAr: ['مدة وصول سريعة من 5 إلى 9 أيام', 'شحن عينات تجارية وإلكترونيات دقيقة', 'تسليم في مطار صنعاء ومطار عدن'],
      highlightsEn: ['5 to 9 days express transit time', 'Urgent commercial samples & microelectronics', 'Direct handling at Sanaa and Aden airports'],
      featured: false,
      serviceKey: 'air_express'
    },
    {
      id: 'financial_payments',
      number: '07',
      title: t('servicePaymentsTitle'),
      desc: t('servicePaymentsDesc'),
      icon: CreditCard,
      highlightsAr: ['سداد المصانع باليوان الصيني RMB أو USD', 'حسابات بنكية رسمية ومعتمدة في الصين', 'حماية رأس المال وأسعار صرف عادلة'],
      highlightsEn: ['Settlement in RMB or USD currency', 'Official vetted corporate bank accounts', 'Escrow protection and competitive FX'],
      featured: false,
      serviceKey: 'commercial_procurement'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
              {t('servicesKicker')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {t('servicesTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              {t('servicesSubtitle')}
            </p>
          </div>

          <button
            onClick={() => onNavigateSection('calculator')}
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>{t('ctaCalculateNow')}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const highlights = language === 'ar' ? srv.highlightsAr : srv.highlightsEn;

            return (
              <div
                key={srv.id}
                className={`group relative rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  srv.featured
                    ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/[0.04] to-transparent dark:from-amber-500/[0.08] dark:border-amber-500/30 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700/60 shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-400 dark:text-slate-600 tabular-nums">
                      {srv.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-3 tracking-tight">
                    {srv.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-8 text-xs text-slate-700 dark:text-slate-300">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onOpenOrderModalWithService(srv.serviceKey)}
                    className="text-xs font-bold text-slate-900 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t('ctaRequestQuote')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono">China ⇄ Yemen</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
