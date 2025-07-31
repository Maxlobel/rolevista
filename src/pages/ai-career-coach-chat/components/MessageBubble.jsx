import React from 'react';
import Icon from '../../../components/AppIcon';


const MessageBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3 max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'ml-auto' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-md' 
            : 'bg-muted text-text-primary rounded-tl-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-surface bg-opacity-20 rounded-lg">
                  <Icon name="Paperclip" size={16} />
                  <span className="text-xs">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {message.suggestions && (
            <div className="mt-3 space-y-2">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="block w-full text-left p-2 text-xs bg-surface bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className={`flex items-center space-x-2 mt-1 text-xs text-text-secondary ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span>{formatTime(timestamp)}</span>
          {isUser && (
            <Icon name="Check" size={12} color="var(--color-success)" />
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;