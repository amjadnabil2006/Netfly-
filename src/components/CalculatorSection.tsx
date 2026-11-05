import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FREIGHT_RATES } from '../mockData';
import { 
  Calculator, 
  Ship, 
  Plane, 
  Box, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Info, 
  Clock, 
  Check, 
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface CalculatorSectionProps {
  onProceedToOrder: (calcData: {
    serviceType: 'sea_fcl' | 'sea_lcl' | 'air_express';
    originCity: string;
    destinationCity: string;
    estimatedVolume: string;
    estimatedWeight: string;
    needsInspection: boolean;
    needsCustomsClearance: boolean;
    estimatedCostUsd: number;
  }) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onProceedToOrder
}) => {
  const { t, language, isRtl } = useTheme();

  // Mode: 'lcl' | 'fcl' | 'air'
  const [freightType, setFreightType] = useState<'lcl' | 'fcl' | 'air'>('lcl');
  const [origin, setOrigin] = useState('Guangzhou');
  const [destination, setDestination] = useState('Aden');
  const [cargoCategory, setCargoCategory] = useState('general');
  const [containerSize, setContainerSize] = useState<'20ft' | '40ft' | '40hq'>('40hq');
  
  // Volume & Weight
  const [volumeCbm, setVolumeCbm] = useState<number>(4.5);
  const [weightKg, setWeightKg] = useState<number>(1200);

  // Box Dimensions Helper
  const [boxLength, setBoxLength] = useState<number>(50);
  const [boxWidth, setBoxWidth] = useState<number>(40);
  const [boxHeight, setBoxHeight] = useState<number>(40);
  const [boxCount, setBoxCount] = useState<number>(30);

  // Addons
  const [addonInspection, setAddonInspection] = useState(true);
  const [addonRepack, setAddonRepack] = useState(false);
  const [addonInsurance, setAddonInsurance] = useState(true);
  const [addonDelivery, setAddonDelivery] = useState(false);

  // Auto calculate CBM from dimensions
  const handleApplyBoxDimensions = () => {
    // (L * W * H in cm / 1,000,000) * boxCount
    const singleBoxCbm = (boxLength * boxWidth * boxHeight) / 1000000;
    const total = singleBoxCbm * boxCount;
    setVolumeCbm(parseFloat(total.toFixed(2)));
  };

  // Pricing math
  const calculation = useMemo(() => {
    let baseFreight = 0;
    let handlingCustoms = 0;
    let transitDays = '26 - 32 يوماً';
    let transitDaysEn = '26 - 32 Days';

    if (freightType === 'lcl') {
      const cbm = Math.max(1, volumeCbm);
      baseFreight = cbm * FREIGHT_RATES.seaLclBasePerCbm;
      handlingCustoms = cbm * FREIGHT_RATES.customsPerCbmEstimate;
      transitDays = '28 - 35 يوماً';
      transitDaysEn = '28 - 35 Days';
    } else if (freightType === 'fcl') {
      if (containerSize === '20ft') {
        baseFreight = FREIGHT_RATES.seaFcl20ftBase;
      } else if (containerSize === '40ft') {
        baseFreight = FREIGHT_RATES.seaFcl40ftBase;
      } else {
        baseFreight = FREIGHT_RATES.seaFcl40hqBase;
      }
      handlingCustoms = FREIGHT_RATES.customsFclEstimate;
      transitDays = '22 - 28 يوماً';
      transitDaysEn = '22 - 28 Days';
    } else if (freightType === 'air') {
      const kg = Math.max(10, weightKg);
      baseFreight = kg * FREIGHT_RATES.airExpressPerKg;
      handlingCustoms = 85;
      transitDays = '6 - 9 أيام';
      transitDaysEn = '6 - 9 Days';
    }

    // Addons cost
    let addonsTotal = 0;
    if (addonInspection) addonsTotal += 60;
    if (addonRepack) addonsTotal += 45;
    if (addonInsurance) addonsTotal += 75; // flat average estimate
    if (addonDelivery) addonsTotal += 120;

    const totalUsd = Math.round(baseFreight + handlingCustoms + addonsTotal);

    return {
      baseFreight: Math.round(baseFreight),
      handlingCustoms: Math.round(handlingCustoms),
      addonsTotal: Math.round(addonsTotal),
      totalUsd,
      transitDays: language === 'ar' ? transitDays : transitDaysEn
    };
  }, [
    freightType,
    containerSize,
    volumeCbm,
    weightKg,
    addonInspection,
    addonRepack,
    addonInsurance,
    addonDelivery,
    language
  ]);

  const handleOrderClick = () => {
    const sType = freightType === 'fcl' ? 'sea_fcl' : freightType === 'air' ? 'air_express' : 'sea_lcl';
    const volStr = freightType === 'fcl' 
      ? `حاوية كاملة ${containerSize.toUpperCase()}`
      : `${volumeCbm} CBM (${weightKg} كجم)`;

    onProceedToOrder({
      serviceType: sType,
      originCity: origin,
      destinationCity: destination,
      estimatedVolume: volStr,
      estimatedWeight: `${weightKg} KG`,
      needsInspection: addonInspection,
      needsCustomsClearance: true,
      estimatedCostUsd: calculation.totalUsd
    });
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase block mb-2">
            {t('calcKicker')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
            {t('calcTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('calcSubtitle')}
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (8 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            
            {/* Freight Type Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                {t('calcTypeLabel')}
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFreightType('lcl')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    freightType === 'lcl'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Box className="w-4 h-4 text-amber-500" />
                  <span className="truncate">{language === 'ar' ? 'بحري LCL (تجميع)' : 'Sea LCL'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightType('fcl')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    freightType === 'fcl'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Ship className="w-4 h-4 text-amber-500" />
                  <span className="truncate">{language === 'ar' ? 'بحري FCL (حاوية)' : 'Sea FCL'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFreightType('air')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    freightType === 'air'
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Plane className="w-4 h-4 text-amber-500" />
                  <span className="truncate">{language === 'ar' ? 'جوي سريع' : 'Air Express'}</span>
                </button>
              </div>
            </div>

            {/* Ports Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('calcOriginLabel')}
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Guangzhou">كوانزو (Guangzhou - Nansha Port)</option>
                  <option value="Yiwu">إيوو (Yiwu - Consolidation Hub)</option>
                  <option value="Ningbo">نينغبو (Ningbo Port)</option>
                  <option value="Shenzhen">شنتشن (Shenzhen - Yantian Port)</option>
                  <option value="Shanghai">شنغهاي (Shanghai Port)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('calcDestLabel')}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Aden">ميناء عدن الدولي (Aden Port)</option>
                  <option value="Hodeidah">ميناء الحديدة (Hodeidah Port)</option>
                  <option value="Mukalla">ميناء المكلا - حضرموت (Mukalla)</option>
                  <option value="Sanaa">صنعاء (تخليص وتوصيل داخلي / مطار)</option>
                </select>
              </div>
            </div>

            {/* FCL Container Size Picker */}
            {freightType === 'fcl' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('calcContainerSizeLabel')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: '20ft', label: '20ft Container (~28 CBM)' },
                    { id: '40ft', label: '40ft Standard (~58 CBM)' },
                    { id: '40hq', label: '40ft High Cube (~68 CBM)' }
                  ].map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setContainerSize(size.id as any)}
                      className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                        containerSize === size.id
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-slate-900 dark:text-white ring-1 ring-amber-500'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="block text-xs font-bold">{size.id.toUpperCase()}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{size.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LCL Volume / Air Weight Inputs */}
            {freightType === 'lcl' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('calcDirectCbmLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.5"
                        step="0.1"
                        value={volumeCbm}
                        onChange={(e) => setVolumeCbm(parseFloat(e.target.value) || 1)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 rtl:left-3 ltr:right-3 text-xs font-bold text-slate-400">
                        CBM
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('calcDirectWeightLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="10"
                        step="10"
                        value={weightKg}
                        onChange={(e) => setWeightKg(parseFloat(e.target.value) || 50)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 rtl:left-3 ltr:right-3 text-xs font-bold text-slate-400">
                        KG
                      </span>
                    </div>
                  </div>
                </div>

                {/* Carton Dimensions Helper Accordion */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
                    {t('calcDimensionsHelper')}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">{t('calcBoxLength')}</span>
                      <input
                        type="number"
                        value={boxLength}
                        onChange={(e) => setBoxLength(Number(e.target.value))}
                        className="w-full py-1.5 px-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">{t('calcBoxWidth')}</span>
                      <input
                        type="number"
                        value={boxWidth}
                        onChange={(e) => setBoxWidth(Number(e.target.value))}
                        className="w-full py-1.5 px-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">{t('calcBoxHeight')}</span>
                      <input
                        type="number"
                        value={boxHeight}
                        onChange={(e) => setBoxHeight(Number(e.target.value))}
                        className="w-full py-1.5 px-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">{t('calcBoxCount')}</span>
                      <input
                        type="number"
                        value={boxCount}
                        onChange={(e) => setBoxCount(Number(e.target.value))}
                        className="w-full py-1.5 px-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyBoxDimensions}
                    className="w-full py-2 px-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    {t('calcApplyCbmBtn')}
                  </button>
                </div>
              </div>
            )}

            {/* Air Freight Weight */}
            {freightType === 'air' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('calcDirectWeightLabel')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 10)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 rtl:left-3 ltr:right-3 text-xs font-bold text-slate-400">
                    KG
                  </span>
                </div>
              </div>
            )}

            {/* Addon Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                {t('calcOptionsAddons')}
              </label>
              <div className="space-y-2.5">
                {[
                  { id: 'insp', checked: addonInspection, setter: setAddonInspection, label: t('calcOptInspection') },
                  { id: 'repack', checked: addonRepack, setter: setAddonRepack, label: t('calcOptRepack') },
                  { id: 'insur', checked: addonInsurance, setter: setAddonInsurance, label: t('calcOptInsurance') },
                  { id: 'deliv', checked: addonDelivery, setter: setAddonDelivery, label: t('calcOptDelivery') }
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 dark:border-slate-600"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Box (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  {t('calcResultTitle')}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {origin} ➔ {destination}
              </span>
            </div>

            {/* Estimated Total Display */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">
                  {t('calcEstimatedTotal')}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  سعر تفضيلي معتمد
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-tight tabular-nums">
                  ${calculation.totalUsd.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-mono">USD</span>
              </div>
              
              {/* Multi-Currency Conversion Breakdown */}
              <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-700/80 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">الريال اليمني (عدن والموانئ):</span>
                  <span className="text-white font-bold">~{(calculation.totalUsd * 1860).toLocaleString()} YER</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">الريال اليمني (صنعاء):</span>
                  <span className="text-white font-bold">~{(calculation.totalUsd * 535).toLocaleString()} YER</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">الريال السعودي:</span>
                  <span className="text-white font-bold">~{Math.round(calculation.totalUsd * 3.75).toLocaleString()} SAR</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">اليوان الصيني (RMB):</span>
                  <span className="text-amber-400 font-bold">~{Math.round(calculation.totalUsd * 7.245).toLocaleString()} ¥</span>
                </div>
              </div>
            </div>

            {/* Detailed Line Items */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>{t('calcTransitTime')}:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{calculation.transitDays}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>{t('calcBaseFreight')}:</span>
                <span className="font-mono font-semibold text-white">
                  ${calculation.baseFreight.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>{t('calcHandlingCustoms')}:</span>
                <span className="font-mono font-semibold text-white">
                  ${calculation.handlingCustoms.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>{t('calcAdditionalFees')}:</span>
                <span className="font-mono font-semibold text-white">
                  ${calculation.addonsTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Disclaimer notice */}
            <p className="text-[11px] text-slate-400 leading-relaxed pt-3 border-t border-slate-800">
              {t('calcNotice')}
            </p>

            {/* Action Button: Book Now */}
            <button
              onClick={handleOrderClick}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('calcOrderBtn')}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
