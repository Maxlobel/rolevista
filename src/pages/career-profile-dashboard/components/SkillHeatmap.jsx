import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { cn } from '../../../utils/cn';

const SkillHeatmap = ({ skills }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);

  const skillLevels = [
    { key: 'strengths', title: 'Strengths', color: 'success', description: 'Areas where you excel' },
    { key: 'midLevel', title: 'Developing', color: 'warning', description: 'Skills with growth potential' },
    { key: 'gaps', title: 'Growth Areas', color: 'error', description: 'Areas for improvement' }
  ];

  const getSkillColor = (level) => {
    switch (level) {
      case 'strengths': return 'bg-success/20 text-success border-success/30';
      case 'midLevel': return 'bg-warning/20 text-warning border-warning/30';
      case 'gaps': return 'bg-error/20 text-error border-error/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const toggleSkillExpansion = (skill) => {
    setExpandedSkill(expandedSkill === skill ? null : skill);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Skills Analysis</h2>
          <p className="text-muted-foreground">Tap any skill for detailed insights</p>
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground">
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Skill Categories */}
      <div className="space-y-6">
        {skillLevels.map((level) => (
          <div key={level.key} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-4 h-4 rounded-full",
                  level.color === 'success' && "bg-success",
                  level.color === 'warning' && "bg-warning", 
                  level.color === 'error' && "bg-error"
                )} />
                <div>
                  <h3 className="font-semibold text-foreground">{level.title}</h3>
                  <p className="text-sm text-muted-foreground">{level.description}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {skills[level.key]?.length || 0} skills
              </span>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills[level.key]?.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <button
                    onClick={() => toggleSkillExpansion(`${level.key}-${skill}`)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 hover:shadow-sm",
                      getSkillColor(level.key),
                      expandedSkill === `${level.key}-${skill}` && "ring-2 ring-primary/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{skill}</span>
                      {expandedSkill === `${level.key}-${skill}` ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Skill Details */}
                  {expandedSkill === `${level.key}-${skill}` && (
                    <div className="bg-background border border-border rounded-lg p-4 ml-2">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-foreground mb-1">{skill}</h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className={cn(
                                  "h-2 rounded-full",
                                  level.color === 'success' && "bg-success",
                                  level.color === 'warning' && "bg-warning",
                                  level.color === 'error' && "bg-error"
                                )}
                                style={{ 
                                  width: level.key === 'strengths' ? '85%' : 
                                         level.key === 'midLevel' ? '60%' : '35%' 
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {level.key === 'strengths' ? '85%' : 
                               level.key === 'midLevel' ? '60%' : '35%'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {level.key === 'strengths' && 
                            "This is one of your key strengths. Consider roles that heavily utilize this skill."
                          }
                          {level.key === 'midLevel' && 
                            "You have solid foundation here. With focused development, this could become a strength."
                          }
                          {level.key === 'gaps' && 
                            "Developing this skill could open new career opportunities and improve your overall profile."
                          }
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors">
                            Find Courses
                          </button>
                          <button className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
                            Related Jobs
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skills Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-3">Skills Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">{skills.strengths?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Strong Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">{skills.midLevel?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Developing Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error mb-1">{skills.gaps?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Growth Areas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillHeatmap;