import React from 'react';
import { Crown, Lock, Zap, CheckCircle, Star } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PremiumUpgrade = () => {
  const premiumFeatures = [
    'Unlimited role recommendations',
    'Detailed personality insights',
    'Priority customer support',
    'Advanced skill analytics',
    'Salary negotiation guidance',
    'Direct recruiter connections'
  ];

  return (
    <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-warning/10 border-2 border-primary/20 rounded-lg p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4">
          <Crown className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Star className="w-12 h-12 text-accent" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Unlock Premium Features</h3>
            </div>
            <p className="text-muted-foreground">
              Get unlimited access to advanced career insights and personalized recommendations
            </p>
          </div>
          
          <div className="text-right">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              50% OFF
            </div>
            <div className="text-xs text-muted-foreground mt-1">Limited time</div>
          </div>
        </div>

        {/* Premium Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-success" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-foreground">$19</span>
                <span className="text-lg text-muted-foreground line-through">$39</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-success">Save $240/year</div>
              <div className="text-xs text-muted-foreground">vs monthly billing</div>
            </div>
          </div>
        </div>

        {/* Current Usage Limit */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center mt-0.5">
              <Lock className="w-3 h-3 text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">You've reached your monthly limit</h4>
              <p className="text-sm text-muted-foreground mb-2">
                You've viewed 5/5 detailed role analyses this month. Upgrade to see unlimited detailed insights.
              </p>
              <div className="w-full bg-warning/20 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>5 of 5 used</span>
                <span>Resets in 12 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1"
            iconName="Zap"
            iconPosition="left"
          >
            Upgrade to Premium
          </Button>
          
          <Button
            variant="outline"
            className="sm:w-auto"
          >
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">50K+</div>
            <div className="text-xs text-muted-foreground">Premium users</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">4.9★</div>
            <div className="text-xs text-muted-foreground">Average rating</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">87%</div>
            <div className="text-xs text-muted-foreground">Job success rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgrade;