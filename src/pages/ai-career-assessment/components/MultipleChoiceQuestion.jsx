import React, { memo, useCallback, useState } from 'react';
import { Check } from 'lucide-react';

const MultipleChoiceQuestion = memo(({ question, onAnswer, selectedAnswers = [] }) => {
  const [localSelections, setLocalSelections] = useState(selectedAnswers);
  const maxSelections = question.maxSelections || question.options.length;

  const handleOptionToggle = useCallback((optionValue) => {
    const newSelections = localSelections.includes(optionValue)
      ? localSelections.filter(val => val !== optionValue)
      : [...localSelections, optionValue].slice(0, maxSelections);
    
    setLocalSelections(newSelections);
    onAnswer(newSelections);
  }, [localSelections, onAnswer, maxSelections]);

  const isSelected = (optionValue) => localSelections.includes(optionValue);
  const canSelectMore = localSelections.length < maxSelections;
  const selectionCount = localSelections.length;

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-text-primary leading-relaxed">
            {question.text}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary bg-muted px-3 py-1 rounded-full">
              {selectionCount}/{maxSelections} selected
            </span>
          </div>
        </div>
        
        {question.description && (
          <p className="text-text-secondary text-sm lg:text-base mb-2">
            {question.description}
          </p>
        )}
        
        <p className="text-xs text-text-secondary">
          💡 Select up to {maxSelections} options that best describe you
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const selected = isSelected(option.value);
          const disabled = !selected && !canSelectMore;
          
          return (
            <button
              key={index}
              onClick={() => handleOptionToggle(option.value)}
              disabled={disabled}
              className={`w-full p-4 lg:p-5 text-left rounded-xl border-2 transition-all duration-200 ${
                selected
                  ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                  : disabled
                  ? 'border-border bg-muted/50 text-text-secondary cursor-not-allowed opacity-60'
                  : 'border-border bg-surface hover:border-primary/40 hover:bg-muted text-text-primary'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                  selected
                    ? 'border-primary bg-primary' 
                    : disabled 
                    ? 'border-border bg-muted'
                    : 'border-border bg-white'
                }`}>
                  {selected && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm lg:text-base mb-1">
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-xs lg:text-sm text-text-secondary">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection guidance */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="text-sm text-text-secondary">
          {selectionCount === 0 && (
            <p>👆 Choose the options that resonate most with you</p>
          )}
          {selectionCount > 0 && selectionCount < maxSelections && (
            <p>✨ Great! You can select {maxSelections - selectionCount} more option{maxSelections - selectionCount !== 1 ? 's' : ''}</p>
          )}
          {selectionCount === maxSelections && (
            <p>✅ Perfect! You've selected {maxSelections} options. Click Continue to proceed.</p>
          )}
        </div>
      </div>
    </div>
  );
});

MultipleChoiceQuestion.displayName = 'MultipleChoiceQuestion';

export default MultipleChoiceQuestion;