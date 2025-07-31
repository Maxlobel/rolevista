import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillGapCard = ({ skillGaps }) => {
  const getSkillLevel = (level) => {
    const levels = {
      'beginner': { color: 'bg-error', width: '25%' },
      'intermediate': { color: 'bg-warning', width: '60%' },
      'advanced': { color: 'bg-success', width: '85%' }
    };
    return levels[level] || levels.beginner;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Top Skill Gaps</h3>
        <Button variant="ghost" size="sm">
          <Icon name="ExternalLink" size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        {skillGaps.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-text-primary">{skill.name}</span>
              <span className="text-sm text-text-secondary capitalize">{skill.currentLevel}</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getSkillLevel(skill.currentLevel).color}`}
                style={{ width: getSkillLevel(skill.currentLevel).width }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Target: {skill.targetLevel}</span>
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={12} className="text-primary" />
                <span className="text-primary">{skill.coursesAvailable} courses</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" fullWidth className="mt-6">
        View All Skill Gaps
      </Button>
    </div>
  );
};

export default SkillGapCard;