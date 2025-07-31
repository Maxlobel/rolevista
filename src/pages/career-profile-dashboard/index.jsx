import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Menu, X, TrendingUp, Target, Award, Star, Share2, Filter, ChevronRight, BarChart3, Users, Briefcase, Trophy, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';
import SkillHeatmap from './components/SkillHeatmap';
import RoleRecommendations from './components/RoleRecommendations';
import ProgressTracker from './components/ProgressTracker';
import PremiumUpgrade from './components/PremiumUpgrade';
import SocialProof from './components/SocialProof';
import FilterModal from './components/FilterModal';

const CareerProfileDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    industry: 'all',
    experienceLevel: 'all',
    location: 'all'
  });

  // Simulated user data
  const [userProfile] = useState({
    name: 'Sarah Chen',
    avatar: null,
    careerArchetype: 'Strategic Innovator',
    overallFitScore: 89,
    completedAt: '2025-01-31',
    skills: {
      strengths: ['Strategic Thinking', 'Leadership', 'Innovation', 'Problem Solving'],
      midLevel: ['Data Analysis', 'Communication', 'Project Management'],
      gaps: ['Technical Skills', 'Financial Modeling', 'Marketing']
    },
    achievements: [
      { id: 1, title: 'Assessment Complete', icon: 'Target', earned: true },
      { id: 2, title: 'Profile Builder', icon: 'User', earned: true },
      { id: 3, title: 'First Application', icon: 'Briefcase', earned: false },
      { id: 4, title: 'Skill Improver', icon: 'TrendingUp', earned: false }
    ]
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRoleSave = (roleId) => {
    // TODO: Implement role saving API
    // Implement save functionality
  };

  const handleRoleApply = (roleId) => {
    // TODO: Implement role application flow
    // Navigate to application flow
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setShowFilterModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Side - Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg">RoleVista</span>
            </div>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium">{userProfile.name}</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <a href="#overview" className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted">
                Dashboard
              </a>
              <a href="#skills" className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Skills Analysis
              </a>
              <a href="#recommendations" className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Role Matches
              </a>
              <a href="#progress" className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                Progress
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <nav className="space-y-1">
                <a href="#overview" className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-primary/10 text-primary">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Dashboard
                </a>
                <a href="#skills" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Target className="w-4 h-4 mr-3" />
                  Skills Analysis
                </a>
                <a href="#recommendations" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Users className="w-4 h-4 mr-3" />
                  Role Matches
                </a>
                <a href="#progress" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Trophy className="w-4 h-4 mr-3" />
                  Progress
                </a>
              </nav>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="Briefcase"
                    iconPosition="left"
                    onClick={() => navigate('/job-matches-search')}
                  >
                    Find Jobs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Share Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <section id="overview" className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                      Welcome back, {userProfile.name}!
                    </h1>
                    <p className="text-muted-foreground">
                      Your career archetype: <span className="font-semibold text-primary">{userProfile.careerArchetype}</span>
                    </p>
                  </div>
                  
                  <div className="text-center sm:text-right">
                    <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Star className="w-5 h-5" />
                      <span className="font-semibold text-lg">{userProfile.overallFitScore}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Overall Fit Score</p>
                  </div>
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground">Role Matches</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">7</p>
                      <p className="text-xs text-muted-foreground">Skills Strengths</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">3</p>
                      <p className="text-xs text-muted-foreground">Improvement Areas</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">2</p>
                      <p className="text-xs text-muted-foreground">Achievements</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Heatmap Section */}
            <section id="skills">
              <SkillHeatmap skills={userProfile.skills} />
            </section>

            {/* Role Recommendations Section */}
            <section id="recommendations">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Top Role Recommendations</h2>
                  <p className="text-muted-foreground">AI-curated opportunities based on your profile</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Filter"
                    iconPosition="left"
                    onClick={() => setShowFilterModal(true)}
                  >
                    Filter
                  </Button>
                  <Button
                    size="sm"
                    iconName="ChevronRight"
                    iconPosition="right"
                    onClick={() => navigate('/job-matches-search')}
                  >
                    View All
                  </Button>
                </div>
              </div>
              
              <RoleRecommendations 
                onSave={handleRoleSave}
                onApply={handleRoleApply}
                filters={filters}
              />
            </section>

            {/* Progress Tracking Section */}
            <section id="progress">
              <ProgressTracker achievements={userProfile.achievements} />
            </section>

            {/* Premium Upgrade Section */}
            <PremiumUpgrade />

            {/* Social Proof Section */}
            <SocialProof />
          </div>
        </div>
      </main>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          filters={filters}
          onApply={handleFilterApply}
          onClose={() => setShowFilterModal(false)}
        />
      )}
    </div>
  );
};

export default CareerProfileDashboard;