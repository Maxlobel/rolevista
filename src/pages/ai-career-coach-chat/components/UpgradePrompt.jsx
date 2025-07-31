import React from 'react';
import { X, Crown, MessageCircle, History, Mic, Paperclip, Check } from 'lucide-react';
import Button from '../../../components/ui/Button';

const UpgradePrompt = ({ onClose, messageCount, messageLimit }) => {
  const premiumFeatures = [
    {
      icon: MessageCircle,
      title: 'Unlimited Conversations',
      description: 'No message limits - chat as much as you need'
    },
    {
      icon: History,
      title: 'Conversation History',
      description: 'Access all your past conversations and bookmarks'
    },
    {
      icon: Mic,
      title: 'Voice Input',
      description: 'Speak your questions naturally with voice recognition'
    },
    {
      icon: Paperclip,
      title: 'File Uploads',
      description: 'Upload resumes and documents for personalized feedback'
    }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Upgrade to Premium</h2>
              <p className="text-muted-foreground">You've reached your message limit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Usage */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Free Plan Usage</span>
              <span className="text-sm text-muted-foreground">
                {messageCount} / {messageLimit} messages used
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full"
                style={{ width: `${Math.min((messageCount / messageLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Premium Features */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Premium Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-3xl font-bold text-foreground">$19</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get unlimited access to AI Career Coach
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">7-day free trial</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Priority support</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                iconName="Crown"
                iconPosition="left"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
              >
                View All Plans
              </Button>
            </div>
          </div>

          {/* Alternative */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Not ready to upgrade?
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Continue with Free Plan Tomorrow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;