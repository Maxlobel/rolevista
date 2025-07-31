import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, isMobile = false }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const salaryRanges = [
    { value: '0-50k', label: '$0 - $50,000' },
    { value: '50k-75k', label: '$50,000 - $75,000' },
    { value: '75k-100k', label: '$75,000 - $100,000' },
    { value: '100k-150k', label: '$100,000 - $150,000' },
    { value: '150k+', label: '$150,000+' }
  ];

  const locations = [
    { value: 'remote', label: 'Remote' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'boston', label: 'Boston, MA' }
  ];

  const skills = [
    'JavaScript', 'React', 'Python', 'Node.js', 'AWS', 'Docker',
    'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Kubernetes', 'Git'
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleSkillToggle = (skill) => {
    const currentSkills = localFilters.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    handleFilterChange('skills', updatedSkills);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      fitScore: '',
      experience: '',
      jobType: [],
      salary: '',
      location: [],
      skills: [],
      postedDate: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const panelClasses = isMobile
    ? `fixed inset-x-0 bottom-0 top-16 bg-background z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`
    : `w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div className={panelClasses}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4 lg:px-0 pt-4 lg:pt-0">
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="X" size={18} />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6 px-4 lg:px-0 pb-20 lg:pb-0 overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-none">
          {/* Fit Score */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Minimum Fit Score
            </label>
            <div className="space-y-2">
              {[90, 80, 70, 60].map(score => (
                <label key={score} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="fitScore"
                    value={score}
                    checked={localFilters.fitScore === score}
                    onChange={(e) => handleFilterChange('fitScore', parseInt(e.target.value))}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-text-secondary">{score}% or higher</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <Select
              label="Experience Level"
              options={experienceLevels}
              value={localFilters.experience}
              onChange={(value) => handleFilterChange('experience', value)}
              placeholder="Select experience level"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Job Type
            </label>
            <div className="space-y-2">
              {jobTypes.map(type => (
                <Checkbox
                  key={type.value}
                  label={type.label}
                  checked={(localFilters.jobType || []).includes(type.value)}
                  onChange={(e) => {
                    const currentTypes = localFilters.jobType || [];
                    const updatedTypes = e.target.checked
                      ? [...currentTypes, type.value]
                      : currentTypes.filter(t => t !== type.value);
                    handleFilterChange('jobType', updatedTypes);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <Select
              label="Salary Range"
              options={salaryRanges}
              value={localFilters.salary}
              onChange={(value) => handleFilterChange('salary', value)}
              placeholder="Select salary range"
            />
          </div>

          {/* Location */}
          <div>
            <Select
              label="Location"
              options={locations}
              value={localFilters.location}
              onChange={(value) => handleFilterChange('location', value)}
              multiple
              searchable
              placeholder="Select locations"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Required Skills
            </label>
            <div className="grid grid-cols-2 gap-2">
              {skills.map(skill => (
                <Checkbox
                  key={skill}
                  label={skill}
                  checked={(localFilters.skills || []).includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
              ))}
            </div>
          </div>

          {/* Posted Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Posted Date
            </label>
            <div className="space-y-2">
              {[
                { value: '24h', label: 'Last 24 hours' },
                { value: '3d', label: 'Last 3 days' },
                { value: '7d', label: 'Last week' },
                { value: '30d', label: 'Last month' }
              ].map(period => (
                <label key={period.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="postedDate"
                    value={period.value}
                    checked={localFilters.postedDate === period.value}
                    onChange={(e) => handleFilterChange('postedDate', e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-text-secondary">{period.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button (Mobile) */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <Button 
              variant="default" 
              fullWidth 
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPanel;