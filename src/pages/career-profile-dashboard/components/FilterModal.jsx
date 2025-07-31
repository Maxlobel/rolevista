import React, { useState } from 'react';
import { X, Filter, MapPin, Briefcase, Building2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';
import Icon from '../../../components/AppIcon';


const FilterModal = ({ filters, onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const experienceLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'executive', label: 'Executive (10+ years)' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'remote', label: 'Remote Only' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      industry: 'all',
      experienceLevel: 'all',
      location: 'all'
    };
    setLocalFilters(resetFilters);
  };

  const FilterSection = ({ title, icon: Icon, options, selectedValue, onChange }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
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
      <div className="relative w-full sm:w-auto sm:min-w-[500px] bg-background border border-border rounded-t-lg sm:rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filter Recommendations</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <FilterSection
            title="Industry"
            icon={Building2}
            options={industryOptions}
            selectedValue={localFilters.industry}
            onChange={(value) => handleFilterChange('industry', value)}
          />

          <FilterSection
            title="Experience Level"
            icon={Briefcase}
            options={experienceLevels}
            selectedValue={localFilters.experienceLevel}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
          />

          <FilterSection
            title="Location"
            icon={MapPin}
            options={locationOptions}
            selectedValue={localFilters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
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
              iconName="Filter"
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

export default FilterModal;