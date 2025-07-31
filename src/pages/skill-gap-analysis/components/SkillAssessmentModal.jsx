import React, { useState } from 'react';
        import { X, Save } from 'lucide-react';
        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';

        const SkillAssessmentModal = ({ skills, onUpdate, onClose }) => {
          const [updatedScores, setUpdatedScores] = useState(
            skills.reduce((acc, skill) => ({
              ...acc,
              [skill.name]: skill.current
            }), {})
          );

          const handleScoreChange = (skillName, score) => {
            const numericScore = Math.max(0, Math.min(100, parseInt(score) || 0));
            setUpdatedScores(prev => ({
              ...prev,
              [skillName]: numericScore
            }));
          };

          const handleSave = () => {
            Object.entries(updatedScores).forEach(([skillName, score]) => {
              const originalSkill = skills.find(s => s.name === skillName);
              if (originalSkill && score !== originalSkill.current) {
                onUpdate(skillName, score);
              }
            });
            onClose();
          };

          return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Update Skill Assessment</h2>
                    <p className="text-muted-foreground">Rate your current skill level from 0-100</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="space-y-6">
                    {skills.map((skill) => (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-medium text-foreground">{skill.name}</label>
                          <span className="text-sm text-muted-foreground">
                            Target: {skill.target}%
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={updatedScores[skill.name]}
                                onChange={(e) => handleScoreChange(skill.name, e.target.value)}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                            <div className="w-20">
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={updatedScores[skill.name]}
                                onChange={(e) => handleScoreChange(skill.name, e.target.value)}
                                className="text-center"
                              />
                            </div>
                          </div>
                          
                          {/* Progress visualization */}
                          <div className="relative">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${updatedScores[skill.name]}%` }}
                              />
                            </div>
                            <div 
                              className="absolute top-0 h-2 w-1 bg-accent rounded-full"
                              style={{ left: `${skill.target}%` }}
                              title={`Target: ${skill.target}%`}
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Expert</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    iconName="Save"
                    iconPosition="left"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default SkillAssessmentModal;