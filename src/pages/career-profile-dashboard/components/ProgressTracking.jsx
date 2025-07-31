import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracking = ({ progressData, achievements }) => {
  const { profileCompletion, skillsImproved, jobsApplied, interviewsScheduled } = progressData;

  const progressItems = [
    {
      label: "Profile Completion",
      value: profileCompletion,
      max: 100,
      icon: "User",
      color: "bg-blue-500"
    },
    {
      label: "Skills Improved",
      value: skillsImproved,
      max: 10,
      icon: "TrendingUp",
      color: "bg-green-500"
    },
    {
      label: "Jobs Applied",
      value: jobsApplied,
      max: 20,
      icon: "Send",
      color: "bg-purple-500"
    },
    {
      label: "Interviews Scheduled",
      value: interviewsScheduled,
      max: 5,
      icon: "Calendar",
      color: "bg-orange-500"
    }
  ];

  const getAchievementIcon = (type) => {
    const icons = {
      'first_assessment': 'Target',
      'profile_complete': 'CheckCircle',
      'first_application': 'Send',
      'skill_master': 'Award',
      'interview_ace': 'Star'
    };
    return icons[type] || 'Award';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-semibold text-text-primary mb-6">Your Progress</h3>
      
      {/* Progress Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {progressItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
              <Icon name={item.icon} size={24} className="text-text-secondary" />
            </div>
            <div className="mb-2">
              <span className="text-2xl font-bold text-text-primary">{item.value}</span>
              <span className="text-text-secondary">/{item.max}</span>
            </div>
            <p className="text-sm text-text-secondary">{item.label}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">Recent Achievements</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.unlocked 
                  ? 'bg-green-50 border-green-200' :'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  <Icon 
                    name={getAchievementIcon(achievement.type)} 
                    size={18} 
                    color="white" 
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary text-sm">{achievement.title}</h5>
                  <p className="text-xs text-text-secondary">{achievement.description}</p>
                  {achievement.unlocked && achievement.unlockedDate && (
                    <p className="text-xs text-green-600 mt-1">
                      Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;