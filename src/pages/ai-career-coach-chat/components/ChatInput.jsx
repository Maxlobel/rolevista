import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, disabled = false, placeholder = "Ask me anything about your career..." }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onSendMessage('', files);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="border-t border-border bg-surface p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                disabled={disabled}
              >
                <Icon name="Paperclip" size={16} />
              </button>
              
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-1.5 transition-colors ${
                  isRecording 
                    ? 'text-destructive' :'text-text-secondary hover:text-text-primary'
                }`}
                disabled={disabled}
              >
                <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="px-4 py-3 rounded-2xl"
          iconName="Send"
          iconSize={16}
        >
          Send
        </Button>
      </form>
      
      {disabled && (
        <div className="mt-2 text-xs text-text-secondary text-center">
          Upgrade to Pro for unlimited conversations
        </div>
      )}
    </div>
  );
};

export default ChatInput;