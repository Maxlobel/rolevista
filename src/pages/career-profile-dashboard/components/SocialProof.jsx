import React from 'react';
import { Star, TrendingUp, Users, Award, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Michael Torres',
      role: 'Data Scientist at Google',
      avatar: null,
      quote: 'RoleVista helped me identify my passion for machine learning. I landed my dream job within 3 months!',
      rating: 5
    },
    {
      id: 2,
      name: 'Jennifer Kim',
      role: 'Product Manager at Spotify',
      avatar: null,
      quote: 'The career insights were spot-on. I discovered skills I never knew I had and found the perfect role.',
      rating: 5
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'UX Designer at Airbnb',
      avatar: null,
      quote: 'Transitioned from marketing to design thanks to RoleVista. The personality assessment was a game-changer.',
      rating: 5
    }
  ];

  const successStats = [
    {
      icon: Users,
      value: '250K+',
      label: 'Professionals helped',
      color: 'primary'
    },
    {
      icon: TrendingUp,
      value: '89%',
      label: 'Career satisfaction increase',
      color: 'success'
    },
    {
      icon: Award,
      value: '72%',
      label: 'Salary improvement',
      color: 'warning'
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'User satisfaction',
      color: 'accent'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'primary': return 'text-primary bg-primary/10';
      case 'success': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'accent': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground mb-2">Join Thousands of Success Stories</h2>
          <p className="text-muted-foreground">
            See how RoleVista has transformed careers across industries
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {successStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-3 ${getIconColor(stat.color)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Testimonials */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">What Our Users Say</h3>
          <p className="text-muted-foreground">Real stories from real professionals</p>
        </div>

        {/* Mobile: Scrollable Cards */}
        <div className="lg:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-none w-80 bg-card border border-border rounded-lg p-6 snap-start">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <Quote className="w-6 h-6 text-muted-foreground/30 absolute -top-2 -left-2" />
                    <p className="text-sm text-foreground italic pl-4">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <span className="text-white font-medium text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="w-6 h-6 text-muted-foreground/30 absolute -top-2 -left-2" />
                  <p className="text-sm text-foreground italic pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    {testimonial.avatar ? (
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <span className="text-white font-medium text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Transform Your Career?</h3>
        <p className="text-muted-foreground mb-4">
          Join thousands of professionals who have already discovered their ideal career path
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Start Your Journey
          </button>
          <button className="px-6 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;