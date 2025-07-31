import React, { useEffect } from 'react';
        import { Trophy, X } from 'lucide-react';
        

        const AchievementNotification = ({ title, description, onClose }) => {
          useEffect(() => {
            const timer = setTimeout(() => {
              onClose();
            }, 3000);

            return () => clearTimeout(timer);
          }, [onClose]);

          return (
            <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-4">
              <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-success" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        };

        export default AchievementNotification;