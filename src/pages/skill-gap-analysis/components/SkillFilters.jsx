import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillFilters = ({ activeFilters, onFilterChange, onClearFilters }) => {
  const filterOptions = [
    { id: 'all', label: 'All Skills', icon: 'Grid3x3' },
    { id: 'strengths', label: 'Strengths', icon: 'TrendingUp', color: 'text-success' },
    { id: 'developing', label: 'Developing', icon: 'Clock', color: 'text-warning' },
    { id: 'gaps', label: 'Critical Gaps', icon: 'AlertTriangle', color: 'text-destructive' },
  ];

  const urgencyOptions = [
    { id: 'high', label: 'High Priority', icon: 'Zap' },
    { id: 'medium', label: 'Medium Priority', icon: 'Clock' },
    { id: 'low', label: 'Low Priority', icon: 'Minus' },
  ];

  const categoryOptions = [
    { id: 'technical', label: 'Technical', icon: 'Code' },
    { id: 'soft', label: 'Soft Skills', icon: 'Users' },
    { id: 'leadership', label: 'Leadership', icon: 'Crown' },
    { id: 'industry', label: 'Industry', icon: 'Building' },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-text-secondary" />
          <h3 className="font-medium text-text-primary">Filter Skills</h3>
        </div>
        
        {(activeFilters.skillLevel !== 'all' || activeFilters.urgency || activeFilters.category) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={16} />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {/* Skill Level Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Skill Level</h4>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange('skillLevel', option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeFilters.skillLevel === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
                }`}
              >
                <Icon name={option.icon} size={16} className={option.color || ''} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Priority Level</h4>
          <div className="flex flex-wrap gap-2">
            {urgencyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange('urgency', option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeFilters.urgency === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onFilterChange('category', option.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeFilters.category === option.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillFilters;