import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CourseRecommendations = ({ skill }) => {
  const [selectedProvider, setSelectedProvider] = useState('all');

  if (!skill) return null;

  const courses = [
    {
      id: 1,
      title: `Advanced ${skill.name} Masterclass`,
      provider: 'Coursera',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 45230,
      duration: '8 weeks',
      price: 79,
      originalPrice: 129,
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      features: ['Certificate included', 'Hands-on projects', 'Lifetime access', 'Mobile friendly'],
      affiliateLink: '#coursera-affiliate'
    },
    {
      id: 2,
      title: `Complete ${skill.name} Bootcamp 2024`,
      provider: 'Udemy',
      instructor: 'Mark Thompson',
      rating: 4.6,
      students: 89450,
      duration: '12 hours',
      price: 49,
      originalPrice: 199,
      level: 'Beginner to Advanced',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
      features: ['30-day money back', 'Downloadable resources', 'Q&A support', 'Practice exercises'],
      affiliateLink: '#udemy-affiliate'
    },
    {
      id: 3,
      title: `Professional ${skill.name} Certification`,
      provider: 'LinkedIn Learning',
      instructor: 'Jennifer Lee',
      rating: 4.7,
      students: 23180,
      duration: '6 weeks',
      price: 39,
      originalPrice: 59,
      level: 'Professional',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
      features: ['LinkedIn certificate', 'Industry recognized', 'Expert instruction', 'Career guidance'],
      affiliateLink: '#linkedin-affiliate'
    }
  ];

  const providers = ['all', 'Coursera', 'Udemy', 'LinkedIn Learning'];

  const filteredCourses = selectedProvider === 'all' 
    ? courses 
    : courses.filter(course => course.provider === selectedProvider);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Icon name="Star" size={14} className="text-yellow-400 fill-current opacity-50" />
        )}
        <span className="text-sm text-text-secondary ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4 sm:mb-0">
          Recommended Courses for {skill.name}
        </h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Filter by:</span>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {providers.map(provider => (
              <option key={provider} value={provider}>
                {provider === 'all' ? 'All Providers' : provider}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <Image 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  {course.provider}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-white text-text-primary px-2 py-1 rounded-full text-xs font-medium">
                  {course.level}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-text-secondary mb-3">by {course.instructor}</p>

              <div className="flex items-center justify-between mb-3">
                {renderStars(course.rating)}
                <span className="text-xs text-text-secondary">{course.students.toLocaleString()} students</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">${course.price}</span>
                  <span className="text-sm text-text-secondary line-through">${course.originalPrice}</span>
                </div>
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Clock" size={14} />
                  <span className="text-xs">{course.duration}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-xs text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                fullWidth 
                onClick={() => window.open(course.affiliateLink, '_blank')}
                className="mb-2"
              >
                Enroll Now
              </Button>
              
              <Button 
                variant="outline" 
                fullWidth
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Affiliate Partnership Notice</h4>
            <p className="text-sm text-blue-800">
              We earn a commission from course purchases through our affiliate links. This helps us provide free career guidance while supporting your learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;