import React from 'react';
import { Brain, TrendingUp, Target, Sparkles } from 'lucide-react';
import Button from '../../../components/ui/Button';

const CareerSummary = ({ topRole, onUpgradeClick }) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            AI Career Intelligence Summary
          </h2>
          
          <div className="prose prose-sm max-w-none text-muted-foreground mb-4">
            <p>
              Based on your assessment responses and career preferences, our AI has identified 
              <strong className="text-foreground"> {topRole?.title}</strong> as your top career match 
              with a <strong className="text-primary">{topRole?.fitScore}% compatibility score</strong>.
            </p>
            <p className="mb-0">
              Your strongest assets include creative problem-solving, strategic thinking, and 
              excellent communication skills. These align perfectly with roles in design, 
              product management, and analytical positions where innovation and user-centricity are valued.
            </p>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Top Match</div>
                <div className="text-xs text-muted-foreground">{topRole?.fitScore}% fit</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-sm font-medium text-foreground">Growth Potential</div>
                <div className="text-xs text-muted-foreground">High in tech</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div>
                <div className="text-sm font-medium text-foreground">Unique Strength</div>
                <div className="text-xs text-muted-foreground">Creative thinking</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onUpgradeClick}
              className="flex-1 sm:flex-none"
            >
              Get Detailed Report
            </Button>
            <Button
              variant="outline"
              onClick={onUpgradeClick}
              className="flex-1 sm:flex-none"
            >
              View Job Matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSummary;