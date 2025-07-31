import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillOverviewCard = ({ overallScore, improvementTrend, totalSkills, strengthsCount, gapsCount }) => {
  const getTrendIcon = () => {
    if (improvementTrend > 0) return 'TrendingUp';
    if (improvementTrend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (improvementTrend > 0) return 'text-success';
    if (improvementTrend < 0) return 'text-destructive';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Overall Score */}
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray={`${overallScore}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-text-primary">{overallScore}%</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Overall Skill Score</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
              <span className={`text-sm ${getTrendColor()}`}>
                {improvementTrend > 0 ? '+' : ''}{improvementTrend}% this month
              </span>
            </div>
          </div>
        </div>

        {/* Skill Stats */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{totalSkills}</div>
            <div className="text-sm text-text-secondary">Total Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{strengthsCount}</div>
            <div className="text-sm text-text-secondary">Strengths</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{gapsCount}</div>
            <div className="text-sm text-text-secondary">Gaps</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillOverviewCard;