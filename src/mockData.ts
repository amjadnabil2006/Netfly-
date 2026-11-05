import { Shipment, ShippingQuoteRequest, OfficeLocation, SiteSectionConfig, CompanyGeneralSettings, StaffUser } from './types';

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'SMC-84920',
    trackingNumber: 'SMC-84920',
    blNumber: 'COSCO-YEM-8912401',
    customerName: 'مؤسسة البركة للطاقة الشمسية (صنعاء)',
    customerPhone: '+967 771 234 567',
    cargoTypeAr: 'منظومات طاقة شمسية ومحولات كهربائية',
    cargoTypeEn: 'Solar Panels & Hybrid Inverters',
    originPortAr: 'ميناء نانشا - كوانزو (الصين)',
    originPortEn: 'Nansha Port, Guangzhou (China)',
    destinationPortAr: 'ميناء عدن الدولي (اليمن)',
    destinationPortEn: 'Aden Port Container Terminal (Yemen)',
    shippingType: 'FCL',
    containerNumber: 'CSXU-7491028 (40ft HQ)',
    vesselName: 'COSCO ADEN VOYAGER',
    voyageNumber: 'V.2604W',
    cbm: 68.5,
    weightKg: 21400,
    packagesCount: 480,
    departureDate: '2026-10-22',
    estimatedArrival: '2026-11-12',
    currentStatus: 'sailing_ocean',
    progressPercent: 65,
    notesAr: 'السفينة تبحر حالياً في بحر العرب مقتربة من خليج عدن، الأوراق الجمركية جاهزة للمطابقة.',
    notesEn: 'Vessel transiting Arabian Sea toward Gulf of Aden. Manifests cleared with customs broker.',
    steps: [
      {
        id: 'step-1',
        titleAr: 'استلام البضائع في مستودع كوانزو',
        titleEn: 'Received at Guangzhou Logistics Hub',
        locationAr: 'مستودع سما كابيتال - كوانزو',
        locationEn: 'Sama Capital Warehouse - Guangzhou',
        date: '2026-10-18',
        time: '14:30',
        completed: true,
        current: false,
        descriptionAr: 'تم استلام 480 طرد وفحص سلامة التغليف والتأكد من مطابقة السيريال والباركود.',
        descriptionEn: 'Received 480 cartons. QC team verified barcode, serials, and pallet reinforcement.'
      },
      {
        id: 'step-2',
        titleAr: 'تحميل وتعتيق الحاوية (40HQ)',
        titleEn: 'Container Stuffed & Sealed',
        locationAr: 'مستودع كوانزو المركزي',
        locationEn: 'Guangzhou Export Terminal',
        date: '2026-10-20',
        time: '11:15',
        completed: true,
        current: false,
        descriptionAr: 'تم تعتيق البضاعة داخل الحاوية CSXU-7491028 وتركيب القفل الجمركي الأمني #88921.',
        descriptionEn: 'Stuffed and secured inside 40HQ container. High-security customs seal #88921 installed.'
      },
      {
        id: 'step-3',
        titleAr: 'إنهاء التصدير الجمركي الصيني',
        titleEn: 'China Export Customs Clearance',
        locationAr: 'ميناء نانشا - كوانزو',
        locationEn: 'Nansha Seaport, Guangzhou',
        date: '2026-10-21',
        time: '16:45',
        completed: true,
        current: false,
        descriptionAr: 'اجتياز التفتيش الجمركي وإصدار بيان الصادر الصيني وموافقة الشحن.',
        descriptionEn: 'Passed export inspection. Chinese export declaration granted.'
      },
      {
        id: 'step-4',
        titleAr: 'إبحار سفينة الحاويات في عرض البحر',
        titleEn: 'Vessel Departed - Ocean Transit',
        locationAr: 'المحيط الهندي / بحر العرب',
        locationEn: 'Indian Ocean / Arabian Sea',
        date: '2026-10-22',
        time: '08:00',
        completed: true,
        current: true,
        descriptionAr: 'أبحرت السفينة COSCO ADEN VOYAGER، وتبحر حالياً نحو مياه خليج عدن بسرعة 17 عقدة.',
        descriptionEn: 'Cruising smoothly at 17 knots toward Gulf of Aden approach.'
      },
      {
        id: 'step-5',
        titleAr: 'الوصول والرسو بميناء عدن',
        titleEn: 'Berthing at Aden Port Terminal',
        locationAr: 'محطة حاويات ميناء عدن',
        locationEn: 'Aden Port Container Terminal',
        date: '2026-11-12 (متوقع)',
        time: '06:00',
        completed: false,
        current: false,
        descriptionAr: 'الرسو على الرصيف وتفريغ الحاوية برافعة المحطة ونقلها لساحة الجمارك.',
        descriptionEn: 'Vessel berthing and container discharge via quay cranes.'
      },
      {
        id: 'step-6',
        titleAr: 'المعاينة والتخليص الجمركي اليمني',
        titleEn: 'Yemen Customs Inspection & Clearance',
        locationAr: 'جمرك المنطقة الحرة - عدن',
        locationEn: 'Aden Free Zone Customs Area',
        date: '2026-11-14 (متوقع)',
        time: '10:00',
        completed: false,
        current: false,
        descriptionAr: 'فحص المستندات ودفع الرسوم الجمركية وإصدار إذن خروج البضاعة.',
        descriptionEn: 'Document verification, tariff payment, and gate release note issuance.'
      },
      {
        id: 'step-7',
        titleAr: 'تسليم الشحنة للعميل',
        titleEn: 'Final Consignment Delivery',
        locationAr: 'مستودعات العميل - صنعاء',
        locationEn: 'Client Warehouse - Sanaa',
        date: '2026-11-16 (متوقع)',
        time: '15:00',
        completed: false,
        current: false,
        descriptionAr: 'النقل الداخلي عبر شاحنات مؤمنة والتسليم النهائي للمستودع.',
        descriptionEn: 'Inland transit via secured heavy trucks to destination warehouse.'
      }
    ]
  },
  {
    id: 'SMC-31950',
    trackingNumber: 'SMC-31950',
    blNumber: 'MSC-YEM-442199',
    customerName: 'محلات الشرق للأقمشة والملابس (عدن)',
    customerPhone: '+967 733 987 654',
    cargoTypeAr: 'أقمشة ومفروشات وملابس جاهزة (تجميع LCL)',
    cargoTypeEn: 'Fabrics, Bedding & Apparel (LCL Consolidation)',
    originPortAr: 'مستودع إيوو / ميناء نينغبو (الصين)',
    originPortEn: 'Yiwu Warehouse / Ningbo Port (China)',
    destinationPortAr: 'ميناء عدن التجاري (اليمن)',
    destinationPortEn: 'Aden Commercial Port (Yemen)',
    shippingType: 'LCL',
    containerNumber: 'MSCU-9021480 (حاوية مشتركة)',
    vesselName: 'MSC YEMEN PRIDE',
    voyageNumber: 'V.1102A',
    cbm: 14.2,
    weightKg: 4250,
    packagesCount: 165,
    departureDate: '2026-10-08',
    estimatedArrival: '2026-11-04',
    currentStatus: 'customs_yemen',
    progressPercent: 88,
    notesAr: 'الحاوية تم تفريغها في ميناء عدن وهي الآن في مرحلة المعاينة الجمركية النهائية والتسليم غداً.',
    notesEn: 'Container stripped at CFS Aden; currently undergoing final tariff inspection. Ready for pickup tomorrow.',
    steps: [
      {
        id: 'step-1',
        titleAr: 'تجميع الطرود في مستودع إيوو',
        titleEn: 'Consolidation at Yiwu Warehouse',
        locationAr: 'مستودع سما كابيتال - سوق إيوو',
        locationEn: 'Sama Capital Hub - Yiwu City',
        date: '2026-10-02',
        time: '16:00',
        completed: true,
        current: false,
        descriptionAr: 'تم استلام شحنات من 4 مصانع مختلفة في إيوو ووزنها وتغليفها برول حماية.',
        descriptionEn: 'Received consignments from 4 distinct Yiwu factories; packed & film wrapped.'
      },
      {
        id: 'step-2',
        titleAr: 'شحن الحاوية من ميناء نينغبو',
        titleEn: 'Ocean Departure from Ningbo',
        locationAr: 'ميناء نينغبو - الصين',
        locationEn: 'Ningbo Port, China',
        date: '2026-10-08',
        time: '20:30',
        completed: true,
        current: false,
        descriptionAr: 'تحركت الحاوية المشتركة على متن الناقلة MSC.',
        descriptionEn: 'Departed Ningbo terminal aboard MSC feeder.'
      },
      {
        id: 'step-3',
        titleAr: 'الوصول والتفريغ بميناء عدن',
        titleEn: 'Vessel Arrived & Unloaded',
        locationAr: 'محطة الحاويات - عدن',
        locationEn: 'Aden Container Port',
        date: '2026-11-01',
        time: '18:00',
        completed: true,
        current: false,
        descriptionAr: 'تم تفريغ الحاوية المشتركة في ساحة الفرز (CFS).',
        descriptionEn: 'Container grounded and unstuffed at CFS yard.'
      },
      {
        id: 'step-4',
        titleAr: 'المعاينة الجمركية ودفع الرسوم',
        titleEn: 'Customs Clearance in Progress',
        locationAr: 'جمرك عدن',
        locationEn: 'Aden Customs Terminal',
        date: '2026-11-03',
        time: '10:30',
        completed: true,
        current: true,
        descriptionAr: 'فريق سما كابيتال ينهي المعاملة الجمركية وطباعة إذن الإفراج.',
        descriptionEn: 'Clearing team processing release manifest; duty assessment completed.'
      },
      {
        id: 'step-5',
        titleAr: 'جاهز للاستلام / التوصيل',
        titleEn: 'Ready for Dispatch',
        locationAr: 'مستودع سما كابيتال - عدن (المنصورة)',
        locationEn: 'Sama Capital Branch - Mansoura, Aden',
        date: '2026-11-04 (متوقع)',
        time: '12:00',
        completed: false,
        current: false,
        descriptionAr: 'استلام الشحنة في مستودعنا بعدن أو النقل لمقر متجر العميل.',
        descriptionEn: 'Available for client pickup or scheduled local dispatch.'
      }
    ]
  },
  {
    id: 'SMC-65210',
    trackingNumber: 'SMC-65210',
    blNumber: 'SMC-AIR-90184',
    customerName: 'شركة النجم للإلكترونيات الذكية (صنعاء)',
    customerPhone: '+967 770 112 233',
    cargoTypeAr: 'شاشات هواتف ذكية وقطع غيار إلكترونية (جوي سريع)',
    cargoTypeEn: 'Smartphone Displays & Microelectronics (Air Express)',
    originPortAr: 'مطار شنتشن الدولي (الصين)',
    originPortEn: 'Shenzhen Baoan Airport (SZX)',
    destinationPortAr: 'مطار صنعاء الدولي (اليمن)',
    destinationPortEn: 'Sanaa International Airport (SAH)',
    shippingType: 'AIR',
    containerNumber: 'AWB #772-9841029',
    vesselName: 'Air Cargo Flight ET-940',
    voyageNumber: 'FLIGHT 940',
    cbm: 1.8,
    weightKg: 290,
    packagesCount: 18,
    departureDate: '2026-10-30',
    estimatedArrival: '2026-11-05',
    currentStatus: 'out_for_delivery',
    progressPercent: 92,
    notesAr: 'الشحنة الجوية وصلت وتم التخليص، الشاحنة في طريقها للتسليم المباشر في شارع صخر - صنعاء.',
    notesEn: 'Air cargo cleared through customs; delivery van en route to client premises in Sakhar St, Sanaa.',
    steps: [
      {
        id: 'step-1',
        titleAr: 'استلام وفحص فني في شنتشن',
        titleEn: 'Technical Inspection in Shenzhen',
        locationAr: 'مستودع التكنولوجيا - شنتشن',
        locationEn: 'Tech Logistics Center - Shenzhen',
        date: '2026-10-28',
        time: '11:00',
        completed: true,
        current: false,
        descriptionAr: 'فحص الشاشات والتأكد من التغليف المقاوم للصدمات والشحن الجوي الآمن.',
        descriptionEn: 'Electronic component testing and anti-static bubble packaging applied.'
      },
      {
        id: 'step-2',
        titleAr: 'إقلاع رحلة الشحن الجوي',
        titleEn: 'Air Freight Departure',
        locationAr: 'مطار شنتشن (SZX)',
        locationEn: 'Shenzhen Airport (SZX)',
        date: '2026-10-30',
        time: '23:45',
        completed: true,
        current: false,
        descriptionAr: 'شحن الطرود على متن رحلة الشحن الجوي المتجهة للشرق الأوسط.',
        descriptionEn: 'Loaded onto express cargo freighter via transit hub.'
      },
      {
        id: 'step-3',
        titleAr: 'الوصول والتخليص بمطار صنعاء',
        titleEn: 'Arrival & Clearance at Sanaa Airport',
        locationAr: 'قرية البضائع - مطار صنعاء',
        locationEn: 'Cargo Village - Sanaa Airport',
        date: '2026-11-02',
        time: '15:20',
        completed: true,
        current: false,
        descriptionAr: 'إنهاء التخليص الجمركي واستلام الطرود فوراً.',
        descriptionEn: 'Customs cleared and hand-over receipt completed.'
      },
      {
        id: 'step-4',
        titleAr: 'جاري التوصيل لباب العميل',
        titleEn: 'Out for Immediate Delivery',
        locationAr: 'صنعاء - شارع صخر التجاري',
        locationEn: 'Sanaa Commercial District',
        date: '2026-11-03',
        time: '14:00',
        completed: true,
        current: true,
        descriptionAr: 'سيارة التوصيل متوجهة لمقر الشركة والتسليم خلال ساعتين.',
        descriptionEn: 'Courier dispatch van delivering to client retail center.'
      }
    ]
  },
  {
    id: 'SMC-10842',
    trackingNumber: 'SMC-10842',
    blNumber: 'CMA-YEM-77210',
    customerName: 'مؤسسة حضرموت لمواد البناء والسيراميك (المكلا)',
    customerPhone: '+967 777 554 433',
    cargoTypeAr: 'بلاط سيراميك وديكورات رخامية (حاوية 20 قدم)',
    cargoTypeEn: 'Ceramic Tiles & Marble Finishes (20ft FCL)',
    originPortAr: 'ميناء فوشان / شنتشن (الصين)',
    originPortEn: 'Foshan / Shenzhen Port (China)',
    destinationPortAr: 'ميناء المكلا التجاري (اليمن)',
    destinationPortEn: 'Mukalla Port (Yemen)',
    shippingType: 'FCL',
    containerNumber: 'CMAU-5521901 (20ft Box)',
    vesselName: 'CMA CGM RED SEA EXPRESS',
    voyageNumber: 'V.8809',
    cbm: 28.0,
    weightKg: 26500,
    packagesCount: 820,
    departureDate: '2026-09-25',
    estimatedArrival: '2026-10-22',
    currentStatus: 'delivered',
    progressPercent: 100,
    notesAr: 'تم تفريغ الحاوية بنجاح وتسليمها بالكامل للمستودع في مدينة المكلا بحالة ممتازة وبدون أي كسر.',
    notesEn: 'Consignment successfully cleared and offloaded at client warehouse in Mukalla with zero damage.',
    steps: [
      {
        id: 'step-1',
        titleAr: 'التحميل بمصانع فوشان بالصين',
        titleEn: 'Factory Loading in Foshan',
        locationAr: 'فوشان - كوانغدونغ',
        locationEn: 'Foshan, Guangdong',
        date: '2026-09-21',
        time: '10:00',
        completed: true,
        current: false,
        descriptionAr: 'تحميل البلاط وفحص المتانة ومقاومة الكسر.',
        descriptionEn: 'Ceramic pallets inspected and crated.'
      },
      {
        id: 'step-2',
        titleAr: 'إبحار الحاوية من شنتشن',
        titleEn: 'Sailed from Shenzhen',
        locationAr: 'ميناء شنتشن',
        locationEn: 'Shenzhen Port',
        date: '2026-09-25',
        time: '18:00',
        completed: true,
        current: false,
        descriptionAr: 'انطلاق الرحلة البحرية المباشرة.',
        descriptionEn: 'Ocean voyage initiated.'
      },
      {
        id: 'step-3',
        titleAr: 'الوصول لميناء المكلا والتخليص',
        titleEn: 'Discharge at Mukalla Port',
        locationAr: 'ميناء المكلا',
        locationEn: 'Mukalla Port',
        date: '2026-10-20',
        time: '12:00',
        completed: true,
        current: false,
        descriptionAr: 'تفريغ الحاوية والتخليص الجمركي في ميناء المكلا.',
        descriptionEn: 'Berthing and fast customs clearance.'
      },
      {
        id: 'step-4',
        titleAr: 'تم التسليم بنجاح',
        titleEn: 'Delivered Successfully',
        locationAr: 'المكلا - حضرموت',
        locationEn: 'Mukalla, Hadramout',
        date: '2026-10-22',
        time: '16:00',
        completed: true,
        current: false,
        descriptionAr: 'استلام كامل الكمية 820 كرتون والتوقيع على بوليصة الاستلام.',
        descriptionEn: 'Full 820 cartons received in mint condition.'
      }
    ]
  }
];

export const INITIAL_QUOTE_REQUESTS: ShippingQuoteRequest[] = [
  {
    id: 'REQ-2026-8812',
    date: '2026-11-03 14:15',
    clientName: 'أحمد علي السعدي',
    companyName: 'مؤسسة السعدي للأجهزة المنزلية',
    phone: '+967 775 123 456',
    whatsapp: '+967 775 123 456',
    email: 'saadi.appliances@gmail.com',
    serviceType: 'sea_fcl',
    originCity: 'كوانزو / فوشان (الصين)',
    destinationCity: 'عدن (ميناء الحاويات)',
    cargoDescription: 'أجهزة ميكروويف وخلاطات وأفران كهربائية - 1 حاوية 40 قدم HQ',
    estimatedVolume: '1x 40HQ (68 CBM)',
    estimatedWeight: '14,500 كجم',
    needsInspection: true,
    needsCustomsClearance: true,
    status: 'pending',
    notes: 'نحتاج فحص الجودة وتأكيد شهادة المطابقة قبل الشحن من كوانزو.'
  },
  {
    id: 'REQ-2026-8809',
    date: '2026-11-02 11:30',
    clientName: 'طارق عبدالكريم المخلافي',
    companyName: 'المخلافي للتجارة والاستيراد',
    phone: '+967 733 445 566',
    whatsapp: '+967 733 445 566',
    email: 'tareq.mokh@outlook.com',
    serviceType: 'sea_lcl',
    originCity: 'إيوو (سوق الفوتيان)',
    destinationCity: 'صنعاء (تخليص ميناء عدن والتوصيل لصنعاء)',
    cargoDescription: 'إكسسوارات وهدايا وأدوات مكتبية متنوعة من عدة محلات بإيوو',
    estimatedVolume: '8.5 CBM',
    estimatedWeight: '2,200 كجم',
    needsInspection: false,
    needsCustomsClearance: true,
    status: 'quoted',
    notes: 'تم إرسال عرض السعر بقيمة 1,870 دولار شاملاً التجميع والشحن والتخليص.'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'china-gz',
    country: 'china',
    cityAr: 'كوانزو (Guangzhou)',
    cityEn: 'Guangzhou',
    titleAr: 'مكتب ومستودع كوانزو الرئيسي',
    titleEn: 'Guangzhou Central Office & Hub',
    addressAr: 'مقاطعة كوانغدونغ، حي باييون، شارع التجارة الدولية، برج الأعمال الصيني الطابق 14',
    addressEn: 'Baiyun District, Int’l Trade Ave, Tower B, 14th Floor, Guangzhou, China',
    phone: '+86 20 8892 1100',
    whatsapp: '+86 138 2210 9944',
    email: 'guangzhou@samacapital.ye',
    hoursAr: 'السبت - الخميس: 9:00 ص - 6:30 م (بتوقيت بكين)',
    hoursEn: 'Sat - Thu: 9:00 AM - 6:30 PM (Beijing Time)',
    isMain: true
  },
  {
    id: 'china-yiwu',
    country: 'china',
    cityAr: 'إيوو (Yiwu)',
    cityEn: 'Yiwu',
    titleAr: 'مكتب ومستودع تجميع إيوو',
    titleEn: 'Yiwu Consolidation Hub',
    addressAr: 'مدينة إيوو، مقاطعة تشجيانغ، بجوار مجمع فوتيان التجاري (المرحلة 3)، المستودع اللوجستي 12',
    addressEn: 'Near Futian Market District 3, Logistics Bay #12, Yiwu, Zhejiang, China',
    phone: '+86 579 8541 3320',
    whatsapp: '+86 139 5790 8821',
    email: 'yiwu@samacapital.ye',
    hoursAr: 'السبت - الخميس: 9:00 ص - 7:00 م',
    hoursEn: 'Sat - Thu: 9:00 AM - 7:00 PM',
    isMain: false
  },
  {
    id: 'yemen-aden',
    country: 'yemen',
    cityAr: 'عدن (Aden)',
    cityEn: 'Aden',
    titleAr: 'مكتب التخليص الرئيسي وميناء عدن',
    titleEn: 'Aden Seaport Operations & Clearing Hub',
    addressAr: 'عدن - المعلا، الشارع الرئيسي أمام البوابة الجمركية لميناء عدن، عمارة الأمل اللوجستية',
    addressEn: 'Main St, Near Port Customs Gate, Al-Mualla, Aden, Yemen',
    phone: '+967 2 245 880',
    whatsapp: '+967 777 912 345',
    email: 'aden@samacapital.ye',
    hoursAr: 'السبت - الخميس: 8:30 ص - 4:30 م',
    hoursEn: 'Sat - Thu: 8:30 AM - 4:30 PM',
    isMain: true
  },
  {
    id: 'yemen-sanaa',
    country: 'yemen',
    cityAr: 'صنعاء (Sanaa)',
    cityEn: 'Sanaa',
    titleAr: 'المكتب الإداري والتجاري - صنعاء',
    titleEn: 'Sanaa Executive & Commercial Center',
    addressAr: 'صنعاء - شارع الزبيري، تقاطع حدة، برج سما التجاري، الدور الرابع',
    addressEn: 'Al-Zubairi St / Hadda Intersection, Sama Commercial Tower, 4th Floor, Sanaa, Yemen',
    phone: '+967 1 450 120',
    whatsapp: '+967 771 889 900',
    email: 'sanaa@samacapital.ye',
    hoursAr: 'السبت - الخميس: 8:30 ص - 5:00 م',
    hoursEn: 'Sat - Thu: 8:30 AM - 5:00 PM',
    isMain: false
  },
  {
    id: 'yemen-mukalla',
    country: 'yemen',
    cityAr: 'المكلا - حضرموت',
    cityEn: 'Mukalla, Hadramout',
    titleAr: 'فرع ميناء المكلا وتجارة الساحل',
    titleEn: 'Mukalla Seaport Branch & Logistics',
    addressAr: 'المكلا - خور المكلا، بجانب رصيف الميناء التجاري، مبنى النور',
    addressEn: 'Corniche Al-Mukalla, Commercial Harbor Pier, Mukalla, Yemen',
    phone: '+967 5 310 990',
    whatsapp: '+967 773 224 455',
    email: 'mukalla@samacapital.ye',
    hoursAr: 'السبت - الخميس: 8:30 ص - 4:00 م',
    hoursEn: 'Sat - Thu: 8:30 AM - 4:00 PM',
    isMain: false
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    nameAr: 'الشيخ عبدالسلام القادري',
    nameEn: 'Sheikh Abdulsalam Al-Qadiri',
    roleAr: 'رئيس مجلس إدارة شركة القادري للأجهزة الإلكترونية - صنعاء',
    roleEn: 'Chairman, Al-Qadiri Electronics Co. - Sanaa',
    cityAr: 'صنعاء',
    cityEn: 'Sanaa',
    quoteAr: 'أتعامل مع سما كابيتال منذ أكثر من 4 سنوات في استيراد شاشات وأنظمة المراقبة من شنتشن. ميزتهم الكبرى هي الأمانة في فحص جودة المصانع الصينية قبل الشحن وسرعة التخليص بميناء عدن دون أي غرامات تأخير.',
    quoteEn: 'I have partnered with Sama Capital for over 4 years importing electronics from Shenzhen. Their outstanding value is meticulous pre-shipment QC in China and rapid customs discharge in Aden with zero demurrage fees.',
    volumeAr: 'أكثر من 30 حاوية سنوياً',
    volumeEn: '30+ Containers / Year',
    rating: 5
  },
  {
    id: 'test-2',
    nameAr: 'الأستاذ مروان باعبّاد',
    nameEn: 'Marwan Ba-Abbad',
    roleAr: 'مستورد مواد بناء وديكور - المكلا وسيئون',
    roleEn: 'Building Materials Importer - Mukalla & Seiyun',
    cityAr: 'حضرموت',
    cityEn: 'Hadramout',
    quoteAr: 'خدمة التجميع (LCL) في مستودع إيوو وفرت علي مبالغ طائلة. أشتري من 5 إلى 8 مصانع صينية مختلفة، وسما كابيتال تجمعها في كود واحد وتشحنها إلى ميناء المكلا مع تقرير فحص صور وفيديو لكل كرتون.',
    quoteEn: 'Their LCL consolidation hub in Yiwu saved us substantial overhead. We procure from 8 different Chinese suppliers; Sama Capital consolidates everything under one manifest and delivers directly to Mukalla Port.',
    volumeAr: 'شحن دوري شهري',
    volumeEn: 'Monthly Regular Cargo',
    rating: 5
  },
  {
    id: 'test-3',
    nameAr: 'م. فؤاد الشرجبي',
    nameEn: 'Eng. Fouad Al-Sharjabi',
    roleAr: 'مؤسس محلات الشرجبي للطاقة البديلة والمضخات - عدن وتعز',
    roleEn: 'Founder, Al-Sharjabi Solar & Pumping Systems - Aden & Taiz',
    cityAr: 'عدن',
    cityEn: 'Aden',
    quoteAr: 'الشحن البحري يحتاج شريكاً يفهم حساسية الألواح والبطاريات. لم نجد أفضل من سما كابيتال في التغليف الخشبي المتين وإدارة البواخر وإصدار بوالص الشحن الفورية ونظام التتبع الدقيق.',
    quoteEn: 'Handling solar panels requires specialized freight partners. Sama Capital’s heavy pallet protection, fast B/L issuance, and real-time container tracking make them second to none.',
    volumeAr: 'حاويات 40HQ متكررة',
    volumeEn: 'Frequent 40HQ Shipments',
    rating: 5
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    category: 'vessels',
    titleAr: 'سفينة حاويات سما كابيتال في عرض البحر نحو ميناء عدن',
    titleEn: 'Container Cargo Ship Sailing Toward Aden Port',
    locationAr: 'المحيط الهندي / خليج عدن',
    locationEn: 'Indian Ocean / Gulf of Aden',
    image: '/src/assets/images/hero_container_ship_1793753458110.jpg'
  },
  {
    id: 'gal-2',
    category: 'warehouses',
    titleAr: 'فرز وتجميع وتغليف البضائع بمستودع كوانزو المركزي',
    titleEn: 'Consolidation & Inspection Hub in Guangzhou',
    locationAr: 'كوانزو - الصين',
    locationEn: 'Guangzhou, China',
    image: '/src/assets/images/china_warehouse_logistics_1793753459683.jpg'
  },
  {
    id: 'gal-3',
    category: 'ports',
    titleAr: 'رافعات محطة الميناء وتفريغ الحاويات التجارية',
    titleEn: 'Quay Cranes Offloading Shipping Containers at Port',
    locationAr: 'رصيف الحاويات البحري',
    locationEn: 'Maritime Container Terminal Pier',
    image: '/src/assets/images/port_crane_unloading_1793753460504.jpg'
  },
  {
    id: 'gal-4',
    category: 'inspection',
    titleAr: 'فريق التخليص الجمركي وتدقيق شهادات الجودة والمطابقة',
    titleEn: 'Customs Clearance & Cargo Compliance Team',
    locationAr: 'ساحة المعاينة والتفتيش الجمركي',
    locationEn: 'Port Customs Inspection Area',
    image: '/src/assets/images/customs_inspection_cargo_1793753460824.jpg'
  }
];

export const FREIGHT_RATES = {
  // Rates in USD per CBM for LCL from China to Yemen ports
  seaLclBasePerCbm: 145, // $145 / CBM base freight
  seaFcl20ftBase: 2450, // $2450 per 20ft container
  seaFcl40ftBase: 3850, // $3850 per 40ft container
  seaFcl40hqBase: 4100, // $4100 per 40ft HQ container
  airExpressPerKg: 9.8, // $9.80 / kg air freight
  customsPerCbmEstimate: 45, // $45 / CBM port handling & clearance assistance
  customsFclEstimate: 550, // $550 per FCL container handling & clearance
};

export const SAILING_SCHEDULES = [
  {
    id: 'SCH-01',
    vesselName: 'COSCO ADEN VOYAGER',
    voyageNumber: 'V.2604W',
    originPortAr: 'ميناء نانشا - كوانزو (الصين)',
    originPortEn: 'Nansha Port, Guangzhou',
    destinationPortAr: 'محطة حاويات ميناء عدن (ACT)',
    destinationPortEn: 'Aden Container Terminal (ACT)',
    cargoCutoff: '2026-11-08',
    etd: '2026-11-12',
    eta: '2026-12-06',
    transitDays: 24,
    status: 'booking_open' as const,
    serviceType: 'Direct Maritime Express' as const
  },
  {
    id: 'SCH-02',
    vesselName: 'MSC YEMEN PRIDE',
    voyageNumber: 'V.1104E',
    originPortAr: 'ميناء نينغبو-تشوشان (الصين)',
    originPortEn: 'Ningbo-Zhoushan Port',
    destinationPortAr: 'ميناء عدن التجاري (اليمن)',
    destinationPortEn: 'Aden Commercial Port',
    cargoCutoff: '2026-11-14',
    etd: '2026-11-17',
    eta: '2026-12-12',
    transitDays: 25,
    status: 'filling_fast' as const,
    serviceType: 'Weekly Consolidation' as const
  },
  {
    id: 'SCH-03',
    vesselName: 'CMA CGM RED SEA EXPRESS',
    voyageNumber: 'V.8812',
    originPortAr: 'ميناء يانتيان - شنتشن (الصين)',
    originPortEn: 'Yantian Port, Shenzhen',
    destinationPortAr: 'ميناء الحديدة (اليمن)',
    destinationPortEn: 'Hodeidah Seaport',
    cargoCutoff: '2026-11-18',
    etd: '2026-11-21',
    eta: '2026-12-18',
    transitDays: 27,
    status: 'booking_open' as const,
    serviceType: 'Direct Maritime Express' as const
  },
  {
    id: 'SCH-04',
    vesselName: 'SAMA PACIFIC PHOENIX',
    voyageNumber: 'V.402A',
    originPortAr: 'ميناء شنغهاي الدولي (الصين)',
    originPortEn: 'Shanghai Port (SIPG)',
    destinationPortAr: 'ميناء المكلا - حضرموت (اليمن)',
    destinationPortEn: 'Mukalla Seaport, Hadramout',
    cargoCutoff: '2026-11-22',
    etd: '2026-11-26',
    eta: '2026-12-22',
    transitDays: 26,
    status: 'booking_open' as const,
    serviceType: 'Direct Maritime Express' as const
  }
];

export const CONTAINER_SPECS = [
  {
    code: '20GP',
    nameAr: 'حاوية جافة 20 قدم قياسية',
    nameEn: '20ft General Purpose Dry (20GP)',
    lengthM: '5.90 م',
    widthM: '2.35 م',
    heightM: '2.39 م',
    doorWidthM: '2.34 م',
    doorHeightM: '2.28 م',
    capacityCbm: 33.2,
    maxPayloadKg: 28180,
    tareWeightKg: 2300,
    recommendedForAr: 'البضائع الثقيلة عالية الكثافة مثل السيراميك، الحديد، البلاط، والآلات الصناعية الصغيرة.',
    recommendedForEn: 'Heavy, dense commodities like tiles, ceramics, metal hardware, and machinery.'
  },
  {
    code: '40GP',
    nameAr: 'حاوية جافة 40 قدم قياسية',
    nameEn: '40ft General Purpose Dry (40GP)',
    lengthM: '12.03 م',
    widthM: '2.35 م',
    heightM: '2.39 م',
    doorWidthM: '2.34 م',
    doorHeightM: '2.28 م',
    capacityCbm: 67.7,
    maxPayloadKg: 26680,
    tareWeightKg: 3800,
    recommendedForAr: 'البضائع العامة متوسطة الحجم والوزن مثل الملابس، المفروشات، الأدوات المنزلية، والقرطاسية.',
    recommendedForEn: 'Standard commercial consumer goods, textiles, stationery, and packaged merchandise.'
  },
  {
    code: '40HQ',
    nameAr: 'حاوية 40 قدم عالية السقف (High Cube)',
    nameEn: '40ft High Cube Dry (40HQ)',
    lengthM: '12.03 م',
    widthM: '2.35 م',
    heightM: '2.69 م',
    doorWidthM: '2.34 م',
    doorHeightM: '2.58 م',
    capacityCbm: 76.3,
    maxPayloadKg: 26580,
    tareWeightKg: 3900,
    recommendedForAr: 'الأكثر طلباً للتجارة بين الصين واليمن؛ مثالية للألواح الشمسية، الأجهزة الكهربائية، والأثاث.',
    recommendedForEn: 'Most preferred for China-Yemen trade; ideal for solar panels, electronics, and voluminous cargo.'
  },
  {
    code: '40RF',
    nameAr: 'حاوية 40 قدم مبردة (Reefer)',
    nameEn: '40ft Refrigerated Container (Reefer)',
    lengthM: '11.58 م',
    widthM: '2.29 م',
    heightM: '2.50 م',
    doorWidthM: '2.29 م',
    doorHeightM: '2.44 م',
    capacityCbm: 67.0,
    maxPayloadKg: 29500,
    tareWeightKg: 4500,
    recommendedForAr: 'البضائع الحساسة للحرارة؛ الأدوية والمستلزمات الطبية والمنتجات الغذائية المجمدة ذات التحكم الحراري.',
    recommendedForEn: 'Temperature-controlled pharmaceutical, chemical, and perishables freight.'
  }
];

export const EXCHANGE_RATES = [
  {
    pair: 'USD / CNY',
    rate: '7.245',
    change: '+0.12%',
    isPositive: true,
    labelAr: 'الدولار مقابل اليوان الصيني (RMB)',
    labelEn: 'US Dollar to Chinese Yuan (RMB)'
  },
  {
    pair: 'USD / YER (Aden)',
    rate: '1,860',
    change: 'مستقر',
    isPositive: true,
    labelAr: 'الدولار في عدن والمحافظات الجنوبية',
    labelEn: 'USD in Aden / Southern Ports'
  },
  {
    pair: 'USD / YER (Sanaa)',
    rate: '535',
    change: 'ثابت',
    isPositive: true,
    labelAr: 'الدولار في صنعاء والمحافظات الشمالية',
    labelEn: 'USD in Sanaa / Northern Hubs'
  },
  {
    pair: 'SAR / YER (Aden)',
    rate: '488',
    change: '+0.05%',
    isPositive: true,
    labelAr: 'الريال السعودي مقابل اليمني (عدن)',
    labelEn: 'Saudi Riyal to YER (Aden)'
  }
];

export const INITIAL_SECTIONS: SiteSectionConfig[] = [
  {
    id: 'hero',
    nameAr: 'الواجهة الرئيسية وشريط التحكم الملاحي',
    nameEn: 'Hero & Maritime Command Hub',
    titleAr: 'بوابتك الاحترافية للاستيراد من الصين والشحن الآمن إلى اليمن',
    titleEn: 'Your Premier Gateway for Importing from China & Safe Freight to Yemen',
    subtitleAr: 'سلسلة إمداد ولوجستيات متكاملة تبدأ من التفاوض وفحص الجودة بمصانع الصين، مروراً بالشحن البحري والجوي المنتظم، وحتى التخليص الجمركي والتسليم المباشر في موانئ ومدن اليمن وفق أعلى المعايير البحرية الدولية.',
    subtitleEn: 'Complete end-to-end maritime and air supply chains: supplier sourcing, pre-shipment quality auditing, scheduled liner freight, and expedited port customs clearance.',
    isEnabled: true,
    isCustom: false,
    order: 1
  },
  {
    id: 'tracking',
    nameAr: 'نظام تتبع الشحنات المباشر',
    nameEn: 'Live Cargo Tracking System',
    titleAr: 'منظومة تتبع الشحنات والحاويات البحرية والجوية',
    titleEn: 'Live Cargo & Container Tracking System',
    subtitleAr: 'استعلم عن حالة شحنتك وموقع الحاوية وسرعة الإبحار ومواعيد الوصول المؤكدة بدقة متناهية.',
    subtitleEn: 'Monitor your maritime or air shipment milestone-by-milestone with verified dates and arrival estimates.',
    isEnabled: true,
    isCustom: false,
    order: 2
  },
  {
    id: 'routes',
    nameAr: 'المسار الملاحي وجدول الرحلات البحرية',
    nameEn: 'Maritime Corridors & Schedules',
    titleAr: 'الممر التجاري الاستراتيجي بين الصين واليمن',
    titleEn: 'Strategic Maritime Corridors: China to Yemen',
    subtitleAr: 'رحلات شحن بحري وجوي منتظمة تربط أبرز الموانئ الصينية بالمنافذ اليمنية البحرية والجوية بكفاءة عالية.',
    subtitleEn: 'Scheduled ocean and express air routes connecting primary Chinese manufacturing hubs to Yemeni terminals.',
    isEnabled: true,
    isCustom: false,
    order: 3
  },
  {
    id: 'services',
    nameAr: 'خدمات الاستيراد والشحن الشاملة',
    nameEn: 'Core Capabilities & Services',
    titleAr: 'خدمات شاملة تغطي كافة مراحل الاستيراد والشحن',
    titleEn: 'Comprehensive Import & Maritime Freight Solutions',
    subtitleAr: 'باقة متطورة من الخدمات المصممة خصيصاً لتلبية متطلبات كبار المستوردين والشركات التجارية.',
    subtitleEn: 'Enterprise logistics capabilities tailored specifically for commercial importers.',
    isEnabled: true,
    isCustom: false,
    order: 4
  },
  {
    id: 'fleet',
    nameAr: 'أسطول الحاويات ودليل الجمارك',
    nameEn: 'Container Fleet & Customs Guide',
    titleAr: 'أسطول الحاويات والمواصفات الفنية القياسية',
    titleEn: 'Container Fleet Specifications & ISO Standards',
    subtitleAr: 'نوفر جميع فئات الحاويات البحرية الجافة والمبردة المصنفة وفق معايير المنظمة البحرية الدولية (IMO/ISO).',
    subtitleEn: 'Complete range of dry, high cube, and refrigerated containers compliant with IMO standards.',
    isEnabled: true,
    isCustom: false,
    order: 5
  },
  {
    id: 'calculator',
    nameAr: 'حاسبة الشحن التقديرية الذكية',
    nameEn: 'Freight Cost Calculator',
    titleAr: 'حاسبة الشحن التقديرية الذكية',
    titleEn: 'Intelligent Freight Cost Calculator',
    subtitleAr: 'احسب التكلفة التقديرية لشحنتك بين موانئ الصين واليمن بدقة وشفافية وفق تسعيرة السوق المعتمدة.',
    subtitleEn: 'Calculate an accurate shipping estimate between Chinese ports and Yemen with full transparency.',
    isEnabled: true,
    isCustom: false,
    order: 6
  },
  {
    id: 'steps',
    nameAr: 'دليل خطوات الاستيراد من الصين',
    nameEn: '5-Step Import Process',
    titleAr: 'رحلة شحنتك من مصانع الصين إلى متجرك في اليمن',
    titleEn: 'Your Shipment Journey: From Chinese Factories to Yemen',
    subtitleAr: 'مسار عمل موثق وشفاف يضمن لك رصد كافة مراحل الشحنة خطوة بخطوة.',
    subtitleEn: 'A structured, transparent roadmap keeping you informed at every milestone.',
    isEnabled: true,
    isCustom: false,
    order: 7
  },
  {
    id: 'about',
    nameAr: 'عن الشركة ومكاتب الصين واليمن',
    nameEn: 'About Us & Regional Hubs',
    titleAr: 'ريادة لوجستية تمنح تجارتك الأمان والتفوق',
    titleEn: 'Logistics Leadership Delivering Security & Growth',
    subtitleAr: 'تواجد ميداني قوي بفروع ومستودعات كوانزو وإيوو ومكاتب موانئ عدن وصنعاء والمكلا.',
    subtitleEn: 'Active presence with managed warehouses in Guangzhou, Yiwu, and seaport operations in Yemen.',
    isEnabled: true,
    isCustom: false,
    order: 8
  },
  {
    id: 'gallery',
    nameAr: 'معرض العمليات والأسطول',
    nameEn: 'Operations & Fleet Gallery',
    titleAr: 'عملياتنا الميدانية وأسطول الشحن',
    titleEn: 'Our Fleet & Ground Operations',
    subtitleAr: 'توثيق حي من مستودعات التجميع، أرصفة الموانئ، وسفن الحاويات المتجهة إلى اليمن.',
    subtitleEn: 'Visual documentation of our container vessels, warehouse consolidation, and seaport discharges.',
    isEnabled: true,
    isCustom: false,
    order: 9
  },
  {
    id: 'testimonials',
    nameAr: 'شهادات المستوردين والعملاء',
    nameEn: 'Client Endorsements',
    titleAr: 'ماذا يقول عملاؤنا ومستوردونا في اليمن؟',
    titleEn: 'What Importers in Yemen Say About Sama Capital',
    subtitleAr: 'نعتز بثقة كبرى الشركات والمؤسسات التجارية التي اعتمدت على سما كابيتال لنمو أعمالها.',
    subtitleEn: 'Trusted by hundreds of wholesale and retail merchants across Yemen.',
    isEnabled: true,
    isCustom: false,
    order: 10
  },
  {
    id: 'faq',
    nameAr: 'الأسئلة الشائعة والدليل التجاري',
    nameEn: 'Frequently Asked Questions & Guide',
    titleAr: 'الأسئلة الشائعة والدليل التجاري للاستيراد من الصين',
    titleEn: 'Frequently Asked Questions & Import Trade Guide',
    subtitleAr: 'إجابات مباشرة ودقيقة عن إجراءات الشحن، فحص الجودة في المصانع، التحويلات البنكية باليوان، والتخليص الجمركي في موانئ اليمن.',
    subtitleEn: 'Clear answers on shipping procedures, factory QC inspections, RMB settlement, and customs clearance.',
    isEnabled: true,
    isCustom: false,
    order: 11
  },
  {
    id: 'contact',
    nameAr: 'مركز الاتصال والتواصل المباشر',
    nameEn: 'Contact & Support Hub',
    titleAr: 'جاهزون للإجابة على استفساراتك وخدمة شحنتك',
    titleEn: 'We Are Ready to Assist Your Cargo Journey',
    subtitleAr: 'تواصل مع فريق الدعم والخبراء التجاريين عبر القنوات المباشرة أو قم بزيارة أحد مكاتبنا.',
    subtitleEn: 'Reach out to our logistics advisors via direct phone, WhatsApp, or visit any of our regional hubs.',
    isEnabled: true,
    isCustom: false,
    order: 12
  }
];

export const INITIAL_SETTINGS: CompanyGeneralSettings = {
  mainPhone: '+967 777 912 345',
  mainWhatsapp: '+967 777 912 345',
  mainEmail: 'info@samacapital.ye',
  emergencyContact: '+86 138 2210 9944',
  announcementBarTextAr: 'تنبيه ملاحي: فتح باب الحجز لرحلة COSCO المتجهة من ميناء نانشا إلى ميناء عدن (Cut-off: 8 نوفمبر).',
  announcementBarTextEn: 'Liner Notice: Booking open for COSCO sailing from Nansha to Aden Port.',
  showAnnouncementBar: false
};

export const AUTHORIZED_STAFF_MEMBERS: StaffUser[] = [
  {
    id: 'staff-01',
    name: 'المهندس عمار الجائفي',
    email: 'ammar@samacapital.ye',
    role: 'admin',
    department: 'الإدارة العامة والعمليات اللوجستية',
    badgeNumber: 'SMC-DIR-01'
  },
  {
    id: 'staff-02',
    name: 'الكابتن وليد الشرجبي',
    email: 'waleed@samacapital.ye',
    role: 'operations_manager',
    department: 'إدارة خطوط الملاحة والشحن البحري',
    badgeNumber: 'SMC-OPS-09'
  },
  {
    id: 'staff-03',
    name: 'الأستاذ سمير الحضرمي',
    email: 'samir@samacapital.ye',
    role: 'logistics_agent',
    department: 'المعاينة والتخليص الجمركي - ميناء عدن',
    badgeNumber: 'SMC-CUS-14'
  }
];
