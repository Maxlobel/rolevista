import React from 'react';
import Icon from '../../../components/AppIcon';

import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      title: 'Take Assessment',
      description: 'Discover your ideal career path',
      icon: 'Brain',
      color: 'bg-primary',
      link: '/ai-career-assessment'
    },
    {
      title: 'Find Jobs',
      description: 'Browse personalized matches',
      icon: 'Search',
      color: 'bg-success',
      link: '/job-matches'
    },
    {
      title: 'Optimize Resume',
      description: 'AI-powered improvements',
      icon: 'FileText',
      color: 'bg-warning',
      link: '/resume-optimizer-tool'
    },
    {
      title: 'Chat with AI Coach',
      description: 'Get career guidance',
      icon: 'MessageCircle',
      color: 'bg-accent',
      link: '/ai-career-coach-chat'
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name={action.icon} size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  {action.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-text-secondary group-hover:text-primary transition-colors" 
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;