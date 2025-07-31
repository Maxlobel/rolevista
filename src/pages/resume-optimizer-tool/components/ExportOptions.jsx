import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportOptions = ({ resumeData, optimizedVersion }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF',
      icon: 'FileText',
      description: 'Best for job applications',
      recommended: true
    },
    {
      id: 'docx',
      name: 'Word Document',
      icon: 'FileText',
      description: 'Editable format'
    },
    {
      id: 'txt',
      name: 'Plain Text',
      icon: 'FileText',
      description: 'ATS-friendly format'
    },
    {
      id: 'html',
      name: 'HTML',
      icon: 'Code',
      description: 'Web-friendly format'
    }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, this would trigger the actual download
    // TODO: Implement resume export functionality
    
    setIsExporting(false);
  };

  const versions = [
    {
      id: 'original',
      name: 'Original Resume',
      description: 'Your uploaded resume without modifications',
      icon: 'FileText'
    },
    {
      id: 'optimized',
      name: 'Optimized Resume',
      description: 'Resume with all accepted AI suggestions applied',
      icon: 'Zap',
      recommended: true
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Export Resume
      </h3>
      
      <div className="space-y-6">
        {/* Version Selection */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">
            Choose Version
          </h4>
          <div className="space-y-2">
            {versions.map((version) => (
              <div
                key={version.id}
                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
              >
                <input
                  type="radio"
                  id={version.id}
                  name="version"
                  defaultChecked={version.recommended}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <div className="flex items-center space-x-2 flex-1">
                  <Icon name={version.icon} size={16} className="text-text-secondary" />
                  <div>
                    <label
                      htmlFor={version.id}
                      className="font-medium text-text-primary cursor-pointer"
                    >
                      {version.name}
                      {version.recommended && (
                        <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </label>
                    <p className="text-sm text-text-secondary">
                      {version.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Format Selection */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">
            Export Format
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id)}
                className={`p-3 text-left border rounded-lg transition-colors duration-200 ${
                  exportFormat === format.id
                    ? 'border-primary bg-blue-50' :'border-border hover:border-primary hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={format.icon} size={16} className="text-text-secondary" />
                  <span className="font-medium text-text-primary">
                    {format.name}
                  </span>
                  {format.recommended && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {format.description}
                </p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Export Actions */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            onClick={() => handleExport(exportFormat)}
          >
            {isExporting ? 'Exporting...' : `Export as ${exportFormats.find(f => f.id === exportFormat)?.name}`}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              onClick={() => {}}
            >
              Preview
            </Button>
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              onClick={() => {}}
            >
              Share Link
            </Button>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-text-primary mb-3">
            Additional Options
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary focus:ring-primary rounded"
                defaultChecked
              />
              <span className="text-sm text-text-primary">
                Include optimization score report
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary focus:ring-primary rounded"
              />
              <span className="text-sm text-text-primary">
                Include cover letter template
              </span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary focus:ring-primary rounded"
              />
              <span className="text-sm text-text-primary">
                Email me a copy
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;