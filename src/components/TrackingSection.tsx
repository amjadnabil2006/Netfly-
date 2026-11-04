import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shipment } from '../types';
import { 
  Search, 
  Ship, 
  Anchor, 
  Plane, 
  Box, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Printer, 
  AlertCircle,
  FileText,
  Weight,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  QrCode,
  X
} from 'lucide-react';

interface TrackingSectionProps {
  shipments: Shipment[];
  initialSearchCode?: string;
  onOpenOrderModal: () => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  shipments,
  initialSearchCode = '',
  onOpenOrderModal
}) => {
  const { t, language, isRtl } = useTheme();
  const [searchTerm, setSearchTerm] = useState('SMC-84920');
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isBlModalOpen, setIsBlModalOpen] = useState(false);

  useEffect(() => {
    if (initialSearchCode) {
      setSearchTerm(initialSearchCode);
      performSearch(initialSearchCode);
    } else {
      const defaultShipment = shipments.find(s => s.id === 'SMC-84920') || shipments[0];
      if (defaultShipment) {
        setActiveShipment(defaultShipment);
      }
    }
  }, [initialSearchCode, shipments]);

  const performSearch = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = shipments.find(
      s => s.trackingNumber.toUpperCase() === clean || 
           s.blNumber.toUpperCase() === clean ||
           (s.containerNumber && s.containerNumber.toUpperCase().includes(clean))
    );
    setActiveShipment(found || null);
    setHasSearched(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };

  const handleShareWhatsApp = () => {
    if (!activeShipment) return;
    const text = language === 'ar'
      ? `تقرير تتبع شحنة سما كابيتال:%0Aرقم التتبع: ${activeShipment.trackingNumber}%0Aالبضاعة: ${activeShipment.cargoTypeAr}%0Aالرحلة: من ${activeShipment.originPortAr} إلى ${activeShipment.destinationPortAr}%0Aالحالة: ${activeShipment.notesAr || ''}%0Aالوصول المتوقع: ${activeShipment.estimatedArrival}`
      : `Sama Capital Cargo Tracking Report:%0ATracking #: ${activeShipment.trackingNumber}%0ACargo: ${activeShipment.cargoTypeEn}%0ARoute: ${activeShipment.originPortEn} to ${activeShipment.destinationPortEn}%0AETA: ${activeShipment.estimatedArrival}`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="tracking" className="py-24 bg-slate-100/70 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase mb-2">
            {t('trackingKicker')}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('trackingTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('trackingSubtitle')}
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('trackingSearchLabel')}
                  className={`w-full py-3.5 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono`}
                />
              </div>
              <button
                type="submit"
                className="py-3.5 px-7 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('trackingSearchBtn')}</span>
              </button>
            </form>

            {/* Quick Lookup Chips */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {t('heroQuickLookup')}
              </span>
              {shipments.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSearchTerm(s.trackingNumber);
                    setActiveShipment(s);
                    setHasSearched(true);
                  }}
                  className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors border cursor-pointer ${
                    activeShipment?.id === s.id
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  {s.trackingNumber} ({s.shippingType})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results Display */}
        {activeShipment ? (
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in fade-in duration-300">
            
            {/* Top Bar with Status and Progress */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-950 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
                      {activeShipment.shippingType} FREIGHT
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                      {activeShipment.trackingNumber}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-slate-200 mt-2">
                    {language === 'ar' ? activeShipment.cargoTypeAr : activeShipment.cargoTypeEn}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsBlModalOpen(true)}
                    className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="استعراض بوليصة الشحن الرسمية"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>عرض بوليصة الشحن (B/L)</span>
                  </button>
                  <button
                    onClick={handleShareWhatsApp}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={t('trackingShareWhatsapp')}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>مشاركة</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center transition-colors cursor-pointer"
                    title={t('trackingPrint')}
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>{language === 'ar' ? activeShipment.notesAr : activeShipment.notesEn}</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">
                    {activeShipment.progressPercent}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${activeShipment.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Departure & ETA Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-400">تاريخ الإبحار / التحرك (ETD)</p>
                    <p className="text-sm font-bold text-white font-mono mt-0.5">{activeShipment.departureDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold">{t('trackingETA')}</p>
                    <p className="text-sm font-bold text-amber-300 font-mono mt-0.5">{activeShipment.estimatedArrival}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Specifications Grid */}
            <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    {t('trackingBL')}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {activeShipment.blNumber}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    {t('trackingContainer')}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {activeShipment.containerNumber || 'N/A'}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    {t('trackingVessel')}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {activeShipment.vesselName || 'Direct Cargo Carrier'}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    {t('trackingVolume')}
                  </span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {activeShipment.cbm ? `${activeShipment.cbm} CBM` : ''} 
                    {activeShipment.weightKg ? ` · ${activeShipment.weightKg.toLocaleString()} KG` : ''}
                  </span>
                </div>
              </div>

              {/* Ports Route Info */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      {t('trackingOrigin')}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                      {language === 'ar' ? activeShipment.originPortAr : activeShipment.originPortEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Anchor className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">
                      {t('trackingDestination')}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
                      {language === 'ar' ? activeShipment.destinationPortAr : activeShipment.destinationPortEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Timeline of Steps */}
            <div className="p-6 sm:p-8">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                <span>المراحل التشغيلية الموثقة للشحنة (Milestone Timeline)</span>
              </h4>

              <div className="space-y-6">
                {activeShipment.steps.map((step, idx) => {
                  const isLast = idx === activeShipment.steps.length - 1;
                  return (
                    <div key={step.id} className="flex items-start gap-4 sm:gap-6 group">
                      {/* Fixed Indicator & Connecting Vertical Line Column */}
                      <div className="flex flex-col items-center shrink-0 self-stretch">
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
                            step.current 
                              ? 'bg-amber-500 border-amber-300 text-slate-950 ring-4 ring-amber-500/20' 
                              : step.completed 
                                ? 'bg-slate-900 dark:bg-amber-600 border-white text-white' 
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 flex-1 my-1.5 transition-colors ${step.completed ? 'bg-amber-500/50' : 'bg-slate-200 dark:bg-slate-700'}`} />
                        )}
                      </div>

                      {/* Step Content Card */}
                      <div className="flex-1 bg-slate-50/70 dark:bg-slate-900/40 p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h5 className={`font-bold text-sm sm:text-base ${step.current ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                            {language === 'ar' ? step.titleAr : step.titleEn}
                          </h5>
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                            <span>{step.date}</span>
                            <span>·</span>
                            <span>{step.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{language === 'ar' ? step.locationAr : step.locationEn}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {language === 'ar' ? step.descriptionAr : step.descriptionEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        ) : hasSearched ? (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t('trackingNotFound')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              يرجى التحقق من الرقم أو التواصل مع غرفة عمليات التتبع والمتابعة المباشرة.
            </p>
            <button
              onClick={onOpenOrderModal}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              {t('ctaRequestQuote')}
            </button>
          </div>
        ) : null}

        {/* Digital Bill of Lading (B/L) Official Document Lightbox */}
        {isBlModalOpen && activeShipment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-2xl border-2 border-slate-300 shadow-2xl p-6 sm:p-10 my-8">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold font-mono tracking-tight text-slate-950 uppercase">
                    BILL OF LADING FOR OCEAN TRANSPORT
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    سما كابيتال للاستيراد والخدمات اللوجستية الدولية · SAMA CAPITAL LOGISTICS CO.
                  </p>
                </div>
                <button
                  onClick={() => setIsBlModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* B/L Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-slate-500 block text-[10px]">B/L NUMBER:</span>
                  <span className="font-bold text-sm text-slate-900">{activeShipment.blNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">TRACKING CODE:</span>
                  <span className="font-bold text-sm text-amber-700">{activeShipment.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">CONTAINER NO:</span>
                  <span className="font-bold text-slate-900">{activeShipment.containerNumber || 'LCL CONSOL'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">CARRIER / VESSEL:</span>
                  <span className="font-bold text-slate-900">{activeShipment.vesselName || 'Direct Ocean Liner'}</span>
                </div>
              </div>

              {/* Shipper & Consignee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border border-slate-200 rounded-xl p-4 mb-6">
                <div>
                  <span className="font-bold text-slate-500 block text-[10px]">CONSIGNEE (المستورد / صاحب البضاعة):</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{activeShipment.customerName}</p>
                  <p className="text-slate-600 text-[11px]">Phone: {activeShipment.customerPhone || 'Verified Account'}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block text-[10px]">PORT OF LOADING ➔ DISCHARGE:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{activeShipment.originPortAr} ➔ {activeShipment.destinationPortAr}</p>
                  <p className="text-slate-600 text-[11px] font-mono">ETD: {activeShipment.departureDate} | ETA: {activeShipment.estimatedArrival}</p>
                </div>
              </div>

              {/* Cargo Manifest Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-xs">
                <table className="w-full text-start font-mono">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 text-start">PACKAGES</th>
                      <th className="py-2.5 px-3 text-start">DESCRIPTION OF GOODS</th>
                      <th className="py-2.5 px-3 text-start">GROSS WEIGHT</th>
                      <th className="py-2.5 px-3 text-start">MEASUREMENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-3 font-bold">{activeShipment.packagesCount} CTNS</td>
                      <td className="py-3 px-3 font-bold">{activeShipment.cargoTypeAr}</td>
                      <td className="py-3 px-3">{activeShipment.weightKg ? `${activeShipment.weightKg.toLocaleString()} KG` : '-'}</td>
                      <td className="py-3 px-3">{activeShipment.cbm ? `${activeShipment.cbm} CBM` : '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Seal & Stamp Area */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <QrCode className="w-12 h-12 text-slate-900" />
                  <div className="text-[10px] font-mono text-slate-500">
                    <p>VERIFIED ELECTRONIC MANIFEST</p>
                    <p>SAMA CAPITAL CUSTOMS CLEARING SEAL</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    طباعة المستند الرسمي
                  </button>
                  <button
                    onClick={() => setIsBlModalOpen(false)}
                    className="py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
                  >
                    إغلاق
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
