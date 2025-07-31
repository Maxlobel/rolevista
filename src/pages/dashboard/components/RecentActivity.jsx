import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'assessment': 'Brain',
      'application': 'Send',
      'profile_update': 'User',
      'skill_update': 'TrendingUp',
      'job_save': 'Bookmark',
      'interview': 'Calendar'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'assessment': 'text-primary bg-primary/10',
      'application': 'text-success bg-success/10',
      'profile_update': 'text-warning bg-warning/10',
      'skill_update': 'text-accent bg-accent/10',
      'job_save': 'text-secondary bg-secondary/10',
      'interview': 'text-error bg-error/10'
    };
    return colors[type] || 'text-text-secondary bg-muted';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">{activity.description}</p>
              <p className="text-xs text-text-secondary mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No recent activity</p>
          <p className="text-sm text-text-secondary mt-1">
            Start by taking your career assessment
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;