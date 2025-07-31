import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AICoachPreview = ({ conversations, isPro }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">AI Career Coach</h3>
        </div>
        {!isPro && (
          <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full font-medium">
            Pro Feature
          </span>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {conversations.slice(0, 2).map((conversation, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">{conversation.message}</p>
                <span className="text-xs text-text-secondary">{conversation.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isPro ? (
        <div className="text-center p-4 bg-muted/50 rounded-lg mb-4">
          <Icon name="Lock" size={24} className="text-text-secondary mx-auto mb-2" />
          <p className="text-sm text-text-secondary mb-2">
            Unlock unlimited AI coaching sessions
          </p>
          <Button variant="default" size="sm">
            Upgrade to Pro
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 p-3 bg-success/10 rounded-lg mb-4">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">Unlimited coaching available</span>
        </div>
      )}

      <Button variant="outline" fullWidth>
        {isPro ? 'Continue Chat' : 'Start Free Trial'}
      </Button>
    </div>
  );
};

export default AICoachPreview;