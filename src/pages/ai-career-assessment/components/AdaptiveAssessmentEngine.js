// Adaptive Assessment Engine - Smart questioning system
// Determines next questions based on user responses and creates personalized flows

class AdaptiveAssessmentEngine {
  constructor() {
    this.userProfile = {
      skills: [],
      interests: [],
      workStyle: [],
      values: [],
      experience: null,
      goals: []
    };
    this.answeredQuestions = new Set();
    this.questionHistory = [];
  }

  // Core assessment questions - everyone gets these first
  getCoreQuestions() {
    return [
      {
        id: 'interests_broad',
        text: "What types of activities genuinely excite you?",
        description: "Select all that apply - think about what makes you curious and engaged.",
        type: 'multiple-choice',
        category: 'interests',
        priority: 1,
        maxSelections: 4,
        options: [
          { value: 'problem_solving', label: 'Solving Complex Problems', description: 'Analytical thinking, troubleshooting, finding solutions' },
          { value: 'creating', label: 'Creating & Building', description: 'Designing, developing, making something new' },
          { value: 'helping_people', label: 'Helping People', description: 'Teaching, mentoring, supporting others' },
          { value: 'analyzing_data', label: 'Working with Data', description: 'Research, analysis, finding patterns' },
          { value: 'leading_teams', label: 'Leading & Organizing', description: 'Managing projects, coordinating people' },
          { value: 'communicating', label: 'Communicating Ideas', description: 'Writing, presenting, storytelling' },
          { value: 'innovating', label: 'Innovation & Research', description: 'Exploring new concepts, experimenting' },
          { value: 'hands_on_work', label: 'Hands-On Work', description: 'Physical creation, practical implementation' }
        ]
      },
      {
        id: 'skills_current',
        text: "Which skills do you currently feel most confident in?",
        description: "Be honest about your current strengths - select all that apply.",
        type: 'multiple-choice',
        category: 'skills',
        priority: 1,
        maxSelections: 5,
        options: [
          { value: 'technical_programming', label: 'Programming & Development', description: 'Coding, software development, technical implementation' },
          { value: 'data_analysis', label: 'Data Analysis', description: 'Statistics, research, interpreting information' },
          { value: 'design_creative', label: 'Design & Creativity', description: 'Visual design, creative problem-solving' },
          { value: 'communication', label: 'Communication', description: 'Writing, presenting, interpersonal skills' },
          { value: 'project_management', label: 'Project Management', description: 'Planning, organizing, coordinating resources' },
          { value: 'business_strategy', label: 'Business & Strategy', description: 'Planning, analysis, decision-making' },
          { value: 'teaching_mentoring', label: 'Teaching & Mentoring', description: 'Explaining concepts, guiding others' },
          { value: 'sales_persuasion', label: 'Sales & Persuasion', description: 'Influencing, negotiating, building relationships' }
        ]
      },
      {
        id: 'work_environment_pref',
        text: "In what type of work environment do you thrive?",
        description: "Select all environments where you feel energized and productive.",
        type: 'multiple-choice',
        category: 'workStyle',
        priority: 1,
        maxSelections: 3,
        options: [
          { value: 'collaborative_team', label: 'Collaborative Team', description: 'Working closely with others, frequent interaction' },
          { value: 'independent_focused', label: 'Independent & Focused', description: 'Quiet space for deep work and concentration' },
          { value: 'fast_paced_dynamic', label: 'Fast-Paced & Dynamic', description: 'Quick decisions, changing priorities, high energy' },
          { value: 'structured_organized', label: 'Structured & Organized', description: 'Clear processes, predictable routines' },
          { value: 'creative_flexible', label: 'Creative & Flexible', description: 'Freedom to innovate, flexible schedules' },
          { value: 'leadership_responsibility', label: 'Leadership Role', description: 'Making decisions, guiding others, taking responsibility' }
        ]
      }
    ];
  }

  // Follow-up questions based on user responses
  getAdaptiveQuestions(userAnswers) {
    const questions = [];
    const profile = this.analyzeUserProfile(userAnswers);

    // Technical path questions
    if (this.isUserTechnical(profile)) {
      questions.push(...this.getTechnicalQuestions());
    }

    // Creative path questions  
    if (this.isUserCreative(profile)) {
      questions.push(...this.getCreativeQuestions());
    }

    // Leadership path questions
    if (this.isUserLeadershipOriented(profile)) {
      questions.push(...this.getLeadershipQuestions());
    }

    // People-focused path questions
    if (this.isUserPeopleFocused(profile)) {
      questions.push(...this.getPeopleQuestions());
    }

    // Business path questions
    if (this.isUserBusinessOriented(profile)) {
      questions.push(...this.getBusinessQuestions());
    }

    // Filter out already answered questions
    return questions.filter(q => !this.answeredQuestions.has(q.id));
  }

  // Analyze user profile to determine paths
  analyzeUserProfile(answers) {
    const profile = {
      technical: 0,
      creative: 0,
      leadership: 0,
      peopleFocused: 0,
      business: 0,
      analytical: 0
    };

    // Analyze interests
    const interests = answers.interests_broad || [];
    if (interests.includes('problem_solving')) profile.technical += 2;
    if (interests.includes('analyzing_data')) profile.analytical += 2;
    if (interests.includes('creating')) profile.creative += 2;
    if (interests.includes('helping_people')) profile.peopleFocused += 2;
    if (interests.includes('leading_teams')) profile.leadership += 2;
    if (interests.includes('innovating')) profile.technical += 1;

    // Analyze skills
    const skills = answers.skills_current || [];
    if (skills.includes('technical_programming')) profile.technical += 3;
    if (skills.includes('data_analysis')) profile.analytical += 3;
    if (skills.includes('design_creative')) profile.creative += 3;
    if (skills.includes('project_management')) profile.leadership += 2;
    if (skills.includes('teaching_mentoring')) profile.peopleFocused += 3;
    if (skills.includes('business_strategy')) profile.business += 3;

    // Analyze work environment
    const workStyle = answers.work_environment_pref || [];
    if (workStyle.includes('independent_focused')) profile.technical += 1;
    if (workStyle.includes('collaborative_team')) profile.peopleFocused += 1;
    if (workStyle.includes('leadership_responsibility')) profile.leadership += 2;
    if (workStyle.includes('creative_flexible')) profile.creative += 1;

    return profile;
  }

  // User type detection methods
  isUserTechnical(profile) {
    return profile.technical >= 3 || profile.analytical >= 3;
  }

  isUserCreative(profile) {
    return profile.creative >= 3;
  }

  isUserLeadershipOriented(profile) {
    return profile.leadership >= 3;
  }

  isUserPeopleFocused(profile) {
    return profile.peopleFocused >= 3;
  }

  isUserBusinessOriented(profile) {
    return profile.business >= 2;
  }

  // Technical path questions
  getTechnicalQuestions() {
    return [
      {
        id: 'tech_specialization',
        text: "Which technical areas interest you most?",
        description: "Select the areas you'd like to develop or already enjoy working in.",
        type: 'multiple-choice',
        category: 'technical',
        maxSelections: 3,
        options: [
          { value: 'web_development', label: 'Web Development', description: 'Websites, web applications, frontend/backend' },
          { value: 'mobile_apps', label: 'Mobile Apps', description: 'iOS, Android, cross-platform mobile development' },
          { value: 'ai_ml', label: 'AI & Machine Learning', description: 'Artificial intelligence, data science, algorithms' },
          { value: 'cybersecurity', label: 'Cybersecurity', description: 'Information security, ethical hacking, compliance' },
          { value: 'cloud_devops', label: 'Cloud & DevOps', description: 'Cloud platforms, automation, infrastructure' },
          { value: 'game_development', label: 'Game Development', description: 'Video games, interactive entertainment' }
        ]
      },
      {
        id: 'tech_work_style',
        text: "How do you prefer to work on technical projects?",
        description: "Think about your ideal technical work environment and process.",
        type: 'multiple-choice',
        category: 'workStyle',
        maxSelections: 2,
        options: [
          { value: 'solo_deep_work', label: 'Solo Deep Work', description: 'Extended focus time on complex problems' },
          { value: 'pair_programming', label: 'Collaborative Coding', description: 'Working with others, code reviews, team projects' },
          { value: 'full_stack', label: 'Full-Stack Projects', description: 'End-to-end development, seeing the big picture' },
          { value: 'specialized_expert', label: 'Specialized Expertise', description: 'Deep focus on specific technologies or domains' }
        ]
      }
    ];
  }

  // Creative path questions
  getCreativeQuestions() {
    return [
      {
        id: 'creative_mediums',
        text: "Which creative mediums appeal to you?",
        description: "Select the types of creative work that excite you.",
        type: 'multiple-choice',
        category: 'creative',
        maxSelections: 4,
        options: [
          { value: 'visual_design', label: 'Visual Design', description: 'Graphics, UI/UX, branding, visual identity' },
          { value: 'writing_content', label: 'Writing & Content', description: 'Copywriting, blogging, storytelling, content strategy' },
          { value: 'video_multimedia', label: 'Video & Multimedia', description: 'Video production, animation, multimedia content' },
          { value: 'product_design', label: 'Product Design', description: 'User experience, product development, design thinking' },
          { value: 'marketing_creative', label: 'Creative Marketing', description: 'Campaigns, social media, brand experiences' },
          { value: 'art_illustration', label: 'Art & Illustration', description: 'Digital art, illustration, creative expression' }
        ]
      }
    ];
  }

  // Leadership path questions
  getLeadershipQuestions() {
    return [
      {
        id: 'leadership_style',
        text: "What type of leadership role appeals to you?",
        description: "Consider how you like to guide and influence others.",
        type: 'multiple-choice',
        category: 'leadership',
        maxSelections: 2,
        options: [
          { value: 'team_management', label: 'Team Management', description: 'Leading people, developing talent, team building' },
          { value: 'project_leadership', label: 'Project Leadership', description: 'Managing initiatives, coordinating resources' },
          { value: 'strategic_planning', label: 'Strategic Planning', description: 'Vision setting, long-term planning, business strategy' },
          { value: 'entrepreneurship', label: 'Entrepreneurship', description: 'Starting ventures, innovation, business creation' },
          { value: 'mentoring_coaching', label: 'Mentoring & Coaching', description: 'Developing others, teaching, guidance' }
        ]
      }
    ];
  }

  // People-focused path questions
  getPeopleQuestions() {
    return [
      {
        id: 'people_interaction',
        text: "How do you prefer to help and work with people?",
        description: "Select the types of people-focused work that energize you.",
        type: 'multiple-choice',
        category: 'people',
        maxSelections: 3,
        options: [
          { value: 'direct_service', label: 'Direct Service', description: 'One-on-one help, counseling, personal support' },
          { value: 'education_training', label: 'Education & Training', description: 'Teaching, curriculum development, skill building' },
          { value: 'community_building', label: 'Community Building', description: 'Bringing people together, social impact' },
          { value: 'healthcare_wellness', label: 'Healthcare & Wellness', description: 'Physical/mental health, wellness programs' },
          { value: 'customer_relations', label: 'Customer Relations', description: 'Customer service, account management, client success' }
        ]
      }
    ];
  }

  // Business path questions
  getBusinessQuestions() {
    return [
      {
        id: 'business_functions',
        text: "Which business functions interest you most?",
        description: "Select the areas of business that align with your interests.",
        type: 'multiple-choice',
        category: 'business',
        maxSelections: 3,
        options: [
          { value: 'finance_analysis', label: 'Finance & Analysis', description: 'Financial planning, analysis, investment decisions' },
          { value: 'marketing_growth', label: 'Marketing & Growth', description: 'Market research, campaigns, customer acquisition' },
          { value: 'operations_efficiency', label: 'Operations & Efficiency', description: 'Process improvement, logistics, optimization' },
          { value: 'sales_revenue', label: 'Sales & Revenue', description: 'Client relationships, deal closing, revenue generation' },
          { value: 'consulting_advisory', label: 'Consulting & Advisory', description: 'Problem-solving for clients, strategic advice' }
        ]
      }
    ];
  }

  // Get next question based on user journey
  getNextQuestion(userAnswers) {
    const coreQuestions = this.getCoreQuestions();
    const answeredCore = coreQuestions.filter(q => this.answeredQuestions.has(q.id));
    
    // First, complete core questions
    if (answeredCore.length < coreQuestions.length) {
      return coreQuestions.find(q => !this.answeredQuestions.has(q.id));
    }
    
    // Then, get adaptive questions
    const adaptiveQuestions = this.getAdaptiveQuestions(userAnswers);
    if (adaptiveQuestions.length > 0) {
      return adaptiveQuestions[0];
    }
    
    return null; // Assessment complete
  }

  // Mark question as answered
  markQuestionAnswered(questionId) {
    this.answeredQuestions.add(questionId);
  }

  // Get assessment progress
  getProgress(userAnswers) {
    const totalExpectedQuestions = this.getTotalExpectedQuestions(userAnswers);
    const answeredCount = this.answeredQuestions.size;
    return Math.min(Math.round((answeredCount / totalExpectedQuestions) * 100), 100);
  }

  // Estimate total questions based on user profile
  getTotalExpectedQuestions(userAnswers) {
    let baseQuestions = 3; // Core questions
    const profile = this.analyzeUserProfile(userAnswers);
    
    // Add questions based on detected paths
    if (this.isUserTechnical(profile)) baseQuestions += 2;
    if (this.isUserCreative(profile)) baseQuestions += 1;
    if (this.isUserLeadershipOriented(profile)) baseQuestions += 1;
    if (this.isUserPeopleFocused(profile)) baseQuestions += 1;
    if (this.isUserBusinessOriented(profile)) baseQuestions += 1;
    
    return Math.min(baseQuestions, 8); // Cap at 8 questions total
  }

  // Check if assessment is complete
  isAssessmentComplete(userAnswers) {
    const nextQuestion = this.getNextQuestion(userAnswers);
    return nextQuestion === null;
  }

  // Generate insights for completed assessment
  generateInsights(userAnswers) {
    const profile = this.analyzeUserProfile(userAnswers);
    const topTraits = Object.entries(profile)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([trait, score]) => ({ trait, score }));

    return {
      profile,
      topTraits,
      recommendedPaths: this.getRecommendedPaths(profile),
      totalQuestions: this.answeredQuestions.size
    };
  }

  // Get recommended career paths
  getRecommendedPaths(profile) {
    const paths = [];
    
    if (profile.technical >= 3) paths.push('Technical/Engineering');
    if (profile.creative >= 3) paths.push('Creative/Design');
    if (profile.leadership >= 3) paths.push('Leadership/Management');
    if (profile.peopleFocused >= 3) paths.push('People/Service');
    if (profile.business >= 2) paths.push('Business/Strategy');
    if (profile.analytical >= 3) paths.push('Data/Research');
    
    return paths;
  }
}

export default AdaptiveAssessmentEngine; 