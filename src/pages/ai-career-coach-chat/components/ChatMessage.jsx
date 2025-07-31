import React, { useState } from 'react';
import { Bot, User, Copy, Bookmark, Volume2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '../../../utils/cn';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, userAvatar, isPremium, speechSynthesis }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      speechSynthesis.speak(utterance);
    }
  };

  const handleFeedback = (type) => {
    setFeedback(type);
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const renderMessageContent = (content) => {
    // Split content by double newlines to create paragraphs
    const paragraphs = content.split('\n\n');

    return paragraphs.map((paragraph, index) => {
      // Check if paragraph contains bullet points or formatting
      if (paragraph.includes('**') || paragraph.includes('•') || paragraph.includes('-')) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="space-y-1">
                    {lines.map((line, lineIndex) => {
              // Bold text formatting
              if (line.includes('**')) {
                const parts = line.split('**');
                return (
                  <div key={lineIndex} className={cn(
                    parts.length > 1 ? "font-semibold text-foreground" : "",
                    line.startsWith('•') || line.startsWith('-') ? "ml-4" : ""
                  )}>
                            {parts.map((part, partIndex) =>
                    <span key={partIndex} className={partIndex % 2 === 1 ? "font-bold" : ""}>
                                {part}
                              </span>
                    )}
                          </div>);

              }

              // Regular line
              return (
                <div key={lineIndex} className={cn(
                  line.startsWith('•') || line.startsWith('-') ? "ml-4 text-muted-foreground" : ""
                )}>
                          {line}
                        </div>);

            })}
                  </div>);

      }

      // Regular paragraph
      return (
        <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>);

    });
  };

  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
                <div className="flex items-start space-x-3 max-w-2xl">
                  <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    {userAvatar ?
            <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full" /> :

            <User className="w-5 h-5 text-white" />
            }
                  </div>
                </div>
              </div>);

  }

  return (
    <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 max-w-2xl">
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="prose prose-sm max-w-none">
                    {renderMessageContent(message.content)}
                  </div>
                  
                  {/* Rich Content Actions */}
                  {message.hasRichContent && message.actions &&
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
                      {message.actions.map((action, index) =>
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="text-xs">

                          {action}
                        </Button>
            )}
                    </div>
          }
                </div>
                
                {/* Message Actions */}
                <div className="flex items-center justify-between mt-2 px-1">
                  <div className="flex items-center space-x-1">
                    <button
              onClick={handleCopy}
              className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
              title="Copy message">

                      <Copy className="w-4 h-4" />
                    </button>
                    
                    {isPremium &&
            <>
                        <button
                onClick={handleBookmark}
                className={cn(
                  "p-1 rounded transition-colors",
                  isBookmarked ?
                  "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                )}
                title="Bookmark message">

                          <Bookmark className="w-4 h-4" />
                        </button>
                        
                        <button
                onClick={handleSpeak}
                className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                title="Read aloud">

                          <Volume2 className="w-4 h-4" />
                        </button>
                      </>
            }
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Feedback buttons */}
                    <div className="flex items-center space-x-1">
                      <button
                onClick={() => handleFeedback('up')}
                className={cn(
                  "p-1 rounded transition-colors",
                  feedback === 'up' ?
                  "text-success bg-success/10" : "text-muted-foreground hover:text-foreground"
                )}
                title="Helpful">

                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button
                onClick={() => handleFeedback('down')}
                className={cn(
                  "p-1 rounded transition-colors",
                  feedback === 'down' ?
                  "text-error bg-error/10" : "text-muted-foreground hover:text-foreground"
                )}
                title="Not helpful">

                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>);

};

export default ChatMessage;