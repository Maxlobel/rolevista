import React from 'react';
        import { Filter } from 'lucide-react';
        import Select from '../../../components/ui/Select';

        const FilterOptions = ({ activeFilters, onFilterChange }) => {
          const handleFilterChange = (filterType, value) => {
            const newFilters = {
              ...activeFilters,
              [filterType]: value
            };
            onFilterChange(newFilters);
          };

          const categoryOptions = [
            { value: 'all', label: 'All Categories' },
            { value: 'technical skills', label: 'Technical Skills' },
            { value: 'leadership & management', label: 'Leadership & Management' },
            { value: 'communication', label: 'Communication' }
          ];

          const urgencyOptions = [
            { value: 'all', label: 'All Priorities' },
            { value: 'high', label: 'High Priority' },
            { value: 'medium', label: 'Medium Priority' },
            { value: 'low', label: 'Low Priority' }
          ];

          const levelOptions = [
            { value: 'all', label: 'All Levels' },
            { value: 'strength', label: 'Strengths' },
            { value: 'developing', label: 'Developing' },
            { value: 'gap', label: 'Gaps' }
          ];

          return (
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Filter Skills</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Category
                  </label>
                  <Select
                    value={activeFilters.category}
                    onValueChange={(value) => handleFilterChange('category', value)}
                    options={categoryOptions}
                    placeholder="Select category"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Priority Level
                  </label>
                  <Select
                    value={activeFilters.urgency}
                    onValueChange={(value) => handleFilterChange('urgency', value)}
                    options={urgencyOptions}
                    placeholder="Select priority"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Skill Level
                  </label>
                  <Select
                    value={activeFilters.level}
                    onValueChange={(value) => handleFilterChange('level', value)}
                    options={levelOptions}
                    placeholder="Select level"
                  />
                </div>
              </div>
            </div>
          );
        };

        export default FilterOptions;