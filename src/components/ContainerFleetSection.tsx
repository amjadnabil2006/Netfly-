import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CONTAINER_SPECS } from '../mockData';
import { ContainerSpec } from '../types';
import { 
  Box, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Maximize2, 
  Scale, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface ContainerFleetSectionProps {
  onSelectContainer: (containerCode: string) => void;
}

export const ContainerFleetSection: React.FC<ContainerFleetSectionProps> = ({
  onSelectContainer
}) => {
  const { t, language, isRtl } = useTheme();
  const [activeCode, setActiveCode] = useState('40HQ');

  const activeSpec = CONTAINER_SPECS.find(c => c.code === activeCode) || CONTAINER_SPECS[2];

  const complianceDocs = [
    {
      titleAr: 'الفاتورة التجارية المصدقة (Commercial Invoice)',
      titleEn: 'Attested Commercial Invoice',
      descAr: 'تتضمن الأسعار، كميات البضائع، وتصديق الغرفة التجارية العربية الصينية.'
    },
    {
      titleAr: 'قائمة التعبئة والتغليف (Detailed Packing List)',
      titleEn: 'Detailed Packing List',
      descAr: 'توضح تفاصيل كل كرتون، الأوزان الإجمالية والصافية، وأرقام الباركود.'
    },
    {
      titleAr: 'شهادة المنشأ الصينية الرسمية (Certificate of Origin)',
      titleEn: 'Official Certificate of Origin (CO)',
      descAr: 'صادرة من المجلس الصيني لترويج التجارة الدولية (CCPIT) للاستفادة من الإعفاءات.'
    },
    {
      titleAr: 'بوليصة الشحن البحري الأصلية (Original Ocean Bill of Lading - B/L)',
      titleEn: 'Original Ocean Bill of Lading (B/L)',
      descAr: 'مستند استلام الملكية الأساسي الموجه لميناء عدن أو الحديدة أو المكلا.'
    },
    {
      titleAr: 'شهادة المطابقة وفحص الجودة (CoC / Inspection Certificate)',
      titleEn: 'Certificate of Conformity (CoC)',
      descAr: 'تضمن خلو البضائع من أي عيوب مصنعية ومطابقتها للمواصفات اليمنية المعتمدة.'
    }
  ];

  return (
    <section id="fleet" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            {t('fleetKicker')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('fleetTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('fleetSubtitle')}
          </p>
        </div>

        {/* Container Size Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {CONTAINER_SPECS.map((spec) => (
            <button
              key={spec.code}
              type="button"
              onClick={() => setActiveCode(spec.code)}
              className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                activeCode === spec.code
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/40 text-slate-950 dark:text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-sm text-slate-950 dark:text-white">
                  {spec.code}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {spec.capacityCbm} CBM
                </span>
              </div>
              <p className="text-xs font-medium truncate text-slate-600 dark:text-slate-300">
                {language === 'ar' ? spec.nameAr : spec.nameEn}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Container Detailed Blueprint Card */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Specs Grid (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono font-bold text-sm">
                  {activeSpec.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                  {language === 'ar' ? activeSpec.nameAr : activeSpec.nameEn}
                </h3>
              </div>

              {/* Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">{t('fleetColLength')}</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{activeSpec.lengthM}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">{t('fleetColWidth')}</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{activeSpec.widthM}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">{t('fleetColHeight')}</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{activeSpec.heightM}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">{t('fleetColCapacity')}</span>
                  <span className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">{activeSpec.capacityCbm} CBM</span>
                </div>
              </div>

              {/* Weights & Doors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">{t('fleetColPayload')}</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{activeSpec.maxPayloadKg.toLocaleString()} كجم</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">{t('fleetColTare')}</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{activeSpec.tareWeightKg.toLocaleString()} كجم</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">فتحة الباب (عرض × ارتفاع)</span>
                  <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{activeSpec.doorWidthM} × {activeSpec.doorHeightM}</span>
                </div>
              </div>

              {/* Recommendation Note */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  الاستخدام والتطبيقات الموصى بها في تجارة اليمن:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {language === 'ar' ? activeSpec.recommendedForAr : activeSpec.recommendedForEn}
                </p>
              </div>
            </div>

            {/* Right: Container Action Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400">
                  ISO 668 Container Standard
                </span>
                <span className="text-xs font-bold text-slate-400">
                  معتمد للشحن الدولي
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  توفر شركة سما كابيتال فحصاً مسبقاً لجاهزية الحاويات (CSC Safety Approval Plate) لضمان عدم وجود أي تسريب مائي أو رطوبة تؤثر على سلامة البضائع في عرض البحر.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>أقفال جمركية مشددة:</span>
                  <span className="font-mono text-amber-400">Bolt Seals ISO 17712</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>تأمين بحري شامل اختياري:</span>
                  <span className="font-mono text-emerald-400">متاح لكافة الشحنات</span>
                </div>
              </div>

              <button
                onClick={() => onSelectContainer(activeSpec.code)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>طلب حجز حاوية {activeSpec.code}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Customs & Regulatory Compliance in Yemen */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                دليل الامتثال الجمركي والوثائق الرسمية المطلوبة للاستيراد في اليمن
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                يقوم فريق التخليص الجمركي التابع لشركة سما كابيتال في ميناء عدن والحديدة بتدقيق هذه الوثائق لتجنب أي تأخير:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceDocs.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-2.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? doc.titleAr : doc.titleEn}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pr-6 rtl:pr-6 rtl:pl-0 ltr:pl-6 ltr:pr-0">
                  {doc.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
