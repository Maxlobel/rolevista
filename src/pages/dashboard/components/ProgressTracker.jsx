import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ progressData }) => {
  const achievements = [
    { id: 1, name: 'Profile Complete', icon: 'User', completed: true },
    { id: 2, name: 'Assessment Done', icon: 'Brain', completed: true },
    { id: 3, name: 'First Application', icon: 'Send', completed: false },
    { id: 4, name: 'Interview Scheduled', icon: 'Calendar', completed: false }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Progress Tracker</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Flame" size={16} className="text-warning" />
          <span className="text-sm font-medium text-text-primary">{progressData.streak} day streak</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              achievement.completed 
                ? 'bg-success text-white' :'bg-muted text-text-secondary'
            }`}>
              <Icon name={achievement.icon} size={16} />
            </div>
            <span className={`font-medium ${
              achievement.completed 
                ? 'text-text-primary' :'text-text-secondary'
            }`}>
              {achievement.name}
            </span>
            {achievement.completed && (
              <Icon name="Check" size={16} className="text-success ml-auto" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Profile completion</span>
          <span className="text-text-primary font-medium">{progressData.profileCompletion}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressData.profileCompletion}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{progressData.applicationsSubmitted}</p>
          <p className="text-xs text-text-secondary">Applications</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{progressData.interviewsScheduled}</p>
          <p className="text-xs text-text-secondary">Interviews</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;