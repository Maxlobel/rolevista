import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyJobAlert = ({ alertData }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Weekly Job Alert</h3>
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="font-medium text-text-primary">{alertData.newJobs} New Matches</p>
            <p className="text-sm text-text-secondary">This week</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-success">{alertData.highFitJobs} High Fit</p>
            <p className="text-sm text-text-secondary">90%+ match</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Alert frequency</span>
            <span className="text-text-primary font-medium">{alertData.frequency}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Next alert</span>
            <span className="text-text-primary font-medium">{alertData.nextAlert}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-primary/10 rounded-lg">
          <Icon name="Zap" size={16} className="text-primary" />
          <span className="text-sm text-primary font-medium">
            Priority alerts enabled for 90%+ matches
          </span>
        </div>
      </div>

      <Button variant="outline" fullWidth className="mt-4">
        Customize Alerts
      </Button>
    </div>
  );
};

export default WeeklyJobAlert;