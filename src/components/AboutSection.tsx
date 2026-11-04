import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { OFFICE_LOCATIONS } from '../mockData';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  Globe2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, language, isRtl } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<'china' | 'yemen'>('china');
  const [activeOfficeId, setActiveOfficeId] = useState('china-gz');

  const filteredOffices = OFFICE_LOCATIONS.filter(o => o.country === selectedCountry);
  const currentOffice = OFFICE_LOCATIONS.find(o => o.id === activeOfficeId) || filteredOffices[0];

  const handleCountryTabChange = (country: 'china' | 'yemen') => {
    setSelectedCountry(country);
    const first = OFFICE_LOCATIONS.find(o => o.country === country);
    if (first) setActiveOfficeId(first.id);
  };

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block">
              {t('aboutSectionKicker')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              {t('aboutTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('aboutText1')}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('aboutText2')}
            </p>

            {/* Vision and Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1.5">
                  {t('aboutVisionTitle')}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('aboutVisionText')}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1.5">
                  {t('aboutMissionTitle')}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('aboutMissionText')}
                </p>
              </div>
            </div>

          </div>

          {/* Visual Showcase (China Warehouse Photo) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
              <img
                src="/src/assets/images/china_warehouse_logistics_1793753459683.jpg"
                alt="مستودعات سما كابيتال في الصين"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                  Guangzhou & Yiwu Consolidation Center
                </span>
                <p className="text-sm font-semibold text-slate-200">
                  مستودعات مركزية مجهزة بأنظمة فحص وتخزين حديثة وشاحنات نقل إلى كافة موانئ التصدير الصينية.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Global Hubs & Offices Explorer */}
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-1">
                {t('officesKicker')}
              </span>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                {t('officesTitle')}
              </h3>
            </div>

            {/* Country Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleCountryTabChange('china')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCountry === 'china'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t('tabChina')}
              </button>
              <button
                type="button"
                onClick={() => handleCountryTabChange('yemen')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCountry === 'yemen'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t('tabYemen')}
              </button>
            </div>
          </div>

          {/* Offices List + Active Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Office Pills List (4 cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              {filteredOffices.map((off) => {
                const isActive = off.id === currentOffice?.id;
                return (
                  <button
                    key={off.id}
                    onClick={() => setActiveOfficeId(off.id)}
                    className={`w-full p-4 rounded-xl border text-start transition-all cursor-pointer ${
                      isActive
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {language === 'ar' ? off.cityAr : off.cityEn}
                      </span>
                      {off.isMain && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                          {language === 'ar' ? 'الفرع الرئيسي' : 'Main Hub'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {language === 'ar' ? off.titleAr : off.titleEn}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Office Detailed Card (7 cols) */}
            {currentOffice && (
              <div className="lg:col-span-7 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? currentOffice.titleAr : currentOffice.titleEn}
                  </h4>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {currentOffice.country.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 text-xs pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">{t('officeAddress')}:</span>
                      <p className="text-slate-600 dark:text-slate-400">
                        {language === 'ar' ? currentOffice.addressAr : currentOffice.addressEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 me-2">{t('officePhone')}:</span>
                      <a href={`tel:${currentOffice.phone}`} className="font-mono text-slate-900 dark:text-white hover:text-amber-500">
                        {currentOffice.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 me-2">{t('officeWhatsapp')}:</span>
                      <a 
                        href={`https://api.whatsapp.com/send?phone=${currentOffice.whatsapp.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {currentOffice.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 me-2">الإيميل:</span>
                      <a href={`mailto:${currentOffice.email}`} className="font-mono text-slate-900 dark:text-white hover:text-amber-500">
                        {currentOffice.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 me-2">{t('officeHours')}:</span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {language === 'ar' ? currentOffice.hoursAr : currentOffice.hoursEn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${currentOffice.whatsapp.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(language === 'ar' ? 'السلام عليكم، أود الاستفسار عن خدمات الشحن والاستيراد عبر مكتب ' + currentOffice.cityAr : 'Hello, I would like to inquire about shipping through your ' + currentOffice.cityEn + ' office.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تواصل مع هذا الفرع عبر واتساب' : 'Chat via WhatsApp'}</span>
                  </a>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
