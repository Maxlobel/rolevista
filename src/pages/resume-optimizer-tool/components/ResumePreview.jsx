import React from 'react';
import { FileText, Loader2 } from 'lucide-react';

const ResumePreview = ({ file, isAnalyzing }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-gray-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Resume Preview</h3>
            <p className="text-sm text-gray-600">{file?.name}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <div className="text-center">
              <p className="font-medium text-gray-900">Analyzing your resume...</p>
              <p className="text-sm text-gray-600 mt-1">This may take a few moments</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mock Resume Content */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">John Doe</h4>
                  <p className="text-gray-600">Software Developer</p>
                  <p className="text-sm text-gray-500">john.doe@email.com | (555) 123-4567</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Experience</h5>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-800">Frontend Developer</p>
                      <p className="text-sm text-gray-600">Tech Company • 2022 - Present</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Developed responsive web applications using React and JavaScript
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Skills</h5>
                  <p className="text-sm text-gray-700">
                    HTML, CSS, JavaScript, React, Node.js, Git
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              This is a simplified preview. Full document analysis available above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;