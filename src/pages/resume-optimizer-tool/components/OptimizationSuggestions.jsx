import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizationSuggestions = ({ suggestions, onAcceptSuggestion, onRejectSuggestion, userTier }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSuggestions, setExpandedSuggestions] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Suggestions', icon: 'List' },
    { id: 'keywords', name: 'Keywords', icon: 'Hash' },
    { id: 'formatting', name: 'Formatting', icon: 'Layout' },
    { id: 'content', name: 'Content', icon: 'FileText' },
    { id: 'ats', name: 'ATS Optimization', icon: 'Search' }
  ];

  const mockSuggestions = [
    {
      id: 1,
      category: 'keywords',
      type: 'high',
      title: 'Add Missing Keywords',
      description: 'Include "machine learning" and "data analysis" to match job requirements',
      impact: 'High Impact',
      section: 'Skills',
      originalText: 'Python, JavaScript, React',
      suggestedText: 'Python, JavaScript, React, Machine Learning, Data Analysis',
      explanation: 'These keywords appear 15+ times in similar job postings and will improve ATS matching.'
    },
    {
      id: 2,
      category: 'content',
      type: 'medium',
      title: 'Quantify Achievements',
      description: 'Add specific metrics to your accomplishments',
      impact: 'Medium Impact',
      section: 'Experience',
      originalText: 'Improved application performance',
      suggestedText: 'Improved application performance by 40%, reducing load time from 3.2s to 1.9s',
      explanation: 'Quantified achievements are 3x more likely to catch recruiter attention.'
    },
    {
      id: 3,
      category: 'formatting',
      type: 'low',
      title: 'Consistent Date Format',
      description: 'Use consistent date formatting throughout',
      impact: 'Low Impact',
      section: 'Experience',
      originalText: 'Jan 2021 - Present, 2019-2021',
      suggestedText: 'Jan 2021 - Present, Jan 2019 - Dec 2021',
      explanation: 'Consistent formatting improves readability and professional appearance.'
    },
    {
      id: 4,
      category: 'ats',
      type: 'high',
      title: 'ATS-Friendly Headers',
      description: 'Replace fancy headers with standard section names',
      impact: 'High Impact',
      section: 'Headers',
      originalText: 'Professional Journey',
      suggestedText: 'Work Experience',
      explanation: 'Standard headers are better recognized by Applicant Tracking Systems.'
    },
    {
      id: 5,
      category: 'content',
      type: 'medium',
      title: 'Action Verb Enhancement',
      description: 'Use stronger action verbs to start bullet points',
      impact: 'Medium Impact',
      section: 'Experience',
      originalText: 'Worked on developing new features',
      suggestedText: 'Spearheaded development of 5 new features, increasing user engagement by 25%',
      explanation: 'Strong action verbs create more impact and demonstrate leadership.'
    }
  ];

  const filteredSuggestions = activeCategory === 'all' 
    ? mockSuggestions 
    : mockSuggestions.filter(s => s.category === activeCategory);

  const toggleExpanded = (suggestionId) => {
    const newExpanded = new Set(expandedSuggestions);
    if (newExpanded.has(suggestionId)) {
      newExpanded.delete(suggestionId);
    } else {
      newExpanded.add(suggestionId);
    }
    setExpandedSuggestions(newExpanded);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High Impact': return 'text-red-600 bg-red-50';
      case 'Medium Impact': return 'text-yellow-600 bg-yellow-50';
      case 'Low Impact': return 'text-green-600 bg-green-50';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  if (userTier === 'free' && mockSuggestions.length > 3) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center space-y-4">
          <Icon name="Lock" size={48} className="text-text-secondary mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Unlock All Optimization Suggestions
            </h3>
            <p className="text-text-secondary mb-4">
              Get access to {mockSuggestions.length} AI-powered suggestions to optimize your resume
            </p>
          </div>
          <Button variant="default" iconName="Crown" iconPosition="left">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            AI Optimization Suggestions
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Zap" size={16} className="text-primary" />
            <span>{filteredSuggestions.length} suggestions</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              <Icon name={category.icon} size={14} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredSuggestions.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-text-primary mb-2">
              Great Job!
            </h4>
            <p className="text-text-secondary">
              No suggestions found for this category. Your resume looks good!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Icon 
                      name={getTypeIcon(suggestion.type)} 
                      size={20} 
                      className={
                        suggestion.type === 'high' ? 'text-red-500' :
                        suggestion.type === 'medium'? 'text-yellow-500' : 'text-green-500'
                      }
                    />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-text-primary">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {suggestion.description}
                        </p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                            {suggestion.impact}
                          </span>
                          <span className="text-xs text-text-secondary">
                            Section: {suggestion.section}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={expandedSuggestions.has(suggestion.id) ? "ChevronUp" : "ChevronDown"}
                        onClick={() => toggleExpanded(suggestion.id)}
                      />
                    </div>
                    
                    {expandedSuggestions.has(suggestion.id) && (
                      <div className="space-y-3 pt-3 border-t border-border">
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                              Current Text
                            </label>
                            <div className="mt-1 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-sm text-text-primary font-mono">
                                {suggestion.originalText}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                              Suggested Text
                            </label>
                            <div className="mt-1 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-text-primary font-mono">
                                {suggestion.suggestedText}
                              </p>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                              <p className="text-sm text-blue-800">
                                {suggestion.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="default"
                            size="sm"
                            iconName="Check"
                            iconPosition="left"
                            onClick={() => onAcceptSuggestion(suggestion.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="X"
                            iconPosition="left"
                            onClick={() => onRejectSuggestion(suggestion.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationSuggestions;