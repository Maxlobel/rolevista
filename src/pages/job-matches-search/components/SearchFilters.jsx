import React, { useState } from 'react';
import { X, SlidersHorizontal, MapPin, DollarSign, Briefcase, Building2, Clock } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import Icon from '../../../components/AppIcon';


const SearchFilters = ({ filters, onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'San Francisco, CA', label: 'San Francisco, CA' },
    { value: 'New York, NY', label: 'New York, NY' },
    { value: 'Austin, TX', label: 'Austin, TX' },
    { value: 'Chicago, IL', label: 'Chicago, IL' },
    { value: 'Boston, MA', label: 'Boston, MA' },
    { value: 'Seattle, WA', label: 'Seattle, WA' },
    { value: 'Los Angeles, CA', label: 'Los Angeles, CA' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'executive', label: 'Executive (10+ years)' }
  ];

  const jobTypeOptions = [
    { value: 'all', label: 'All Job Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const companyOptions = [
    { value: 'all', label: 'All Company Sizes' },
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Small (51-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSalaryChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [type]: parseInt(value)
      }
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      fitScore: 90,
      salary: { min: 0, max: 200000 },
      location: 'all',
      remote: false,
      experience: 'all',
      jobType: 'all',
      company: 'all'
    };
    setLocalFilters(resetFilters);
  };

  const FilterSection = ({ title, icon: Icon, children }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );

  const SelectFilter = ({ options, selectedValue, onChange }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
            selectedValue === option.value
              ? "bg-primary/10 text-primary border border-primary/20" :"text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full sm:w-auto sm:min-w-[600px] sm:max-w-4xl bg-background border border-border rounded-t-lg sm:rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Fit Score */}
              <FilterSection title="Minimum Fit Score" icon={SlidersHorizontal}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">At least {localFilters.fitScore}% match</span>
                    <span className="text-sm font-medium text-foreground">{localFilters.fitScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={localFilters.fitScore}
                    onChange={(e) => handleFilterChange('fitScore', parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </FilterSection>

              {/* Salary Range */}
              <FilterSection title="Salary Range" icon={DollarSign}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Minimum</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={localFilters.salary.min}
                        onChange={(e) => handleSalaryChange('min', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1">Maximum</label>
                      <input
                        type="number"
                        placeholder="200000"
                        value={localFilters.salary.max}
                        onChange={(e) => handleSalaryChange('max', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${localFilters.salary.min.toLocaleString()} - ${localFilters.salary.max.toLocaleString()}
                  </div>
                </div>
              </FilterSection>

              {/* Remote Work */}
              <FilterSection title="Work Arrangement" icon={MapPin}>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localFilters.remote}
                      onChange={(e) => handleFilterChange('remote', e.target.checked)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="text-sm text-foreground">Remote work available</span>
                  </label>
                </div>
              </FilterSection>

              {/* Location */}
              <FilterSection title="Location" icon={MapPin}>
                <SelectFilter
                  options={locationOptions}
                  selectedValue={localFilters.location}
                  onChange={(value) => handleFilterChange('location', value)}
                />
              </FilterSection>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Experience Level */}
              <FilterSection title="Experience Level" icon={Briefcase}>
                <SelectFilter
                  options={experienceOptions}
                  selectedValue={localFilters.experience}
                  onChange={(value) => handleFilterChange('experience', value)}
                />
              </FilterSection>

              {/* Job Type */}
              <FilterSection title="Job Type" icon={Clock}>
                <SelectFilter
                  options={jobTypeOptions}
                  selectedValue={localFilters.jobType}
                  onChange={(value) => handleFilterChange('jobType', value)}
                />
              </FilterSection>

              {/* Company Size */}
              <FilterSection title="Company Size" icon={Building2}>
                <SelectFilter
                  options={companyOptions}
                  selectedValue={localFilters.company}
                  onChange={(value) => handleFilterChange('company', value)}
                />
              </FilterSection>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Reset All
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              iconName="SlidersHorizontal"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;