import React from 'react';
import { cn } from '../../../utils/cn';

const AuthTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'signup', label: 'Sign Up' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
            activeTab === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;