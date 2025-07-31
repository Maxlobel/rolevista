import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobDetailPanel = ({ job, onClose, onApply, onSave, isSaved = false }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!job) return null;

  const getFitScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckSquare' },
    { id: 'company', label: 'Company', icon: 'Building' },
    { id: 'benefits', label: 'Benefits', icon: 'Gift' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image 
                src={job.companyLogo} 
                alt={job.company}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                {job.title}
              </h2>
              <p className="text-text-secondary mb-2">{job.company}</p>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{job.postedDate}</span>
                </span>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Fit Score */}
        <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getFitScoreColor(job.fitScore)} font-medium`}>
          <Icon name="Target" size={16} className="mr-2" />
          {job.fitScore}% Match
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Salary</div>
                <div className="font-semibold text-text-primary">{job.salary}</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Experience</div>
                <div className="font-semibold text-text-primary">{job.experience}</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Type</div>
                <div className="font-semibold text-text-primary">{job.type}</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Remote</div>
                <div className="font-semibold text-text-primary">{job.remote ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Job Description</h3>
              <p className="text-text-secondary leading-relaxed">{job.description}</p>
            </div>

            {/* Skills Match */}
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Skills Match</h3>
              <div className="grid grid-cols-2 gap-3">
                {job.skillsMatch.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                    <span className={`text-sm font-medium ${
                      skill.match >= 90 ? 'text-green-600' :
                      skill.match >= 70 ? 'text-yellow-600': 'text-red-600'
                    }`}>
                      {skill.match}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary mb-3">Preferred Qualifications</h3>
              <ul className="space-y-2">
                {job.preferredQualifications?.map((qual, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Plus" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{qual}</span>
                  </li>
                )) || (
                  <li className="text-text-secondary">No preferred qualifications listed</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3">About {job.company}</h3>
              <p className="text-text-secondary leading-relaxed">
                {job.companyDescription || `${job.company} is a leading technology company focused on innovation and excellence. We're committed to creating products that make a difference in people's lives while fostering a collaborative and inclusive work environment.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Industry</div>
                <div className="font-semibold text-text-primary">{job.industry || 'Technology'}</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Company Size</div>
                <div className="font-semibold text-text-primary">{job.companySize || '1,000-5,000'}</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Founded</div>
                <div className="font-semibold text-text-primary">{job.founded || '2010'}</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm text-text-secondary mb-1">Headquarters</div>
                <div className="font-semibold text-text-primary">{job.headquarters || 'San Francisco, CA'}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-text-primary mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-1 gap-3">
                {(job.benefits || [
                  'Health, dental, and vision insurance',
                  '401(k) with company matching',
                  'Flexible work arrangements',
                  'Professional development budget',
                  'Unlimited PTO',
                  'Stock options',
                  'Free meals and snacks',
                  'Gym membership reimbursement'
                ]).map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => onApply(job)}
          >
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onSave(job)}
            className={isSaved ? 'text-primary border-primary' : ''}
          >
            <Icon name="Heart" size={16} className={isSaved ? 'fill-current' : ''} />
          </Button>
          <Button variant="ghost">
            <Icon name="Share" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPanel;