import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Check, Crown, Zap, Shield, Star, ArrowRight } from 'lucide-react';
import Button from 'components/ui/Button';
import PricingCard from './components/PricingCard';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import TrustSignals from './components/TrustSignals';

const SubscriptionPricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showExitModal, setShowExitModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      originalPrice: 0,
      description: 'Perfect for exploring our platform',
      features: [
        '1 Resume analysis per month',
        'Basic career assessment',
        'Limited job matches (5/month)',
        'Community support',
        'Basic profile creation'
      ],
      limitations: [
        'No AI coaching',
        'No premium templates',
        'Limited optimization suggestions'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline',
      popular: false
    },
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 49 : 39,
      originalPrice: billingCycle === 'monthly' ? 49 : 49,
      description: 'Ideal for active job seekers',
      features: [
        'Unlimited resume optimizations',
        'Advanced career assessment',
        'Unlimited job matches',
        'AI coaching (10 sessions/month)',
        'Premium resume templates',
        'ATS optimization',
        'Interview preparation basics',
        'Priority support'
      ],
      buttonText: 'Start 7-Day Free Trial',
      buttonVariant: 'primary',
      popular: true,
      savings: billingCycle === 'annual' ? 20 : 0
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingCycle === 'monthly' ? 99 : 79,
      originalPrice: billingCycle === 'monthly' ? 99 : 99,
      description: 'Complete career transformation',
      features: [
        'Everything in Starter',
        'Unlimited AI coaching',
        'Personal career strategist',
        'LinkedIn profile optimization',
        'Salary negotiation support',
        'Industry insider insights',
        'Custom career roadmap',
        'White-glove support',
        'Career transition guidance'
      ],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'primary',
      popular: false,
      savings: billingCycle === 'annual' ? 20 : 0
    }
  ];

  const addOns = [
    {
      id: 'resume-rewrite',
      name: 'Professional Resume Rewrite',
      price: 29,
      description: 'Expert writers craft your perfect resume',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'interview-prep',
      name: 'Interview Preparation Intensive',
      price: 49,
      description: 'Mock interviews and personalized feedback',
      icon: <Star className="h-5 w-5" />
    },
    {
      id: 'linkedin-overhaul',
      name: 'LinkedIn Profile Overhaul',
      price: 99,
      description: 'Complete LinkedIn optimization service',
      icon: <Crown className="h-5 w-5" />
    }
  ];

  const handlePlanSelect = (planId) => {
    if (planId === 'free') {
      // Handle free plan signup
      navigate('/dashboard');
    } else {
      // TODO: Implement payment processing for paid plans
      // Redirect to checkout
      navigate('/checkout', { 
        state: { 
          planId, 
          billingCycle 
        } 
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Subscription & Pricing - RoleVista AI</title>
        <meta name="description" content="Choose the perfect plan to accelerate your career with AI-powered insights and personalized coaching" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Career Growth Plan
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Unlock your career potential with AI-powered insights, personalized coaching, and expert guidance
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white/10 rounded-full p-1 backdrop-blur-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:text-blue-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
                  billingCycle === 'annual'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-white hover:text-blue-100'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                onSelect={() => handlePlanSelect(plan.id)}
              />
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supercharge Your Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Add professional services to accelerate your career transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {addon.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">${addon.price}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{addon.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <span>Add to Cart</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <TrustSignals />

        {/* Testimonials */}
        <TestimonialSection />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who've accelerated their careers with RoleVista AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>No long-term commitment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPricing;