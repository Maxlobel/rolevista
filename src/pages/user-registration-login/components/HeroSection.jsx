import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const successStories = [
    {
      id: 1,
      name: "Alex Thompson",
      before: "Retail Manager",
      after: "Data Analyst",
      company: "Netflix",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Jessica Park",
      before: "Teacher",
      after: "Product Manager",
      company: "Spotify",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "David Kim",
      before: "Accountant",
      after: "UX Designer",
      company: "Adobe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Content */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            Find the job you're
            <span className="block text-primary">meant for</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            AI-powered career intelligence that matches your skills, passions, and purpose with roles that pay well.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Clock" size={16} className="text-primary" />
            <span>30 days or less</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Brain" size={16} className="text-primary" />
            <span>AI-powered matching</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Target" size={16} className="text-primary" />
            <span>94% success rate</span>
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {successStories.map((story) => (
          <div key={story.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <Image
                src={story.image}
                alt={`${story.name} success story`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-text-primary">{story.name}</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-text-secondary">{story.before}</span>
                <Icon name="ArrowRight" size={14} className="text-primary" />
                <span className="text-primary font-medium">{story.after}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                <Icon name="Building" size={12} />
                <span>Now at {story.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="text-center space-y-4">
        <p className="text-sm text-text-secondary">Trusted by professionals at</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-lg font-semibold text-text-secondary">Google</div>
          <div className="text-lg font-semibold text-text-secondary">Microsoft</div>
          <div className="text-lg font-semibold text-text-secondary">Apple</div>
          <div className="text-lg font-semibold text-text-secondary">Netflix</div>
          <div className="text-lg font-semibold text-text-secondary">Spotify</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;