import React, { memo, useCallback } from 'react';
import { MapPin, DollarSign, Clock, Star, Bookmark, Building2, Users, TrendingUp, Shield } from 'lucide-react';
import Button from '@components/ui/Button';
import { cn } from '@utils/cn';

const JobCard = memo(({ job, isSaved, onSave, onApply, onClick, isSelected }) => {
  const getFitScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  const getFitScoreBg = (score) => {
    if (score >= 90) return 'bg-success/10 border-success/20';
    if (score >= 80) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const handleCardClick = useCallback((e) => {
    // Prevent click when interacting with buttons
    if (e.target.closest('button')) return;
    onClick?.(job);
  }, [onClick, job]);

  const handleSave = useCallback((e) => {
    e.stopPropagation();
    onSave?.(job.id);
  }, [onSave, job.id]);

  const handleApply = useCallback((e) => {
    e.stopPropagation();
    onApply?.(job.id);
  }, [onApply, job.id]);

  const handleViewDetails = useCallback((e) => {
    e.stopPropagation();
    onClick?.(job);
  }, [onClick, job]);

  return (
    <div 
      className={cn(
        "bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer",
        isSelected && "ring-2 ring-primary/20 border-primary/30"
      )}
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-8 h-8" />
              ) : (
                <Building2 className="w-6 h-6 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-muted-foreground">{job.company}</p>
                {job.companyRating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="text-xs text-muted-foreground">{job.companyRating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Fit Score & Save Button */}
          <div className="flex items-center space-x-2">
            <div className={cn(
              "px-3 py-1 rounded-full border text-sm font-medium",
              getFitScoreBg(job.fitScore),
              getFitScoreColor(job.fitScore)
            )}>
              {job.fitScore}% fit
            </div>
            
            <button
              onClick={handleSave}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isSaved 
                  ? "bg-primary/10 text-primary" :"text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
            {job.remote && <span className="text-primary">• Remote</span>}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Posted {job.posted}</span>
          </div>
        </div>

        {/* Job Description Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        {/* Requirements Preview */}
        <div className="flex flex-wrap gap-2">
          {job.requirements?.slice(0, 4).map((req, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {req}
            </span>
          ))}
          {job.requirements?.length > 4 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{job.requirements.length - 4} more
            </span>
          )}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{job.applicants} applicants</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>{job.type}</span>
            </div>
            {job.companySize && (
              <div className="flex items-center space-x-1">
                <Building2 className="w-3 h-3" />
                <span>{job.companySize} employees</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            
            <Button
              size="sm"
              onClick={handleApply}
              iconName="TrendingUp"
              iconPosition="right"
            >
              Quick Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;