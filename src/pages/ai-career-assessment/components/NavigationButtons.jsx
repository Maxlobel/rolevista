import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationButtons = ({ 
  onPrevious, 
  onNext, 
  canGoBack, 
  canGoNext, 
  isLoading,
  isLastQuestion,
  currentStep,
  totalSteps 
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-border">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoBack || isLoading}
        iconName="ChevronLeft"
        iconPosition="left"
        className="min-w-[120px]"
      >
        Previous
      </Button>

      <div className="flex items-center space-x-2 text-sm text-text-secondary">
        <Icon name="Clock" size={16} />
        <span>~{Math.max(1, totalSteps - currentStep)} min remaining</span>
      </div>

      <Button
        variant="default"
        onClick={onNext}
        disabled={!canGoNext || isLoading}
        loading={isLoading}
        iconName={isLastQuestion ? "Check" : "ChevronRight"}
        iconPosition="right"
        className="min-w-[120px]"
      >
        {isLastQuestion ? 'Complete' : 'Next'}
      </Button>
    </div>
  );
};

export default NavigationButtons;