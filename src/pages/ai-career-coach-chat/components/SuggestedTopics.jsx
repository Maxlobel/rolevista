import React from 'react';
import Icon from '../../../components/AppIcon';

const SuggestedTopics = ({ onTopicClick }) => {
  const topics = [
    {
      id: 'career-transition',
      title: 'Career Transition',
      description: 'Switching industries or roles',
      icon: 'ArrowRight',
      color: 'text-blue-600'
    },
    {
      id: 'salary-negotiation',
      title: 'Salary Negotiation',
      description: 'Getting the pay you deserve',
      icon: 'DollarSign',
      color: 'text-green-600'
    },
    {
      id: 'interview-prep',
      title: 'Interview Preparation',
      description: 'Ace your next interview',
      icon: 'Users',
      color: 'text-purple-600'
    },
    {
      id: 'skill-development',
      title: 'Skill Development',
      description: 'Building relevant expertise',
      icon: 'BookOpen',
      color: 'text-orange-600'
    },
    {
      id: 'work-life-balance',
      title: 'Work-Life Balance',
      description: 'Finding harmony in your career',
      icon: 'Scale',
      color: 'text-teal-600'
    },
    {
      id: 'leadership',
      title: 'Leadership Growth',
      description: 'Developing leadership skills',
      icon: 'Crown',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="w-72 bg-surface border-l border-border p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Suggested Topics</h3>
      
      <div className="space-y-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onTopicClick(topic)}
            className="w-full p-4 bg-muted hover:bg-border rounded-xl text-left transition-colors group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${topic.color}`}>
                <Icon name={topic.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                  {topic.title}
                </h4>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {topic.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-br from-primary to-accent rounded-xl text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={20} />
          <h4 className="font-medium">Pro Tip</h4>
        </div>
        <p className="text-sm opacity-90">
          Be specific about your situation for more personalized advice. Include your industry, experience level, and goals.
        </p>
      </div>
    </div>
  );
};

export default SuggestedTopics;