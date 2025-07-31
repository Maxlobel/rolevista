import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobListHeader = ({ 
  totalJobs, 
  viewMode, 
  onViewModeChange, 
  onFilterToggle, 
  sortBy, 
  onSortChange,
  isLoading 
}) => {
  const sortOptions = [
    { value: 'fit-score', label: 'Best Fit', icon: 'Target' },
    { value: 'date', label: 'Most Recent', icon: 'Clock' },
    { value: 'salary', label: 'Highest Salary', icon: 'DollarSign' },
    { value: 'company', label: 'Company A-Z', icon: 'Building' }
  ];

  const getCurrentSortOption = () => {
    return sortOptions.find(option => option.value === sortBy) || sortOptions[0];
  };

  return (
    <div className="bg-surface border-b border-border p-4 sticky top-16 z-30">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-text-primary">Job Matches</h1>
            {!isLoading && (
              <span className="text-text-secondary text-sm">
                ({totalJobs.toLocaleString()} jobs)
              </span>
            )}
          </div>
          
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterToggle}
            className="lg:hidden"
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
            >
              <Icon name={getCurrentSortOption().icon} size={16} />
              <span className="hidden md:inline">{getCurrentSortOption().label}</span>
              <Icon name="ChevronDown" size={14} />
            </Button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors duration-200 ${
                      sortBy === option.value ? 'bg-muted text-primary' : 'text-text-secondary'
                    }`}
                  >
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode Toggle (Desktop) */}
          <div className="hidden lg:flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('card')}
              className="px-3"
            >
              <Icon name="LayoutGrid" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="hidden sm:flex"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>

      {/* Mobile Sort Options */}
      <div className="sm:hidden mt-3 flex space-x-2 overflow-x-auto pb-2">
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={sortBy === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSortChange(option.value)}
            className="flex-shrink-0"
          >
            <Icon name={option.icon} size={14} className="mr-1" />
            <span className="text-xs">{option.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobListHeader;