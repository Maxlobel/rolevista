import React from 'react';
import { TrendingUp } from 'lucide-react';

const OptimizationScore = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Optimization Score</h3>
              <p className="text-sm text-gray-600">Overall resume quality</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <div className={`text-sm font-medium ${getScoreColor(score)}`}>
              {getScoreLabel(score)}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationScore;