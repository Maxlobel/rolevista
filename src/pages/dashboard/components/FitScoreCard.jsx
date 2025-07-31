import React from 'react';
import Icon from '../../../components/AppIcon';

const FitScoreCard = ({ score, trend, lastUpdated }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Career Fit Score</h3>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getScoreBackground(score)}`}>
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={14} 
            className={getScoreColor(score)}
          />
          <span className={`text-xs font-medium ${getScoreColor(score)}`}>
            {trend === 'up' ? '+5%' : trend === 'down' ? '-2%' : '0%'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={getScoreColor(score)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</div>
              <div className="text-xs text-text-secondary">Match</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-text-secondary mb-2">
          Your profile matches well with Software Engineer roles
        </p>
        <p className="text-xs text-text-secondary">
          Last updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default FitScoreCard;