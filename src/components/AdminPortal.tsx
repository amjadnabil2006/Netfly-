import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Shipment, 
  ShippingQuoteRequest, 
  ShipmentStatus, 
  SiteSectionConfig, 
  CompanyGeneralSettings 
} from '../types';
import { 
  X, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Ship, 
  Layers, 
  FileText,
  Save,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  LayoutGrid,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Settings,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  Bell,
  Search
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  shipments: Shipment[];
  onUpdateShipment: (updated: Shipment) => void;
  onCreateShipment: (created: Shipment) => void;
  onDeleteShipment: (id: string) => void;
  quoteRequests: ShippingQuoteRequest[];
  onUpdateQuoteStatus: (id: string, newStatus: ShippingQuoteRequest['status']) => void;
  sections: SiteSectionConfig[];
  onUpdateSection: (updated: SiteSectionConfig) => void;
  onCreateSection: (newSec: SiteSectionConfig) => void;
  onDeleteSection: (id: string) => void;
  onReorderSections: (newSections: SiteSectionConfig[]) => void;
  onResetSections: () => void;
  settings: CompanyGeneralSettings;
  onUpdateSettings: (newSettings: CompanyGeneralSettings) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  shipments,
  onUpdateShipment,
  onCreateShipment,
  onDeleteShipment,
  quoteRequests,
  onUpdateQuoteStatus,
  sections,
  onUpdateSection,
  onCreateSection,
  onDeleteSection,
  onReorderSections,
  onResetSections,
  settings,
  onUpdateSettings
}) => {
  const { t, language, isRtl } = useTheme();

  // Authentication gate for operations security
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active admin tab: sections (CMS) is primary, along with shipments, create, quotes, settings
  const [activeTab, setActiveTab] = useState<'sections' | 'shipments' | 'create' | 'quotes' | 'settings'>('sections');

  // Search & Filter state for sections CMS
  const [sectionSearchQuery, setSectionSearchQuery] = useState('');

  // Modals for CMS operations
  const [editingSection, setEditingSection] = useState<SiteSectionConfig | null>(null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [deletingSectionId, setDeletingSectionId] = useState<string | null>(null);

  // New Section Form State
  const [newSectionData, setNewSectionData] = useState<Partial<SiteSectionConfig>>({
    nameAr: '',
    nameEn: '',
    titleAr: '',
    titleEn: '',
    subtitleAr: '',
    subtitleEn: '',
    customBadgeAr: 'عرض مميز',
    customBadgeEn: 'Special Offer',
    customStyle: 'card',
    customContentAr: '',
    customContentEn: '',
    customCtaTextAr: 'طلب تسعيرة فورية',
    customCtaTextEn: 'Request Quote Now',
    customCtaLink: '#order',
    isEnabled: true
  });

  // Settings local state
  const [settingsForm, setSettingsForm] = useState<CompanyGeneralSettings>(settings);

  // New Shipment Form State
  const [newShipment, setNewShipment] = useState({
    trackingNumber: `SMC-${Math.floor(10000 + Math.random() * 90000)}`,
    blNumber: `COSCO-YEM-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName: '',
    customerPhone: '',
    cargoTypeAr: '',
    cargoTypeEn: '',
    originPortAr: 'ميناء كوانزو (الصين)',
    originPortEn: 'Guangzhou Port (China)',
    destinationPortAr: 'ميناء عدن الدولي (اليمن)',
    destinationPortEn: 'Aden Port Terminal (Yemen)',
    shippingType: 'FCL' as 'FCL' | 'LCL' | 'AIR',
    containerNumber: 'CSXU-892100',
    vesselName: 'COSCO RED SEA TRADER',
    cbm: 40,
    weightKg: 12000,
    packagesCount: 250,
    departureDate: new Date().toISOString().substring(0, 10),
    estimatedArrival: new Date(Date.now() + 25 * 86400000).toISOString().substring(0, 10),
    notesAr: 'تم تعتيق الحاوية وهي جاهزة لمغادرة الرصيف الصيني.'
  });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '123456' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Section CMS Handlers
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const reordered = [...sections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // Reassign order indices
    const updated = reordered.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    onReorderSections(updated);
  };

  const handleToggleSection = (section: SiteSectionConfig) => {
    onUpdateSection({
      ...section,
      isEnabled: !section.isEnabled
    });
  };

  const handleSaveEditSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    onUpdateSection(editingSection);
    setEditingSection(null);
  };

  const handleCreateNewSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionData.nameAr || !newSectionData.titleAr) return;

    const slug = 'custom-' + (newSectionData.nameEn ? newSectionData.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '-') : Date.now().toString());

    const created: SiteSectionConfig = {
      id: slug,
      nameAr: newSectionData.nameAr || '',
      nameEn: newSectionData.nameEn || newSectionData.nameAr || '',
      titleAr: newSectionData.titleAr || '',
      titleEn: newSectionData.titleEn || newSectionData.titleAr || '',
      subtitleAr: newSectionData.subtitleAr || '',
      subtitleEn: newSectionData.subtitleEn || '',
      isEnabled: true,
      isCustom: true,
      order: sections.length + 1,
      customBadgeAr: newSectionData.customBadgeAr || 'قسم مخصص',
      customBadgeEn: newSectionData.customBadgeEn || 'Special Section',
      customStyle: newSectionData.customStyle || 'card',
      customContentAr: newSectionData.customContentAr || '',
      customContentEn: newSectionData.customContentEn || '',
      customCtaTextAr: newSectionData.customCtaTextAr || '',
      customCtaTextEn: newSectionData.customCtaTextEn || '',
      customCtaLink: newSectionData.customCtaLink || '#order'
    };

    onCreateSection(created);
    setIsAddSectionOpen(false);
    // Reset form
    setNewSectionData({
      nameAr: '',
      nameEn: '',
      titleAr: '',
      titleEn: '',
      subtitleAr: '',
      subtitleEn: '',
      customBadgeAr: 'عرض مميز',
      customBadgeEn: 'Special Offer',
      customStyle: 'card',
      customContentAr: '',
      customContentEn: '',
      customCtaTextAr: 'طلب تسعيرة فورية',
      customCtaTextEn: 'Request Quote Now',
      customCtaLink: '#order',
      isEnabled: true
    });
  };

  const handleConfirmDeleteSection = (id: string) => {
    onDeleteSection(id);
    setDeletingSectionId(null);
  };

  // General Settings Handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    alert(language === 'ar' ? 'تم حفظ وتحديث إعدادات الشركة والشريط الإعلاني بنجاح!' : 'Company settings updated successfully!');
  };

  // Shipment Handlers
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShipment.customerName || !newShipment.cargoTypeAr) return;

    const created: Shipment = {
      id: newShipment.trackingNumber,
      trackingNumber: newShipment.trackingNumber,
      blNumber: newShipment.blNumber,
      customerName: newShipment.customerName,
      customerPhone: newShipment.customerPhone,
      cargoTypeAr: newShipment.cargoTypeAr,
      cargoTypeEn: newShipment.cargoTypeEn || newShipment.cargoTypeAr,
      originPortAr: newShipment.originPortAr,
      originPortEn: newShipment.originPortEn,
      destinationPortAr: newShipment.destinationPortAr,
      destinationPortEn: newShipment.destinationPortEn,
      shippingType: newShipment.shippingType,
      containerNumber: newShipment.containerNumber,
      vesselName: newShipment.vesselName,
      cbm: Number(newShipment.cbm),
      weightKg: Number(newShipment.weightKg),
      packagesCount: Number(newShipment.packagesCount),
      departureDate: newShipment.departureDate,
      estimatedArrival: newShipment.estimatedArrival,
      currentStatus: 'container_loaded',
      progressPercent: 30,
      notesAr: newShipment.notesAr,
      notesEn: 'Container loaded at origin terminal.',
      steps: [
        {
          id: 'step-init',
          titleAr: 'تم استلام البضائع وتحميل الحاوية',
          titleEn: 'Cargo Received & Container Stuffed',
          locationAr: newShipment.originPortAr,
          locationEn: newShipment.originPortEn,
          date: newShipment.departureDate,
          time: '10:00',
          completed: true,
          current: true,
          descriptionAr: 'تم تسجيل الشحنة بنجاح في نظام سما كابيتال.',
          descriptionEn: 'Consignment successfully logged in operating system.'
        }
      ]
    };

    onCreateShipment(created);
    setActiveTab('shipments');
  };

  const handleStatusChange = (shipment: Shipment, newStatus: ShipmentStatus) => {
    let progress = shipment.progressPercent;
    let note = shipment.notesAr;

    if (newStatus === 'sailing_ocean') {
      progress = 55;
      note = 'السفينة تبحر في عرض البحر باتجاه موانئ اليمن.';
    } else if (newStatus === 'arrived_yemen_port') {
      progress = 80;
      note = 'وصلت السفينة ورست بميناء التفريغ اليمني.';
    } else if (newStatus === 'customs_yemen') {
      progress = 90;
      note = 'جاري التخليص الجمركي واستخراج بيان الإفراج.';
    } else if (newStatus === 'delivered') {
      progress = 100;
      note = 'تم تسليم الشحنة للعميل بنجاح.';
    }

    onUpdateShipment({
      ...shipment,
      currentStatus: newStatus,
      progressPercent: progress,
      notesAr: note
    });
  };

  // Filter sections
  const filteredSections = sections.filter(s => {
    const query = sectionSearchQuery.toLowerCase();
    return s.nameAr.toLowerCase().includes(query) || 
           s.nameEn.toLowerCase().includes(query) || 
           s.titleAr.toLowerCase().includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === 'ar' ? 'لوحة تحكم الموقع والعمليات (CMS & Operations)' : 'Site CMS & Operations Portal'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'إدارة وتخصيص الأقسام، الشحنات، التسعيرات، وإعدادات الشركة' : 'Manage site sections, active consignments, rates, and corporate settings'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate vs Admin Console */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <KeyRound className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {t('adminLoginPrompt')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' 
                  ? 'منظومة الإدارة الشاملة وتخصيص أقسام الموقع (رمز المشغل: 123456)' 
                  : 'Full CMS & Operations Console (Operator PIN: 123456)'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={t('adminPasswordPlaceholder')}
                  className="w-full py-3 px-4 rounded-xl text-center font-mono text-base tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-500 font-semibold">
                  رمز الأمان غير مطابق لتصريح المشغل.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow transition-all cursor-pointer"
              >
                {t('adminLoginBtn')}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
            
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                
                {/* 1. SECTIONS CMS TAB (Primary Request) */}
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'sections'
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إدارة وتخصيص الأقسام (CMS)' : 'Site Sections CMS'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/20 text-slate-950">
                    {sections.length}
                  </span>
                </button>

                {/* 2. SHIPMENTS TAB */}
                <button
                  onClick={() => setActiveTab('shipments')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'shipments'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t('adminTabShipments')} ({shipments.length})
                </button>

                {/* 3. CREATE SHIPMENT TAB */}
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'create'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('adminTabNewShipment')}</span>
                </button>

                {/* 4. QUOTES TAB */}
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'quotes'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('adminTabQuotes')} ({quoteRequests.length})</span>
                </button>

                {/* 5. GENERAL SETTINGS TAB */}
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إعدادات الموقع والشريط' : 'Site Settings'}</span>
                </button>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer"
              >
                {t('adminLogout')}
              </button>
            </div>

            {/* TAB 1: SITE SECTIONS CMS (Full Management: Add, Edit, Delete, Reorder, Toggle) */}
            {activeTab === 'sections' && (
              <div className="space-y-6">
                
                {/* CMS Actions Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-amber-500" />
                      <span>{language === 'ar' ? 'التحكم الكامل بأقسام الموقع الإلكتروني' : 'Site Sections Full CMS Control'}</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {language === 'ar' 
                        ? 'يمكنك إضافة أقسام جديدة، إعادة ترتيبها، تعديل العناوين، وإخفاء أو حذف أي قسم مباشرة.' 
                        : 'Add new sections, reorder via arrows, edit copy, or toggle/delete sections in real time.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={onResetSections}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 cursor-pointer"
                      title={language === 'ar' ? 'استعادة الترتيب والأقسام الافتراضية' : 'Reset to default sections'}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
                    </button>

                    <button
                      onClick={() => setIsAddSectionOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إضافة قسم جديد +' : 'Add New Section +'}</span>
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute top-3.5 text-slate-400 start-3" />
                  <input
                    type="text"
                    value={sectionSearchQuery}
                    onChange={(e) => setSectionSearchQuery(e.target.value)}
                    placeholder={language === 'ar' ? 'ابحث في أسماء وعناوين الأقسام...' : 'Search sections by name or title...'}
                    className="w-full py-2.5 ps-9 pe-4 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Sections List */}
                <div className="space-y-3">
                  {filteredSections.map((sec, index) => (
                    <div
                      key={sec.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        sec.isEnabled 
                          ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm' 
                          : 'bg-slate-100 dark:bg-slate-800/30 border-dashed border-slate-300 dark:border-slate-700 opacity-60'
                      }`}
                    >
                      
                      {/* Left Side: Order Handle & Information */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Order Controls */}
                        <div className="flex flex-col items-center gap-1 shrink-0 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                          <button
                            onClick={() => handleMoveSection(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                            title={language === 'ar' ? 'تحريك للأعلى' : 'Move up'}
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                            #{sec.order}
                          </span>
                          <button
                            onClick={() => handleMoveSection(index, 'down')}
                            disabled={index === sections.length - 1}
                            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                            title={language === 'ar' ? 'تحريك للأسفل' : 'Move down'}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                              {sec.nameAr}
                            </h5>
                            <span className="text-xs text-slate-400 font-mono">
                              ({sec.id})
                            </span>
                            {sec.isCustom ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                {language === 'ar' ? 'قسم مخصص' : 'Custom'}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                {language === 'ar' ? 'قسم نظام' : 'System'}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sec.isEnabled 
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                                : 'bg-red-500/10 text-red-500'
                            }`}>
                              {sec.isEnabled 
                                ? (language === 'ar' ? 'مفعل في الموقع' : 'Visible') 
                                : (language === 'ar' ? 'مخفي' : 'Hidden')}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                            <strong>{sec.titleAr}</strong> — {sec.subtitleAr}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        
                        {/* Visibility Toggle */}
                        <button
                          onClick={() => handleToggleSection(sec)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                            sec.isEnabled 
                              ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600' 
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          }`}
                          title={sec.isEnabled ? (language === 'ar' ? 'إخفاء القسم' : 'Hide section') : (language === 'ar' ? 'إظهار القسم' : 'Show section')}
                        >
                          {sec.isEnabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          <span className="hidden sm:inline">
                            {sec.isEnabled ? (language === 'ar' ? 'إخفاء' : 'Hide') : (language === 'ar' ? 'إظهار' : 'Show')}
                          </span>
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingSection(sec)}
                          className="p-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                          title={language === 'ar' ? 'تعديل نصوص القسم' : 'Edit section copy'}
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {language === 'ar' ? 'تعديل' : 'Edit'}
                          </span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeletingSectionId(sec.id)}
                          className="p-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                          title={language === 'ar' ? 'حذف القسم' : 'Delete section'}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {language === 'ar' ? 'حذف' : 'Delete'}
                          </span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 2: SHIPMENTS LIST */}
            {activeTab === 'shipments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('adminTotalShipments')} ({shipments.length})
                  </h4>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة شحنة جديدة</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {shipments.map((s) => (
                    <div 
                      key={s.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {s.trackingNumber}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            B/L: {s.blNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                            · {s.customerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-500">
                            {s.progressPercent}%
                          </span>
                          <button
                            onClick={() => onDeleteShipment(s.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                            title="حذف الشحنة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
                        <div>
                          <strong>البضاعة:</strong> {s.cargoTypeAr} ({s.shippingType})
                        </div>
                        <div>
                          <strong>المسار:</strong> {s.originPortAr} ➔ {s.destinationPortAr}
                        </div>
                        <div>
                          <strong>تاريخ المغادرة:</strong> {s.departureDate}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">
                          {t('adminUpdateStatus')}:
                        </span>
                        
                        {(['container_loaded', 'sailing_ocean', 'arrived_yemen_port', 'customs_yemen', 'delivered'] as ShipmentStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(s, st)}
                            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                              s.currentStatus === st
                                ? 'bg-amber-500 text-slate-950 shadow-sm'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                            }`}
                          >
                            {st === 'container_loaded' && 'تحميل الحاوية'}
                            {st === 'sailing_ocean' && 'إبحار المحيط'}
                            {st === 'arrived_yemen_port' && 'وصول الميناء'}
                            {st === 'customs_yemen' && 'جمرك عدن'}
                            {st === 'delivered' && 'تم التسليم'}
                          </button>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CREATE NEW SHIPMENT */}
            {activeTab === 'create' && (
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  بيانات بوليصة الشحن الجديدة:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      {language === 'ar' ? 'رقم التتبع (Tracking #)' : 'Tracking #'}
                    </label>
                    <input
                      type="text"
                      value={newShipment.trackingNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, trackingNumber: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      {language === 'ar' ? 'رقم بوليصة الشحن (B/L #)' : 'Bill of Lading #'}
                    </label>
                    <input
                      type="text"
                      value={newShipment.blNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, blNumber: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      {language === 'ar' ? 'اسم العميل / الشركة' : 'Customer / Company'}
                    </label>
                    <input
                      type="text"
                      value={newShipment.customerName}
                      onChange={(e) => setNewShipment({ ...newShipment, customerName: e.target.value })}
                      placeholder="مؤسسة التجارة الحديثة (عدن)"
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      {language === 'ar' ? 'نوع البضاعة والوصف' : 'Cargo Description'}
                    </label>
                    <input
                      type="text"
                      value={newShipment.cargoTypeAr}
                      onChange={(e) => setNewShipment({ ...newShipment, cargoTypeAr: e.target.value })}
                      placeholder="طاقة شمسية ومحولات"
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      {language === 'ar' ? 'طريقة الشحن (FCL / LCL / AIR)' : 'Shipping Mode'}
                    </label>
                    <select
                      value={newShipment.shippingType}
                      onChange={(e) => setNewShipment({ ...newShipment, shippingType: e.target.value as any })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <option value="FCL">شحن بحري حاوية كاملة (FCL)</option>
                      <option value="LCL">شحن بحري تجميع جزئي (LCL)</option>
                      <option value="AIR">شحن جوي سريع (AIR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      رقم الحاوية (Container #)
                    </label>
                    <input
                      type="text"
                      value={newShipment.containerNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, containerNumber: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      اسم السفينة الناقلة
                    </label>
                    <input
                      type="text"
                      value={newShipment.vesselName}
                      onChange={(e) => setNewShipment({ ...newShipment, vesselName: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      الحجم بالمتر المكعب (CBM)
                    </label>
                    <input
                      type="number"
                      value={newShipment.cbm}
                      onChange={(e) => setNewShipment({ ...newShipment, cbm: Number(e.target.value) })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      تاريخ الإبحار الفعلي
                    </label>
                    <input
                      type="date"
                      value={newShipment.departureDate}
                      onChange={(e) => setNewShipment({ ...newShipment, departureDate: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{t('adminSaveBtn')}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: QUOTE REQUESTS */}
            {activeTab === 'quotes' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  طلبات الشحن والتسعيرات الواردة من العملاء:
                </h4>

                {quoteRequests.length === 0 ? (
                  <p className="text-xs text-slate-500">لا توجد طلبات جديدة حالياً.</p>
                ) : (
                  <div className="space-y-3">
                    {quoteRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                              {req.id}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {req.clientName} {req.companyName ? `(${req.companyName})` : ''}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {req.date}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300">
                          <strong>الوصف:</strong> {req.cargoDescription}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span>الخدمة: <strong>{req.serviceType}</strong></span>
                          <span>المنشأ: <strong>{req.originCity}</strong> ➔ الوجهة: <strong>{req.destinationCity}</strong></span>
                          {req.estimatedVolume && <span>الحجم: <strong>{req.estimatedVolume}</strong></span>}
                          {req.notes && <span>ملاحظات: {req.notes}</span>}
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">حالة الطلب:</span>
                            <select
                              value={req.status}
                              onChange={(e) => onUpdateQuoteStatus(req.id, e.target.value as any)}
                              className="py-1 px-2 rounded text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            >
                              <option value="pending">جديد (قيد المراجعة)</option>
                              <option value="contacted">تم التواصل</option>
                              <option value="quoted">تم إرسال عرض السعر</option>
                              <option value="approved">تم اعتماد الشحن</option>
                            </select>
                          </div>

                          <a
                            href={`https://api.whatsapp.com/send?phone=${req.whatsapp.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`السلام عليكم أستاذ ${req.clientName}، بخصوص طلب الشحن رقم ${req.id} لشركة سما كابيتال للاستيراد:`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>مراسلة العميل واتساب ({req.whatsapp})</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: GENERAL SETTINGS & ANNOUNCEMENT BAR */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <span>شريط الإعلانات والتنبيهات الملاحية العاجلة (Top Announcement Bar)</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    يظهر أعلى الموقع لجميع الزوار لتنبيههم بمواعيد إغلاق الرحلات، العروض، أو التنبيهات الجمركية.
                  </p>

                  <div className="mt-4 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settingsForm.showAnnouncementBar}
                        onChange={(e) => setSettingsForm({ ...settingsForm, showAnnouncementBar: e.target.checked })}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        تفعيل وإظهار شريط الإعلانات في أعلى الموقع
                      </span>
                    </label>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        نص التنبيه بالعربية
                      </label>
                      <input
                        type="text"
                        value={settingsForm.announcementBarTextAr}
                        onChange={(e) => setSettingsForm({ ...settingsForm, announcementBarTextAr: e.target.value })}
                        placeholder="تنبيه ملاحي: فتح باب الحجز لرحلة COSCO المتجهة لميناء عدن..."
                        className="w-full py-2 px-3 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        نص التنبيه بالإنجليزية (English Text)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.announcementBarTextEn}
                        onChange={(e) => setSettingsForm({ ...settingsForm, announcementBarTextEn: e.target.value })}
                        placeholder="Liner Notice: Booking open for COSCO sailing..."
                        className="w-full py-2 px-3 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Corporate Contact Info */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    أرقام التواصل الرسمية للشركة:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        رقم هاتف العمليات الرئيسي
                      </label>
                      <input
                        type="text"
                        value={settingsForm.mainPhone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, mainPhone: e.target.value })}
                        className="w-full py-2 px-3 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        رقم الواتساب المعتمد
                      </label>
                      <input
                        type="text"
                        value={settingsForm.mainWhatsapp}
                        onChange={(e) => setSettingsForm({ ...settingsForm, mainWhatsapp: e.target.value })}
                        className="w-full py-2 px-3 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        البريد الإلكتروني الرسمي
                      </label>
                      <input
                        type="email"
                        value={settingsForm.mainEmail}
                        onChange={(e) => setSettingsForm({ ...settingsForm, mainEmail: e.target.value })}
                        className="w-full py-2 px-3 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        هاتف الطوارئ والتنسيق في الصين
                      </label>
                      <input
                        type="text"
                        value={settingsForm.emergencyContact}
                        onChange={(e) => setSettingsForm({ ...settingsForm, emergencyContact: e.target.value })}
                        className="w-full py-2 px-3 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ كافة الإعدادات</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>

      {/* MODAL 1: ADD NEW CUSTOM SECTION */}
      {isAddSectionOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'إضافة قسم جديد إلى الموقع' : 'Add New Site Section'}
                </h4>
              </div>
              <button
                onClick={() => setIsAddSectionOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewSection} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    اسم القسم الداخلي (بالعربية) *
                  </label>
                  <input
                    type="text"
                    value={newSectionData.nameAr}
                    onChange={(e) => setNewSectionData({ ...newSectionData, nameAr: e.target.value })}
                    placeholder="مثال: عروض شحن نهاية العام"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    اسم القسم الداخلي (بالإنجليزية)
                  </label>
                  <input
                    type="text"
                    value={newSectionData.nameEn}
                    onChange={(e) => setNewSectionData({ ...newSectionData, nameEn: e.target.value })}
                    placeholder="e.g. Year-End Shipping Promo"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    العنوان الرئيسي بالعربية (Main Title) *
                  </label>
                  <input
                    type="text"
                    value={newSectionData.titleAr}
                    onChange={(e) => setNewSectionData({ ...newSectionData, titleAr: e.target.value })}
                    placeholder="مثال: خصومات حصرية على الشحن البحري للحاويات"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    العنوان الرئيسي بالإنجليزية
                  </label>
                  <input
                    type="text"
                    value={newSectionData.titleEn}
                    onChange={(e) => setNewSectionData({ ...newSectionData, titleEn: e.target.value })}
                    placeholder="e.g. Exclusive Container Freight Discounts"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الوصف الفرعي (بالعربية)
                  </label>
                  <input
                    type="text"
                    value={newSectionData.subtitleAr}
                    onChange={(e) => setNewSectionData({ ...newSectionData, subtitleAr: e.target.value })}
                    placeholder="شحن مباشر ومضمون من كوانزو لميناء عدن بأسعار تنافسية"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    نمط وشكل القسم (Style)
                  </label>
                  <select
                    value={newSectionData.customStyle}
                    onChange={(e) => setNewSectionData({ ...newSectionData, customStyle: e.target.value as any })}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="card">بطاقة مؤسسية أنيقة (Corporate Card)</option>
                    <option value="banner">شريط بحري عريض فاخر (Maritime Ocean Banner)</option>
                    <option value="features">شبكة مميزات ونقاط متعددة (Features Grid)</option>
                    <option value="alert">تنبيه وإشعار تشغيلي (Notice / Alert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    شارة القسم (Badge / Kicker)
                  </label>
                  <input
                    type="text"
                    value={newSectionData.customBadgeAr}
                    onChange={(e) => setNewSectionData({ ...newSectionData, customBadgeAr: e.target.value })}
                    placeholder="عرض حصري للمستوردين"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    نص زر الإجراء (CTA Button Text)
                  </label>
                  <input
                    type="text"
                    value={newSectionData.customCtaTextAr}
                    onChange={(e) => setNewSectionData({ ...newSectionData, customCtaTextAr: e.target.value })}
                    placeholder="طلب تسعيرة فورية"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  المحتوى والتفاصيل (كل سطر يمثل ميزة عند اختيار نمط المميزات)
                </label>
                <textarea
                  value={newSectionData.customContentAr}
                  onChange={(e) => setNewSectionData({ ...newSectionData, customContentAr: e.target.value })}
                  rows={3}
                  placeholder="اكتب هنا تفاصيل هذا القسم ومحتواه..."
                  className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSectionOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow"
                >
                  إضافة القسم وتفعيله
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT SECTION COPY & DETAILS */}
      {editingSection && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-500" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تعديل بيانات ونصوص القسم' : 'Edit Section Details'} ({editingSection.nameAr})
                </h4>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditSection} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    اسم القسم الداخلي (بالعربية)
                  </label>
                  <input
                    type="text"
                    value={editingSection.nameAr}
                    onChange={(e) => setEditingSection({ ...editingSection, nameAr: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    العنوان الرئيسي بالعربية
                  </label>
                  <input
                    type="text"
                    value={editingSection.titleAr}
                    onChange={(e) => setEditingSection({ ...editingSection, titleAr: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    العنوان الرئيسي بالإنجليزية (English Title)
                  </label>
                  <input
                    type="text"
                    value={editingSection.titleEn}
                    onChange={(e) => setEditingSection({ ...editingSection, titleEn: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الوصف الفرعي (بالعربية)
                  </label>
                  <input
                    type="text"
                    value={editingSection.subtitleAr}
                    onChange={(e) => setEditingSection({ ...editingSection, subtitleAr: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    الوصف الفرعي (بالإنجليزية)
                  </label>
                  <input
                    type="text"
                    value={editingSection.subtitleEn}
                    onChange={(e) => setEditingSection({ ...editingSection, subtitleEn: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    شارة أو تصنيف القسم (Badge)
                  </label>
                  <input
                    type="text"
                    value={editingSection.customBadgeAr || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, customBadgeAr: e.target.value })}
                    placeholder="خدمات حصرية"
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {editingSection.isCustom && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    تفاصيل ومحتوى القسم المخصص
                  </label>
                  <textarea
                    value={editingSection.customContentAr || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, customContentAr: e.target.value })}
                    rows={3}
                    className="w-full py-2 px-3 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {deletingSectionId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-center"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                تأكيد حذف القسم
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                هل أنت متأكد من رغبتك في حذف هذا القسم من الموقع؟ يمكنك في أي وقت استعادته عبر زر "استعادة الافتراضي".
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingSectionId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleConfirmDeleteSection(deletingSectionId)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow cursor-pointer"
              >
                نعم، احذف القسم
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
