// Career Matching Engine - Maps assessment answers to real job recommendations

// Define career profiles with their characteristic patterns
const CAREER_PROFILES = {
  'Software Engineer': {
    skills_technical: ['advanced', 'expert'],
    problem_solving: ['analytical', 'systematic'],
    work_environment: ['independent', 'mixed'],
    industry_interest: ['technology'],
    career_goals: ['expertise', 'balance'],
    learning_style: ['hands_on', 'self_directed'],
    work_pace: ['steady', 'flexible'],
    decision_making: ['data_driven', 'quick'],
    salary: '$75,000 - $150,000',
    growth: '+22% job growth',
    description: 'Design and develop software applications and systems',
    companies: ['Google', 'Microsoft', 'Meta', 'Apple', 'Netflix']
  },
  
  'UX/UI Designer': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['creative', 'collaborative_solving'],
    work_environment: ['collaborative', 'mixed'],
    industry_interest: ['technology', 'business'],
    motivation_factors: ['impact', 'growth'],
    communication_style: ['visual', 'digital'],
    work_values: ['innovation', 'growth_culture'],
    ikigai_passion: ['creating'],
    salary: '$65,000 - $110,000',
    growth: '+13% job growth',
    description: 'Create intuitive and engaging user experiences',
    companies: ['Adobe', 'Figma', 'Airbnb', 'Spotify', 'Slack']
  },

  'Data Scientist': {
    skills_technical: ['advanced', 'expert'],
    problem_solving: ['analytical', 'systematic'],
    industry_interest: ['technology', 'business', 'healthcare'],
    motivation_factors: ['growth', 'impact'],
    decision_making: ['data_driven', 'research'],
    success_metrics: ['impact_results', 'skill_mastery'],
    ikigai_passion: ['analyzing'],
    work_pace: ['deep_focus', 'steady'],
    salary: '$95,000 - $165,000',
    growth: '+35% job growth',
    description: 'Extract insights from data to drive business decisions',
    companies: ['Google', 'Netflix', 'Uber', 'LinkedIn', 'Amazon']
  },

  'Product Manager': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['analytical', 'collaborative_solving'],
    work_environment: ['leadership', 'collaborative'],
    career_goals: ['leadership', 'expertise'],
    communication_style: ['verbal', 'digital'],
    motivation_factors: ['impact', 'recognition'],
    future_vision: ['manager', 'specialist'],
    decision_making: ['consultative', 'data_driven'],
    salary: '$90,000 - $160,000',
    growth: '+19% job growth',
    description: 'Lead product strategy and cross-functional teams',
    companies: ['Apple', 'Google', 'Microsoft', 'Spotify', 'Slack']
  },

  'Digital Marketing Manager': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['creative', 'analytical'],
    work_environment: ['collaborative', 'mixed'],
    industry_interest: ['business', 'technology'],
    communication_style: ['visual', 'digital', 'written'],
    motivation_factors: ['impact', 'recognition'],
    work_values: ['innovation', 'growth_culture'],
    ikigai_passion: ['connecting', 'creating'],
    salary: '$55,000 - $95,000',
    growth: '+10% job growth',
    description: 'Drive brand awareness and digital customer engagement',
    companies: ['HubSpot', 'Salesforce', 'Adobe', 'Nike', 'Netflix']
  },

  'Business Analyst': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['analytical', 'systematic'],
    work_environment: ['collaborative', 'mixed'],
    industry_interest: ['business', 'technology'],
    communication_style: ['written', 'visual'],
    decision_making: ['data_driven', 'consultative'],
    learning_style: ['structured', 'mentorship'],
    success_metrics: ['impact_results', 'skill_mastery'],
    salary: '$65,000 - $95,000',
    growth: '+14% job growth',
    description: 'Bridge business needs with technical solutions',
    companies: ['Deloitte', 'McKinsey', 'IBM', 'Accenture', 'PwC']
  },

  'Healthcare Administrator': {
    skills_technical: ['beginner', 'intermediate'],
    problem_solving: ['systematic', 'collaborative_solving'],
    work_environment: ['collaborative', 'leadership'],
    industry_interest: ['healthcare'],
    motivation_factors: ['impact', 'stability'],
    work_values: ['social_impact', 'diversity'],
    career_goals: ['leadership', 'balance'],
    communication_style: ['verbal', 'written'],
    salary: '$70,000 - $120,000',
    growth: '+32% job growth',
    description: 'Manage healthcare operations and patient services',
    companies: ['Kaiser Permanente', 'Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic']
  },

  'Teacher/Educator': {
    skills_technical: ['beginner', 'intermediate'],
    problem_solving: ['creative', 'collaborative_solving'],
    work_environment: ['collaborative', 'leadership'],
    industry_interest: ['education'],
    motivation_factors: ['impact', 'growth'],
    work_values: ['social_impact', 'growth_culture'],
    ikigai_passion: ['helping', 'creating'],
    future_vision: ['specialist', 'balanced_professional'],
    salary: '$45,000 - $75,000',
    growth: '+8% job growth',
    description: 'Educate and inspire students to reach their potential',
    companies: ['Public Schools', 'Private Schools', 'Universities', 'EdTech Companies']
  },

  'Financial Advisor': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['analytical', 'consultative'],
    work_environment: ['independent', 'mixed'],
    industry_interest: ['business'],
    motivation_factors: ['recognition', 'stability'],
    communication_style: ['verbal', 'written'],
    decision_making: ['data_driven', 'consultative'],
    ikigai_passion: ['helping', 'analyzing'],
    salary: '$60,000 - $120,000',
    growth: '+7% job growth',
    description: 'Help clients make informed financial decisions',
    companies: ['Charles Schwab', 'Fidelity', 'Vanguard', 'Edward Jones']
  },

  'Sales Manager': {
    skills_technical: ['beginner', 'intermediate'],
    problem_solving: ['creative', 'collaborative_solving'],
    work_environment: ['collaborative', 'leadership'],
    motivation_factors: ['recognition', 'growth'],
    communication_style: ['verbal', 'digital'],
    career_goals: ['leadership', 'entrepreneurship'],
    future_vision: ['manager', 'entrepreneur'],
    ikigai_passion: ['connecting', 'helping'],
    salary: '$55,000 - $110,000',
    growth: '+4% job growth',
    description: 'Lead sales teams and drive revenue growth',
    companies: ['Salesforce', 'HubSpot', 'Oracle', 'Microsoft', 'Adobe']
  },

  'Consultant': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['analytical', 'creative'],
    work_environment: ['independent', 'collaborative'],
    industry_interest: ['business'],
    motivation_factors: ['growth', 'recognition'],
    communication_style: ['verbal', 'written', 'visual'],
    career_goals: ['expertise', 'entrepreneurship'],
    decision_making: ['data_driven', 'consultative'],
    salary: '$75,000 - $150,000',
    growth: '+14% job growth',
    description: 'Provide expert advice to solve business challenges',
    companies: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Accenture']
  },

  'Graphic Designer': {
    skills_technical: ['intermediate', 'advanced'],
    problem_solving: ['creative', 'intuitive'],
    work_environment: ['independent', 'mixed'],
    motivation_factors: ['growth', 'recognition'],
    communication_style: ['visual', 'digital'],
    work_values: ['innovation', 'creativity'],
    ikigai_passion: ['creating'],
    learning_style: ['hands_on', 'self_directed'],
    salary: '$40,000 - $75,000',
    growth: '+3% job growth',
    description: 'Create visual content for brands and communications',
    companies: ['Adobe', 'Nike', 'Apple', 'Pentagram', 'IDEO']
  }
};

// Scoring weights for different question categories
const SCORING_WEIGHTS = {
  skills_technical: 0.15,
  problem_solving: 0.12,
  work_environment: 0.10,
  industry_interest: 0.15,
  motivation_factors: 0.08,
  communication_style: 0.07,
  work_pace: 0.06,
  learning_style: 0.06,
  career_goals: 0.10,
  work_values: 0.08,
  decision_making: 0.08,
  success_metrics: 0.07,
  future_vision: 0.10,
  ikigai_passion: 0.12
};

// Main career matching function
export const matchCareersToAnswers = (answers) => {
  const careerScores = {};
  
  // Calculate match score for each career
  Object.keys(CAREER_PROFILES).forEach(careerTitle => {
    const profile = CAREER_PROFILES[careerTitle];
    let totalScore = 0;
    let totalWeight = 0;
    
    // Check each answer category
    Object.keys(answers).forEach(questionId => {
      const userAnswer = answers[questionId];
      const weight = SCORING_WEIGHTS[questionId] || 0.05;
      
      if (profile[questionId] && profile[questionId].includes(userAnswer)) {
        totalScore += weight * 100; // Full points for exact match
      } else if (profile[questionId]) {
        // Partial credit for related answers
        totalScore += weight * 30;
      }
      
      totalWeight += weight;
    });
    
    // Normalize score to 0-100 range
    const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
    
    careerScores[careerTitle] = {
      score: Math.min(finalScore, 98), // Cap at 98% to feel realistic
      profile: profile
    };
  });
  
  // Sort careers by score and return top 5
  const sortedCareers = Object.entries(careerScores)
    .sort(([,a], [,b]) => b.score - a.score)
    .slice(0, 5)
    .map(([title, data], index) => ({
      id: index + 1,
      title,
      fitScore: data.score,
      salary: data.profile.salary,
      description: data.profile.description,
      growth: data.profile.growth,
      companies: data.profile.companies,
      alignment: generateAlignment(title, answers, data.score)
    }));
  
  return sortedCareers;
};

// Generate personalized alignment explanation
const generateAlignment = (careerTitle, answers, score) => {
  const explanations = [];
  
  // Technical skills alignment
  if (answers.skills_technical === 'expert' || answers.skills_technical === 'advanced') {
    explanations.push("your strong technical capabilities");
  } else if (answers.skills_technical === 'intermediate') {
    explanations.push("your solid technical foundation");
  }
  
  // Problem solving alignment
  if (answers.problem_solving === 'analytical') {
    explanations.push("your analytical thinking approach");
  } else if (answers.problem_solving === 'creative') {
    explanations.push("your creative problem-solving style");
  }
  
  // Work environment preference
  if (answers.work_environment === 'leadership') {
    explanations.push("your leadership orientation");
  } else if (answers.work_environment === 'collaborative') {
    explanations.push("your collaborative work style");
  } else if (answers.work_environment === 'independent') {
    explanations.push("your preference for independent work");
  }
  
  // Industry interest
  if (answers.industry_interest === 'technology') {
    explanations.push("your passion for technology and innovation");
  } else if (answers.industry_interest === 'healthcare') {
    explanations.push("your interest in healthcare and helping others");
  } else if (answers.industry_interest === 'education') {
    explanations.push("your dedication to education and growth");
  }
  
  // Motivation factors
  if (answers.motivation_factors === 'impact') {
    explanations.push("your drive to make a meaningful difference");
  } else if (answers.motivation_factors === 'growth') {
    explanations.push("your focus on continuous learning and development");
  }
  
  // Communication style
  if (answers.communication_style === 'visual') {
    explanations.push("your visual communication strengths");
  } else if (answers.communication_style === 'verbal') {
    explanations.push("your strong verbal communication skills");
  }
  
  // Build the final explanation
  if (explanations.length === 0) {
    return `Your assessment responses show strong potential for ${careerTitle}. This role aligns well with your professional preferences and working style.`;
  }
  
  const mainExplanations = explanations.slice(0, 3).join(', ');
  const scoreContext = score >= 85 ? "perfectly align" : score >= 70 ? "strongly match" : "align well";
  
  return `Your ${mainExplanations} ${scoreContext} with ${careerTitle} requirements. This makes you a ${score >= 85 ? 'excellent' : score >= 70 ? 'strong' : 'good'} candidate for this career path.`;
};

// Generate skills analysis based on answers
export const generateSkillsAnalysis = (answers) => {
  const strengths = [];
  const developing = [];
  
  // Analyze technical skills
  if (answers.skills_technical === 'expert' || answers.skills_technical === 'advanced') {
    strengths.push({ name: 'Technical Expertise', score: 95 });
  } else if (answers.skills_technical === 'intermediate') {
    strengths.push({ name: 'Technical Skills', score: 78 });
  } else {
    developing.push({ name: 'Technical Skills', score: 45 });
  }
  
  // Analyze problem solving
  if (answers.problem_solving === 'analytical') {
    strengths.push({ name: 'Analytical Thinking', score: 92 });
  } else if (answers.problem_solving === 'creative') {
    strengths.push({ name: 'Creative Problem Solving', score: 89 });
  }
  
  // Analyze communication
  if (answers.communication_style === 'visual') {
    strengths.push({ name: 'Visual Communication', score: 87 });
  } else if (answers.communication_style === 'verbal') {
    strengths.push({ name: 'Verbal Communication', score: 85 });
  } else if (answers.communication_style === 'written') {
    strengths.push({ name: 'Written Communication', score: 83 });
  }
  
  // Analyze leadership
  if (answers.work_environment === 'leadership' || answers.career_goals === 'leadership') {
    strengths.push({ name: 'Leadership Potential', score: 88 });
  } else if (answers.future_vision === 'manager') {
    developing.push({ name: 'Leadership Skills', score: 65 });
  }
  
  // Add some realistic developing areas
  if (strengths.length > 0) {
    developing.push(
      { name: 'Industry Networking', score: 58 },
      { name: 'Advanced Analytics', score: 52 },
      { name: 'Public Speaking', score: 48 }
    );
  }
  
  return {
    strengths: strengths.slice(0, 4),
    developing: developing.slice(0, 3)
  };
};

export default { matchCareersToAnswers, generateSkillsAnalysis }; 