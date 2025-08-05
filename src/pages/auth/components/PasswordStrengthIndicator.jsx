import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    {
      id: 'length',
      label: 'At least 8 characters',
      test: (pwd) => pwd.length >= 8
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      id: 'lowercase', 
      label: 'One lowercase letter',
      test: (pwd) => /[a-z]/.test(pwd)
    },
    {
      id: 'number',
      label: 'One number',
      test: (pwd) => /\d/.test(pwd)
    }
  ];

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: 'Enter a password' };
    
    const passed = requirements.filter(req => req.test(password)).length;
    
    if (passed === 4) return { level: 4, text: 'Strong password' };
    if (passed === 3) return { level: 3, text: 'Good password' };
    if (passed === 2) return { level: 2, text: 'Fair password' };
    if (passed === 1) return { level: 1, text: 'Weak password' };
    return { level: 0, text: 'Very weak password' };
  };

  const strength = getPasswordStrength();
  
  const getStrengthColor = () => {
    switch (strength.level) {
      case 4: return 'text-green-600';
      case 3: return 'text-blue-600';
      case 2: return 'text-yellow-600';
      case 1: return 'text-orange-600';
      default: return 'text-red-600';
    }
  };

  const getBarColor = () => {
    switch (strength.level) {
      case 4: return 'bg-green-500';
      case 3: return 'bg-blue-500';
      case 2: return 'bg-yellow-500';
      case 1: return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Password strength</span>
          <span className={`text-xs font-medium ${getStrengthColor()}`}>
            {strength.text}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-300 ${getBarColor()}`}
            style={{ width: `${(strength.level / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="space-y-1">
        {requirements.map((req) => {
          const isPassed = req.test(password);
          return (
            <div key={req.id} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                isPassed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-muted border border-border'
              }`}>
                {isPassed ? (
                  <Check size={10} />
                ) : (
                  <X size={10} className="text-text-secondary" />
                )}
              </div>
              <span className={`text-xs ${
                isPassed ? 'text-green-600' : 'text-text-secondary'
              }`}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator; 