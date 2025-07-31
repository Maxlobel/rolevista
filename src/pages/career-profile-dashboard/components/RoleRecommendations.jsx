import React, { useState } from 'react';
import { 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Star, 
  ChevronRight, 
  Building2,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const RoleRecommendations = ({ onSave, onApply, filters }) => {
  const [savedRoles, setSavedRoles] = useState(new Set());

  // Mock job data
  const [jobRoles] = useState([
    {
      id: 1,
      title: 'Senior Product Manager',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      fitScore: 94,
      logo: null,
      requirements: ['Product Strategy', 'Leadership', 'Analytics'],
      posted: '2 days ago',
      applicants: 23,
      type: 'Full-time',
      remote: true,
      industry: 'technology'
    },
    {
      id: 2,
      title: 'UX Design Lead',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$110k - $140k',
      fitScore: 89,
      logo: null,
      requirements: ['User Research', 'Design Systems', 'Leadership'],
      posted: '1 week ago',
      applicants: 15,
      type: 'Full-time',
      remote: false,
      industry: 'design'
    },
    {
      id: 3,
      title: 'Innovation Manager',
      company: 'Global Enterprises',
      location: 'Austin, TX',
      salary: '$100k - $130k',
      fitScore: 87,
      logo: null,
      requirements: ['Strategy', 'Innovation', 'Project Management'],
      posted: '3 days ago',
      applicants: 31,
      type: 'Full-time',
      remote: true,
      industry: 'consulting'
    },
    {
      id: 4,
      title: 'Business Analyst',
      company: 'FinTech Solutions',
      location: 'Chicago, IL',
      salary: '$85k - $110k',
      fitScore: 82,
      logo: null,
      requirements: ['Data Analysis', 'Business Intelligence', 'SQL'],
      posted: '5 days ago',
      applicants: 19,
      type: 'Full-time',
      remote: true,
      industry: 'finance'
    },
    {
      id: 5,
      title: 'Strategy Consultant',
      company: 'McKinsey & Co',
      location: 'Boston, MA',
      salary: '$140k - $180k',
      fitScore: 91,
      logo: null,
      requirements: ['Strategic Thinking', 'Client Management', 'Analysis'],
      posted: '1 day ago',
      applicants: 42,
      type: 'Full-time',
      remote: false,
      industry: 'consulting'
    }
  ]);

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

  const handleSaveRole = (roleId) => {
    const newSavedRoles = new Set(savedRoles);
    if (savedRoles.has(roleId)) {
      newSavedRoles.delete(roleId);
    } else {
      newSavedRoles.add(roleId);
    }
    setSavedRoles(newSavedRoles);
    onSave?.(roleId);
  };

  const handleApplyRole = (roleId) => {
    onApply?.(roleId);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Swipeable Cards */}
      <div className="lg:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {jobRoles.slice(0, 3).map((role) => (
            <div 
              key={role.id} 
              className="flex-none w-80 bg-card border border-border rounded-lg p-6 snap-start"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {role.logo ? (
                        <img src={role.logo} alt={role.company} className="w-8 h-8" />
                      ) : (
                        <Building2 className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.company}</p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "px-3 py-1 rounded-full border text-sm font-medium",
                    getFitScoreBg(role.fitScore),
                    getFitScoreColor(role.fitScore)
                  )}>
                    {role.fitScore}% fit
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{role.location}</span>
                    {role.remote && <span className="text-primary">• Remote</span>}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{role.salary}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Posted {role.posted}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Key Requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {role.requirements.slice(0, 3).map((req, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveRole(role.id)}
                    iconName="Bookmark"
                    iconPosition="left"
                    className={cn(
                      savedRoles.has(role.id) && "bg-primary/10 text-primary border-primary/20"
                    )}
                  >
                    {savedRoles.has(role.id) ? 'Saved' : 'Save'}
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => handleApplyRole(role.id)}
                    className="flex-1"
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobRoles.map((role) => (
          <div 
            key={role.id} 
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {role.logo ? (
                      <img src={role.logo} alt={role.company} className="w-8 h-8" />
                    ) : (
                      <Building2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.company}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSaveRole(role.id)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    savedRoles.has(role.id) 
                      ? "bg-primary/10 text-primary" :"text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Fit Score */}
              <div className={cn(
                "inline-flex items-center space-x-2 px-3 py-2 rounded-lg border",
                getFitScoreBg(role.fitScore)
              )}>
                <Star className="w-4 h-4" />
                <span className={cn("font-medium", getFitScoreColor(role.fitScore))}>
                  {role.fitScore}% match
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{role.location}</span>
                  {role.remote && <span className="text-primary">• Remote</span>}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>{role.salary}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{role.applicants} applicants</span>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Key Requirements:</p>
                <div className="flex flex-wrap gap-1">
                  {role.requirements.map((req, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyRole(role.id)}
                  className="flex-1"
                >
                  View Details
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => handleApplyRole(role.id)}
                  iconName="TrendingUp"
                  iconPosition="right"
                >
                  Quick Apply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleRecommendations;