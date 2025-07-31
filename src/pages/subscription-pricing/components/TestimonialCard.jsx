import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ testimonial, className = '' }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center space-x-1 mb-4">
        {renderStars(testimonial.rating)}
      </div>
      
      <blockquote className="text-text-primary mb-4 leading-relaxed">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-text-primary text-sm">{testimonial.name}</div>
          <div className="text-text-secondary text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;