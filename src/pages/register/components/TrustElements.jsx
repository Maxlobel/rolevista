import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustElements = () => {
  const trustStats = [
    { label: 'Active Users', value: '50,000+', icon: 'Users' },
    { label: 'Career Matches', value: '1M+', icon: 'Target' },
    { label: 'Success Rate', value: '94%', icon: 'TrendingUp' }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Found my dream job in 3 weeks using RoleVista\'s AI recommendations!",
      author: "Sarah M.",
      role: "Product Manager"
    },
    {
      id: 2,
      text: "The career assessment was spot-on. Finally found work I\'m passionate about.",
      author: "Michael R.",
      role: "UX Designer"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trust Statistics */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
        {trustStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-8 h-8 mx-auto mb-1 bg-primary/10 rounded-full">
              <Icon name={stat.icon} size={16} color="var(--color-primary)" />
            </div>
            <div className="text-lg font-semibold text-text-primary">{stat.value}</div>
            <div className="text-xs text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 py-2">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-xs text-text-secondary">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="text-xs text-text-secondary">256-bit Encryption</span>
        </div>
      </div>

      {/* Testimonial Snippet */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Quote" size={14} color="white" />
          </div>
          <div>
            <p className="text-sm text-text-primary italic mb-2">
              "{testimonials[0].text}"
            </p>
            <div className="text-xs text-text-secondary">
              <span className="font-medium">{testimonials[0].author}</span> • {testimonials[0].role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustElements;