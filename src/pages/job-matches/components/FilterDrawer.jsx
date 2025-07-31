import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterDrawer = ({ isOpen, onClose, filters, onFiltersChange, onApplyFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const salaryRanges = [
    { value: '0-50000', label: '$0 - $50,000' },
    { value: '50000-75000', label: '$50,000 - $75,000' },
    { value: '75000-100000', label: '$75,000 - $100,000' },
    { value: '100000-150000', label: '$100,000 - $150,000' },
    { value: '150000-200000', label: '$150,000 - $200,000' },
    { value: '200000+', label: '$200,000+' }
  ];

  const locationOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'boston', label: 'Boston, MA' }
  ];

  const companySizeOptions = [
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Small (51-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' }
  ];

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      keywords: '',
      location: '',
      salaryRange: '',
      companySize: '',
      employmentType: '',
      remoteOnly: false,
      minFitScore: 0
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-x-0 bottom-0 z-50 bg-surface rounded-t-2xl transform transition-transform duration-300 lg:relative lg:inset-auto lg:rounded-lg lg:shadow-lg ${
        isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
      }`}>
        {/* Handle (Mobile) */}
        <div className="lg:hidden flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Filter Jobs</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Filters Content */}
        <div className="p-4 space-y-6 max-h-[70vh] lg:max-h-none overflow-y-auto">
          {/* Keywords */}
          <div>
            <Input
              label="Keywords"
              type="text"
              placeholder="Job title, skills, company..."
              value={localFilters.keywords}
              onChange={(e) => handleFilterChange('keywords', e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <Select
              label="Location"
              placeholder="Select location"
              options={locationOptions}
              value={localFilters.location}
              onChange={(value) => handleFilterChange('location', value)}
              searchable
              clearable
            />
          </div>

          {/* Salary Range */}
          <div>
            <Select
              label="Salary Range"
              placeholder="Select salary range"
              options={salaryRanges}
              value={localFilters.salaryRange}
              onChange={(value) => handleFilterChange('salaryRange', value)}
            />
          </div>

          {/* Employment Type */}
          <div>
            <Select
              label="Employment Type"
              placeholder="Select employment type"
              options={employmentTypeOptions}
              value={localFilters.employmentType}
              onChange={(value) => handleFilterChange('employmentType', value)}
            />
          </div>

          {/* Company Size */}
          <div>
            <Select
              label="Company Size"
              placeholder="Select company size"
              options={companySizeOptions}
              value={localFilters.companySize}
              onChange={(value) => handleFilterChange('companySize', value)}
            />
          </div>

          {/* Remote Only */}
          <div>
            <Checkbox
              label="Remote work only"
              checked={localFilters.remoteOnly}
              onChange={(e) => handleFilterChange('remoteOnly', e.target.checked)}
            />
          </div>

          {/* Minimum Fit Score */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Minimum Fit Score: {localFilters.minFitScore}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={localFilters.minFitScore}
              onChange={(e) => handleFilterChange('minFitScore', parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border bg-surface rounded-b-2xl lg:rounded-b-lg">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;