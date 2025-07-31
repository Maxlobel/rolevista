import React from 'react';

const JobSkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-muted rounded mb-2 w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
        <div className="w-16 h-6 bg-muted rounded-full" />
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-muted rounded mr-2" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-muted rounded mr-2" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-muted rounded mr-2" />
          <div className="h-4 bg-muted rounded w-20" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>

      {/* Skills */}
      <div className="flex space-x-2 mb-4">
        <div className="h-6 bg-muted rounded w-16" />
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-6 bg-muted rounded w-14" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded w-16" />
          <div className="h-8 bg-muted rounded w-16" />
        </div>
        <div className="h-8 bg-muted rounded w-20" />
      </div>
    </div>
  );
};

export default JobSkeletonCard;