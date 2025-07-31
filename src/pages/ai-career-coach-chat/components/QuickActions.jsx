import React from 'react';
import { DollarSign, MessageCircle, BookOpen, Calendar } from 'lucide-react';
import { cn } from '../../../utils/cn';

const QuickActions = ({ actions, onActionClick, disabled }) => {
  const getIcon = (iconName) => {
    const icons = {
      DollarSign,
      MessageCircle,
      BookOpen,
      Calendar
    };
    
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground px-1">
        Quick actions to get started:
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.label)}
            disabled={disabled}
            className={cn(
              "inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all",
              disabled 
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/30"
            )}
          >
            {getIcon(action.icon)}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;