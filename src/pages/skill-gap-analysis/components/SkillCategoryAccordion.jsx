import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { cn } from '../../../utils/cn';
import Button from '../../../components/ui/Button';

const SkillCategoryAccordion = ({ category, filters, onSkillSelect, isPremium }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSkillStatusColor = (status) => {
    switch (status) {
      case 'strength': return 'bg-success/20 text-success border-success/30';
      case 'developing': return 'bg-warning/20 text-warning border-warning/30';
      case 'gap': return 'bg-error/20 text-error border-error/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSkillStatusIcon = (status) => {
    switch (status) {
      case 'strength': return <TrendingUp className="w-4 h-4" />;
      case 'developing': return <Target className="w-4 h-4" />;
      case 'gap': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-success text-success-foreground'
    };
    return colors[priority] || colors.medium;
  };

  // Filter skills based on active filters
  const filteredSkills = category.skills.filter(skill => {
    if (filters.category !== 'all' && filters.category !== category.name.toLowerCase()) return false;
    if (filters.urgency !== 'all' && filters.urgency !== skill.priority) return false;
    if (filters.level !== 'all' && filters.level !== skill.status) return false;
    return true;
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Category Header */}
      <button
        onClick={toggleExpanded}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {filteredSkills.length} skills • {filteredSkills.filter(s => s.status === 'gap').length} gaps
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {Math.round(filteredSkills.reduce((acc, skill) => acc + skill.current, 0) / filteredSkills.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          {/* Skills Grid */}
          <div className="grid gap-4">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "p-2 rounded-lg border-2",
                      getSkillStatusColor(skill.status)
                    )}>
                      {getSkillStatusIcon(skill.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{skill.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full font-medium",
                          getPriorityBadge(skill.priority)
                        )}>
                          {skill.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{skill.current}%</div>
                    <div className="text-xs text-muted-foreground">Target: {skill.target}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Progress</span>
                    <span className="text-muted-foreground">{skill.target - skill.current}% gap</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={cn(
                          "h-3 rounded-full",
                          skill.status === 'strength' && "bg-success",
                          skill.status === 'developing' && "bg-warning",
                          skill.status === 'gap' && "bg-error"
                        )}
                        style={{ width: `${skill.current}%` }}
                      />
                    </div>
                    <div 
                      className="absolute top-0 h-3 w-1 bg-primary rounded-full"
                      style={{ left: `${skill.target}%` }}
                      title={`Target: ${skill.target}%`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSkillSelect(skill)}
                  >
                    View Courses ({skill.courses.length})
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                  >
                    Find Related Jobs
                  </Button>
                  {!isPremium && skill.priority === 'high' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary border-primary"
                    >
                      🔒 Premium Learning Path
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No skills match your current filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillCategoryAccordion;