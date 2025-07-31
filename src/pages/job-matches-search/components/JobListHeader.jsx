import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const JobListHeader = ({ 
  totalJobs, 
  currentPage, 
  totalPages, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  isLoading = false 
}) => {
  const sortOptions = [
    { value: 'fit-score', label: 'Best Fit Score' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' },
    { value: 'date-new', label: 'Date: Newest First' },
    { value: 'date-old', label: 'Date: Oldest First' },
    { value: 'company', label: 'Company Name' }
  ];

  return (
    <div className="bg-background border-b border-border px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Job Matches
          </h2>
          {!isLoading && (
            <span className="text-sm text-text-secondary">
              {totalJobs.toLocaleString()} jobs found
            </span>
          )}
        </div>

        {/* View Mode Toggle (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
          >
            <Icon name="List" size={16} />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Sort Options */}
        <div className="flex items-center space-x-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-48"
          />
        </div>

        {/* Pagination Info */}
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          {!isLoading && (
            <>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  className="px-2"
                >
                  <Icon name="ChevronLeft" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === totalPages}
                  className="px-2"
                >
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center space-x-2 mt-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-text-secondary">Loading jobs...</span>
        </div>
      )}
    </div>
  );
};

export default JobListHeader;