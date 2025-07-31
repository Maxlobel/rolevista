import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, AlertCircle, Briefcase, Bell, SlidersHorizontal, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import JobCard from './components/JobCard';
import JobDetails from './components/JobDetails';
import SearchFilters from './components/SearchFilters';
import SavedJobsAlert from './components/SavedJobsAlert';


const JobMatchesSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set([1, 3]));
  const [isLoading, setIsLoading] = useState(false);
  const [showPremiumLimit, setShowPremiumLimit] = useState(false);
  const [viewedJobs, setViewedJobs] = useState(0);
  const [sortBy, setSortBy] = useState('fit_score');

  const [filters, setFilters] = useState({
    fitScore: 90,
    salary: { min: 0, max: 200000 },
    location: 'all',
    remote: false,
    experience: 'all',
    jobType: 'all',
    company: 'all'
  });

  // Mock job data with Indeed-style information
  const [jobListings] = useState([
    {
      id: 1,
      title: 'Senior Product Manager',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $160,000',
      fitScore: 94,
      logo: null,
      posted: '2 days ago',
      applicants: 23,
      type: 'Full-time',
      remote: true,
      experience: 'senior',
      description: 'Lead product strategy and development for our flagship platform. Work with cross-functional teams to define product roadmaps and drive user engagement.',
      requirements: ['Product Strategy', 'Leadership', 'Analytics', 'Agile Methodology'],
      benefits: ['Health Insurance', '401k', 'Stock Options', 'Flexible Hours'],
      companyRating: 4.2,
      companySize: '1,000-5,000',
      industry: 'Technology'
    },
    {
      id: 2,
      title: 'UX Design Lead',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$110,000 - $140,000',
      fitScore: 89,
      logo: null,
      posted: '1 week ago',
      applicants: 15,
      type: 'Full-time',
      remote: false,
      experience: 'senior',
      description: 'Shape the user experience across our product suite. Lead a team of designers and collaborate with product and engineering teams.',
      requirements: ['User Research', 'Design Systems', 'Leadership', 'Figma'],
      benefits: ['Health Insurance', 'Dental', 'Creative Budget', 'Wellness Program'],
      companyRating: 4.5,
      companySize: '100-500',
      industry: 'Design'
    },
    {
      id: 3,
      title: 'Innovation Manager',
      company: 'Global Enterprises',
      location: 'Austin, TX',
      salary: '$100,000 - $130,000',
      fitScore: 87,
      logo: null,
      posted: '3 days ago',
      applicants: 31,
      type: 'Full-time',
      remote: true,
      experience: 'mid',
      description: 'Drive innovation initiatives across the organization. Identify emerging trends and develop strategic recommendations.',
      requirements: ['Strategy', 'Innovation', 'Project Management', 'Research'],
      benefits: ['Health Insurance', '401k', 'Flexible PTO', 'Learning Budget'],
      companyRating: 3.9,
      companySize: '5,000+',
      industry: 'Consulting'
    },
    {
      id: 4,
      title: 'Business Analyst',
      company: 'FinTech Solutions',
      location: 'Chicago, IL',
      salary: '$85,000 - $110,000',
      fitScore: 82,
      logo: null,
      posted: '5 days ago',
      applicants: 19,
      type: 'Full-time',
      remote: true,
      experience: 'mid',
      description: 'Analyze business processes and requirements. Work with stakeholders to identify improvement opportunities and drive data-driven decisions.',
      requirements: ['Data Analysis', 'Business Intelligence', 'SQL', 'Excel'],
      benefits: ['Health Insurance', 'Dental', 'Stock Options', 'Remote Work'],
      companyRating: 4.1,
      companySize: '500-1,000',
      industry: 'Finance'
    },
    {
      id: 5,
      title: 'Strategy Consultant',
      company: 'McKinsey & Co',
      location: 'Boston, MA',
      salary: '$140,000 - $180,000',
      fitScore: 91,
      logo: null,
      posted: '1 day ago',
      applicants: 42,
      type: 'Full-time',
      remote: false,
      experience: 'senior',
      description: 'Provide strategic advisory services to Fortune 500 clients. Lead complex problem-solving initiatives and drive business transformation.',
      requirements: ['Strategic Thinking', 'Client Management', 'Analysis', 'Presentation'],
      benefits: ['Health Insurance', 'Bonus', 'Travel Opportunities', 'Professional Development'],
      companyRating: 4.7,
      companySize: '10,000+',
      industry: 'Consulting'
    }
  ]);

  const filteredAndSortedJobs = jobListings
    .filter(job => {
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (job.fitScore < filters.fitScore) return false;
      if (filters.location !== 'all' && job.location !== filters.location) return false;
      if (filters.remote && !job.remote) return false;
      if (filters.experience !== 'all' && job.experience !== filters.experience) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'fit_score': return b.fitScore - a.fitScore;
        case 'salary': return parseInt(b.salary.split(' - ')[1].replace(/[^0-9]/g, '')) - 
                              parseInt(a.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
        case 'date': return new Date(b.posted) - new Date(a.posted);
        case 'company': return b.companyRating - a.companyRating;
        default: return 0;
      }
    });

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setViewedJobs(prev => prev + 1);
    
    // Show premium limit after viewing 3 jobs (free tier limit)
    if (viewedJobs >= 2) {
      setShowPremiumLimit(true);
    }
  };

  const handleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleApplyJob = (jobId) => {
    // TODO: Implement job application flow
    // Navigate to application flow
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleSetJobAlert = () => {
    // TODO: Implement job alert subscription
    // Implement job alert functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg">RoleVista</span>
          </div>

          {/* Search Bar - Mobile Hidden, Desktop Visible */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Bell"
              iconPosition="left"
              onClick={handleSetJobAlert}
              className="hidden sm:flex"
            >
              Job Alerts
            </Button>
            
            <button 
              onClick={() => navigate('/career-profile-dashboard')}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">SC</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Panel - Job List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Controls */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Job Matches</h1>
                <p className="text-muted-foreground">
                  {filteredAndSortedJobs.length} AI-curated opportunities • {savedJobs.size} saved
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-background border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="fit_score">Best Match</option>
                    <option value="salary">Highest Salary</option>
                    <option value="date">Most Recent</option>
                    <option value="company">Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                  onClick={() => setIsFilterOpen(true)}
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* Premium Limit Warning */}
            {showPremiumLimit && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Viewing Limit Reached</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You've viewed 3/3 detailed job analyses. Upgrade to Premium for unlimited access.
                    </p>
                    <Button size="sm" className="mt-2">Upgrade Now</Button>
                  </div>
                  <button 
                    onClick={() => setShowPremiumLimit(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Job Cards */}
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                          <div className="h-3 bg-muted rounded w-1/3"></div>
                        </div>
                        <div className="h-6 bg-muted rounded-full w-16"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredAndSortedJobs.length > 0 ? (
                filteredAndSortedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.has(job.id)}
                    onSave={() => handleSaveJob(job.id)}
                    onApply={() => handleApplyJob(job.id)}
                    onClick={() => handleJobClick(job)}
                    isSelected={selectedJob?.id === job.id}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Job Details (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              {selectedJob ? (
                <JobDetails
                  job={selectedJob}
                  isSaved={savedJobs.has(selectedJob.id)}
                  onSave={() => handleSaveJob(selectedJob.id)}
                  onApply={() => handleApplyJob(selectedJob.id)}
                />
              ) : (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">Select a job to view details</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any job listing to see comprehensive information and apply
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Search Filters Modal */}
      {isFilterOpen && (
        <SearchFilters
          filters={filters}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setIsFilterOpen(false);
          }}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {/* Saved Jobs Alert */}
      {savedJobs.size > 0 && (
        <SavedJobsAlert 
          savedCount={savedJobs.size}
          onView={() => navigate('/saved-jobs')}
        />
      )}
    </div>
  );
};

export default JobMatchesSearch;