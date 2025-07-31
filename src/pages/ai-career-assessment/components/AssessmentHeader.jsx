import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AssessmentHeader = ({ onExitClick, userProfile }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Brain" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-text-primary">
            {userProfile ? `Hi ${userProfile.firstName}! Let's find your ideal career` : 'AI Career Assessment'}
          </h1>
          <p className="text-sm text-text-secondary">
            {userProfile ? 'Complete your personalized assessment below' : 'Discover your ideal career path'}
          </p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        onClick={onExitClick}
        iconName="X"
        className="lg:hidden"
      />
      
      <Button
        variant="outline"
        onClick={onExitClick}
        iconName="X"
        iconPosition="left"
        className="hidden lg:flex"
      >
        Exit
      </Button>
    </div>
  );
};

export default AssessmentHeader;