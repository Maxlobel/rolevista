import React from 'react';
import { Target, TrendingUp, Brain, MessageCircle, Users, Award, Clock, Star, User } from 'lucide-react';

const LoginBackground = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20">
          <Target size={120} className="text-indigo-600" />
        </div>
        <div className="absolute top-40 right-32">
          <TrendingUp size={80} className="text-purple-600" />
        </div>
        <div className="absolute bottom-40 left-32">
          <Brain size={100} className="text-indigo-600" />
        </div>
        <div className="absolute bottom-20 right-20">
          <MessageCircle size={90} className="text-purple-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-16 relative z-10 w-full">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Find the job you're meant for in 30 days or less
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join thousands of professionals who discovered their ideal career path through our AI-powered assessment and personalized job matching.
          </p>

          {/* Success Stats */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                <Users size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">50,000+ Users</p>
                <p className="text-sm text-gray-600">Found their dream job</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
                <Award size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">94% Success Rate</p>
                <p className="text-sm text-gray-600">Career satisfaction improvement</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl">
                <Clock size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Average 23 Days</p>
                <p className="text-sm text-gray-600">To land ideal role</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">
              "RoleVista helped me transition from marketing to UX design. The AI assessment was spot-on, and I landed my dream job in just 3 weeks!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Sarah Chen</p>
                <p className="text-sm text-gray-600">UX Designer at Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBackground;