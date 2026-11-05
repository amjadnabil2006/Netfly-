import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShippingQuoteRequest } from '../types';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  Ship, 
  Plane, 
  Box, 
  FileText,
  Send,
  Sparkles
} from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialCalcData?: {
    serviceType: 'sea_fcl' | 'sea_lcl' | 'air_express';
    originCity: string;
    destinationCity: string;
    estimatedVolume: string;
    estimatedWeight: string;
    needsInspection: boolean;
    needsCustomsClearance: boolean;
    estimatedCostUsd: number;
  } | null;
  onSubmitQuote: (request: ShippingQuoteRequest) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialCalcData,
  onSubmitQuote
}) => {
  const { t, language, isRtl } = useTheme();

  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    phone: '',
    whatsapp: '',
    email: '',
    serviceType: 'sea_lcl' as ShippingQuoteRequest['serviceType'],
    originCity: 'كوانزو (Guangzhou)',
    destinationCity: 'ميناء عدن (Aden Port)',
    cargoDescription: '',
    estimatedVolume: '',
    estimatedWeight: '',
    needsInspection: true,
    needsCustomsClearance: true,
    notes: ''
  });

  const [submittedRequest, setSubmittedRequest] = useState<ShippingQuoteRequest | null>(null);

  useEffect(() => {
    if (initialCalcData) {
      setFormData(prev => ({
        ...prev,
        serviceType: initialCalcData.serviceType,
        originCity: initialCalcData.originCity,
        destinationCity: initialCalcData.destinationCity,
        estimatedVolume: initialCalcData.estimatedVolume,
        estimatedWeight: initialCalcData.estimatedWeight,
        needsInspection: initialCalcData.needsInspection,
        needsCustomsClearance: initialCalcData.needsCustomsClearance,
        notes: `تقدير تكلفة الحاسبة: $${initialCalcData.estimatedCostUsd} USD`
      }));
    } else if (initialService) {
      setFormData(prev => ({
        ...prev,
        serviceType: initialService as any
      }));
    }
  }, [initialCalcData, initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.whatsapp || !formData.cargoDescription) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newReq: ShippingQuoteRequest = {
      id: `REQ-2026-${randomSuffix}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      clientName: formData.clientName,
      companyName: formData.companyName || undefined,
      phone: formData.phone || formData.whatsapp,
      whatsapp: formData.whatsapp,
      email: formData.email || undefined,
      serviceType: formData.serviceType,
      originCity: formData.originCity,
      destinationCity: formData.destinationCity,
      cargoDescription: formData.cargoDescription,
      estimatedVolume: formData.estimatedVolume || undefined,
      estimatedWeight: formData.estimatedWeight || undefined,
      needsInspection: formData.needsInspection,
      needsCustomsClearance: formData.needsCustomsClearance,
      status: 'pending',
      notes: formData.notes || undefined
    };

    onSubmitQuote(newReq);
    setSubmittedRequest(newReq);
  };

  const handleWhatsAppFollowUp = () => {
    if (!submittedRequest) return;
    const msg = encodeURIComponent(
      `السلام عليكم سما كابيتال، قمت بتقديم طلب شحن رسمي عبر الموقع برقم مرجعي: ${submittedRequest.id}%0Aالاسم: ${submittedRequest.clientName}%0Aالخدمة: ${submittedRequest.serviceType}%0Aوصف البضاعة: ${submittedRequest.cargoDescription}%0Aالمنشأ: ${submittedRequest.originCity} ➔ الوجهة: ${submittedRequest.destinationCity}%0Aأرجو تزويدي بعرض السعر الرسمي.`
    );
    window.open(`https://api.whatsapp.com/send?phone=967777912345&text=${msg}`, '_blank');
    onClose();
  };

  const handleClose = () => {
    setSubmittedRequest(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold truncate">
                {t('quoteModalTitle')}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">
                {t('quoteModalSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedRequest ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-950 dark:text-white">
                {t('quoteSuccessTitle')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t('quoteSuccessSub')}
              </p>
              
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-xs mx-auto">
                <span className="text-xs text-slate-500 block mb-1">{t('quoteSuccessMsg')}</span>
                <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
                  {submittedRequest.id}
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppFollowUp}
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('quoteSendToWhatsappBtn')}</span>
                </button>
                <button
                  onClick={handleClose}
                  className="py-3 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700"
                >
                  {t('closeBtn')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteClientName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: صالح عبدالله اليافعي"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteCompanyName')}
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: مؤسسة اليافعي للتجارة"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone and WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteWhatsapp')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+967..."
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value, phone: formData.phone || e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteServiceType')}
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="sea_lcl">شحن بحري - تجميع بضائع LCL (بالـ CBM)</option>
                    <option value="sea_fcl">شحن بحري - حاوية كاملة FCL (20/40/40HQ)</option>
                    <option value="air_express">شحن جوي سريع للعينات والإلكترونيات</option>
                    <option value="commercial_procurement">وساطة تجارية وتوريد وفحص مصانع</option>
                    <option value="customs_clearance">تخليص جمركي ونقل داخلي فقط</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteOriginCity')}
                  </label>
                  <input
                    type="text"
                    value={formData.originCity}
                    onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                    placeholder="كوانزو، إيوو، نينغبو، شنتشن..."
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteDestCity')}
                  </label>
                  <input
                    type="text"
                    value={formData.destinationCity}
                    onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                    placeholder="عدن، الحديدة، صنعاء، المكلا..."
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Cargo Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('quoteCargoDesc')} *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="مثال: 50 كرتون ملابس شتوية، أو طاقة شمسية 400 لوح، أو قطع إلكترونية..."
                  value={formData.cargoDescription}
                  onChange={(e) => setFormData({ ...formData, cargoDescription: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Row 5: Volume & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteEstimatedVolume')}
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 5 CBM أو حاوية 20 قدم"
                    value={formData.estimatedVolume}
                    onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('quoteEstimatedWeight')}
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 1200 كجم"
                    value={formData.estimatedWeight}
                    onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsInspection}
                    onChange={(e) => setFormData({ ...formData, needsInspection: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>{t('quoteNeedsInspection')}</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsCustomsClearance}
                    onChange={(e) => setFormData({ ...formData, needsCustomsClearance: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>{t('quoteNeedsCustoms')}</span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('quoteSubmitBtn')}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
