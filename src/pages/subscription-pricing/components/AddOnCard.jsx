import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AddOnCard = ({ addon, onSelectAddon, className = '' }) => {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={addon.icon} size={24} color="var(--color-primary)" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-text-primary mb-1">{addon.name}</h3>
          <p className="text-text-secondary text-sm mb-3">{addon.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-text-primary">${addon.price}</span>
              <span className="text-text-secondary text-sm">one-time</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectAddon(addon)}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>{addon.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
};

export default AddOnCard;