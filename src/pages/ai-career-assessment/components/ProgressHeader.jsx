import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressHeader = ({ currentQuestion, totalQuestions, progress }) => {
  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Eye" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-text-primary">RoleVista</span>
          </div>
          <div className="text-sm text-text-secondary">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Assessment Progress</span>
            <span className="text-primary font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary text-center mt-2">
            {progress < 50 ? "Great start! Keep going to discover your ideal career path." : 
             progress < 80 ? "You're doing amazing! Almost there.": "Final stretch! Your personalized results are almost ready."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;