import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PremiumUpgradeModal = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null;

  const premiumFeatures = [
    {
      icon: 'Zap',
      title: 'Priority Alerts',
      description: 'Get notified first for 90%+ fit matches'
    },
    {
      icon: 'Eye',
      title: 'Detailed Insights',
      description: 'See why you\'re a perfect fit for this role'
    },
    {
      icon: 'MessageCircle',
      title: 'AI Career Coach',
      description: 'Get personalized advice for applications'
    },
    {
      icon: 'FileText',
      title: 'Resume Optimizer',
      description: 'Tailor your resume for each application'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative p-6 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4"
            >
              <Icon name="X" size={20} />
            </Button>
            
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Crown" size={32} color="white" />
            </div>
            
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Unlock Premium Features
            </h2>
            <p className="text-text-secondary">
              This is a {job?.fitScore}% match! Get the full experience with Premium.
            </p>
          </div>

          {/* Features */}
          <div className="px-6 pb-6">
            <div className="space-y-4 mb-6">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={feature.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Pro Plan</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-text-primary">$99</span>
                  <span className="text-text-secondary">/month</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                Cancel anytime • 30-day money-back guarantee
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link to="/subscription-pricing">
                <Button variant="default" fullWidth className="text-lg py-3">
                  Upgrade to Pro
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                fullWidth 
                onClick={onClose}
                className="text-sm"
              >
                Continue with Free Plan
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>10k+ Users</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumUpgradeModal;