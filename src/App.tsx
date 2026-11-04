import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MaritimeRoutesSection } from './components/MaritimeRoutesSection';
import { ContainerFleetSection } from './components/ContainerFleetSection';
import { TrackingSection } from './components/TrackingSection';
import { ServicesSection } from './components/ServicesSection';
import { CalculatorSection } from './components/CalculatorSection';
import { StepsSection } from './components/StepsSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { CustomSectionRenderer } from './components/CustomSectionRenderer';
import { OrderModal } from './components/OrderModal';
import { AdminPortal } from './components/AdminPortal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { 
  INITIAL_SHIPMENTS, 
  INITIAL_QUOTE_REQUESTS, 
  INITIAL_SECTIONS, 
  INITIAL_SETTINGS 
} from './mockData';
import { 
  Shipment, 
  ShippingQuoteRequest, 
  SailingSchedule, 
  SiteSectionConfig, 
  CompanyGeneralSettings 
} from './types';

function MainLayout() {
  // Persistence for shipments
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    const saved = localStorage.getItem('sama_capital_shipments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved shipments', e);
      }
    }
    return INITIAL_SHIPMENTS;
  });

  // Persistence for quote requests
  const [quoteRequests, setQuoteRequests] = useState<ShippingQuoteRequest[]>(() => {
    const saved = localStorage.getItem('sama_capital_quotes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved quotes', e);
      }
    }
    return INITIAL_QUOTE_REQUESTS;
  });

  // Persistence for dynamic site sections (CMS)
  const [sections, setSections] = useState<SiteSectionConfig[]>(() => {
    const saved = localStorage.getItem('sama_capital_sections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved sections', e);
      }
    }
    return INITIAL_SECTIONS;
  });

  // Persistence for general company settings & announcement bar
  const [settings, setSettings] = useState<CompanyGeneralSettings>(() => {
    const saved = localStorage.getItem('sama_capital_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
    return INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('sama_capital_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('sama_capital_quotes', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    localStorage.setItem('sama_capital_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('sama_capital_settings', JSON.stringify(settings));
  }, [settings]);

  // Modals & triggers
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [initialServiceForModal, setInitialServiceForModal] = useState<string | undefined>(undefined);
  const [initialCalcDataForModal, setInitialCalcDataForModal] = useState<any | null>(null);
  const [searchTrackingCode, setSearchTrackingCode] = useState<string>('');

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearchTrack = (code: string) => {
    setSearchTrackingCode(code);
    handleNavigateSection('tracking');
  };

  const handleOpenOrderModal = () => {
    setInitialServiceForModal(undefined);
    setInitialCalcDataForModal(null);
    setIsOrderModalOpen(true);
  };

  const handleOpenOrderWithService = (serviceType: string) => {
    setInitialServiceForModal(serviceType);
    setInitialCalcDataForModal(null);
    setIsOrderModalOpen(true);
  };

  const handleProceedFromCalculator = (calcData: any) => {
    setInitialCalcDataForModal(calcData);
    setIsOrderModalOpen(true);
  };

  // Section CMS Handlers
  const handleUpdateSection = (updated: SiteSectionConfig) => {
    setSections(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleCreateSection = (newSec: SiteSectionConfig) => {
    setSections(prev => [...prev, newSec]);
  };

  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleReorderSections = (newSections: SiteSectionConfig[]) => {
    setSections(newSections);
  };

  const handleResetSections = () => {
    if (window.confirm('هل تريد استعادة ترتيب وأقسام الموقع الافتراضية؟')) {
      setSections(INITIAL_SECTIONS);
    }
  };

  // Admin shipment actions
  const handleUpdateShipment = (updated: Shipment) => {
    setShipments(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleCreateShipment = (created: Shipment) => {
    setShipments(prev => [created, ...prev]);
  };

  const handleDeleteShipment = (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id));
  };

  // Quote request actions
  const handleSubmitQuote = (newReq: ShippingQuoteRequest) => {
    setQuoteRequests(prev => [newReq, ...prev]);
  };

  const handleUpdateQuoteStatus = (id: string, newStatus: ShippingQuoteRequest['status']) => {
    setQuoteRequests(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  const handleBookSchedule = (schedule: SailingSchedule) => {
    setInitialCalcDataForModal({
      serviceType: 'sea_fcl',
      originCity: schedule.originPortAr,
      destinationCity: schedule.destinationPortAr,
      estimatedVolume: 'حاوية FCL على متن ' + schedule.vesselName,
      estimatedWeight: 'وفق قائمة التعبئة',
      needsInspection: true,
      needsCustomsClearance: true,
      estimatedCostUsd: 0
    });
    setIsOrderModalOpen(true);
  };

  const handleSelectContainer = (containerCode: string) => {
    setInitialCalcDataForModal({
      serviceType: 'sea_fcl',
      originCity: 'كوانزو / نينغبو',
      destinationCity: 'ميناء عدن الدولي',
      estimatedVolume: `حاوية ${containerCode}`,
      estimatedWeight: 'وفق سعة الحاوية',
      needsInspection: true,
      needsCustomsClearance: true,
      estimatedCostUsd: 0
    });
    setIsOrderModalOpen(true);
  };

  // Dynamic Section Rendering Mapper
  const renderSectionComponent = (sec: SiteSectionConfig) => {
    if (!sec.isEnabled) return null;

    if (sec.isCustom) {
      return (
        <CustomSectionRenderer
          key={sec.id}
          section={sec}
          onOpenOrderModal={handleOpenOrderModal}
        />
      );
    }

    switch (sec.id) {
      case 'hero':
        return (
          <Hero
            key="hero"
            onSearchTrack={handleHeroSearchTrack}
            onOpenOrderModal={handleOpenOrderModal}
            onNavigateSection={handleNavigateSection}
          />
        );
      case 'tracking':
        return (
          <TrackingSection
            key="tracking"
            shipments={shipments}
            initialSearchCode={searchTrackingCode}
            onOpenOrderModal={handleOpenOrderModal}
          />
        );
      case 'routes':
        return (
          <MaritimeRoutesSection
            key="routes"
            onBookSchedule={handleBookSchedule}
            onNavigateSection={handleNavigateSection}
          />
        );
      case 'services':
        return (
          <ServicesSection
            key="services"
            onOpenOrderModalWithService={handleOpenOrderWithService}
            onNavigateSection={handleNavigateSection}
          />
        );
      case 'fleet':
        return (
          <ContainerFleetSection
            key="fleet"
            onSelectContainer={handleSelectContainer}
          />
        );
      case 'calculator':
        return (
          <CalculatorSection
            key="calculator"
            onProceedToOrder={handleProceedFromCalculator}
          />
        );
      case 'steps':
        return (
          <StepsSection
            key="steps"
            onOpenOrderModal={handleOpenOrderModal}
          />
        );
      case 'about':
        return (
          <AboutSection key="about" />
        );
      case 'gallery':
        return (
          <GallerySection key="gallery" />
        );
      case 'testimonials':
        return (
          <TestimonialsSection key="testimonials" />
        );
      case 'faq':
        return (
          <FaqSection key="faq" />
        );
      case 'contact':
        return (
          <ContactSection key="contact" />
        );
      default:
        return (
          <CustomSectionRenderer
            key={sec.id}
            section={sec}
            onOpenOrderModal={handleOpenOrderModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Announcement Bar (Configurable from Admin CMS) */}
      <AnnouncementBar
        settings={settings}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenOrderModal={handleOpenOrderModal}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onNavigateSection={handleNavigateSection}
        sections={sections}
      />

      {/* Dynamic Main Sections Driven by CMS */}
      <main className="flex-1">
        {sections.map(sec => renderSectionComponent(sec))}
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating Direct WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Client Consignment & B/L Account Portal */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        shipments={shipments}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Order & Quotation Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialService={initialServiceForModal}
        initialCalcData={initialCalcDataForModal}
        onSubmitQuote={handleSubmitQuote}
      />

      {/* Admin Operations & Full CMS Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        shipments={shipments}
        onUpdateShipment={handleUpdateShipment}
        onCreateShipment={handleCreateShipment}
        onDeleteShipment={handleDeleteShipment}
        quoteRequests={quoteRequests}
        onUpdateQuoteStatus={handleUpdateQuoteStatus}
        sections={sections}
        onUpdateSection={handleUpdateSection}
        onCreateSection={handleCreateSection}
        onDeleteSection={handleDeleteSection}
        onReorderSections={handleReorderSections}
        onResetSections={handleResetSections}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
