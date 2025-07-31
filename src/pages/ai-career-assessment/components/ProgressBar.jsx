import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-muted rounded-full h-2 mb-8">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-text-secondary">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;