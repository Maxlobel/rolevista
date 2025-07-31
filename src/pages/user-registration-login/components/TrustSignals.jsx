import React from 'react';
import { Shield, Users, Star } from 'lucide-react';

const TrustSignals = () => {
  const testimonials = [
    {
      name: "Alex Rodriguez",
      role: "Data Scientist at Meta", 
      content: "The career assessment was incredibly accurate. It helped me identify my strengths and transition into data science.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Product Manager at Google",
      content: "RoleVista\'s insights were game-changing. I discovered career paths I never considered before.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer at Tesla",
      content: "The AI-powered recommendations aligned perfectly with my interests and skills. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="mt-8 space-y-6">
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>50K+ Users</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4" />
          <span>4.9/5 Rating</span>
        </div>
      </div>

      {/* Testimonials Carousel (Mobile) */}
      <div className="lg:hidden">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              "{testimonials[0].content}"
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">{testimonials[0].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[0].role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Testimonials (Desktop) */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 gap-4">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full ${
                    index === 0 
                      ? 'bg-gradient-to-br from-green-400 to-blue-500' :'bg-gradient-to-br from-purple-400 to-pink-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;