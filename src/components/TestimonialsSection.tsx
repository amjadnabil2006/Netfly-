import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { TESTIMONIALS } from '../mockData';
import { Star, Quote, MapPin, Building } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useTheme();

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            {t('testimonialsKicker')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                  "{language === 'ar' ? test.quoteAr : test.quoteEn}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                    {language === 'ar' ? test.nameAr : test.nameEn}
                  </h4>
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    {language === 'ar' ? test.volumeAr : test.volumeEn}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {language === 'ar' ? test.roleAr : test.roleEn}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>{language === 'ar' ? test.cityAr : test.cityEn}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
