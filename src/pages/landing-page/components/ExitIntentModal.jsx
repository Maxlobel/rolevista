import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExitIntentModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasShown, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    setIsVisible(false);
    // Redirect to subscription with trial offer
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl p-8 m-4 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={32} color="var(--color-warning)" />
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Wait! Don't Miss Out
          </h3>

          {/* Offer */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-primary mb-2">
              $1 Trial
            </div>
            <p className="text-text-secondary">
              Get 7 days of Pro features for just $1. Cancel anytime.
            </p>
          </div>

          {/* Benefits */}
          <div className="text-left mb-8 space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">
                Unlimited AI career coaching
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">
                Priority job matches (90%+ fit)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">
                Career path simulator
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">
                Resume & LinkedIn optimization
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link to="/subscription-pricing" onClick={handleClaim}>
              <Button variant="default" size="lg" fullWidth>
                Claim $1 Trial Now
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              fullWidth 
              onClick={handleClose}
              className="text-text-secondary"
            >
              No thanks, I'll pay full price later
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="flex justify-center items-center space-x-4 mt-6 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={12} />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CreditCard" size={12} />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;