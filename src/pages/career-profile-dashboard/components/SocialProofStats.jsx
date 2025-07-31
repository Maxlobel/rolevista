import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialProofStats = () => {
  const stats = [
    {
      icon: "Users",
      value: "50,000+",
      label: "Active Users",
      description: "Professionals using RoleVista"
    },
    {
      icon: "Target",
      value: "85%",
      label: "Success Rate",
      description: "Users find their ideal role"
    },
    {
      icon: "Star",
      value: "4.9/5",
      label: "User Rating",
      description: "Average satisfaction score"
    },
    {
      icon: "TrendingUp",
      value: "73%",
      label: "Salary Increase",
      description: "Average improvement"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager at Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "RoleVista helped me transition from marketing to product management. The AI assessment was spot-on!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Senior Developer at Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The skill gap analysis showed me exactly what to focus on. Got my dream job within 2 months!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Data Scientist at Netflix",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The AI coach feature is incredible. It\'s like having a personal career mentor available 24/7.",
      rating: 5
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-semibold text-text-primary mb-6">Success Stories</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 mx-auto mb-3 bg-primary rounded-full flex items-center justify-center">
              <Icon name={stat.icon} size={20} color="white" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-text-primary mb-1">{stat.label}</div>
            <div className="text-xs text-text-secondary">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">What Our Users Say</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary text-sm">{testimonial.name}</h5>
                  <p className="text-xs text-text-secondary">{testimonial.role}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-text-secondary italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofStats;