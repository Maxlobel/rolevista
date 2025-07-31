import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const JobTargeting = ({ onTargetJob, selectedJob }) => {
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [customJobDescription, setCustomJobDescription] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);

  const popularJobs = [
    {
      value: 'software-engineer',
      label: 'Software Engineer',
      description: 'Full-stack development, programming, and software architecture',
      keywords: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git']
    },
    {
      value: 'data-scientist',
      label: 'Data Scientist',
      description: 'Data analysis, machine learning, and statistical modeling',
      keywords: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics', 'R']
    },
    {
      value: 'product-manager',
      label: 'Product Manager',
      description: 'Product strategy, roadmap planning, and stakeholder management',
      keywords: ['Product Strategy', 'Agile', 'Analytics', 'User Research', 'Roadmap', 'Stakeholder Management']
    },
    {
      value: 'marketing-manager',
      label: 'Marketing Manager',
      description: 'Digital marketing, campaign management, and brand strategy',
      keywords: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Campaign Management', 'Brand Strategy']
    },
    {
      value: 'ux-designer',
      label: 'UX Designer',
      description: 'User experience design, prototyping, and user research',
      keywords: ['User Experience', 'Figma', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems']
    }
  ];

  const handleJobSelect = (jobValue) => {
    const selectedJobData = popularJobs.find(job => job.value === jobValue);
    if (selectedJobData) {
      onTargetJob({
        title: selectedJobData.label,
        description: selectedJobData.description,
        keywords: selectedJobData.keywords,
        type: 'popular'
      });
    }
  };

  const handleCustomJobSubmit = () => {
    if (customJobTitle.trim()) {
      onTargetJob({
        title: customJobTitle,
        description: customJobDescription,
        keywords: [],
        type: 'custom'
      });
      setShowCustomForm(false);
      setCustomJobTitle('');
      setCustomJobDescription('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Target Job Role
        </h3>
        {selectedJob && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onTargetJob(null)}
          >
            Clear
          </Button>
        )}
      </div>
      
      {selectedJob ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={20} className="text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-800 mb-1">
                  Targeting: {selectedJob.title}
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  {selectedJob.description}
                </p>
                {selectedJob.keywords && selectedJob.keywords.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-green-800 mb-2">
                      Key Skills to Highlight:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedJob.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              variant="default"
              iconName="Zap"
              iconPosition="left"
              onClick={() => {}}
            >
              Optimize for This Role
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-text-primary mb-3">
              Popular Job Roles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popularJobs.map((job) => (
                <button
                  key={job.value}
                  onClick={() => handleJobSelect(job.value)}
                  className="p-4 text-left border border-border rounded-lg hover:border-primary hover:bg-blue-50 transition-colors duration-200"
                >
                  <h5 className="font-medium text-text-primary mb-1">
                    {job.label}
                  </h5>
                  <p className="text-sm text-text-secondary">
                    {job.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            {!showCustomForm ? (
              <div className="text-center">
                <p className="text-sm text-text-secondary mb-3">
                  Don't see your target role? Add a custom job.
                </p>
                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setShowCustomForm(true)}
                >
                  Add Custom Job
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-medium text-text-primary">
                  Add Custom Job Role
                </h4>
                
                <Input
                  label="Job Title"
                  type="text"
                  placeholder="e.g., Senior DevOps Engineer"
                  value={customJobTitle}
                  onChange={(e) => setCustomJobTitle(e.target.value)}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Job Description (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Paste the job description here to get more targeted optimization suggestions..."
                    value={customJobDescription}
                    onChange={(e) => setCustomJobDescription(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="default"
                    onClick={handleCustomJobSubmit}
                    disabled={!customJobTitle.trim()}
                  >
                    Add Job
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowCustomForm(false);
                      setCustomJobTitle('');
                      setCustomJobDescription('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTargeting;