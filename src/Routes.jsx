import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Lazy load all page components for better performance
const NotFound = lazy(() => import("pages/NotFound"));
const LandingPage = lazy(() => import("pages/landing-page"));
const UserRegistrationLogin = lazy(() => import("pages/user-registration-login"));
const AICareerAssessment = lazy(() => import("pages/ai-career-assessment"));
const CareerProfileDashboard = lazy(() => import("pages/career-profile-dashboard"));
const JobMatchesSearch = lazy(() => import("pages/job-matches-search"));
const SkillGapAnalysis = lazy(() => import("pages/skill-gap-analysis"));
const AICareerCoachChat = lazy(() => import("pages/ai-career-coach-chat"));
const ResumeOptimizerTool = lazy(() => import("pages/resume-optimizer-tool"));
const SubscriptionPricing = lazy(() => import("pages/subscription-pricing"));
const AssessmentResults = lazy(() => import("pages/assessment-results"));
const Login = lazy(() => import("pages/login"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <RouterRoutes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
            <Route path="/ai-career-assessment" element={<AICareerAssessment />} />
            <Route path="/career-profile-dashboard" element={<CareerProfileDashboard />} />
            <Route path="/job-matches-search" element={<JobMatchesSearch />} />
            <Route path="/skill-gap-analysis" element={<SkillGapAnalysis />} />
            <Route path="/ai-career-coach-chat" element={<AICareerCoachChat />} />
            <Route path="/resume-optimizer-tool" element={<ResumeOptimizerTool />} />
            <Route path="/subscription-pricing" element={<SubscriptionPricing />} />
            <Route path="/assessment-results" element={<AssessmentResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;