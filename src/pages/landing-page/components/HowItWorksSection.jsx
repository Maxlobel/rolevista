import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      icon: "Brain",
      title: "Take AI Assessment",
      description: "Complete our 10-minute AI-powered career assessment based on Ikigai principles. Answer questions about your skills, passions, and values.",
      color: "var(--color-primary)"
    },
    {
      step: 2,
      icon: "Target",
      title: "Get Personalized Matches",
      description: "Receive your top 5 career recommendations with detailed fit scores and explanations of why each role suits your unique profile.",
      color: "var(--color-success)"
    },
    {
      step: 3,
      icon: "TrendingUp",
      title: "Analyze Skill Gaps",
      description: "Discover exactly which skills you need to develop with our color-coded heatmap and get personalized learning recommendations.",
      color: "var(--color-warning)"
    },
    {
      step: 4,
      icon: "Briefcase",
      title: "Find Your Dream Job",
      description: "Browse curated job matches, optimize your resume, and get AI coaching to land interviews at companies that value your strengths.",
      color: "var(--color-accent)"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            How RoleVista Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Our AI-powered platform guides you through a proven 4-step process to discover and land your ideal career
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border transform translate-x-4 -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2">
                    <Icon name="ChevronRight" size={16} color="var(--color-border)" />
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-border z-10">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 mt-4 bg-muted rounded-full flex items-center justify-center">
                  <Icon name={step.icon} size={28} color={step.color} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-text-secondary mb-4">
            <Icon name="Clock" size={16} />
            <span className="text-sm">Get started in less than 10 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;