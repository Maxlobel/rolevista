import React from 'react';

const BillingToggle = ({ billingCycle, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="bg-muted rounded-full p-1 flex items-center">
        <button
          onClick={() => onToggle('monthly')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            billingCycle === 'monthly' ?'bg-surface text-text-primary shadow-sm' :'text-muted-foreground hover:text-text-primary'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onToggle('annual')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative ${
            billingCycle === 'annual' ?'bg-surface text-text-primary shadow-sm' :'text-muted-foreground hover:text-text-primary'
          }`}
        >
          Annual
          <span className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-0.5 rounded-full">
            20% off
          </span>
        </button>
      </div>
    </div>
  );
};

export default BillingToggle;