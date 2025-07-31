import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onApply, onSave, onNotInterested, isSaved = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getFitScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  const handleApply = async () => {
    setIsLoading(true);
    await onApply(job.id);
    setIsLoading(false);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not disclosed';
    if (!max) return `$${min.toLocaleString()}+`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image 
              src={job.companyLogo} 
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-lg leading-tight mb-1 truncate">
              {job.title}
            </h3>
            <p className="text-text-secondary text-sm">{job.company}</p>
          </div>
        </div>
        
        {/* Fit Score */}
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getFitScoreColor(job.fitScore)}`}>
          {job.fitScore}% fit
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-text-secondary text-sm">
          <Icon name="MapPin" size={16} className="mr-2" />
          <span>{job.location}</span>
          {job.isRemote && (
            <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
              Remote
            </span>
          )}
        </div>
        
        <div className="flex items-center text-text-secondary text-sm">
          <Icon name="DollarSign" size={16} className="mr-2" />
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
        </div>
        
        <div className="flex items-center text-text-secondary text-sm">
          <Icon name="Clock" size={16} className="mr-2" />
          <span>{job.employmentType}</span>
        </div>
      </div>

      {/* Job Description Preview */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Skills Tags */}
      {job.requiredSkills && job.requiredSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.requiredSkills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
              +{job.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSave(job.id)}
            className={isSaved ? 'text-accent' : 'text-text-secondary'}
          >
            <Icon name={isSaved ? "Bookmark" : "BookmarkPlus"} size={16} className="mr-1" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNotInterested(job.id)}
            className="text-text-secondary hover:text-destructive"
          >
            <Icon name="X" size={16} className="mr-1" />
            Pass
          </Button>
        </div>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleApply}
          loading={isLoading}
          className="min-w-[80px]"
        >
          Apply Now
        </Button>
      </div>

      {/* Premium Badge for High Fit Scores */}
      {job.fitScore >= 90 && job.isPremium && (
        <div className="absolute top-2 right-2 bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
          <Icon name="Crown" size={12} className="mr-1" />
          Premium Match
        </div>
      )}
    </div>
  );
};

export default JobCard;