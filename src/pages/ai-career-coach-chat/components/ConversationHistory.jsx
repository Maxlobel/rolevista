import React from 'react';
import { History, MessageCircle, Clock, X, Lock } from 'lucide-react';

import Button from '../../../components/ui/Button';

const ConversationHistory = ({ conversations, isPremium, onClose, isMobile = false }) => {
  // Mock conversation data for demo
  const mockConversations = [
    {
      id: 1,
      title: 'Interview Preparation Tips',
      preview: 'We discussed STAR method and common interview questions...',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 12,
      bookmarked: true
    },
    {
      id: 2,
      title: 'Salary Negotiation Strategy',
      preview: 'Covered research methods and negotiation tactics...',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      messageCount: 8,
      bookmarked: false
    },
    {
      id: 3,
      title: 'Career Path Discussion', 
      preview: 'Explored transition from analyst to management...',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      messageCount: 15,
      bookmarked: true
    }
  ];

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleConversationClick = (conversation) => {
    // TODO: Implement conversation loading
    if (onClose) onClose();
  };

  const Component = isMobile ? 'div' : 'div';
  const containerClass = isMobile 
    ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    : "h-full";

  const contentClass = isMobile 
    ? "bg-card border border-border rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden"
    : "h-full";

  return (
    <Component className={containerClass}>
      <div className={contentClass}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Conversation History</h3>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[60vh]">
          {isPremium ? (
            <>
              {mockConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm line-clamp-1">
                      {conversation.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <MessageCircle className="w-3 h-3" />
                      <span>{conversation.messageCount}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {conversation.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(conversation.timestamp)}</span>
                    </div>
                    {conversation.bookmarked && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
              
              <div className="text-center py-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  Load More
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Premium Feature
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade to access conversation history and bookmarks
                </p>
                <Button
                  size="sm"
                  className="text-xs"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
};

export default ConversationHistory;