import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Upload, FileText, Download, Check, X, Sparkles, Target, TrendingUp } from 'lucide-react';
import Button from 'components/ui/Button';
import UploadArea from './components/UploadArea';
import ResumePreview from './components/ResumePreview';
import AIAnalysis from './components/AIAnalysis';
import SuggestionsList from './components/SuggestionsList';
import OptimizationScore from './components/OptimizationScore';

const ResumeOptimizerTool = () => {
  const [uploadedResume, setUploadedResume] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(65);
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (file) => {
    setUploadedResume(file);
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      setSuggestions([
        {
          id: 1,
          category: 'Keywords',
          title: 'Add industry-specific keywords',
          description: 'Include "React", "JavaScript", and "Node.js" to match job requirements',
          impact: 'high',
          accepted: false
        },
        {
          id: 2,
          category: 'Experience',
          title: 'Quantify achievements',
          description: 'Add metrics: "Increased user engagement by 35%"',
          impact: 'medium',
          accepted: false
        },
        {
          id: 3,
          category: 'ATS',
          title: 'Improve formatting',
          description: 'Use standard section headers for better ATS parsing',
          impact: 'low',
          accepted: false
        }
      ]);
    }, 3000);
  };

  const handleSuggestionAccept = (id) => {
    setSuggestions(prev => 
      prev.map(suggestion => 
        suggestion.id === id 
          ? { ...suggestion, accepted: true }
          : suggestion
      )
    );
    setOptimizationScore(prev => Math.min(prev + 10, 100));
  };

  const handleSuggestionReject = (id) => {
    setSuggestions(prev => 
      prev.map(suggestion => 
        suggestion.id === id 
          ? { ...suggestion, accepted: false }
          : suggestion
      )
    );
  };

  return (
    <>
      <Helmet>
        <title>Resume Optimizer Tool - RoleVista AI</title>
        <meta name="description" content="Optimize your resume with AI-powered suggestions tailored to specific job applications" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Resume Optimizer</h1>
                  <p className="text-sm text-gray-600">AI-powered resume enhancement</p>
                </div>
              </div>
              {uploadedResume && (
                <Button className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export Resume</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!uploadedResume ? (
            /* Upload State */
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Optimize Your Resume with AI
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Upload your resume and get personalized suggestions to improve your chances of landing your dream job.
                </p>
              </div>
              
              <UploadArea onFileUpload={handleFileUpload} />
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">ATS Optimization</h3>
                  <p className="text-sm text-gray-600">Ensure your resume passes through applicant tracking systems</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Keyword Analysis</h3>
                  <p className="text-sm text-gray-600">Match your resume with job-specific keywords</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI Suggestions</h3>
                  <p className="text-sm text-gray-600">Get intelligent recommendations for improvement</p>
                </div>
              </div>
            </div>
          ) : (
            /* Analysis State */
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Resume Preview & Score */}
              <div className="space-y-6">
                <OptimizationScore score={optimizationScore} />
                <ResumePreview 
                  file={uploadedResume} 
                  isAnalyzing={isAnalyzing}
                />
              </div>
              
              {/* Right Column - AI Analysis & Suggestions */}
              <div className="space-y-6">
                <AIAnalysis 
                  isAnalyzing={isAnalyzing}
                  analysisComplete={analysisComplete}
                />
                
                {analysisComplete && (
                  <SuggestionsList
                    suggestions={suggestions}
                    onAccept={handleSuggestionAccept}
                    onReject={handleSuggestionReject}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeOptimizerTool;