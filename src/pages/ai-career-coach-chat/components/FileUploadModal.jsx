import React, { useState, useRef } from 'react';
        import { X, Upload, FileText, AlertCircle } from 'lucide-react';
        import Button from '../../../components/ui/Button';

        const FileUploadModal = ({ onClose, onUpload }) => {
          const [isDragOver, setIsDragOver] = useState(false);
          const [selectedFile, setSelectedFile] = useState(null);
          const [uploadProgress, setUploadProgress] = useState(0);
          const [isUploading, setIsUploading] = useState(false);
          const fileInputRef = useRef(null);

          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
          ];

          const maxFileSize = 5 * 1024 * 1024; // 5MB

          const handleDragOver = (e) => {
            e.preventDefault();
            setIsDragOver(true);
          };

          const handleDragLeave = (e) => {
            e.preventDefault();
            setIsDragOver(false);
          };

          const handleDrop = (e) => {
            e.preventDefault();
            setIsDragOver(false);
            
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
              handleFileSelection(files[0]);
            }
          };

          const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) {
              handleFileSelection(file);
            }
          };

          const handleFileSelection = (file) => {
            // Validate file type
            if (!allowedTypes.includes(file.type)) {
              alert('Please select a PDF, Word document, or text file.');
              return;
            }

            // Validate file size
            if (file.size > maxFileSize) {
              alert('File size must be less than 5MB.');
              return;
            }

            setSelectedFile(file);
          };

          const handleUpload = async () => {
            if (!selectedFile) return;

            setIsUploading(true);
            setUploadProgress(0);

            // Simulate upload progress
            const interval = setInterval(() => {
              setUploadProgress(prev => {
                if (prev >= 100) {
                  clearInterval(interval);
                  setIsUploading(false);
                  onUpload(selectedFile);
                  return 100;
                }
                return prev + 10;
              });
            }, 200);
          };

          const formatFileSize = (bytes) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
          };

          return (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-lg w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Upload Document</h2>
                    <p className="text-sm text-muted-foreground">Upload your resume or document for review</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Upload Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                      ${isDragOver 
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                      }
                    `}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">
                      {isDragOver ? 'Drop your file here' : 'Drag & drop your file here'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, Word, and text files up to 5MB
                    </p>
                  </div>

                  {/* Selected File */}
                  {selectedFile && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{selectedFile.name}</h4>
                          <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Uploading...</span>
                            <span className="text-muted-foreground">{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Info */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground mb-1">How it works:</p>
                        <ul className="text-muted-foreground space-y-1 text-xs">
                          <li>• AI analyzes your document content</li>
                          <li>• Provides personalized feedback and suggestions</li>
                          <li>• Your files are processed securely and not stored</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    loading={isUploading}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    {isUploading ? 'Uploading...' : 'Upload & Analyze'}
                  </Button>
                </div>
              </div>
            </div>
          );
        };

        export default FileUploadModal;