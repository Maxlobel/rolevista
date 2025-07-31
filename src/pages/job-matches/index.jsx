import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import JobCard from './components/JobCard';
import FilterDrawer from './components/FilterDrawer';
import JobListHeader from './components/JobListHeader';
import PremiumUpgradeModal from './components/PremiumUpgradeModal';
import JobSkeletonCard from './components/JobSkeletonCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const JobMatches = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [viewMode, setViewMode] = useState('card');
  const [sortBy, setSortBy] = useState('fit-score');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    keywords: '',
    location: '',
    salaryRange: '',
    companySize: '',
    employmentType: '',
    remoteOnly: false,
    minFitScore: 0
  });

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
      location: "San Francisco, CA",
      isRemote: true,
      salaryMin: 120000,
      salaryMax: 160000,
      employmentType: "Full-time",
      fitScore: 94,
      isPremium: true,
      description: `We're looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building scalable web applications using React, TypeScript, and modern development practices.`,
      requiredSkills: ["React", "TypeScript", "JavaScript", "CSS", "Node.js"],
      postedDate: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
      location: "New York, NY",
      isRemote: false,
      salaryMin: 110000,
      salaryMax: 140000,
      employmentType: "Full-time",
      fitScore: 87,
      isPremium: false,
      description: `Join our product team to drive the vision and strategy for our core platform. You'll work closely with engineering, design, and business stakeholders to deliver exceptional user experiences.`,
      requiredSkills: ["Product Strategy", "Analytics", "Agile", "User Research"],
      postedDate: new Date(Date.now() - 86400000 * 1)
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Design Studio",
      companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
      location: "Los Angeles, CA",
      isRemote: true,
      salaryMin: 85000,
      salaryMax: 115000,
      employmentType: "Full-time",
      fitScore: 91,
      isPremium: true,
      description: `We're seeking a talented UX/UI Designer to create intuitive and beautiful user experiences. You'll be involved in the entire design process from research to final implementation.`,
      requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      postedDate: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "AI Innovations",
      companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center",
      location: "Austin, TX",
      isRemote: true,
      salaryMin: 130000,
      salaryMax: 170000,
      employmentType: "Full-time",
      fitScore: 82,
      isPremium: false,
      description: `Join our data science team to build machine learning models and extract insights from large datasets. You'll work on cutting-edge AI projects that impact millions of users.`,
      requiredSkills: ["Python", "Machine Learning", "SQL", "Statistics", "TensorFlow"],
      postedDate: new Date(Date.now() - 86400000 * 4)
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      companyLogo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=100&h=100&fit=crop&crop=center",
      location: "Seattle, WA",
      isRemote: true,
      salaryMin: 115000,
      salaryMax: 145000,
      employmentType: "Full-time",
      fitScore: 78,
      isPremium: false,
      description: `We're looking for a DevOps Engineer to help scale our infrastructure and improve our deployment processes. You'll work with modern cloud technologies and automation tools.`,
      requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      postedDate: new Date(Date.now() - 86400000 * 5)
    },
    {
      id: 6,
      title: "Marketing Manager",
      company: "Growth Co.",
      companyLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
      location: "Chicago, IL",
      isRemote: false,
      salaryMin: 75000,
      salaryMax: 95000,
      employmentType: "Full-time",
      fitScore: 73,
      isPremium: false,
      description: `Lead our marketing efforts to drive user acquisition and brand awareness. You'll manage campaigns across multiple channels and work with cross-functional teams.`,
      requiredSkills: ["Digital Marketing", "Analytics", "Content Strategy", "SEO"],
      postedDate: new Date(Date.now() - 86400000 * 6)
    }
  ];

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [jobs, filters, sortBy]);

  const loadJobs = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setJobs(mockJobs);
    setIsLoading(false);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...jobs];

    // Apply filters
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(keywords) ||
        job.company.toLowerCase().includes(keywords) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(keywords))
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        (filters.location === 'remote' && job.isRemote)
      );
    }

    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split('-').map(s => parseInt(s.replace('+', '')));
      filtered = filtered.filter(job => {
        if (filters.salaryRange.includes('+')) {
          return job.salaryMin >= min;
        }
        return job.salaryMin >= min && job.salaryMax <= max;
      });
    }

    if (filters.employmentType) {
      filtered = filtered.filter(job => 
        job.employmentType.toLowerCase() === filters.employmentType.toLowerCase()
      );
    }

    if (filters.remoteOnly) {
      filtered = filtered.filter(job => job.isRemote);
    }

    if (filters.minFitScore > 0) {
      filtered = filtered.filter(job => job.fitScore >= filters.minFitScore);
    }

    // Apply sorting
    switch (sortBy) {
      case 'fit-score':
        filtered.sort((a, b) => b.fitScore - a.fitScore);
        break;
      case 'date':
        filtered.sort((a, b) => b.postedDate - a.postedDate);
        break;
      case 'salary':
        filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
        break;
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      default:
        break;
    }

    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    
    // Show premium modal for high-fit premium jobs
    if (job && job.fitScore >= 90 && job.isPremium) {
      setSelectedJob(job);
      setIsPremiumModalOpen(true);
      return;
    }

    // Simulate apply action
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Applied to ${job?.title} at ${job?.company}!`);
  };

  const handleSave = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleNotInterested = (jobId) => {
    setFilteredJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFiltersAndSort();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      keywords: '',
      location: '',
      salaryRange: '',
      companySize: '',
      employmentType: '',
      remoteOnly: false,
      minFitScore: 0
    };
    setFilters(clearedFilters);
  };

  const loadMoreJobs = () => {
    // Simulate loading more jobs
    setPage(prev => prev + 1);
    // In real app, this would fetch more jobs from API
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto flex">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
              <FilterDrawer
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <JobListHeader
              totalJobs={filteredJobs.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onFilterToggle={() => setIsFilterDrawerOpen(true)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isLoading={isLoading}
            />

            {/* Job List */}
            <div className="p-4">
              {isLoading ? (
                <div className="grid gap-4 md:gap-6">
                  {[...Array(6)].map((_, index) => (
                    <JobSkeletonCard key={index} />
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No jobs found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className={`grid gap-4 md:gap-6 ${
                    viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                  }`}>
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onApply={handleApply}
                        onSave={handleSave}
                        onNotInterested={handleNotInterested}
                        isSaved={savedJobs.has(job.id)}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && filteredJobs.length >= 6 && (
                    <div className="text-center mt-8">
                      <Button
                        variant="outline"
                        onClick={loadMoreJobs}
                        className="px-8"
                      >
                        <Icon name="Plus" size={16} className="mr-2" />
                        Load More Jobs
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobMatches;