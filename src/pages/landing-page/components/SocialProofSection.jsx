import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `RoleVista's AI assessment was incredibly accurate. It identified my passion for problem-solving and recommended software engineering roles I hadn't considered. Within 3 weeks, I landed my dream job at Google!`,
      rating: 5,
      outcome: "Landed dream job in 3 weeks"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Product Manager at Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The career path simulator showed me exactly where I could be in 5 years. The skill gap analysis helped me focus on the right areas. I transitioned from sales to product management successfully.`,
      rating: 5,
      outcome: "Successful career transition"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer at Airbnb",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `The AI coach feature was like having a personal career mentor 24/7. It helped me prepare for interviews and negotiate my salary. I increased my income by 40% in my new role!`,
      rating: 5,
      outcome: "40% salary increase"
    }
  ];

  const successMetrics = [
    {
      icon: "Users",
      value: "50,000+",
      label: "Careers Matched",
      color: "var(--color-primary)"
    },
    {
      icon: "TrendingUp",
      value: "87%",
      label: "Success Rate",
      color: "var(--color-success)"
    },
    {
      icon: "Clock",
      value: "23 days",
      label: "Average Time to Hire",
      color: "var(--color-warning)"
    },
    {
      icon: "DollarSign",
      value: "$15K",
      label: "Average Salary Increase",
      color: "var(--color-accent)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "var(--color-warning)" : "var(--color-muted)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <section id="social-proof" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-card rounded-full mb-4 shadow-sm">
                <Icon name={metric.icon} size={24} color={metric.color} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                {metric.value}
              </div>
              <div className="text-text-secondary text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of professionals who found their perfect career match
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 sm:p-12 shadow-lg">
            <div className="text-center">
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              {/* Content */}
              <blockquote className="text-lg sm:text-xl text-text-primary mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Author */}
              <div className="mb-4">
                <div className="font-semibold text-text-primary">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-text-secondary text-sm">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>

              {/* Outcome Badge */}
              <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="CheckCircle" size={16} />
                <span>{testimonials[currentTestimonial].outcome}</span>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-primary' :'bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-60">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} />
            <span className="text-sm text-text-secondary">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={20} />
            <span className="text-sm text-text-secondary">Privacy Protected</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={20} />
            <span className="text-sm text-text-secondary">Industry Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;