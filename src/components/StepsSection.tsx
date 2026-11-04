import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  FileText, 
  Search, 
  Warehouse, 
  Ship, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';

export const StepsSection: React.FC<{ onOpenOrderModal: () => void }> = ({ onOpenOrderModal }) => {
  const { t, language, isRtl } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: FileText,
      documentsAr: ['فاتورة مبدئية Proforma Invoice', 'قائمة التعبئة Packing List', 'كتالوج المواصفات الفنية'],
      documentsEn: ['Proforma Invoice', 'Packing List Specs', 'Product Technical Catalog'],
      tipsAr: 'ننصح بتحديد متطلبات الجودة والمعايير الكهربائية المناسبة للسوق اليمني (220V - 50Hz) مسبقاً.',
      tipsEn: 'Ensure exact compliance with Yemeni electrical standards (220V / 50Hz) before issuing advance payment.',
      durationAr: '1 - 3 أيام عمل',
      durationEn: '1 - 3 Business Days'
    },
    {
      num: '02',
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: Search,
      documentsAr: ['رخصة المصنع الصيني وشهادة التسجيل', 'عينات تجارية معتمدة', 'عقد التوريد المبدئي'],
      documentsEn: ['Chinese Business License (营业执照)', 'Approved Golden Sample', 'Draft Sales Contract'],
      tipsAr: 'يقوم فريقنا بالصين بالتحقق من السجل التجاري والمالي للمصنع لتجنب أي شركات وهمية أو وسطاء غير رسميين.',
      tipsEn: 'Our China team verifies factory legal standing and factory audit records to prevent intermediary fraud.',
      durationAr: '3 - 5 أيام عمل',
      durationEn: '3 - 5 Business Days'
    },
    {
      num: '03',
      title: t('step3Title'),
      desc: t('step3Desc'),
      icon: Warehouse,
      documentsAr: ['إيصال استلام المستودع (Warehouse Receipt)', 'تقرير فحص الجودة المصور (QC Report)', 'بيان الوزن والحجم الفعلي'],
      documentsEn: ['Warehouse Intake Receipt', 'QC High-Res Photo/Video Report', 'Verified CBM & Weight Manifest'],
      tipsAr: 'تصل بضاعتك لمستودعاتنا في كوانزو أو إيوو؛ نقوم بفتح الكراتين وفحصها ومطابقتها وتدعيم التغليف الخشبي إذا تطلب الأمر.',
      tipsEn: 'Goods arrive at our Guangzhou/Yiwu hubs for box-opening, component auditing, and protective crating.',
      durationAr: '2 - 4 أيام عمل',
      durationEn: '2 - 4 Business Days'
    },
    {
      num: '04',
      title: t('step4Title'),
      desc: t('step4Desc'),
      icon: Ship,
      documentsAr: ['بوليصة الشحن الأصلية (Bill of Lading - B/L)', 'شهادة المنشأ الصينية الرسمية (CO)', 'شهادة التبخير للبالتات الخشبية'],
      documentsEn: ['Original Bill of Lading (B/L)', 'Chamber Certificate of Origin (CO)', 'Fumigation Certificate for Timber'],
      tipsAr: 'نصدر رقم التتبع الحي فور تحميل الحاوية لتبدأ متابعة خط سير السفينة عبر موقعنا أو تطبيق الواتساب.',
      tipsEn: 'Live tracking code is activated upon container sealing, allowing 24/7 web and WhatsApp updates.',
      durationAr: '24 - 32 يوماً (بحري) / 6 - 9 أيام (جوي)',
      durationEn: '24 - 32 Days (Sea) / 6 - 9 Days (Air)'
    },
    {
      num: '05',
      title: t('step5Title'),
      desc: t('step5Desc'),
      icon: CheckCircle2,
      documentsAr: ['البيان الجمركي المعتمد', 'سند سداد الرسوم والضرائب', 'إذن الإفراج النهائي وبوليصة التسليم'],
      documentsEn: ['Customs Clearance Declaration', 'Official Duty Payment Receipt', 'Gate Pass & Warehouse Delivery Note'],
      tipsAr: 'يقوم مخلصونا المعتمدون في ميناء عدن أو الحديدة بإنهاء الإجراءات بسرعة فائقة ثم نقل البضاعة لمخزنك مباشرة.',
      tipsEn: 'Licensed brokers complete terminal clearance promptly and orchestrate insured transport to your depot.',
      durationAr: '2 - 4 أيام بعد رسو السفينة',
      durationEn: '2 - 4 Days Post Berthing'
    }
  ];

  return (
    <section id="steps" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            {t('stepsKicker')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('stepsTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('stepsSubtitle')}
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {steps.map((st, index) => {
            const Icon = st.icon;
            const isCurrent = activeStep === index;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/10 text-slate-950 dark:text-white ring-2 ring-amber-500/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                    {st.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-500' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs font-bold truncate">
                  {st.title.split('.')[1] || st.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step Story Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold font-mono text-base flex items-center justify-center shadow-sm">
                  {steps[activeStep].num}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                    {steps[activeStep].title}
                  </h3>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {language === 'ar' ? 'المدة التقديرية:' : 'Estimated Duration:'} {language === 'ar' ? steps[activeStep].durationAr : steps[activeStep].durationEn}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>

              {/* Expert Advice Box */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                    {language === 'ar' ? 'نصيحة وخبرة سما كابيتال في هذه المرحلة:' : 'Sama Capital Expert Trade Tip:'}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === 'ar' ? steps[activeStep].tipsAr : steps[activeStep].tipsEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Required Documents Checklist (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                <FileText className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {language === 'ar' ? 'المستندات والمعاملات المعتمدة:' : 'Key Documentation Issued:'}
                </h4>
              </div>

              <ul className="space-y-3">
                {(language === 'ar' ? steps[activeStep].documentsAr : steps[activeStep].documentsEn).map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={onOpenOrderModal}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t('ctaRequestQuote')}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
