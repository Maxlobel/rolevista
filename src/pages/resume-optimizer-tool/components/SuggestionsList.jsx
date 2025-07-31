import React from 'react';
import { Check, X, AlertCircle, TrendingUp, Target } from 'lucide-react';
import Button from 'components/ui/Button';

const SuggestionsList = ({ suggestions, onAccept, onReject }) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Keywords': return <Target className="h-4 w-4" />;
      case 'Experience': return <TrendingUp className="h-4 w-4" />;
      case 'ATS': return <AlertCircle className="h-4 w-4" />;
      default: return <Check className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="font-semibold text-gray-900">Optimization Suggestions</h3>
        <p className="text-sm text-gray-600 mt-1">
          {suggestions?.filter(s => !s.accepted).length} pending recommendations
        </p>
      </div>
      
      <div className="divide-y">
        {suggestions?.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-6 transition-all duration-200 ${
              suggestion.accepted ? 'bg-green-50 border-l-4 border-l-green-500' : ''
            }`}
          >
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(suggestion.category)}
                    <span className="text-sm font-medium text-gray-700">
                      {suggestion.category}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                      suggestion.impact
                    )}`}
                  >
                    {suggestion.impact} impact
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-1">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {suggestion.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                {suggestion.accepted ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm font-medium">Applied</span>
                  </div>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReject(suggestion.id)}
                      className="flex items-center space-x-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="hidden sm:inline">Reject</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onAccept(suggestion.id)}
                      className="flex items-center space-x-1"
                    >
                      <Check className="h-3 w-3" />
                      <span className="hidden sm:inline">Accept</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsList;