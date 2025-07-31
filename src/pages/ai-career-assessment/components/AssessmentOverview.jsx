import React from 'react';
import { Clock, CheckCircle, Target, BarChart3 } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

const AssessmentOverview = ({ 
  currentQuestion, 
  totalQuestions, 
  progress, 
  timeRemaining, 
  answeredQuestions 
}) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const assessmentSections = [
    { name: 'Personal Values', questions: '1-5', completed: currentQuestion > 5 },
    { name: 'Skills & Interests', questions: '6-10', completed: currentQuestion > 10 },
    { name: 'Work Preferences', questions: '11-15', completed: currentQuestion > 15 },
    { name: 'Career Aspirations', questions: '16-20', completed: false }
  ];

  return (
    <div className="sticky top-24 space-y-6">
      {/* Assessment Progress Card */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Assessment Progress</h3>
        </div>
        
        <ProgressIndicator 
          progress={progress}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
        />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{answeredQuestions}</div>
            <div className="text-xs text-muted-foreground">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">{totalQuestions - answeredQuestions}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>

      {/* Time Remaining Card */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Time Remaining</h3>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{formatTime(timeRemaining)}</div>
          <div className="text-sm text-muted-foreground">Estimated completion</div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Take your time - there's no rush to complete
        </div>
      </div>

      {/* Assessment Sections */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Assessment Sections</h3>
        </div>

        <div className="space-y-3">
          {assessmentSections.map((section, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {section.completed ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    currentQuestion >= (index * 5) + 1 
                      ? 'border-primary bg-primary/20' :'border-muted-foreground'
                  }`} />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  section.completed 
                    ? 'text-success' 
                    : currentQuestion >= (index * 5) + 1 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                }`}>
                  {section.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Questions {section.questions}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Card */}
      <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-foreground text-sm">💡 Assessment Tips</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Answer honestly for best results</li>
          <li>• Go with your first instinct</li>
          <li>• Skip sensitive questions if needed</li>
          <li>• Your progress is automatically saved</li>
        </ul>
      </div>
    </div>
  );
};

export default AssessmentOverview;