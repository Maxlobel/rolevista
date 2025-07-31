import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    { id: 'length', text: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { id: 'uppercase', text: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', text: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { id: 'number', text: 'One number', test: (pwd) => /\d/.test(pwd) },
    { id: 'special', text: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const getStrengthScore = () => {
    return requirements.filter(req => req.test(password)).length;
  };

  const getStrengthLevel = () => {
    const score = getStrengthScore();
    if (score <= 1) return { level: 'Weak', color: 'bg-red-500', textColor: 'text-red-600' };
    if (score <= 3) return { level: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    if (score <= 4) return { level: 'Good', color: 'bg-blue-500', textColor: 'text-blue-600' };
    return { level: 'Strong', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const strength = getStrengthLevel();
  const score = getStrengthScore();

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Password strength</span>
          <span className={`text-sm font-medium ${strength.textColor}`}>{strength.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(score / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1">
        {requirements.map((req) => {
          const isValid = req.test(password);
          return (
            <div key={req.id} className="flex items-center space-x-2">
              <div className={`flex items-center justify-center w-4 h-4 rounded-full ${
                isValid ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {isValid && <Icon name="Check" size={10} color="white" />}
              </div>
              <span className={`text-xs ${
                isValid ? 'text-green-600' : 'text-text-secondary'
              }`}>
                {req.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;