import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'RoleVista AI helped me land my dream job at Google. The resume optimization and interview prep were game-changers.',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Product Manager at Microsoft',
      content: 'The AI coaching sessions were incredibly insightful. I increased my salary by 40% in my latest job switch.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Data Scientist at Netflix',
      content: 'From career assessment to job placement, RoleVista guided me every step of the way. Absolutely worth it!',
      rating: 5,
      avatar: '👩‍🔬'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Career Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how RoleVista AI has transformed careers and accelerated professional growth
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-200" />
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>4.9/5 average rating</span>
            </div>
            <div>
              <span className="font-semibold">10,000+</span> professionals helped
            </div>
            <div>
              <span className="font-semibold">95%</span> success rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;