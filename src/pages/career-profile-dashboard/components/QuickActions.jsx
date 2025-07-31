import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'job-search',
      title: 'Find Jobs',
      description: 'Browse personalized job matches',
      icon: 'Search',
      color: 'bg-blue-500',
      route: '/job-matches'
    },
    {
      id: 'skill-analysis',
      title: 'Analyze Skills',
      description: 'Identify gaps and improvements',
      icon: 'BarChart3',
      color: 'bg-green-500',
      route: '/skill-gap-analysis'
    },
    {
      id: 'ai-coach',
      title: 'Ask AI Coach',
      description: 'Get personalized career advice',
      icon: 'MessageCircle',
      color: 'bg-purple-500',
      route: '/ai-career-coach-chat'
    },
    {
      id: 'resume-optimizer',
      title: 'Optimize Resume',
      description: 'Tailor resume for specific roles',
      icon: 'FileText',
      color: 'bg-orange-500',
      route: '/resume-optimizer-tool'
    },
    {
      id: 'retake-assessment',
      title: 'Retake Assessment',
      description: 'Update your career profile',
      icon: 'RefreshCw',
      color: 'bg-indigo-500',
      route: '/ai-career-assessment'
    },
    {
      id: 'view-pricing',
      title: 'Upgrade Plan',
      description: 'Unlock premium features',
      icon: 'Crown',
      color: 'bg-yellow-500',
      route: '/subscription-pricing'
    }
  ];

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action.id);
    }
    window.location.href = action.route;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action)}
            className="p-4 bg-surface border border-border rounded-lg hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={18} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm mb-1 group-hover:text-primary transition-colors duration-200">
                  {action.title}
                </h4>
                <p className="text-xs text-text-secondary">{action.description}</p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;