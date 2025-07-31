import React from 'react';
import { cn } from '../../../utils/cn';

const SliderQuestion = ({ question, selectedAnswer, onAnswerSelect, isLoading }) => {
  const value = selectedAnswer ?? question.defaultValue ?? 50;
  const min = question.min ?? 0;
  const max = question.max ?? 100;
  const step = question.step ?? 1;

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    onAnswerSelect(question.id, newValue);
  };

  const getSliderLabel = (val) => {
    if (question.labels) {
      const percentage = (val - min) / (max - min);
      const labelIndex = Math.round(percentage * (question.labels.length - 1));
      return question.labels[labelIndex] || '';
    }
    return val.toString();
  };

  return (
    <div className="space-y-6">
      {/* Current Value Display */}
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2">
          {getSliderLabel(value)}
        </div>
        {question.unit && (
          <div className="text-sm text-muted-foreground">
            {question.unit}
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            disabled={isLoading}
            className={cn(
              "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            style={{
              background: `linear-gradient(to right, hsl(var(--color-primary)) 0%, hsl(var(--color-primary)) ${((value - min) / (max - min)) * 100}%, hsl(var(--color-muted)) ${((value - min) / (max - min)) * 100}%, hsl(var(--color-muted)) 100%)`
            }}
          />
        </div>

        {/* Scale Labels */}
        {question.scaleLabels && (
          <div className="flex justify-between text-sm text-muted-foreground px-2">
            <span>{question.scaleLabels.min}</span>
            <span>{question.scaleLabels.max}</span>
          </div>
        )}

        {/* Value Indicators */}
        {question.valueLabels && (
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {question.valueLabels.map((label, index) => (
              <div
                key={index}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  Math.abs(value - label.value) <= 10 
                    ? "bg-primary/10 text-primary" :"bg-muted text-muted-foreground"
                )}
              >
                <div className="font-medium">{label.label}</div>
                <div className="text-xs opacity-70">{label.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Touch Feedback for Mobile */}
      <div className="lg:hidden text-center text-sm text-muted-foreground">
        Drag the slider to adjust your response
      </div>
    </div>
  );
};

export default SliderQuestion;