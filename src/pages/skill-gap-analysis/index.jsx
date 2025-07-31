import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SkillHeatmap from './components/SkillHeatmap';
import SkillDetails from './components/SkillDetails';
import CourseRecommendations from './components/CourseRecommendations';
import ProgressTracker from './components/ProgressTracker';
import SkillCategories from './components/SkillCategories';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SkillGapAnalysis = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('heatmap');
  const [filteredSkills, setFilteredSkills] = useState([]);

  // Mock data for skills
  const allSkills = [
    {
      id: 1,
      name: 'JavaScript',
      category: 'Technical Skills',
      level: 'expert',
      score: 85,
      assessment: `You demonstrate strong proficiency in JavaScript with excellent understanding of ES6+ features, async programming, and modern frameworks. Your code quality and problem-solving approach show advanced capabilities.`,
      timeToImprove: 2,
      recommendations: [
        'Practice advanced design patterns and architectural concepts',
        'Contribute to open-source JavaScript projects',
        'Learn TypeScript for better code maintainability',
        'Master performance optimization techniques'
      ]
    },
    {
      id: 2,
      name: 'React',
      category: 'Technical Skills',
      level: 'expert',
      score: 78,
      assessment: `Strong React skills with good understanding of hooks, state management, and component lifecycle. You can build complex applications but could benefit from advanced optimization techniques.`,
      timeToImprove: 3,
      recommendations: [
        'Master React performance optimization (useMemo, useCallback)',
        'Learn advanced state management patterns (Redux Toolkit, Zustand)',
        'Practice server-side rendering with Next.js',
        'Implement comprehensive testing strategies'
      ]
    },
    {
      id: 3,
      name: 'Node.js',
      category: 'Technical Skills',
      level: 'intermediate',
      score: 65,
      assessment: `Good foundation in Node.js with understanding of basic concepts. You can build simple APIs but need to strengthen knowledge of advanced topics like streams, clustering, and security.`,
      timeToImprove: 4,
      recommendations: [
        'Learn advanced Node.js concepts (streams, workers, clustering)',
        'Master database integration and ORM usage',
        'Implement comprehensive API security measures',
        'Practice building scalable microservices architecture'
      ]
    },
    {
      id: 4,
      name: 'Python',
      category: 'Technical Skills',
      level: 'beginner',
      score: 42,
      assessment: `Basic understanding of Python syntax and concepts. You can write simple scripts but need significant improvement in object-oriented programming, data structures, and frameworks.`,
      timeToImprove: 6,
      recommendations: [
        'Complete comprehensive Python fundamentals course',
        'Practice data structures and algorithms in Python',
        'Learn Django or Flask for web development',
        'Build several hands-on projects to reinforce learning'
      ]
    },
    {
      id: 5,
      name: 'Communication',
      category: 'Soft Skills',
      level: 'intermediate',
      score: 72,
      assessment: `Good communication skills with ability to express ideas clearly in most situations. You handle team discussions well but could improve in presenting to larger audiences and stakeholders.`,
      timeToImprove: 3,
      recommendations: [
        'Join public speaking groups like Toastmasters',
        'Practice presenting technical concepts to non-technical audiences',
        'Improve written communication through technical blogging',
        'Seek feedback on communication style from colleagues'
      ]
    },
    {
      id: 6,
      name: 'Leadership',
      category: 'Soft Skills',
      level: 'beginner',
      score: 38,
      assessment: `Limited leadership experience with basic understanding of team dynamics. You show potential but need to develop confidence, decision-making skills, and team management capabilities.`,
      timeToImprove: 8,
      recommendations: [
        'Take on small team lead responsibilities',
        'Complete leadership development courses',
        'Find a mentor with strong leadership experience',
        'Practice conflict resolution and team motivation techniques'
      ]
    },
    {
      id: 7,
      name: 'Data Analysis',
      category: 'Analytics',
      level: 'intermediate',
      score: 68,
      assessment: `Solid foundation in data analysis with good understanding of statistical concepts and basic tools. You can interpret data effectively but need to strengthen advanced analytics and visualization skills.`,
      timeToImprove: 4,
      recommendations: [
        'Master advanced Excel/Google Sheets functions',
        'Learn SQL for database querying and analysis',
        'Practice with data visualization tools (Tableau, Power BI)',
        'Study statistical analysis and machine learning basics'
      ]
    },
    {
      id: 8,
      name: 'UI/UX Design',
      category: 'Design',
      level: 'beginner',
      score: 45,
      assessment: `Basic understanding of design principles with some experience in design tools. You can create simple interfaces but need to develop stronger visual design skills and user experience knowledge.`,
      timeToImprove: 5,
      recommendations: [
        'Study fundamental design principles and color theory',
        'Master design tools like Figma or Adobe XD',
        'Learn user research and usability testing methods',
        'Build a portfolio of design projects and case studies'
      ]
    }
  ];

  // Mock data for categories
  const categories = [
    {
      name: 'Technical Skills',
      skillCount: 4,
      averageScore: 68
    },
    {
      name: 'Soft Skills',
      skillCount: 2,
      averageScore: 55
    },
    {
      name: 'Analytics',
      skillCount: 1,
      averageScore: 68
    },
    {
      name: 'Design',
      skillCount: 1,
      averageScore: 45
    }
  ];

  // Mock progress data
  const progressData = {
    totalSkillsAssessed: 8,
    skillsImproved: 5,
    coursesCompleted: 3,
    overallImprovement: 23
  };

  useEffect(() => {
    if (selectedCategory) {
      setFilteredSkills(allSkills.filter(skill => skill.category === selectedCategory.name));
    } else {
      setFilteredSkills(allSkills);
    }
  }, [selectedCategory]);

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setActiveTab('details');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSkill(null);
    setActiveTab('heatmap');
  };

  const tabs = [
    { id: 'heatmap', label: 'Skill Heatmap', icon: 'Grid3X3' },
    { id: 'details', label: 'Skill Details', icon: 'FileText' },
    { id: 'courses', label: 'Courses', icon: 'GraduationCap' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <Icon name="BarChart3" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Skill Gap Analysis</h1>
                <p className="text-text-secondary">
                  Identify your strengths, gaps, and get personalized improvement recommendations
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {allSkills.filter(s => s.level === 'expert').length}
                </div>
                <p className="text-sm text-text-secondary">Expert Skills</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {allSkills.filter(s => s.level === 'intermediate').length}
                </div>
                <p className="text-sm text-text-secondary">Developing</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {allSkills.filter(s => s.level === 'beginner').length}
                </div>
                <p className="text-sm text-text-secondary">Skill Gaps</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Math.round(allSkills.reduce((acc, skill) => acc + skill.score, 0) / allSkills.length)}%
                </div>
                <p className="text-sm text-text-secondary">Avg Score</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  iconName={tab.icon}
                  iconPosition="left"
                  iconSize={16}
                  className="mb-2"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <SkillCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'heatmap' && (
                <SkillHeatmap
                  skills={filteredSkills}
                  onSkillSelect={handleSkillSelect}
                  selectedSkill={selectedSkill}
                />
              )}

              {activeTab === 'details' && selectedSkill && (
                <div className="space-y-6">
                  <SkillDetails
                    skill={selectedSkill}
                    onClose={() => setSelectedSkill(null)}
                  />
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-6">
                  {selectedSkill ? (
                    <CourseRecommendations skill={selectedSkill} />
                  ) : (
                    <div className="bg-card rounded-lg border border-border p-8 text-center">
                      <Icon name="GraduationCap" size={48} className="text-text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        Select a Skill to View Courses
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Choose a skill from the heatmap to see personalized course recommendations
                      </p>
                      <Button onClick={() => setActiveTab('heatmap')}>
                        View Skill Heatmap
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'progress' && (
                <ProgressTracker progressData={progressData} />
              )}
            </div>
          </div>

          {/* Premium Upgrade CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary to-blue-600 rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Icon name="Zap" size={48} color="white" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Unlock Advanced Skill Analysis
              </h2>
              <p className="text-blue-100 mb-6">
                Get personalized learning paths, industry trend analysis, and AI-powered skill recommendations with our Pro plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;