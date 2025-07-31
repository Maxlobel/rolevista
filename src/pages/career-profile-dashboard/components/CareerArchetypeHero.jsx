import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerArchetypeHero = ({ userProfile, onUpgrade }) => {
  const { archetype, fitScore, name, completedDate } = userProfile;

  const getArchetypeIcon = (type) => {
    const icons = {
      'Strategic Innovator': 'Lightbulb',
      'Creative Problem Solver': 'Palette',
      'Technical Leader': 'Code',
      'People Champion': 'Users',
      'Data Analyst': 'BarChart3'
    };
    return icons[type] || 'Target';
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 lg:p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name={getArchetypeIcon(archetype)} size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                Welcome back, {name}!
              </h1>
              <p className="text-text-secondary text-sm">
                Assessment completed on {new Date(completedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Your Career Archetype: {archetype}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Based on your assessment, you're a natural {archetype.toLowerCase()} who thrives in environments that value innovation, strategic thinking, and collaborative problem-solving.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
            <Button 
              variant="default" 
              iconName="Target" 
              iconPosition="left"
              onClick={() => window.location.href = '/job-matches'}
            >
              View Job Matches
            </Button>
            <Button 
              variant="outline" 
              iconName="MessageCircle" 
              iconPosition="left"
              onClick={() => window.location.href = '/ai-career-coach-chat'}
            >
              Ask AI Coach
            </Button>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:ml-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBg(fitScore)} mb-3`}>
              <span className={`text-3xl font-bold ${getScoreColor(fitScore)}`}>
                {fitScore}%
              </span>
            </div>
            <p className="text-sm font-medium text-text-primary">Career Fit Score</p>
            <p className="text-xs text-text-secondary mt-1">
              {fitScore >= 85 ? 'Excellent Match' : fitScore >= 70 ? 'Good Match' : 'Needs Improvement'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerArchetypeHero;