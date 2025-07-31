import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import NavigationButtons from './components/NavigationButtons';
import LoadingSpinner from './components/LoadingSpinner';
import ExitConfirmationModal from './components/ExitConfirmationModal';
import AssessmentHeader from './components/AssessmentHeader';
import UserProfileSetup from './components/UserProfileSetup';

const AICareerAssessment = () => {
  const navigate = useNavigate();
  const [profileComplete, setProfileComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [assessmentStartTime] = useState(new Date());

  // Mock assessment questions with adaptive flow
  const assessmentQuestions = [
    {
      id: 'skills_technical',
      text: "How would you rate your technical skills?",
      description: "Consider your proficiency with technology, software, and digital tools.",
      type: 'rating',
      options: [
        { value: 'beginner', label: 'Beginner', description: 'Basic understanding of common tools' },
        { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with most software and can learn new tools' },
        { value: 'advanced', label: 'Advanced', description: 'Expert level with ability to teach others' },
        { value: 'expert', label: 'Expert', description: 'Industry-leading expertise and innovation' }
      ]
    },
    {
      id: 'work_environment',
      text: "What type of work environment energizes you most?",
      description: "Think about where you feel most productive and motivated.",
      type: 'preference',
      options: [
        { value: 'collaborative', label: 'Collaborative Team Environment', description: 'Working closely with others on shared goals' },
        { value: 'independent', label: 'Independent Work', description: 'Autonomy to work on projects alone' },
        { value: 'mixed', label: 'Mix of Both', description: 'Balance between teamwork and solo work' },
        { value: 'leadership', label: 'Leading Others', description: 'Guiding and managing team members' }
      ]
    },
    {
      id: 'problem_solving',
      text: "How do you prefer to approach complex problems?",
      description: "Consider your natural problem-solving style.",
      type: 'behavioral',
      options: [
        { value: 'analytical', label: 'Analytical & Data-Driven', description: 'Break down problems with research and data' },
        { value: 'creative', label: 'Creative & Intuitive', description: 'Use imagination and innovative thinking' },
        { value: 'systematic', label: 'Systematic & Process-Oriented', description: 'Follow established methods and procedures' },
        { value: 'collaborative_solving', label: 'Collaborative Discussion', description: 'Work through problems with others' }
      ]
    },
    {
      id: 'motivation_factors',
      text: "What motivates you most in your work?",
      description: "Select what drives your professional satisfaction.",
      type: 'values',
      options: [
        { value: 'impact', label: 'Making a Difference', description: 'Contributing to meaningful causes or helping others' },
        { value: 'growth', label: 'Learning & Growth', description: 'Continuous skill development and new challenges' },
        { value: 'recognition', label: 'Recognition & Achievement', description: 'Being acknowledged for accomplishments' },
        { value: 'stability', label: 'Security & Stability', description: 'Consistent income and job security' }
      ]
    },
    {
      id: 'communication_style',
      text: "How do you prefer to communicate at work?",
      description: "Think about your most effective communication methods.",
      type: 'behavioral',
      options: [
        { value: 'verbal', label: 'Face-to-Face Conversations', description: 'In-person meetings and discussions' },
        { value: 'written', label: 'Written Communication', description: 'Emails, documents, and detailed reports' },
        { value: 'visual', label: 'Visual Presentations', description: 'Charts, diagrams, and visual aids' },
        { value: 'digital', label: 'Digital Collaboration', description: 'Video calls, chat platforms, and online tools' }
      ]
    },
    {
      id: 'work_pace',
      text: "What work pace suits you best?",
      description: "Consider how you manage deadlines and project timelines.",
      type: 'preference',
      options: [
        { value: 'fast_paced', label: 'Fast-Paced & Dynamic', description: 'Quick decisions and rapid project turnover' },
        { value: 'steady', label: 'Steady & Consistent', description: 'Regular workflow with predictable deadlines' },
        { value: 'flexible', label: 'Flexible & Adaptive', description: 'Varying pace based on project needs' },
        { value: 'deep_focus', label: 'Deep Focus Periods', description: 'Extended time for thorough, detailed work' }
      ]
    },
    {
      id: 'learning_style',
      text: "How do you learn new skills most effectively?",
      description: "Think about your preferred learning methods.",
      type: 'behavioral',
      options: [
        { value: 'hands_on', label: 'Hands-On Practice', description: 'Learning by doing and experimenting' },
        { value: 'structured', label: 'Structured Courses', description: 'Formal training and educational programs' },
        { value: 'mentorship', label: 'Mentorship & Guidance', description: 'Learning from experienced professionals' },
        { value: 'self_directed', label: 'Self-Directed Research', description: 'Independent study and exploration' }
      ]
    },
    {
      id: 'career_goals',
      text: "What are your primary career goals?",
      description: "Consider your long-term professional aspirations.",
      type: 'values',
      options: [
        { value: 'expertise', label: 'Become a Subject Matter Expert', description: 'Deep specialization in a specific field' },
        { value: 'leadership', label: 'Move into Leadership Roles', description: 'Managing teams and strategic decisions' },
        { value: 'entrepreneurship', label: 'Start My Own Business', description: 'Building and running my own company' },
        { value: 'balance', label: 'Achieve Work-Life Balance', description: 'Sustainable career with personal fulfillment' }
      ]
    },
    {
      id: 'industry_interest',
      text: "Which industry sectors interest you most?",
      description: "Select the field that aligns with your passions.",
      type: 'preference',
      options: [
        { value: 'technology', label: 'Technology & Innovation', description: 'Software, AI, and emerging technologies' },
        { value: 'healthcare', label: 'Healthcare & Wellness', description: 'Medical, mental health, and wellness services' },
        { value: 'education', label: 'Education & Training', description: 'Teaching, curriculum development, and learning' },
        { value: 'business', label: 'Business & Finance', description: 'Corporate strategy, finance, and consulting' }
      ]
    },
    {
      id: 'work_values',
      text: "What values are most important in your ideal workplace?",
      description: "Consider the culture and environment you thrive in.",
      type: 'values',
      options: [
        { value: 'innovation', label: 'Innovation & Creativity', description: 'Encouraging new ideas and creative solutions' },
        { value: 'diversity', label: 'Diversity & Inclusion', description: 'Welcoming environment for all backgrounds' },
        { value: 'growth_culture', label: 'Growth & Development', description: 'Investment in employee advancement' },
        { value: 'social_impact', label: 'Social Impact', description: 'Contributing to positive social change' }
      ]
    },
    {
      id: 'stress_management',
      text: "How do you handle work-related stress?",
      description: "Think about your coping strategies and resilience.",
      type: 'behavioral',
      options: [
        { value: 'planning', label: 'Detailed Planning & Organization', description: 'Preventing stress through preparation' },
        { value: 'support', label: 'Seeking Team Support', description: 'Collaborating to manage challenging situations' },
        { value: 'breaks', label: 'Regular Breaks & Self-Care', description: 'Maintaining balance through rest and wellness' },
        { value: 'problem_focus', label: 'Direct Problem-Solving', description: 'Addressing issues head-on and quickly' }
      ]
    },
    {
      id: 'decision_making',
      text: "How do you make important decisions?",
      description: "Consider your decision-making process and style.",
      type: 'behavioral',
      options: [
        { value: 'data_driven', label: 'Research & Data Analysis', description: 'Gathering information before deciding' },
        { value: 'intuitive', label: 'Gut Instinct & Experience', description: 'Trusting intuition and past experience' },
        { value: 'consultative', label: 'Consulting Others', description: 'Seeking input from colleagues and experts' },
        { value: 'quick', label: 'Quick & Decisive', description: 'Making rapid decisions with available information' }
      ]
    },
    {
      id: 'success_metrics',
      text: "How do you measure professional success?",
      description: "What indicators tell you you\'re succeeding in your career?",
      type: 'values',
      options: [
        { value: 'impact_results', label: 'Tangible Results & Impact', description: 'Measurable outcomes and achievements' },
        { value: 'skill_mastery', label: 'Skill Mastery & Expertise', description: 'Becoming highly skilled in your field' },
        { value: 'relationships', label: 'Professional Relationships', description: 'Building strong networks and partnerships' },
        { value: 'personal_satisfaction', label: 'Personal Fulfillment', description: 'Feeling satisfied and purposeful in work' }
      ]
    },
    {
      id: 'future_vision',
      text: "Where do you see yourself in 5 years?",
      description: "Envision your ideal professional future.",
      type: 'goals',
      options: [
        { value: 'specialist', label: 'Leading Expert in My Field', description: 'Recognized authority and thought leader' },
        { value: 'manager', label: 'Managing a Team or Department', description: 'Leading others and strategic planning' },
        { value: 'entrepreneur', label: 'Running My Own Business', description: 'Building and scaling my own company' },
        { value: 'balanced_professional', label: 'Balanced Professional Life', description: 'Successful career with personal fulfillment' }
      ]
    },
    {
      id: 'ikigai_passion',
      text: "What activities make you lose track of time?",
      description: "Think about what you\'re naturally drawn to and passionate about.",
      type: 'ikigai',
      options: [
        { value: 'creating', label: 'Creating & Building Things', description: 'Designing, developing, or making something new' },
        { value: 'helping', label: 'Helping & Teaching Others', description: 'Supporting people to achieve their goals' },
        { value: 'analyzing', label: 'Analyzing & Problem-Solving', description: 'Breaking down complex challenges' },
        { value: 'connecting', label: 'Connecting & Networking', description: 'Building relationships and bringing people together' }
      ]
    }
  ];

  const totalQuestions = assessmentQuestions.length;
  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id];

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('assessment_progress');
    if (savedProgress) {
      const { questionIndex, savedAnswers } = JSON.parse(savedProgress);
      setCurrentQuestionIndex(questionIndex);
      setAnswers(savedAnswers);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (questionIndex, currentAnswers) => {
    localStorage.setItem('assessment_progress', JSON.stringify({
      questionIndex,
      savedAnswers: currentAnswers,
      timestamp: new Date().toISOString()
    }));
  };

  const handleAnswer = (answerValue) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: answerValue
    };
    setAnswers(updatedAnswers);
    saveProgress(currentQuestionIndex, updatedAnswers);
  };

  const handleNext = async () => {
    if (!selectedAnswer) return;

    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment completed
      const assessmentData = {
        answers,
        userProfile,
        completedAt: new Date().toISOString(),
        duration: Math.round((new Date() - assessmentStartTime) / 1000 / 60), // minutes
        totalQuestions
      };
      
      localStorage.setItem('assessment_results', JSON.stringify(assessmentData));
      localStorage.removeItem('assessment_progress');
      
      // Navigate to results with celebration
      navigate('/assessment-results', { 
        state: { 
          fromAssessment: true,
          celebrationMode: true 
        } 
      });
    }
    
    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleExitConfirm = () => {
    saveProgress(currentQuestionIndex, answers);
    navigate('/dashboard');
  };

  const canGoNext = selectedAnswer && !isLoading;
  const canGoBack = currentQuestionIndex > 0 && !isLoading;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && canGoNext) {
        handleNext();
      } else if (e.key === 'Escape') {
        setShowExitModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canGoNext]);

  // Check for existing profile data on component mount
  useEffect(() => {
    const existingProfile = localStorage.getItem('userProfile');
    if (existingProfile) {
      try {
        const parsedProfile = JSON.parse(existingProfile);
        setUserProfile(parsedProfile);
        setProfileComplete(true);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
        localStorage.removeItem('userProfile');
      }
    }
  }, []);

  // Handle profile completion
  const handleProfileComplete = (profileData) => {
    setUserProfile(profileData);
    setProfileComplete(true);
    
    // Track assessment start with user data
    console.log('Profile completed for:', profileData.firstName, profileData.lastName);
  };

  return (
    <>
      <Helmet>
        <title>AI Career Assessment - RoleVista</title>
        <meta name="description" content="Discover your ideal career path through our AI-powered assessment based on Ikigai principles. Get personalized career recommendations in minutes." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Show Profile Setup if not completed */}
        {!profileComplete ? (
          <UserProfileSetup onComplete={handleProfileComplete} />
        ) : (
          /* Show Assessment Questions if profile is complete */
          <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
            <AssessmentHeader 
              onExitClick={() => setShowExitModal(true)}
              userProfile={userProfile}
            />
            
            <ProgressBar 
              currentStep={currentQuestionIndex + 1} 
              totalSteps={totalQuestions} 
            />

            {isLoading ? (
              <LoadingSpinner message="Analyzing your response and preparing next question..." />
            ) : (
              <div className="space-y-6">
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  selectedAnswer={selectedAnswer}
                />

                <NavigationButtons
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  canGoBack={canGoBack}
                  canGoNext={canGoNext}
                  isLoading={isLoading}
                  isLastQuestion={isLastQuestion}
                  currentStep={currentQuestionIndex + 1}
                  totalSteps={totalQuestions}
                />
              </div>
            )}

            <ExitConfirmationModal
              isOpen={showExitModal}
              onClose={() => setShowExitModal(false)}
              onConfirm={handleExitConfirm}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AICareerAssessment;