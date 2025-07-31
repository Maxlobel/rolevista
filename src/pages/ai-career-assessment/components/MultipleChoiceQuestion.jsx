import React from 'react';
import { cn } from '../../../utils/cn';

const MultipleChoiceQuestion = ({ question, selectedAnswer, onAnswerSelect, isLoading }) => {
  return (
    <div className="space-y-3">
      {question.options?.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelect(question.id, option.value)}
          disabled={isLoading}
          className={cn(
            "w-full p-4 text-left border border-border rounded-lg transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            selectedAnswer === option.value && "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2",
            isLoading && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="flex items-start space-x-3">
            <div className={cn(
              "w-4 h-4 rounded-full border-2 border-border flex-shrink-0 mt-0.5 transition-colors",
              selectedAnswer === option.value && "border-primary bg-primary"
            )}>
              {selectedAnswer === option.value && (
                <div className="w-full h-full rounded-full bg-white scale-50" />
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="font-medium text-foreground">
                {option.label}
              </div>
              
              {option.description && (
                <div className="text-sm text-muted-foreground">
                  {option.description}
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;