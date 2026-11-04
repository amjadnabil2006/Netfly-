import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  HelpCircle, 
  ChevronDown, 
  Ship, 
  ShieldCheck, 
  FileCheck, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { language, isRtl } = useTheme();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'shipping' | 'qc' | 'customs' | 'finance'>('all');

  const faqs = [
    {
      category: 'shipping',
      qAr: 'كم تستغرق مدة الشحن البحري والجوي من موانئ الصين إلى اليمن؟',
      qEn: 'How long does ocean and air transit take from Chinese ports to Yemen?',
      aAr: 'يستغرق الشحن البحري المباشر من موانئ كوانزو (Nansha) ونينغبو وشنتشن إلى محطة حاويات ميناء عدن أو الحديدة ما بين 24 إلى 30 يوماً من تاريخ إبحار السفينة. أما الشحن الجوي السريع فيستغرق من 6 إلى 9 أيام عمل مع التسليم في مطار صنعاء أو مطار عدن الدولي.',
      aEn: 'Direct ocean freight from Guangzhou (Nansha), Ningbo, and Shenzhen to Aden or Hodeidah takes between 24 and 30 days from sailing departure. Express air cargo takes 6 to 9 business days arriving at Sanaa or Aden airport.'
    },
    {
      category: 'qc',
      qAr: 'كيف تضمن سما كابيتال جودة البضائع ومطابقتها قبل مغادرة الصين؟',
      qEn: 'How does Sama Capital guarantee cargo quality before departing China?',
      aAr: 'يمتلك مكتبنا في كوانزو وإيوو فريق فحص جودة معتمد (QC Specialists) يقوم باستلام الشحنات بمستودعاتنا وتفتيش الكراتين والتحقق من المواصفات الفنية والباركود والتأكد من سلامة التغليف وتدعيم البالتات الخشبية، مع تزويد العميل بتقرير صور وفيديو تفصيلي قبل إصدار إذن الشحن.',
      aEn: 'Our on-the-ground QC team inspects arriving cargo at our Guangzhou and Yiwu hubs, verifying technical specs, serials, and packaging strength with comprehensive photo/video audit reports before loading.'
    },
    {
      category: 'shipping',
      qAr: 'هل يمكنني استيراد كميات صغيرة من عدة مصانع صينية مختلفة وتجميعها؟',
      qEn: 'Can I consolidate small consignments from multiple Chinese factories?',
      aAr: 'نعم بالتأكيد؛ نوفر خدمة التجميع المشترك (LCL Consolidation) حيث نقوم باستقبال بضائعك من مصانع مختلفة في كوانزو وإيوو وفوشان، ثم وزنها وقياس حجمها وتجميعها في حاوية واحدة وشحنها بالمتر المكعب (CBM) دون الحاجة لحجز حاوية كاملة.',
      aEn: 'Yes; our LCL consolidation service lets you purchase from multiple suppliers across Guangzhou, Yiwu, and Foshan, grouping everything into one bill of lading with payment strictly per cubic meter (CBM).'
    },
    {
      category: 'finance',
      qAr: 'كيف تتم الحوالات المالية وسداد المصانع الصينية باليوان (RMB) بأمان؟',
      qEn: 'How are supplier payments in Chinese Yuan (RMB) securely executed?',
      aAr: 'توفر سما كابيتال حسابات بنكية تجارية رسمية ومعتمدة في جمهورية الصين الشعبية تمكن التجار من سداد فواتير الموردين باليوان الصيني (RMB) أو الدولار (USD) بأسعار صرف منافسة، مع توثيق سندات القبض الصينية الرسمية (FaPiao) لحماية رأس مالك.',
      aEn: 'We operate corporate banking channels in China allowing direct settlement in RMB or USD at competitive FX rates, backed by official Chinese receipts (FaPiao) and escrow protection.'
    },
    {
      category: 'customs',
      qAr: 'ما هي الإجراءات والرسوم الجمركية في ميناء عدن وميناء الحديدة؟',
      qEn: 'What are customs procedures and duties at Aden and Hodeidah ports?',
      aAr: 'يتولى مخلصونا المعتمدون في ميناء عدن والحديدة والمكلا تجهيز البيان الجمركي، الفاتورة المصدقة من الغرفة العربية الصينية، وشهادة المنشأ الصينية (CO)، مع إنهاء المعاينة ودفع الرسوم المقررة واستخراج إذن الإفراج ونقل الحاوية إلى مستودع العميل مباشرة.',
      aEn: 'Our licensed customs brokers at Aden, Hodeidah, and Mukalla handle Chamber-attested invoices, certificates of origin, duty assessment, and physical gate release with direct transport to your warehouse.'
    },
    {
      category: 'shipping',
      qAr: 'هل تقدمون خدمة التأمين البحري الشامل على البضائع؟',
      qEn: 'Do you offer comprehensive maritime cargo insurance?',
      aAr: 'نعم؛ نوفر بوليصة تأمين بحري معتمدة (Marine Cargo Insurance) تغطي كافة المخاطر البحرية (الحريق، الغرق، التلف المائي، والقرصنة) بنسبة 1.5% من القيمة الإجمالية للبضاعة المصرحة.',
      aEn: 'Yes; we provide comprehensive international marine cargo insurance covering total loss, water damage, fire, and transit perils at a standard 1.5% of declared commercial value.'
    }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            دليل المستورد التجاري
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            الأسئلة الشائعة حول الاستيراد والشحن من الصين إلى اليمن
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            إجابات وافية من واقع خبرتنا الميدانية الطويلة في خطوط الملاحة والتجارة بين الصين واليمن.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'كافة الاستفسارات' },
            { id: 'shipping', label: 'الشحن والموانئ' },
            { id: 'qc', label: 'فحص الجودة والمستودعات' },
            { id: 'customs', label: 'الجمارك والتخليص' },
            { id: 'finance', label: 'الحوالات واليوان الصيني' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-950 dark:text-white leading-snug">
                    {language === 'ar' ? faq.qAr : faq.qEn}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-amber-500 text-slate-950 dark:bg-amber-400' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60">
                    <p>{language === 'ar' ? faq.aAr : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                هل لديك استفسار تجاري خاص أو ترغب بتسعيرة فورية؟
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                استشاريو الشحن متاحون لمساعدتك عبر الواتساب على مدار الساعة.
              </p>
            </div>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=967777912345"
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center gap-1.5 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تحدث مع خبير الاستيراد</span>
          </a>
        </div>

      </div>
    </section>
  );
};
