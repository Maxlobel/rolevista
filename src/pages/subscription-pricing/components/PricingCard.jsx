import React from 'react';
import { Check, Crown, Star } from 'lucide-react';
import Button from 'components/ui/Button';

const PricingCard = ({ plan, billingCycle, onSelect }) => {
  const isPopular = plan.popular;
  const showSavings = billingCycle === 'annual' && plan.savings > 0;

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
      isPopular ? 'border-blue-500 scale-105' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
            <Crown className="h-4 w-4" />
            <span>Most Popular</span>
          </div>
        </div>
      )}
      
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-4">{plan.description}</p>
          
          <div className="flex items-center justify-center space-x-2">
            {showSavings && (
              <span className="text-lg text-gray-500 line-through">
                ${plan.originalPrice}
              </span>
            )}
            <span className="text-4xl font-bold text-gray-900">
              ${plan.price}
            </span>
            {plan.price > 0 && (
              <span className="text-gray-600">
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            )}
          </div>
          
          {showSavings && (
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save {plan.savings}%
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
          
          {plan.limitations?.map((limitation, index) => (
            <div key={index} className="flex items-start space-x-3 opacity-60">
              <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-gray-500 line-through">{limitation}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          className={`w-full py-3 font-semibold ${
            isPopular 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
              : ''
          }`}
          variant={plan.buttonVariant || 'primary'}
          onClick={onSelect}
        >
          {plan.buttonText}
        </Button>
        
        {plan.price > 0 && (
          <p className="text-center text-sm text-gray-500 mt-3">
            No commitment • Cancel anytime
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingCard;