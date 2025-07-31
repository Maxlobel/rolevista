import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingSection = () => {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for exploring your career options",
      features: [
        "Basic career assessment",
        "3 career recommendations",
        "Basic skill analysis",
        "Limited job matches",
        "Email support"
      ],
      cta: "Get Started Free",
      ctaVariant: "outline",
      popular: false,
      link: "/register"
    },
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Ideal for active job seekers",
      features: [
        "Complete AI career assessment",
        "Unlimited career recommendations",
        "Detailed skill gap analysis",
        "50 job matches per month",
        "Resume optimization tool",
        "Interview preparation",
        "Priority email support"
      ],
      cta: "Start 7-Day Trial",
      ctaVariant: "default",
      popular: true,
      link: "/subscription-pricing"
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "Complete career transformation package",
      features: [
        "Everything in Starter",
        "Unlimited AI career coaching",
        "Unlimited job matches",
        "Career path simulator",
        "Priority job alerts (90%+ fit)",
        "LinkedIn profile optimization",
        "1-on-1 career consultation",
        "24/7 priority support"
      ],
      cta: "Go Pro Now",
      ctaVariant: "default",
      popular: false,
      link: "/subscription-pricing"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Choose Your Career Journey
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Start free and upgrade when you're ready to accelerate your career transformation
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-card rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg ${
                tier.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Tier Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-text-secondary ml-2">
                    {tier.period}
                  </span>
                </div>
                <p className="text-text-secondary text-sm">
                  {tier.description}
                </p>
              </div>
              
              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Icon 
                      name="Check" 
                      size={16} 
                      color="var(--color-success)" 
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-text-secondary text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <Link to={tier.link} className="block">
                <Button 
                  variant={tier.ctaVariant}
                  size="lg"
                  fullWidth
                  className="font-semibold"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-text-secondary">
            <Icon name="Shield" size={20} color="var(--color-success)" />
            <span className="text-sm">30-day money-back guarantee on all paid plans</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;