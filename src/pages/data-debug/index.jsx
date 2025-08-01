import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, User, ClipboardList, RefreshCw, Download, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';

const DataDebugPage = () => {
  const navigate = useNavigate();
  const [debugData, setDebugData] = useState({
    userProfile: null,
    assessmentResults: null,
    assessmentProgress: null,
    rawStorage: {}
  });

  const loadDebugData = () => {
    const data = {
      userProfile: null,
      assessmentResults: null,
      assessmentProgress: null,
      rawStorage: {}
    };

    // Get all localStorage data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = localStorage.getItem(key);
        data.rawStorage[key] = JSON.parse(value);
      } catch {
        data.rawStorage[key] = localStorage.getItem(key);
      }
    }

    // Parse specific items
    try {
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        data.userProfile = JSON.parse(userProfile);
      }
    } catch (error) {
      console.error('Error parsing userProfile:', error);
    }

    try {
      const assessmentResults = localStorage.getItem('assessment_results');
      if (assessmentResults) {
        data.assessmentResults = JSON.parse(assessmentResults);
      }
    } catch (error) {
      console.error('Error parsing assessment_results:', error);
    }

    try {
      const assessmentProgress = localStorage.getItem('assessment_progress');
      if (assessmentProgress) {
        data.assessmentProgress = JSON.parse(assessmentProgress);
      }
    } catch (error) {
      console.error('Error parsing assessment_progress:', error);
    }

    setDebugData(data);
  };

  useEffect(() => {
    loadDebugData();
  }, []);

  const exportData = () => {
    const dataStr = JSON.stringify(debugData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `rolevista-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearAllData = () => {
    const confirmed = window.confirm('Are you sure you want to clear all stored data? This cannot be undone.');
    if (confirmed) {
      localStorage.clear();
      loadDebugData();
      alert('All data cleared successfully!');
    }
  };

  const clearSpecificData = (key) => {
    const confirmed = window.confirm(`Are you sure you want to clear "${key}"?`);
    if (confirmed) {
      localStorage.removeItem(key);
      loadDebugData();
      alert(`"${key}" cleared successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">RoleVista Data Debug</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadDebugData}
              iconName="RefreshCw"
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
            >
              Back to App
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Data Storage Debug
          </h1>
          <p className="text-muted-foreground">
            View and manage your locally stored assessment data
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button onClick={exportData} iconName="Download" variant="outline">
            Export All Data
          </Button>
          <Button onClick={clearAllData} iconName="Trash2" variant="destructive">
            Clear All Data
          </Button>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* User Profile */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold">User Profile</h2>
              {debugData.userProfile && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => clearSpecificData('userProfile')}
                  className="ml-auto"
                >
                  Clear
                </Button>
              )}
            </div>
            
            {debugData.userProfile ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Full Name:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {debugData.userProfile.fullName || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">First Name:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {debugData.userProfile.firstName || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Last Name:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {debugData.userProfile.lastName || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No user profile data found</p>
                <p className="text-sm">Complete the name setup to see data here</p>
              </div>
            )}
          </div>

          {/* Assessment Results */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center mb-4">
              <ClipboardList className="w-5 h-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Assessment Results</h2>
              {debugData.assessmentResults && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => clearSpecificData('assessment_results')}
                  className="ml-auto"
                >
                  Clear
                </Button>
              )}
            </div>
            
            {debugData.assessmentResults ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Completed:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {new Date(debugData.assessmentResults.completedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Duration:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {debugData.assessmentResults.duration} minutes
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Questions:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {debugData.assessmentResults.totalQuestions}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Answers:</span>
                    <p className="font-mono bg-muted p-2 rounded mt-1">
                      {Object.keys(debugData.assessmentResults.answers || {}).length}
                    </p>
                  </div>
                </div>

                {/* Sample Answers */}
                {debugData.assessmentResults.answers && (
                  <div>
                    <span className="font-medium text-muted-foreground">Sample Answers:</span>
                    <div className="bg-muted p-3 rounded mt-2 max-h-48 overflow-y-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap">
                        {JSON.stringify(debugData.assessmentResults.answers, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ClipboardList className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No assessment results found</p>
                <p className="text-sm">Complete the assessment to see data here</p>
              </div>
            )}
          </div>

        </div>

        {/* All localStorage Data */}
        <div className="mt-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">All Stored Data</h2>
            <div className="bg-muted p-4 rounded max-h-96 overflow-y-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {JSON.stringify(debugData.rawStorage, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 How Data Storage Works</h3>
          <div className="text-blue-800 space-y-2 text-sm">
            <p><strong>Current Setup:</strong> All data is stored locally in your browser (localStorage)</p>
            <p><strong>User Profile:</strong> Saved when you enter your name at the start</p>
            <p><strong>Assessment Results:</strong> Saved when you complete all 15 questions</p>
            <p><strong>Data Persistence:</strong> Data stays until you clear browser data or use "Clear" buttons above</p>
            <p><strong>Future:</strong> We'll add backend database storage for permanent data retention</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataDebugPage; 