import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ progressData }) => {
  const achievements = [
    {
      id: 1,
      title: 'First Assessment',
      description: 'Completed your initial skill assessment',
      icon: 'Target',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Learning Streak',
      description: '7 days of continuous learning',
      icon: 'Flame',
      earned: true,
      date: '2024-01-22'
    },
    {
      id: 3,
      title: 'Skill Improver',
      description: 'Improved 3 skills by 20% or more',
      icon: 'TrendingUp',
      earned: true,
      date: '2024-02-10'
    },
    {
      id: 4,
      title: 'Course Completer',
      description: 'Finished your first recommended course',
      icon: 'GraduationCap',
      earned: false,
      date: null
    },
    {
      id: 5,
      title: 'Expert Level',
      description: 'Achieved expert level in any skill',
      icon: 'Award',
      earned: false,
      date: null
    }
  ];

  const skillProgress = [
    {
      skill: 'JavaScript',
      previousScore: 65,
      currentScore: 78,
      improvement: 13,
      trend: 'up'
    },
    {
      skill: 'React',
      previousScore: 72,
      currentScore: 85,
      improvement: 13,
      trend: 'up'
    },
    {
      skill: 'Node.js',
      previousScore: 58,
      currentScore: 71,
      improvement: 13,
      trend: 'up'
    },
    {
      skill: 'Python',
      previousScore: 45,
      currentScore: 52,
      improvement: 7,
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Learning Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {progressData.totalSkillsAssessed}
            </div>
            <p className="text-sm text-text-secondary">Skills Assessed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {progressData.skillsImproved}
            </div>
            <p className="text-sm text-text-secondary">Skills Improved</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {progressData.coursesCompleted}
            </div>
            <p className="text-sm text-text-secondary">Courses Completed</p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">Overall Skill Growth</span>
            <span className="text-sm font-semibold text-green-600">+{progressData.overallImprovement}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${progressData.overallImprovement}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-secondary mt-2">Since your first assessment</p>
        </div>
      </div>

      {/* Skill Progress Comparison */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Before vs After Comparison</h3>
        
        <div className="space-y-4">
          {skillProgress.map((skill, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">{skill.skill}</h4>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={skill.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className={skill.trend === 'up' ? 'text-green-500' : 'text-red-500'}
                  />
                  <span className="text-sm font-medium text-green-600">
                    +{skill.improvement}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Previous</span>
                  <span className="text-xs font-medium">{skill.previousScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gray-400 transition-all duration-300"
                    style={{ width: `${skill.previousScore}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Current</span>
                  <span className="text-xs font-medium">{skill.currentScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${skill.currentScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Achievements & Badges</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned 
                  ? 'border-green-300 bg-green-50' :'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  <Icon 
                    name={achievement.icon} 
                    size={16} 
                    color="white"
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.earned ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h4>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-green-600">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <p className={`text-sm ${
                achievement.earned ? 'text-green-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;