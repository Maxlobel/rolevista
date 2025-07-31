import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeUploader = ({ onFileUpload, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, Word document, or text file.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return;
    }

    onFileUpload(file);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive 
            ? 'border-primary bg-blue-50' :'border-border hover:border-primary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-text-secondary" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              Upload Your Resume
            </h3>
            <p className="text-sm text-text-secondary max-w-md">
              Drag and drop your resume here, or click to browse. Supports PDF, Word, and text files up to 10MB.
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={onButtonClick}
            disabled={isUploading}
            loading={isUploading}
            iconName="FileText"
            iconPosition="left"
          >
            {isUploading ? 'Uploading...' : 'Choose File'}
          </Button>
          
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>PDF</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>Word</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>Text</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;