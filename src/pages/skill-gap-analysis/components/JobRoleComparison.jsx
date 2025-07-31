import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobRoleComparison = ({ savedRoles, userSkills, onRemoveRole }) => {
  const [selectedRole, setSelectedRole] = useState(savedRoles[0]?.id || null);

  const getSkillMatch = (userLevel, requiredLevel) => {
    const difference = userLevel - requiredLevel;
    if (difference >= 0) return { status: 'match', color: 'text-success', icon: 'Check' };
    if (difference >= -20) return { status: 'close', color: 'text-warning', icon: 'Clock' };
    return { status: 'gap', color: 'text-destructive', icon: 'X' };
  };

  const selectedRoleData = savedRoles.find(role => role.id === selectedRole);

  if (!savedRoles.length) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center">
          <Icon name="Target" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Saved Roles</h3>
          <p className="text-text-secondary mb-4">
            Save job roles from your matches to compare skill requirements
          </p>
          <Button variant="default">
            <Icon name="Search" size={16} />
            Browse Job Matches
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Role Comparison</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">{savedRoles.length} saved roles</span>
        </div>
      </div>

      {/* Role Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {savedRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedRole === role.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <span>{role.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveRole(role.id);
                }}
                className="hover:bg-black/10 rounded p-0.5"
              >
                <Icon name="X" size={14} />
              </button>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Role Analysis */}
      {selectedRoleData && (
        <div>
          <div className="flex items-center space-x-4 mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Icon name="Briefcase" size={24} color="white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary">{selectedRoleData.title}</h4>
              <p className="text-sm text-text-secondary">{selectedRoleData.company}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-success font-medium">
                  {selectedRoleData.matchScore}% Match
                </span>
                <span className="text-sm text-text-secondary">
                  {selectedRoleData.location}
                </span>
              </div>
            </div>
          </div>

          {/* Skill Requirements */}
          <div className="space-y-4">
            <h5 className="font-medium text-text-primary">Skill Requirements</h5>
            
            {selectedRoleData.requiredSkills.map((skill) => {
              const userSkill = userSkills.find(us => us.name.toLowerCase() === skill.name.toLowerCase());
              const userLevel = userSkill ? userSkill.currentLevel : 0;
              const match = getSkillMatch(userLevel, skill.requiredLevel);
              
              return (
                <div key={skill.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-medium text-text-primary">{skill.name}</h6>
                      <div className="flex items-center space-x-2">
                        <Icon name={match.icon} size={16} className={match.color} />
                        <span className={`text-sm font-medium ${match.color}`}>
                          {userLevel}% / {skill.requiredLevel}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Comparison */}
                    <div className="relative w-full bg-muted rounded-full h-2">
                      {/* User Level */}
                      <div
                        className="absolute top-0 left-0 h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(userLevel, 100)}%` }}
                      />
                      {/* Required Level Marker */}
                      <div
                        className="absolute top-0 h-2 w-0.5 bg-text-primary"
                        style={{ left: `${Math.min(skill.requiredLevel, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-text-secondary mt-1">
                      <span>Your Level: {userLevel}%</span>
                      <span>Required: {skill.requiredLevel}%</span>
                    </div>
                    
                    {skill.importance && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Icon name="Star" size={12} className="text-warning" />
                        <span className="text-xs text-text-secondary capitalize">
                          {skill.importance} Priority
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {userLevel < skill.requiredLevel && (
                    <div className="ml-4">
                      <Button variant="outline" size="sm">
                        <Icon name="BookOpen" size={14} />
                        Learn
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Overall Assessment */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BarChart3" size={20} className="text-primary" />
              <h5 className="font-medium text-text-primary">Overall Assessment</h5>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-success">
                  {selectedRoleData.requiredSkills.filter(skill => {
                    const userSkill = userSkills.find(us => us.name.toLowerCase() === skill.name.toLowerCase());
                    return (userSkill?.currentLevel || 0) >= skill.requiredLevel;
                  }).length}
                </div>
                <div className="text-sm text-text-secondary">Skills Met</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">
                  {selectedRoleData.requiredSkills.filter(skill => {
                    const userSkill = userSkills.find(us => us.name.toLowerCase() === skill.name.toLowerCase());
                    const userLevel = userSkill?.currentLevel || 0;
                    return userLevel < skill.requiredLevel && userLevel >= skill.requiredLevel - 20;
                  }).length}
                </div>
                <div className="text-sm text-text-secondary">Close Gaps</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-destructive">
                  {selectedRoleData.requiredSkills.filter(skill => {
                    const userSkill = userSkills.find(us => us.name.toLowerCase() === skill.name.toLowerCase());
                    return (userSkill?.currentLevel || 0) < skill.requiredLevel - 20;
                  }).length}
                </div>
                <div className="text-sm text-text-secondary">Critical Gaps</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRoleComparison;