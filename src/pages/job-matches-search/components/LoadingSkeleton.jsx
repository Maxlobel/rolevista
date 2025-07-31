import React from 'react';

const LoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-1 w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            </div>
            <div className="w-16 h-6 bg-muted rounded-full"></div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-12"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="h-4 bg-muted rounded w-24 mb-2"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-20"></div>
              <div className="h-6 bg-muted rounded-full w-18"></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 w-10 bg-muted rounded"></div>
            <div className="h-10 w-10 bg-muted rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;