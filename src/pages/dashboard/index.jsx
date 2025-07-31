import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@components/AppIcon';
import Button from '@components/ui/Button';
import FitScoreCard from './components/FitScoreCard';
import JobMatchCard from './components/JobMatchCard';
import SkillGapCard from './components/SkillGapCard';
import AICoachPreview from './components/AICoachPreview';
import WeeklyJobAlert from './components/WeeklyJobAlert';
import ProgressTracker from './components/ProgressTracker';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isPro: false,
    joinDate: "January 2025"
  });

  // Mock data
  const fitScoreData = {
    score: 78,
    trend: 'up',
    lastUpdated: 'July 30, 2025'
  };

  const jobMatches = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      fitPercentage: 92,
      description: "Join our innovative team building next-generation web applications using React, Node.js, and cloud technologies.",
      skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL"]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
      location: "Remote",
      salary: "$90k - $110k",
      type: "Full-time",
      fitPercentage: 85,
      description: "Build beautiful, responsive user interfaces for our growing SaaS platform using modern frontend technologies.",
      skills: ["React", "CSS", "JavaScript", "Figma"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Digital Agency",
      companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
      location: "New York, NY",
      salary: "$100k - $130k",
      type: "Contract",
      fitPercentage: 79,
      description: "Work on diverse client projects ranging from e-commerce platforms to custom web applications.",
      skills: ["React", "Python", "PostgreSQL", "Docker"]
    }
  ];

  const skillGaps = [
    {
      name: "Advanced React Patterns",
      currentLevel: "intermediate",
      targetLevel: "advanced",
      coursesAvailable: 12
    },
    {
      name: "System Design",
      currentLevel: "beginner",
      targetLevel: "intermediate",
      coursesAvailable: 8
    },
    {
      name: "Cloud Architecture",
      currentLevel: "beginner",
      targetLevel: "advanced",
      coursesAvailable: 15
    }
  ];

  const aiConversations = [
    {
      message: "Based on your profile, I recommend focusing on system design skills to reach senior-level positions.",
      timestamp: "2 hours ago"
    },
    {
      message: "Your React skills are strong! Consider exploring Next.js to expand your full-stack capabilities.",
      timestamp: "1 day ago"
    }
  ];

  const weeklyAlertData = {
    newJobs: 24,
    highFitJobs: 8,
    frequency: "Weekly",
    nextAlert: "Monday, Aug 5"
  };

  const progressData = {
    streak: 7,
    profileCompletion: 85,
    applicationsSubmitted: 12,
    interviewsScheduled: 3
  };

  const recentActivities = [
    {
      type: 'application',
      description: 'Applied to Senior Software Engineer at TechCorp Inc.',
      timestamp: '2 hours ago'
    },
    {
      type: 'assessment',
      description: 'Completed career assessment update',
      timestamp: '1 day ago'
    },
    {
      type: 'profile_update',
      description: 'Updated skills and experience',
      timestamp: '2 days ago'
    },
    {
      type: 'job_save',
      description: 'Saved 3 new job opportunities',
      timestamp: '3 days ago'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', active: true },
    { name: 'Career Profile', path: '/career-profile-dashboard', icon: 'User' },
    { name: 'Job Matches', path: '/job-matches', icon: 'Target' },
    { name: 'Skill Gaps', path: '/skill-gap-analysis', icon: 'TrendingUp' },
    { name: 'AI Coach', path: '/ai-career-coach-chat', icon: 'MessageCircle' },
    { name: 'Resume Tools', path: '/resume-optimizer-tool', icon: 'FileText' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-border lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Eye" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">RoleVista</span>
          </div>
          <Button variant="ghost" onClick={toggleSidebar}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{currentUser.name}</p>
              <p className="text-xs text-text-secondary truncate">{currentUser.email}</p>
            </div>
          </div>
          
          {!currentUser.isPro && (
            <Link to="/subscription-pricing">
              <Button variant="default" size="sm" fullWidth>
                <Icon name="Crown" size={16} />
                Upgrade to Pro
              </Button>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={toggleSidebar}>
              <Icon name="Menu" size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Eye" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">RoleVista</span>
            </div>
            <Button variant="ghost">
              <Icon name="Bell" size={20} />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-text-secondary">
              Here's your career progress overview for today.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Top Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FitScoreCard 
                  score={fitScoreData.score}
                  trend={fitScoreData.trend}
                  lastUpdated={fitScoreData.lastUpdated}
                />
                <ProgressTracker progressData={progressData} />
              </div>

              {/* Quick Actions */}
              <QuickActions />

              {/* Job Matches */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text-primary">Recent Job Matches</h2>
                  <Link to="/job-matches">
                    <Button variant="ghost" size="sm">
                      View All
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {jobMatches.slice(0, 3).map((job) => (
                    <JobMatchCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              <SkillGapCard skillGaps={skillGaps} />
              <AICoachPreview 
                conversations={aiConversations}
                isPro={currentUser.isPro}
              />
              <WeeklyJobAlert alertData={weeklyAlertData} />
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;