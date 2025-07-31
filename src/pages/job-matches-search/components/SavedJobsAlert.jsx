import React from 'react';
import { Bookmark, Eye, X } from 'lucide-react';
import Button from '../../../components/ui/Button';

const SavedJobsAlert = ({ savedCount, onView, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm z-40">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Bookmark className="w-4 h-4 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-foreground">Jobs Saved</h3>
          <p className="text-sm text-muted-foreground">
            You have {savedCount} saved job{savedCount !== 1 ? 's' : ''} to review
          </p>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="mt-3 flex space-x-2">
        <Button
          size="sm"
          onClick={onView}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Saved Jobs
        </Button>
      </div>
    </div>
  );
};

export default SavedJobsAlert;