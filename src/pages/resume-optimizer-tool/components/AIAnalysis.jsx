import React from 'react';
import { Brain, Loader2, CheckCircle } from 'lucide-react';

const AIAnalysis = ({ isAnalyzing, analysisComplete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Brain className="h-5 w-5 text-purple-600" />
          <div>
            <h3 className="font-semibold text-gray-900">AI Analysis</h3>
            <p className="text-sm text-gray-600">Intelligent resume evaluation</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isAnalyzing ? (
          <div className="flex items-center space-x-3 py-4">
            <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
            <div>
              <p className="font-medium text-gray-900">Analyzing content...</p>
              <p className="text-sm text-gray-600">Checking keywords, formatting, and ATS compatibility</p>
            </div>
          </div>
        ) : analysisComplete ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 py-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Analysis Complete</p>
                <p className="text-sm text-gray-600">Found 3 optimization opportunities</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-xs text-gray-600">ATS Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-gray-600">Keywords</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-600">Improvements</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <Brain className="h-8 w-8 mx-auto mb-3 text-gray-400" />
            <p>Upload a resume to begin AI analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;