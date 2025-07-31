import React from 'react';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Star, 
  Bookmark, 
  Building2,
  Users,
  ExternalLink,
  Share2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const JobDetails = ({ job, isSaved, onSave, onApply }) => {
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

  const matchingSkills = job.requirements?.slice(0, 2) || [];
  const missingSkills = job.requirements?.slice(2, 4) || [];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-8 h-8" />
              ) : (
                <Building2 className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{job.title}</h2>
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
          
          <button
            onClick={onSave}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isSaved 
                ? "bg-primary/10 text-primary" :"text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Fit Score */}
        <div className={cn(
          "inline-flex items-center space-x-2 px-4 py-2 rounded-lg border",
          getFitScoreBg(job.fitScore)
        )}>
          <Star className="w-4 h-4" />
          <span className={cn("font-medium", getFitScoreColor(job.fitScore))}>
            {job.fitScore}% match
          </span>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{job.location}</span>
            {job.remote && <span className="text-primary">• Remote</span>}
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{job.salary}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Posted {job.posted}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{job.applicants} applicants</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{job.type} • {job.companySize} employees</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-medium text-foreground mb-2">Job Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Skills Match Analysis */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Skills Analysis</h3>
          <div className="space-y-3">
            {/* Matching Skills */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">Your Strengths</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchingSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-success/10 text-success text-xs rounded-full border border-success/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            {missingSkills.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-warning">Growth Areas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-warning/10 text-warning text-xs rounded-full border border-warning/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        {job.benefits && (
          <div>
            <h3 className="font-medium text-foreground mb-2">Benefits & Perks</h3>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Company Info */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">About {job.company}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>{job.industry} • {job.companySize} employees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{job.companyRating}/5.0 rating</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Button
            className="w-full"
            onClick={onApply}
            iconName="TrendingUp"
            iconPosition="right"
          >
            Apply Now
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              iconName="Share2"
              iconPosition="left"
            >
              Share
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              iconName="ExternalLink"
              iconPosition="left"
            >
              Company Site
            </Button>
          </div>
        </div>

        {/* Application Tips */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Award className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Application Tips</h4>
              <p className="text-sm text-muted-foreground">
                Based on your profile, emphasize your experience with {matchingSkills[0]} and {matchingSkills[1]}. 
                Consider highlighting relevant projects that demonstrate these skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;