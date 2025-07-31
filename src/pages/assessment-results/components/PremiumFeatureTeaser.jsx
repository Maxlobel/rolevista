import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PremiumFeatureTeaser = ({ feature, onUpgrade }) => {
  return (
    <div className="relative bg-card border border-border rounded-xl p-6 overflow-hidden">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={24} color="white" />
          </div>
          <h4 className="font-semibold text-text-primary mb-2">Unlock with Pro</h4>
          <p className="text-sm text-text-secondary mb-4 max-w-xs">
            Get detailed insights and personalized recommendations
          </p>
          <Button
            variant="default"
            onClick={onUpgrade}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Upgrade Now
          </Button>
        </div>
      </div>

      {/* Blurred content */}
      <div className="filter blur-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name={feature.icon} size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">{feature.title}</h3>
        </div>

        <div className="space-y-3">
          {feature.previewContent.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-primary text-sm">{item.title}</p>
                <p className="text-xs text-text-secondary">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatureTeaser;