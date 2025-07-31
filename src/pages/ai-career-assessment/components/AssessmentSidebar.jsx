import React from 'react';
import Icon from '../../../components/AppIcon';

const AssessmentSidebar = ({ currentQuestion, totalQuestions, timeRemaining, completedSections }) => {
  const sections = [
    { id: 1, name: "Personal Interests", questions: "1-5", completed: completedSections.includes(1) },
    { id: 2, name: "Skills & Strengths", questions: "6-10", completed: completedSections.includes(2) },
    { id: 3, name: "Work Preferences", questions: "11-15", completed: completedSections.includes(3) },
    { id: 4, name: "Values & Motivation", questions: "16-20", completed: completedSections.includes(4) }
  ];

  const getCurrentSection = () => {
    if (currentQuestion <= 5) return 1;
    if (currentQuestion <= 10) return 2;
    if (currentQuestion <= 15) return 3;
    return 4;
  };

  return (
    <div className="hidden lg:block w-80 bg-surface border-r border-border p-6">
      <div className="sticky top-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Career Assessment</h3>
          <p className="text-sm text-text-secondary">
            Discover your ideal career path through our AI-powered assessment based on Ikigai principles.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Time Remaining</span>
            <span className="text-sm text-primary font-medium">{timeRemaining} min</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Average completion time: 12-15 minutes</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-text-primary">Assessment Sections</h4>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                getCurrentSection() === section.id
                  ? 'bg-primary/10 border border-primary/20'
                  : section.completed
                  ? 'bg-success/10 border border-success/20' :'bg-muted/50'
              }`}
            >
              <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                section.completed
                  ? 'bg-success text-white'
                  : getCurrentSection() === section.id
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary'
              }`}>
                {section.completed ? (
                  <Icon name="Check" size={12} />
                ) : (
                  section.id
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  getCurrentSection() === section.id ? 'text-primary' : 
                  section.completed ? 'text-success' : 'text-text-primary'
                }`}>
                  {section.name}
                </p>
                <p className="text-xs text-text-secondary">Questions {section.questions}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lightbulb" size={16} className="text-warning" />
            <span className="text-sm font-medium text-text-primary">Pro Tip</span>
          </div>
          <p className="text-xs text-text-secondary">
            Answer honestly for the most accurate career recommendations. There are no right or wrong answers.
          </p>
        </div>

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Your Privacy</span>
          </div>
          <p className="text-xs text-text-secondary">
            Your responses are encrypted and used only to generate your personalized career insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSidebar;