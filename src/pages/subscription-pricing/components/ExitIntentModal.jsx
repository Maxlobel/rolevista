import React, { useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExitIntentModal = ({ isOpen, onClose, onAcceptTrial }) => {
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !isOpen) {
        // Mouse left through top of screen
        setTimeout(() => {
          if (!isOpen) {
            // Show modal after small delay
          }
        }, 500);
      }
    };

    if (!isOpen) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-text-primary transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Zap" size={32} color="var(--color-primary)" />
          </div>
          
          <h3 className="text-2xl font-bold text-text-primary mb-2">Wait! Don't Miss Out</h3>
          <p className="text-text-secondary mb-6">
            Get started with our AI career assessment for just $1 and discover your perfect career match in 7 days.
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary line-through">Regular Price: $49</span>
              <span className="text-2xl font-bold text-primary">$1</span>
            </div>
            <div className="text-sm text-success font-medium">Save $48 • Limited Time Offer</div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 text-sm">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-text-primary">Complete AI career assessment</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-text-primary">Get personalized job matches</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-text-primary">7-day full access trial</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={onAcceptTrial}
              className="h-12 text-base font-semibold"
            >
              Start $1 Trial Now
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={onClose}
              className="text-sm"
            >
              No thanks, I'll pay full price
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Cancel anytime • No hidden fees • Secure payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;