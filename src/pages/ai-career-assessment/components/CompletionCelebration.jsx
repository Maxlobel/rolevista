import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompletionCelebration = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewResults = () => {
    navigate('/assessment-results');
  };

  if (showAnimation) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Trophy" size={64} color="white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-white/30 rounded-full animate-ping" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Assessment Complete! 🎉
          </h2>
          <p className="text-lg text-text-secondary max-w-md mx-auto">
            Congratulations! Your personalized career insights are being generated...
          </p>
          
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border p-8 shadow-modal max-w-lg w-full">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mb-6">
            <Icon name="CheckCircle" size={40} color="white" />
          </div>
          
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Your Career Profile is Ready!
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Based on your responses, we've identified your top career matches, skill strengths, and personalized recommendations to help you find your ideal role.
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={handleViewResults}
              className="w-full"
              iconName="Eye"
              iconPosition="right"
            >
              View My Results
            </Button>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={16} />
                <span>5 Career Matches</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={16} />
                <span>Skill Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Lightbulb" size={16} />
                <span>AI Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionCelebration;