import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/ui/Button';
import Icon from '@components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
          Find the job you're meant for in{' '}
          <span className="text-primary">30 days or less</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover your ideal career path through AI-powered assessments based on Ikigai principles. 
          Bridge the gap between what you love, what you're good at, and what pays well.
        </p>
        
        {/* CTA Button */}
        <div className="mb-12">
          <Link to="/ai-career-assessment">
            <Button 
              variant="default" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Start Free Assessment
            </Button>
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} color="var(--color-primary)" />
            <span className="text-sm">Takes only 10 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
            <span className="text-sm">100% Free to start</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} color="var(--color-primary)" />
            <span className="text-sm">50,000+ careers matched</span>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroSection;