import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillDetails = ({ skill, onClose }) => {
  if (!skill) return null;

  const getImprovementTimeColor = (months) => {
    if (months <= 3) return 'text-green-600';
    if (months <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">{skill.name}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">Category: {skill.category}</span>
            <span className="text-sm text-text-secondary">Current Level: {skill.level}</span>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Assessment */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Current Assessment</h3>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-primary">Proficiency Score</span>
              <span className="text-lg font-semibold text-primary">{skill.score}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${skill.score}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Industry Benchmark</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Entry Level</span>
                <span className="text-sm font-medium">40-60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Mid Level</span>
                <span className="text-sm font-medium">60-80%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Senior Level</span>
                <span className="text-sm font-medium">80-95%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Assessment Summary</h4>
            <p className="text-sm text-blue-800">{skill.assessment}</p>
          </div>
        </div>

        {/* Improvement Plan */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Improvement Roadmap</h3>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Time to Proficiency</span>
              <span className={`text-lg font-semibold ${getImprovementTimeColor(skill.timeToImprove)}`}>
                {skill.timeToImprove} months
              </span>
            </div>
            <p className="text-xs text-text-secondary">Based on 10-15 hours/week learning</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Recommended Actions</h4>
            <div className="space-y-2">
              {skill.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-white">{index + 1}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Success Metrics</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Complete 3 practical projects</li>
              <li>• Pass industry certification exam</li>
              <li>• Achieve 85%+ proficiency score</li>
              <li>• Build portfolio showcasing skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;