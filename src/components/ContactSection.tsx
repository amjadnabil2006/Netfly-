import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Globe 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, language, isRtl } = useTheme();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      language === 'ar'
        ? 'السلام عليكم شركة سما كابيتال، أرغب في الاستفسار عن خدمات الاستيراد من الصين والشحن إلى اليمن.'
        : 'Hello Sama Capital, I would like to inquire about import and logistics services from China to Yemen.'
    );
    window.open(`https://api.whatsapp.com/send?phone=967777912345&text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            {t('contactKicker')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </div>

        {/* Content Split: Direct Channels vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">خدمة عملاء الواتساب المباشرة</h3>
                  <p className="text-xs text-emerald-100">رد فوري على مدار الساعة</p>
                </div>
              </div>
              <p className="text-xs text-emerald-50 mb-6 leading-relaxed">
                تواصل مباشرة مع استشاري الاستيراد لمتابعة أسعار الحاويات اليومية وفحص المصانع وسعر صرف اليوان.
              </p>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-emerald-800 font-bold text-xs shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t('ctaContactWhatsApp')} (+967 777 912 345)</span>
              </button>
            </div>

            {/* Hub Contacts Summary */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>أرقام الهواتف والمكاتب المركزية:</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">مكتب وميناء عدن (الرئيسي):</span>
                    <span className="text-slate-600 dark:text-slate-400 block">المعلا - الشارع الرئيسي، أمام جمرك الميناء</span>
                    <a href="tel:+967777912345" className="font-mono text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                      +967 777 912 345 / +967 2 245 880
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">مكتب صنعاء التجاري:</span>
                    <span className="text-slate-600 dark:text-slate-400 block">شارع الزبيري - تقاطع حدة، برج سما، الدور 4</span>
                    <a href="tel:+967771889900" className="font-mono text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                      +967 771 889 900 / +967 1 450 120
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">مستودع كوانزو & إيوو (الصين):</span>
                    <span className="text-slate-600 dark:text-slate-400 block">Guangzhou & Yiwu Consolidation Hubs</span>
                    <a href="tel:+8613822109944" className="font-mono text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                      +86 138 2210 9944 (WeChat & WhatsApp)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 me-2">البريد الإلكتروني الموحد:</span>
                    <a href="mailto:info@samacapital.ye" className="font-mono text-slate-900 dark:text-white hover:text-amber-500">
                      info@samacapital.ye
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">
              {t('contactFormTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              يسعدنا تلقي طلبات الاستيراد، عروض الشحن، واستفسارات فحص البضائع.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                  {t('contactSuccess')}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mb-4">
                  تم توجيه رسالتك إلى قسم العمليات اللوجستية، وسنعاود الاتصال بك عبر الواتساب فوراً.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  إرسال استفسار آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('contactName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('contactPhone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+967..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('contactEmail')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('contactSubject')}
                    </label>
                    <input
                      type="text"
                      placeholder="استيراد أجهزة / تسعير حاوية..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('contactMessage')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب مواصفات البضاعة، الحجم المتوقع، أو أي استفسار ترغب بطرحه..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-sm shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contactSubmitBtn')}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
