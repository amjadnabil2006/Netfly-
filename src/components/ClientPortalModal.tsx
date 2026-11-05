import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shipment } from '../types';
import { 
  X, 
  User, 
  Building, 
  Phone, 
  Box, 
  Ship, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  LogOut, 
  Download, 
  Printer, 
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipments: Shipment[];
  onOpenOrderModal: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  shipments,
  onOpenOrderModal
}) => {
  const { t, language, isRtl } = useTheme();

  // Selected client account state
  const [phoneInput, setPhoneInput] = useState('+967 771 234 567');
  const [selectedClientName, setSelectedClientName] = useState<string | null>('مؤسسة البركة للطاقة الشمسية (صنعاء)');
  const [activeTab, setActiveTab] = useState<'shipments' | 'invoices'>('shipments');

  if (!isOpen) return null;

  // Filter shipments belonging to this client or all matching
  const clientShipments = selectedClientName 
    ? shipments.filter(s => s.customerName.includes(selectedClientName.split('(')[0].trim()) || s.customerPhone === phoneInput)
    : [];

  const handleQuickClientSelect = (clientName: string, phone: string) => {
    setSelectedClientName(clientName);
    setPhoneInput(phone);
  };

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-4 sm:my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold truncate">
                بوابة المستورد ورجال الأعمال
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">
                متابعة شحناتك وبوالص الشحن والفواتير الجمركية
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Quick Account Switcher for Importers */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                الحسابات التجارية النشطة المسجلة في النظام:
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono">
                كود العميل موثق مع غرفة العمليات
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { name: 'مؤسسة البركة للطاقة الشمسية (صنعاء)', phone: '+967 771 234 567' },
                { name: 'محلات الشرق للأقمشة والملابس (عدن)', phone: '+967 733 987 654' },
                { name: 'شركة النجم للإلكترونيات الذكية (صنعاء)', phone: '+967 770 112 233' },
                { name: 'مؤسسة حضرموت لمواد البناء (المكلا)', phone: '+967 777 554 433' }
              ].map((acc) => (
                <button
                  key={acc.name}
                  onClick={() => handleQuickClientSelect(acc.name, acc.phone)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    selectedClientName === acc.name
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  {acc.name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Account Overview Card */}
          {selectedClientName && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      حساب تجاري نشط
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{phoneInput}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {selectedClientName}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintStatement}
                    className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-400" />
                    <span>طباعة كشف الحساب</span>
                  </button>
                  <button
                    onClick={onOpenOrderModal}
                    className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>طلب شحنة جديدة</span>
                  </button>
                </div>
              </div>

              {/* KPI metrics for this client */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">الشحنات المسجلة:</span>
                  <span className="text-lg font-bold font-mono text-white tabular-nums">
                    {Math.max(1, clientShipments.length)} شحنة
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">حالة التخليص الجمركي:</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    منتظم ومطابق
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">مستودع الاستلام بالصين:</span>
                  <span className="text-sm font-bold text-slate-200">
                    كوانزو & إيوو
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">مسؤول الحساب المباشر:</span>
                  <span className="text-sm font-bold text-amber-400">
                    م. عمار الجائفي
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Consignments Table & Milestones */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Ship className="w-4 h-4 text-amber-500" />
                <span>سجل البوالص والحاويات الخاصة بحسابك:</span>
              </h4>
              <span className="text-xs text-slate-500 font-mono">
                محدث لحظة بلحظة مع غرفة الموانئ
              </span>
            </div>

            {clientShipments.length > 0 ? (
              <div className="space-y-3">
                {clientShipments.map((s) => (
                  <div
                    key={s.id}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-amber-400/60 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                            {s.trackingNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400">
                            {s.shippingType}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {s.progressPercent}% إنجاز
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                          {s.cargoTypeAr}
                        </h5>
                      </div>

                      <div className="text-end text-xs font-mono">
                        <span className="text-slate-500 block text-[10px]">الوصول المقدر:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">{s.estimatedArrival}</span>
                      </div>
                    </div>

                    {/* Route strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 mb-3 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block">ميناء الانطلاق:</span>
                        <span className="text-slate-800 dark:text-slate-200">{s.originPortAr}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">ميناء الوصول:</span>
                        <span className="text-slate-800 dark:text-slate-200">{s.destinationPortAr}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">بوليصة الشحن B/L:</span>
                        <span className="text-slate-800 dark:text-slate-200">{s.blNumber}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        style={{ width: `${s.progressPercent}%` }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                      <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                        <strong>آخر إشعار:</strong> {s.notesAr}
                      </p>
                      <a
                        href={`https://api.whatsapp.com/send?phone=967777912345&text=${encodeURIComponent(`السلام عليكم، استفسار بخصوص شحنتي رقم ${s.trackingNumber} (${s.customerName}):`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                      >
                        متابعة مع مخلص الميناء
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">لا توجد شحنات مرتبطة بهذا الحساب حالياً.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
