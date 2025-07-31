import React, { useState } from 'react';
import { X, Crown, Check, Star, Zap, Target, Brain, TrendingUp } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PremiumUpgradeModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      period: '/month',
      popular: true,
      features: [
        'Unlimited career assessments',
        '500+ job match recommendations',
        'Detailed skill gap analysis',
        'AI career coaching chat',
        'Resume optimization tool',
        'Priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$39',
      period: '/month',
      popular: false,
      features: [
        'Everything in Pro',
        'Weekly 1-on-1 coaching calls',
        'Custom learning pathways',
        'Industry insider insights',
        'Salary negotiation guidance',
        'Career pivot strategies'
      ]
    }
  ];

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, integrate with Stripe here
      // TODO: Implement payment processing
      
      // Close modal and redirect to success page
      onClose();
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">
                Unlock Your Career Potential
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Benefits Section */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Transform Your Career Journey
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized insights, job matches, and AI-powered guidance to accelerate your career growth.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Smart Job Matching</h4>
                  <p className="text-sm text-muted-foreground">500+ tailored opportunities</p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">AI Career Coach</h4>
                  <p className="text-sm text-muted-foreground">Personalized guidance</p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Skill Development</h4>
                  <p className="text-sm text-muted-foreground">Custom learning paths</p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Resume Optimizer</h4>
                  <p className="text-sm text-muted-foreground">ATS-friendly formats</p>
                </div>
              </div>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust Signals */}
            <div className="text-center text-sm text-muted-foreground mb-6">
              <div className="flex items-center justify-center space-x-4">
                <span>🔒 SSL Secured</span>
                <span>•</span>
                <span>💳 Cancel Anytime</span>
                <span>•</span>
                <span>🔄 30-Day Money Back</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isProcessing}
              >
                Maybe Later
              </Button>
              <Button
                onClick={handleUpgrade}
                className="flex-1"
                loading={isProcessing}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Upgrade to ${selectedPlan === 'pro' ? 'Pro' : 'Premium'}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeModal;