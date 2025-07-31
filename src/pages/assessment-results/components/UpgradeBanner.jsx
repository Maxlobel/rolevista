import React, { useState } from 'react';
import { X, Crown, ArrowRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

const UpgradeBanner = ({ onUpgradeClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky bottom-0 z-30 bg-gradient-to-r from-primary via-primary to-accent border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-foreground">
                <span className="hidden sm:inline">
                  Unlock full career insights and get matched with 500+ jobs.
                </span>
                <span className="sm:hidden">
                  Get full insights & job matches
                </span>
              </p>
              <p className="text-xs text-primary-foreground/80 hidden sm:block">
                Limited time: 50% off your first month
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={onUpgradeClick}
              className="bg-white text-primary hover:bg-gray-100"
            >
              <span className="hidden sm:inline">Upgrade Now</span>
              <span className="sm:hidden">Upgrade</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBanner;