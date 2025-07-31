import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements, recentAchievements }) => {
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'skill_master': return 'Crown';
      case 'quick_learner': return 'Zap';
      case 'consistent': return 'Target';
      case 'course_complete': return 'GraduationCap';
      case 'assessment_ace': return 'Award';
      case 'gap_closer': return 'TrendingUp';
      default: return 'Star';
    }
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'epic': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'rare': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'common': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  if (!achievements.length) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center">
          <Icon name="Award" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Achievements Yet</h3>
          <p className="text-text-secondary">
            Complete skill assessments and courses to earn your first badge!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Achievements</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">{achievements.length} earned</span>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Recently Earned</h4>
          <div className="flex flex-wrap gap-3">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="relative group"
              >
                <div className={`w-16 h-16 rounded-full ${getBadgeColor(achievement.rarity)} p-0.5 animate-pulse`}>
                  <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                    <Icon name={getBadgeIcon(achievement.type)} size={24} className="text-primary" />
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{achievement.title}</div>
                  <div className="text-xs text-text-secondary">{achievement.description}</div>
                  <div className="text-xs text-primary capitalize">{achievement.rarity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Achievements Grid */}
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="relative group"
          >
            <div className={`w-16 h-16 rounded-full ${getBadgeColor(achievement.rarity)} p-0.5 ${achievement.isNew ? 'animate-pulse' : ''}`}>
              <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                <Icon name={getBadgeIcon(achievement.type)} size={24} className="text-primary" />
              </div>
            </div>
            
            {achievement.isNew && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">!</span>
              </div>
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 whitespace-nowrap">
              <div className="text-sm font-medium text-text-primary">{achievement.title}</div>
              <div className="text-xs text-text-secondary">{achievement.description}</div>
              <div className="text-xs text-primary capitalize">{achievement.rarity}</div>
              <div className="text-xs text-text-secondary">
                Earned {new Date(achievement.earnedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress to Next Achievement */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-sm font-medium text-text-primary">Next Achievement</h5>
          <span className="text-xs text-text-secondary">75% Complete</span>
        </div>
        <div className="w-full bg-border rounded-full h-2 mb-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '75%' }} />
        </div>
        <p className="text-xs text-text-secondary">
          Complete 2 more courses to earn "Learning Streak" badge
        </p>
      </div>
    </div>
  );
};

export default AchievementBadges;