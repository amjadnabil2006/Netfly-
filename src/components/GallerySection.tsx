import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { GALLERY_ITEMS } from '../mockData';
import { Ship, Eye, X, MapPin, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { t, language } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: t('filterAll') },
    { id: 'vessels', label: t('filterVessels') },
    { id: 'warehouses', label: t('filterWarehouses') },
    { id: 'ports', label: t('filterPorts') },
    { id: 'inspection', label: t('filterInspection') }
  ];

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            {t('galleryKicker')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('galleryTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('gallerySubtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-900 cursor-pointer h-72 sm:h-80"
            >
              <img
                src={item.image}
                alt={language === 'ar' ? item.titleAr : item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute top-4 rtl:left-4 ltr:right-4 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? item.locationAr : item.locationEn}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedImage.image}
                alt={language === 'ar' ? selectedImage.titleAr : selectedImage.titleEn}
                className="w-full max-h-[70vh] object-cover"
                referrerPolicy="no-referrer"
              />

              <div className="p-6 bg-slate-900 text-white">
                <span className="text-xs text-amber-400 font-mono block mb-1">
                  {language === 'ar' ? selectedImage.locationAr : selectedImage.locationEn}
                </span>
                <h4 className="text-lg font-bold">
                  {language === 'ar' ? selectedImage.titleAr : selectedImage.titleEn}
                </h4>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
