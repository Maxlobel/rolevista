import React from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Building2, DollarSign } from 'lucide-react';
import Button from '../../../components/ui/Button';

const CareerRoleCard = ({ role, rank, isExpanded, onToggleExpand, onUpgradeClick }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getScoreRing = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            {/* Rank Badge */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                {rank}
              </div>
            </div>

            {/* Role Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {role.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {role.description}
              </p>

              {/* Role Details */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{role.salary}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">{role.growth}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {role.companies.slice(0, 2).join(', ')}
                    {role.companies.length > 2 && ` +${role.companies.length - 2}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fit Score */}
          <div className="flex-shrink-0 text-center">
            <div className="relative">
              <div className="w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted"
                    fill="none"
                    strokeWidth="3"
                    stroke="currentColor"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={getScoreRing(role.fitScore)}
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${role.fitScore}, 100`}
                    stroke="currentColor"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">
                    {role.fitScore}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Fit Score</p>
          </div>
        </div>

        {/* Learn More Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="w-full justify-between"
        >
          <span>Learn More</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/20 p-6">
          <div className="space-y-4">
            {/* Alignment Explanation */}
            <div>
              <h4 className="font-medium text-foreground mb-2">Why This Role Fits You</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {role.alignment}
              </p>
            </div>

            {/* Key Companies */}
            <div>
              <h4 className="font-medium text-foreground mb-2">Top Hiring Companies</h4>
              <div className="flex flex-wrap gap-2">
                {role.companies.map((company, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onUpgradeClick}
                className="flex-1"
              >
                View Job Matches
              </Button>
              <Button
                size="sm"
                onClick={onUpgradeClick}
                className="flex-1"
              >
                Get Development Plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerRoleCard;