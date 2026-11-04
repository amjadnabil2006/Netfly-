export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';

export type ShipmentStatus = 
  | 'received_china_warehouse'
  | 'customs_china'
  | 'container_loaded'
  | 'sailing_ocean'
  | 'arrived_yemen_port'
  | 'customs_yemen'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingStep {
  id: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  date: string;
  time: string;
  completed: boolean;
  current: boolean;
  descriptionAr: string;
  descriptionEn: string;
}

export interface Shipment {
  id: string; // e.g. SMC-84920
  trackingNumber: string;
  blNumber: string; // Bill of Lading
  customerName: string;
  customerPhone?: string;
  cargoTypeAr: string;
  cargoTypeEn: string;
  originPortAr: string;
  originPortEn: string;
  destinationPortAr: string;
  destinationPortEn: string;
  shippingType: 'FCL' | 'LCL' | 'AIR';
  containerNumber?: string;
  vesselName?: string;
  voyageNumber?: string;
  cbm?: number;
  weightKg?: number;
  packagesCount: number;
  departureDate: string;
  estimatedArrival: string;
  currentStatus: ShipmentStatus;
  progressPercent: number;
  steps: TrackingStep[];
  notesAr?: string;
  notesEn?: string;
}

export interface ShippingQuoteRequest {
  id: string;
  date: string;
  clientName: string;
  companyName?: string;
  phone: string;
  whatsapp: string;
  email?: string;
  serviceType: 'sea_fcl' | 'sea_lcl' | 'air_express' | 'commercial_procurement' | 'customs_clearance';
  originCity: string;
  destinationCity: string;
  cargoDescription: string;
  estimatedVolume?: string; // e.g. 5 CBM or 20ft container
  estimatedWeight?: string;
  needsInspection: boolean;
  needsCustomsClearance: boolean;
  status: 'pending' | 'contacted' | 'quoted' | 'approved';
  notes?: string;
}

export interface OfficeLocation {
  id: string;
  country: 'china' | 'yemen';
  cityAr: string;
  cityEn: string;
  titleAr: string;
  titleEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  whatsapp: string;
  email: string;
  hoursAr: string;
  hoursEn: string;
  isMain?: boolean;
}

export interface SailingSchedule {
  id: string;
  vesselName: string;
  voyageNumber: string;
  originPortAr: string;
  originPortEn: string;
  destinationPortAr: string;
  destinationPortEn: string;
  cargoCutoff: string;
  etd: string;
  eta: string;
  transitDays: number;
  status: 'booking_open' | 'filling_fast' | 'departed' | 'arriving_soon';
  serviceType: 'Direct Maritime Express' | 'Weekly Consolidation';
}

export interface ContainerSpec {
  code: string;
  nameAr: string;
  nameEn: string;
  lengthM: string;
  widthM: string;
  heightM: string;
  doorWidthM: string;
  doorHeightM: string;
  capacityCbm: number;
  maxPayloadKg: number;
  tareWeightKg: number;
  recommendedForAr: string;
  recommendedForEn: string;
}

export interface ExchangeRate {
  pair: string;
  rate: string;
  change: string;
  isPositive: boolean;
  labelAr: string;
  labelEn: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operations_manager' | 'logistics_agent';
  department: string;
  badgeNumber: string;
}

export interface SiteSectionConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  isEnabled: boolean;
  isCustom?: boolean;
  order: number;
  customBadgeAr?: string;
  customBadgeEn?: string;
  customContentAr?: string;
  customContentEn?: string;
  customCtaTextAr?: string;
  customCtaTextEn?: string;
  customCtaLink?: string;
  customStyle?: 'card' | 'banner' | 'features' | 'alert';
}

export interface CompanyGeneralSettings {
  mainPhone: string;
  mainWhatsapp: string;
  mainEmail: string;
  emergencyContact: string;
  announcementBarTextAr: string;
  announcementBarTextEn: string;
  showAnnouncementBar: boolean;
}
