import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onSearch, onFilterToggle, searchQuery, recentSearches = [] }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    "Software Engineer",
    "Product Manager", 
    "Data Scientist",
    "UX Designer",
    "Marketing Manager",
    "Sales Representative"
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border">
      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search jobs, companies, or skills..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                setIsSearchFocused(true);
                setShowSuggestions(searchQuery.length > 0);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsSearchFocused(false);
                  setShowSuggestions(false);
                }, 200);
              }}
              className="pl-10 pr-20"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onFilterToggle}
                className="px-2"
              >
                <Icon name="SlidersHorizontal" size={16} />
              </Button>
            </div>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (isSearchFocused || searchQuery.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50">
              <div className="py-2">
                {/* Recent Searches */}
                {recentSearches.length > 0 && searchQuery.length === 0 && (
                  <>
                    <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
                      Recent Searches
                    </div>
                    {recentSearches.slice(0, 3).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-muted flex items-center space-x-2"
                      >
                        <Icon name="Clock" size={14} className="text-text-secondary" />
                        <span>{search}</span>
                      </button>
                    ))}
                    <div className="border-t border-border my-2"></div>
                  </>
                )}

                {/* Suggestions */}
                <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Suggestions
                </div>
                {suggestions
                  .filter(suggestion => 
                    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(0, 5)
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-muted flex items-center space-x-2"
                    >
                      <Icon name="Search" size={14} className="text-text-secondary" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex items-center space-x-2 mt-3 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Icon name="Target" size={14} className="mr-1" />
            90%+ Fit
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Icon name="MapPin" size={14} className="mr-1" />
            Remote
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Icon name="DollarSign" size={14} className="mr-1" />
            $100k+
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Icon name="Clock" size={14} className="mr-1" />
            This Week
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;