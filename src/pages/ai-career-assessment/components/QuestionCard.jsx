import React, { memo, useCallback } from 'react';

const QuestionCard = memo(({ question, onAnswer, selectedAnswer }) => {
  const handleOptionSelect = useCallback((optionValue) => {
    onAnswer(optionValue);
  }, [onAnswer]);

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border">
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-text-primary mb-4 leading-relaxed">
          {question.text}
        </h2>
        {question.description && (
          <p className="text-text-secondary text-sm lg:text-base">
            {question.description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full p-4 lg:p-5 text-left rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === option.value
                ? 'border-primary bg-primary/5 text-primary' :'border-border bg-surface hover:border-primary/30 hover:bg-muted text-text-primary'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                selectedAnswer === option.value
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedAnswer === option.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
              <div>
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
        ))}
      </div>
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';

export default QuestionCard;