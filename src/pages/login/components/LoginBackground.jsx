import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBackground = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Icon name="Target" size={120} color="var(--color-primary)" />
        </div>
        <div className="absolute top-40 right-32">
          <Icon name="TrendingUp" size={80} color="var(--color-accent)" />
        </div>
        <div className="absolute bottom-40 left-32">
          <Icon name="Brain" size={100} color="var(--color-primary)" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Icon name="MessageCircle" size={90} color="var(--color-accent)" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-16 relative z-10">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Find the job you're meant for in 30 days or less
          </h2>
          
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Join thousands of professionals who discovered their ideal career path through our AI-powered assessment and personalized job matching.
          </p>

          {/* Success Stats */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-xl">
                <Icon name="Users" size={24} color="var(--color-success)" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">50,000+ Users</p>
                <p className="text-sm text-text-secondary">Found their dream job</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                <Icon name="Award" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">94% Success Rate</p>
                <p className="text-sm text-text-secondary">Career satisfaction improvement</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
                <Icon name="Clock" size={24} color="var(--color-accent)" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">Average 23 Days</p>
                <p className="text-sm text-text-secondary">To land ideal role</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-surface/50 backdrop-blur-sm rounded-2xl border border-border/50">
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={16} color="#F59E0B" />
              ))}
            </div>
            <p className="text-text-secondary italic mb-4">
              "RoleVista helped me transition from marketing to UX design. The AI assessment was spot-on, and I landed my dream job in just 3 weeks!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-text-primary">Sarah Chen</p>
                <p className="text-sm text-text-secondary">UX Designer at Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBackground;