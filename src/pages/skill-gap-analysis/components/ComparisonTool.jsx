import React, { useState } from 'react';
        import { X, Compare, TrendingUp, TrendingDown, Minus } from 'lucide-react';
        import { cn } from '../../../utils/cn';
        import Button from '../../../components/ui/Button';

        const ComparisonTool = ({ userSkills, onClose }) => {
          const [selectedRoles, setSelectedRoles] = useState([]);

          // Simulated job roles with skill requirements
          const jobRoles = [
            {
              id: 1,
              title: 'Senior Data Analyst',
              company: 'TechCorp',
              requiredSkills: {
                'Data Analysis': 85,
                'Machine Learning': 70,
                'SQL Databases': 80,
                'Team Leadership': 60,
                'Strategic Planning': 50,
                'Public Speaking': 65,
                'Technical Writing': 75
              }
            },
            {
              id: 2,
              title: 'Product Manager',
              company: 'StartupXYZ',
              requiredSkills: {
                'Data Analysis': 70,
                'Machine Learning': 40,
                'SQL Databases': 60,
                'Team Leadership': 85,
                'Strategic Planning': 90,
                'Public Speaking': 80,
                'Technical Writing': 70
              }
            },
            {
              id: 3,
              title: 'ML Engineering Lead',
              company: 'AI Solutions',
              requiredSkills: {
                'Data Analysis': 90,
                'Machine Learning': 95,
                'SQL Databases': 85,
                'Team Leadership': 80,
                'Strategic Planning': 70,
                'Public Speaking': 60,
                'Technical Writing': 85
              }
            }
          ];

          const handleRoleToggle = (role) => {
            setSelectedRoles(prev => {
              if (prev.find(r => r.id === role.id)) {
                return prev.filter(r => r.id !== role.id);
              } else if (prev.length < 2) {
                return [...prev, role];
              }
              return prev;
            });
          };

          const getUserSkillLevel = (skillName) => {
            const skill = userSkills.find(s => s.name === skillName);
            return skill ? skill.current : 0;
          };

          const calculateGap = (required, current) => {
            return required - current;
          };

          const getGapColor = (gap) => {
            if (gap <= 0) return 'text-success';
            if (gap <= 15) return 'text-warning';
            return 'text-error';
          };

          const getGapIcon = (gap) => {
            if (gap <= 0) return <TrendingUp className="w-4 h-4" />;
            if (gap <= 15) return <Minus className="w-4 h-4" />;
            return <TrendingDown className="w-4 h-4" />;
          };

          return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Role Comparison Tool</h2>
                    <p className="text-muted-foreground">Compare your skills against target role requirements</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                  {/* Role Selection */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-foreground mb-4">
                      Select roles to compare (max 2)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {jobRoles.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => handleRoleToggle(role)}
                          className={cn(
                            "text-left p-4 rounded-lg border-2 transition-all",
                            selectedRoles.find(r => r.id === role.id)
                              ? "border-primary bg-primary/5" :"border-border hover:border-primary/50"
                          )}
                        >
                          <div className="font-medium text-foreground">{role.title}</div>
                          <div className="text-sm text-muted-foreground">{role.company}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Object.keys(role.requiredSkills).length} skills required
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comparison Table */}
                  {selectedRoles.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="font-semibold text-foreground">Skills Comparison</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3 font-medium text-foreground">Skill</th>
                              <th className="text-center p-3 font-medium text-foreground">Your Level</th>
                              {selectedRoles.map(role => (
                                <th key={role.id} className="text-center p-3 font-medium text-foreground">
                                  {role.title}
                                </th>
                              ))}
                              {selectedRoles.map(role => (
                                <th key={`gap-${role.id}`} className="text-center p-3 font-medium text-foreground">
                                  Gap
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from(
                              new Set(
                                selectedRoles.flatMap(role => Object.keys(role.requiredSkills))
                              )
                            ).map(skillName => (
                              <tr key={skillName} className="border-b border-border hover:bg-muted/50">
                                <td className="p-3 font-medium text-foreground">{skillName}</td>
                                <td className="p-3 text-center">
                                  <span className="inline-flex items-center justify-center w-12 h-8 bg-primary/10 text-primary rounded-lg font-medium">
                                    {getUserSkillLevel(skillName)}%
                                  </span>
                                </td>
                                {selectedRoles.map(role => (
                                  <td key={role.id} className="p-3 text-center">
                                    <span className="inline-flex items-center justify-center w-12 h-8 bg-muted text-foreground rounded-lg font-medium">
                                      {role.requiredSkills[skillName] || 0}%
                                    </span>
                                  </td>
                                ))}
                                {selectedRoles.map(role => {
                                  const gap = calculateGap(
                                    role.requiredSkills[skillName] || 0,
                                    getUserSkillLevel(skillName)
                                  );
                                  return (
                                    <td key={`gap-${role.id}`} className="p-3 text-center">
                                      <div className={cn(
                                        "inline-flex items-center space-x-1",
                                        getGapColor(gap)
                                      )}>
                                        {getGapIcon(gap)}
                                        <span className="font-medium">
                                          {gap > 0 ? `+${gap}` : gap}%
                                        </span>
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Summary */}
                      {selectedRoles.map(role => {
                        const skillGaps = Object.entries(role.requiredSkills).map(([skill, required]) => ({
                          skill,
                          gap: calculateGap(required, getUserSkillLevel(skill))
                        }));
                        const criticalGaps = skillGaps.filter(sg => sg.gap > 15);
                        const strongSkills = skillGaps.filter(sg => sg.gap <= 0);

                        return (
                          <div key={role.id} className="bg-muted/50 rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-3">{role.title} Summary</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-success font-medium">{strongSkills.length} Strong Skills</div>
                                <div className="text-muted-foreground">
                                  {strongSkills.map(sg => sg.skill).join(', ')}
                                </div>
                              </div>
                              <div>
                                <div className="text-warning font-medium">
                                  {skillGaps.filter(sg => sg.gap > 0 && sg.gap <= 15).length} Minor Gaps
                                </div>
                              </div>
                              <div>
                                <div className="text-error font-medium">{criticalGaps.length} Critical Gaps</div>
                                <div className="text-muted-foreground">
                                  {criticalGaps.map(sg => sg.skill).join(', ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {selectedRoles.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Compare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select up to 2 roles above to compare your skills</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  {selectedRoles.length > 0 && (
                    <Button>
                      Save Comparison
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        };

        export default ComparisonTool;