import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PremiumFeaturePreview = ({ onUpgrade }) => {
  const premiumFeatures = [
    {
      icon: "MessageCircle",
      title: "Unlimited AI Career Coaching",
      description: "Get personalized career advice 24/7 from our AI coach",
      tier: "Pro"
    },
    {
      icon: "FileText",
      title: "AI Resume Optimizer",
      description: "Automatically tailor your resume for each job application",
      tier: "Starter"
    },
    {
      icon: "Target",
      title: "Priority Job Alerts",
      description: "Get notified first about 90%+ fit matches",
      tier: "Pro"
    },
    {
      icon: "TrendingUp",
      title: "Career Path Simulator",
      description: "Visualize your 1, 3, and 5-year career projections",
      tier: "Pro"
    }
  ];

  const getTierColor = (tier) => {
    return tier === 'Pro' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 relative overflow-hidden">
      {/* Blur overlay for premium effect */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-10"></div>
      
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Crown" size={24} className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-text-primary">Unlock Premium Features</h3>
          </div>
          <Button 
            variant="default" 
            size="sm"
            onClick={onUpgrade}
          >
            Upgrade Now
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-4 border border-white/50">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={18} color="white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-text-primary text-sm">{feature.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierColor(feature.tier)}`}>
                      {feature.tier}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-text-secondary mb-4">
            Join thousands of professionals who've accelerated their careers with RoleVista Pro
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>50,000+ users</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} />
              <span>85% success rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeaturePreview;