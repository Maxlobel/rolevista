import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const JobMatchCard = ({ job }) => {
  const getFitColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <Image 
              src={job.companyLogo} 
              alt={job.company}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary">{job.title}</h4>
            <p className="text-sm text-text-secondary">{job.company}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full ${getFitColor(job.fitPercentage)}`}>
          <span className="text-xs font-medium">{job.fitPercentage}% fit</span>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="DollarSign" size={14} />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>{job.type}</span>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="inline-block px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                +{job.skills.length - 3}
              </span>
            )}
          </div>
        </div>
        <Button variant="default" size="sm">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobMatchCard;