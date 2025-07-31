import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Crown, Lock, TrendingUp, ArrowRight, Star, Zap, Brain, Target } from 'lucide-react';
import Button from '../../components/ui/Button';
import CareerRoleCard from './components/CareerRoleCard';
import SkillHeatmap from './components/SkillHeatmap';
import CareerSummary from './components/CareerSummary';
import PremiumUpgradeModal from './components/PremiumUpgradeModal';
import SocialShareButtons from './components/SocialShareButtons';
import UpgradeBanner from './components/UpgradeBanner';

const AssessmentResults = () => {
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Mock data for demonstration
  const [careerRoles] = useState([
    {
      id: 1,
      title: 'UX/UI Designer',
      fitScore: 94,
      salary: '$65,000 - $95,000',
      description: 'Create intuitive and engaging user experiences',
      alignment: 'Your strong creative thinking and problem-solving skills align perfectly with UX design. Your attention to detail and empathy for users make you an ideal candidate.',
      growth: '+15% job growth',
      companies: ['Google', 'Meta', 'Adobe']
    },
    {
      id: 2,
      title: 'Product Manager',
      fitScore: 89,
      salary: '$85,000 - $130,000',
      description: 'Lead product strategy and development',
      alignment: 'Your leadership skills and strategic thinking capabilities strongly match product management requirements. Your analytical mindset is a key strength.',
      growth: '+18% job growth',
      companies: ['Microsoft', 'Amazon', 'Spotify']
    },
    {
      id: 3,
      title: 'Data Analyst',
      fitScore: 85,
      salary: '$55,000 - $80,000',
      description: 'Transform data into actionable insights',
      alignment: 'Your analytical skills and attention to detail make you well-suited for data analysis. Your curiosity about patterns aligns with this role.',
      growth: '+22% job growth',
      companies: ['Netflix', 'Airbnb', 'Uber']
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      fitScore: 82,
      salary: '$45,000 - $70,000',
      description: 'Drive brand awareness and customer engagement',
      alignment: 'Your communication skills and creative approach to problem-solving are strong indicators for marketing success.',
      growth: '+12% job growth',
      companies: ['Nike', 'Coca-Cola', 'Apple']
    },
    {
      id: 5,
      title: 'Business Analyst',
      fitScore: 78,
      salary: '$60,000 - $85,000',
      description: 'Bridge business needs with technical solutions',
      alignment: 'Your structured thinking and communication abilities position you well for business analysis roles.',
      growth: '+14% job growth',
      companies: ['IBM', 'Deloitte', 'McKinsey']
    }
  ]);

  const [skillsData] = useState({
    strengths: [
      { name: 'Creative Thinking', score: 92 },
      { name: 'Problem Solving', score: 89 },
      { name: 'Communication', score: 87 },
      { name: 'Leadership', score: 85 }
    ],
    developing: [
      { name: 'Data Analysis', score: 65 },
      { name: 'Project Management', score: 68 },
      { name: 'Technical Writing', score: 62 }
    ],
    gaps: [
      { name: 'Advanced Excel', score: 45 },
      { name: 'SQL', score: 38 },
      { name: 'Python', score: 42 }
    ]
  });

  useEffect(() => {
    // Load user profile and assessment data
    const timer = setTimeout(() => {
      try {
        // Load user profile
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        }

        // Load assessment results
        const savedResults = localStorage.getItem('assessment_results');
        if (savedResults) {
          const results = JSON.parse(savedResults);
          if (results.userProfile) {
            setUserProfile(results.userProfile);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in assessment results:', error);
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleShareResults = () => {
    // Analytics tracking would go here
    // TODO: Implement social sharing functionality
  };

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
    // Analytics tracking for conversion funnel
    // TODO: Implement premium upgrade flow
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Analyzing your career potential...</p>
        </div>
      </div>
    );
  }

  // Safety check for career data
  if (!careerRoles || careerRoles.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Assessment Complete!</h2>
          <p className="text-muted-foreground">Processing your career recommendations...</p>
          <Button onClick={() => navigate('/ai-career-assessment')}>
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">RoleVista</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <SocialShareButtons onShare={handleShareResults} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/career-profile-dashboard')}
            >
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Brain className="w-6 h-6" />
            <span className="text-sm font-medium">AI Analysis Complete</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {userProfile ? `${userProfile.firstName}'s Career Intelligence Report` : 'Your Career Intelligence Report'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {userProfile ? (
              <>Based on your assessment answers, we've identified career matches perfect for someone with {userProfile.experience} years of experience. 
              {userProfile.currentRole && ` Your background in ${userProfile.currentRole} provides valuable insights for these recommendations.`}</>
            ) : (
              'Based on your assessment, we\'ve identified your top career matches and growth opportunities. Discover roles where you\'ll thrive and skills to develop.'
            )}
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Career Roles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Summary */}
            {careerRoles && careerRoles.length > 0 && (
              <CareerSummary 
                topRole={careerRoles[0]} 
                onUpgradeClick={handleUpgradeClick}
              />
            )}

            {/* Top 5 Career Roles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  Your Top Career Matches
                </h2>
                <div className="text-sm text-muted-foreground">
                  AI Confidence: 94%
                </div>
              </div>

              <div className="space-y-4">
                {careerRoles.map((role, index) => (
                  <CareerRoleCard
                    key={role.id}
                    role={role}
                    rank={index + 1}
                    isExpanded={expandedCard === role.id}
                    onToggleExpand={() => setExpandedCard(
                      expandedCard === role.id ? null : role.id
                    )}
                    onUpgradeClick={handleUpgradeClick}
                  />
                ))}
              </div>
            </div>

            {/* Premium Teasers */}
            <div className="bg-card border border-border rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center space-x-2 mb-4">
                  <Crown className="w-5 h-5 text-warning" />
                  <h3 className="font-semibold text-foreground">Unlock Premium Insights</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Job Matches</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get matched with 500+ job openings tailored to your profile
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Skill Development Plan</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Personalized learning path with course recommendations
                    </p>
                  </div>
                </div>

                <Button onClick={handleUpgradeClick} className="w-full md:w-auto">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills Heatmap */}
            <SkillHeatmap 
              skillsData={skillsData}
              onUpgradeClick={handleUpgradeClick}
            />

            {/* AI Coach Preview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Career Coach</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="bg-muted/50 rounded-lg p-3 blur-sm">
                  <p className="text-sm">Get personalized career advice...</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 blur-sm">
                  <p className="text-sm">Skill development recommendations...</p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleUpgradeClick}
                  className="w-full"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Unlock AI Coach
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Assessment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Roles Analyzed</span>
                  <span className="font-medium">50+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Skills Evaluated</span>
                  <span className="font-medium">25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Match Accuracy</span>
                  <span className="font-medium text-primary">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Upgrade Banner */}
      <UpgradeBanner onUpgradeClick={handleUpgradeClick} />

      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};

export default AssessmentResults;