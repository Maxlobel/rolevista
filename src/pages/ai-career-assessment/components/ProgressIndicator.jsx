import React from 'react';
import { cn } from '../../../utils/cn';

const ProgressIndicator = ({ progress, currentQuestion, totalQuestions, showLabel = true }) => {
  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out",
            progress > 0 && "shadow-sm"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {currentQuestion}</span>
          <span>{totalQuestions} total</span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;