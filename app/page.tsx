import AudiencePaths from "@/components/sections/AudiencePaths";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import HowTheSwitchWorks from "@/components/sections/HowTheSwitchWorks";
import LcamTraining from "@/components/sections/LcamTraining";
import Leadership from "@/components/sections/Leadership";
import PortalCommunication from "@/components/sections/PortalCommunication";
import PropertyTypes from "@/components/sections/PropertyTypes";
import ProofStrip from "@/components/sections/ProofStrip";
import ResidentActions from "@/components/sections/ResidentActions";
import Resources from "@/components/sections/Resources";
import ServiceArea from "@/components/sections/ServiceArea";
import SiteFooter from "@/components/sections/SiteFooter";
import SiteHeader from "@/components/sections/SiteHeader";
import Testimonials from "@/components/sections/Testimonials";
import WhatsIncluded from "@/components/sections/WhatsIncluded";
import WhyBoardsSwitch from "@/components/sections/WhyBoardsSwitch";
import Motion from "@/components/ui/Motion";

export default function Home() {
  return (
    <div id="top">
      <header className="contents">
        <SiteHeader />
      </header>
      <main id="main">
        <Hero />
        <AudiencePaths />
        <ProofStrip />
        <WhyBoardsSwitch />
        <PropertyTypes />
        <WhatsIncluded />
        <HowTheSwitchWorks />
        <PortalCommunication />
        <Testimonials />
        <Leadership />
        <ResidentActions />
        <LcamTraining />
        <ServiceArea />
        <Resources />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <Motion />
    </div>
  );
}
