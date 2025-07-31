import React from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = ({ onSocialRegister }) => {
  const socialOptions = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm text-text-secondary mb-4">Sign up with your professional account</p>
      </div>
      
      {socialOptions.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          fullWidth
          className={`${option.bgColor} ${option.textColor} ${option.borderColor} hover:opacity-90 transition-opacity duration-200`}
          onClick={() => onSocialRegister(option.id)}
          iconName={option.icon}
          iconPosition="left"
          iconSize={20}
        >
          Continue with {option.name}
        </Button>
      ))}
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary">or sign up with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;