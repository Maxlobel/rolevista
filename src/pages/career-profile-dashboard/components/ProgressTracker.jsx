import React from 'react';
import { Trophy, Target, User, Briefcase, TrendingUp, CheckCircle, Circle, Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

const ProgressTracker = ({ achievements }) => {
  const iconMap = {
    Target: Target,
    User: User,
    Briefcase: Briefcase,
    TrendingUp: TrendingUp,
    Trophy: Trophy
  };

  const completedCount = achievements?.filter(achievement => achievement.earned).length || 0;
  const totalCount = achievements?.length || 0;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Mock progress data
  const progressMetrics = [
    {
      label: 'Profile Completion',
      value: 85,
      target: 100,
      trend: '+5%',
      color: 'primary'
    },
    {
      label: 'Skill Development',
      value: 72,
      target: 100,
      trend: '+12%',
      color: 'success'
    },
    {
      label: 'Applications Sent',
      value: 3,
      target: 10,
      trend: '+3',
      color: 'warning'
    },
    {
      label: 'Network Connections',
      value: 24,
      target: 50,
      trend: '+8',
      color: 'accent'
    }
  ];

  const getProgressColor = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary';
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'accent': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case 'primary': return 'bg-primary/10';
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'accent': return 'bg-accent/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Your Progress</h2>
          <p className="text-muted-foreground">Track your career development journey</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Overall Progress Ring */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Achievement Progress</h3>
          <span className="text-sm text-muted-foreground">{completedCount}/{totalCount}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Progress Circle */}
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-muted"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-foreground">{completionPercentage}%</span>
            </div>
          </div>

          {/* Achievement List */}
          <div className="flex-1 space-y-2">
            {achievements?.slice(0, 3).map((achievement) => {
              const IconComponent = iconMap[achievement.icon] || Trophy;
              return (
                <div key={achievement.id} className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    achievement.earned ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  )}>
                    {achievement.earned ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm",
                    achievement.earned ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {achievement.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">{metric.label}</h4>
              <span className="text-sm text-success font-medium">{metric.trend}</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
              <span className="text-sm text-muted-foreground">/ {metric.target}</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-300", getProgressColor(metric.color))}
                style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Badges */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent Achievements</h3>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements?.map((achievement) => {
            const IconComponent = iconMap[achievement.icon] || Trophy;
            return (
              <div 
                key={achievement.id} 
                className={cn(
                  "text-center p-4 rounded-lg border-2 transition-all duration-200",
                  achievement.earned 
                    ? "bg-success/10 border-success/20 text-success" :"bg-muted/50 border-muted text-muted-foreground opacity-50"
                )}
              >
                <div className={cn(
                  "w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2",
                  achievement.earned ? "bg-success/20" : "bg-muted"
                )}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-medium">{achievement.title}</h4>
                {achievement.earned && (
                  <div className="flex items-center justify-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    <span className="text-xs">Earned</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Gamification Elements */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Career Level: Rising Star</h3>
              <p className="text-sm text-muted-foreground">Complete 2 more achievements to reach Expert level</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">Level 3</div>
            <div className="text-xs text-muted-foreground">890 XP</div>
          </div>
        </div>
        
        <div className="w-full bg-background rounded-full h-3">
          <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full" style={{ width: '68%' }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Level 3</span>
          <span>680/1000 XP to Level 4</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;