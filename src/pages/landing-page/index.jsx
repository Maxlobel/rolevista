import React from 'react';
import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';
import SocialProofSection from './components/SocialProofSection';
import FooterSection from './components/FooterSection';
import ExitIntentModal from './components/ExitIntentModal';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SocialProofSection />
        <PricingSection />
      </main>
      <FooterSection />
      <ExitIntentModal />
    </div>
  );
};

export default LandingPage;