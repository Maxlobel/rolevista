import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingTransition = ({ message = "Analyzing your response..." }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-surface rounded-xl border border-border p-8 shadow-modal max-w-sm mx-4">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Brain" size={32} className="text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
          
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            AI Processing
          </h3>
          <p className="text-sm text-text-secondary">
            {message}
          </p>
          
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingTransition;