import React from 'react';
import { Shield, Lock, Award, Headphones } from 'lucide-react';

const TrustSignals = () => {
  const trustItems = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: '30-Day Guarantee',
      description: 'Full money-back guarantee, no questions asked'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Industry Certified',
      description: 'Certified by leading career development organizations'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Expert support team available around the clock'
    }
  ];

  return (
    <div className="bg-white py-16 border-t border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-gray-600">
            Your career journey is secure with industry-leading protection and support
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-8 mt-12 pt-8 border-t">
          <div className="flex items-center space-x-2 text-gray-500">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-medium">GDPR Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium">SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;