import React from 'react';
import Icon from '../../../components/AppIcon';


const ChatHeader = ({ isOnline = true, sessionCount = 5 }) => {
  return (
    <div className="bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">AI Career Coach</h2>
          <p className="text-sm text-text-secondary">
            {isOnline ? 'Online • Ready to help' : 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex items-center space-x-1 text-sm text-text-secondary">
          <Icon name="MessageCircle" size={16} />
          <span>{sessionCount} sessions today</span>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Icon name="MoreVertical" size={18} color="var(--color-text-secondary)" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;