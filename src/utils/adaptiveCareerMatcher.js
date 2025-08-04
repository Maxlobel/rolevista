// Enhanced Career Matcher for Adaptive Assessment
// Handles multiple-choice answers and dynamic career matching

// Enhanced career profiles with detailed matching criteria
const ENHANCED_CAREER_PROFILES = {
  'Software Engineer': {
    title: 'Software Engineer',
    category: 'Technology',
    description: 'Design and develop software solutions, applications, and systems',
    matchCriteria: {
      interests: {
        problem_solving: 3,
        creating: 3,
        analyzing_data: 2,
        innovating: 2
      },
      skills: {
        technical_programming: 4,
        data_analysis: 2,
        project_management: 1
      },
      workStyle: {
        independent_focused: 2,
        collaborative_team: 2,
        fast_paced_dynamic: 1
      },
      technical: {
        web_development: 3,
        mobile_apps: 3,
        ai_ml: 2,
        cloud_devops: 2
      }
    },
    averageSalary: '$85,000 - $150,000',
    growthRate: 'Very High (22%)',
    keySkills: ['Programming', 'Problem Solving', 'Software Architecture', 'Testing']
  },

  'UX/UI Designer': {
    title: 'UX/UI Designer',
    category: 'Design',
    description: 'Create user-centered digital experiences and intuitive interfaces',
    matchCriteria: {
      interests: {
        creating: 4,
        problem_solving: 3,
        helping_people: 2
      },
      skills: {
        design_creative: 4,
        communication: 3,
        technical_programming: 1
      },
      workStyle: {
        creative_flexible: 3,
        collaborative_team: 3
      },
      creative: {
        visual_design: 4,
        product_design: 4
      }
    },
    averageSalary: '$70,000 - $120,000',
    growthRate: 'High (13%)',
    keySkills: ['User Research', 'Prototyping', 'Visual Design', 'Usability Testing']
  },

  'Data Scientist': {
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Extract insights from complex data to drive business decisions',
    matchCriteria: {
      interests: {
        analyzing_data: 4,
        problem_solving: 4,
        innovating: 2
      },
      skills: {
        data_analysis: 4,
        technical_programming: 3,
        business_strategy: 2
      },
      workStyle: {
        independent_focused: 3,
        structured_organized: 2
      },
      technical: {
        ai_ml: 4,
        web_development: 1
      }
    },
    averageSalary: '$95,000 - $165,000',
    growthRate: 'Very High (31%)',
    keySkills: ['Statistical Analysis', 'Machine Learning', 'Data Visualization', 'Python/R']
  },

  'Product Manager': {
    title: 'Product Manager',
    category: 'Business',
    description: 'Guide product development from conception to launch and beyond',
    matchCriteria: {
      interests: {
        problem_solving: 3,
        leading_teams: 4,
        creating: 2,
        analyzing_data: 2
      },
      skills: {
        project_management: 4,
        business_strategy: 4,
        communication: 3,
        data_analysis: 2
      },
      workStyle: {
        collaborative_team: 4,
        leadership_responsibility: 3,
        fast_paced_dynamic: 3
      },
      leadership: {
        project_leadership: 4,
        strategic_planning: 3
      },
      business: {
        marketing_growth: 3,
        operations_efficiency: 2
      }
    },
    averageSalary: '$110,000 - $180,000',
    growthRate: 'High (19%)',
    keySkills: ['Strategic Planning', 'Market Research', 'Stakeholder Management', 'Analytics']
  },

  'Marketing Manager': {
    title: 'Marketing Manager',
    category: 'Business',
    description: 'Develop and execute marketing strategies to promote products and services',
    matchCriteria: {
      interests: {
        communicating: 4,
        creating: 3,
        analyzing_data: 2,
        helping_people: 2
      },
      skills: {
        communication: 4,
        design_creative: 3,
        business_strategy: 3,
        data_analysis: 2
      },
      workStyle: {
        collaborative_team: 3,
        creative_flexible: 3,
        fast_paced_dynamic: 3
      },
      creative: {
        marketing_creative: 4,
        writing_content: 3
      },
      business: {
        marketing_growth: 4,
        sales_revenue: 2
      }
    },
    averageSalary: '$65,000 - $120,000',
    growthRate: 'Medium (10%)',
    keySkills: ['Digital Marketing', 'Content Strategy', 'Brand Management', 'Analytics']
  },

  'Teacher/Educator': {
    title: 'Teacher/Educator',
    category: 'Education',
    description: 'Educate and inspire students while developing curriculum and learning experiences',
    matchCriteria: {
      interests: {
        helping_people: 4,
        communicating: 4,
        creating: 2
      },
      skills: {
        teaching_mentoring: 4,
        communication: 4,
        project_management: 2
      },
      workStyle: {
        collaborative_team: 3,
        structured_organized: 3
      },
      people: {
        education_training: 4,
        direct_service: 3
      },
      leadership: {
        mentoring_coaching: 4
      }
    },
    averageSalary: '$40,000 - $70,000',
    growthRate: 'Medium (8%)',
    keySkills: ['Curriculum Development', 'Classroom Management', 'Assessment', 'Communication']
  },

  'Healthcare Professional': {
    title: 'Healthcare Professional',
    category: 'Healthcare',
    description: 'Provide medical care and support to improve patient health and wellbeing',
    matchCriteria: {
      interests: {
        helping_people: 4,
        problem_solving: 3,
        analyzing_data: 2
      },
      skills: {
        communication: 3,
        data_analysis: 2,
        teaching_mentoring: 2
      },
      workStyle: {
        collaborative_team: 3,
        structured_organized: 3
      },
      people: {
        healthcare_wellness: 4,
        direct_service: 4
      }
    },
    averageSalary: '$60,000 - $200,000',
    growthRate: 'High (16%)',
    keySkills: ['Medical Knowledge', 'Patient Care', 'Diagnostic Skills', 'Empathy']
  },

  'Sales Representative': {
    title: 'Sales Representative',
    category: 'Business',
    description: 'Build relationships with clients and drive revenue through product sales',
    matchCriteria: {
      interests: {
        helping_people: 3,
        communicating: 4,
        problem_solving: 2
      },
      skills: {
        communication: 4,
        sales_persuasion: 4,
        business_strategy: 2
      },
      workStyle: {
        collaborative_team: 3,
        fast_paced_dynamic: 3
      },
      business: {
        sales_revenue: 4,
        marketing_growth: 2
      },
      people: {
        customer_relations: 4
      }
    },
    averageSalary: '$45,000 - $100,000+',
    growthRate: 'Medium (4%)',
    keySkills: ['Relationship Building', 'Negotiation', 'Product Knowledge', 'CRM Software']
  },

  'Financial Analyst': {
    title: 'Financial Analyst',
    category: 'Finance',
    description: 'Analyze financial data to guide investment and business decisions',
    matchCriteria: {
      interests: {
        analyzing_data: 4,
        problem_solving: 3
      },
      skills: {
        data_analysis: 4,
        business_strategy: 3,
        technical_programming: 2
      },
      workStyle: {
        independent_focused: 3,
        structured_organized: 3
      },
      business: {
        finance_analysis: 4,
        consulting_advisory: 2
      }
    },
    averageSalary: '$60,000 - $110,000',
    growthRate: 'Medium (6%)',
    keySkills: ['Financial Modeling', 'Excel/SQL', 'Market Analysis', 'Risk Assessment']
  },

  'Graphic Designer': {
    title: 'Graphic Designer',
    category: 'Creative',
    description: 'Create visual content for digital and print media to communicate messages',
    matchCriteria: {
      interests: {
        creating: 4,
        communicating: 3
      },
      skills: {
        design_creative: 4,
        communication: 2,
        technical_programming: 1
      },
      workStyle: {
        creative_flexible: 4,
        independent_focused: 2
      },
      creative: {
        visual_design: 4,
        marketing_creative: 3,
        art_illustration: 3
      }
    },
    averageSalary: '$40,000 - $75,000',
    growthRate: 'Medium (3%)',
    keySkills: ['Adobe Creative Suite', 'Typography', 'Brand Design', 'Layout Design']
  },

  'Operations Manager': {
    title: 'Operations Manager',
    category: 'Business',
    description: 'Oversee daily business operations and optimize processes for efficiency',
    matchCriteria: {
      interests: {
        problem_solving: 3,
        leading_teams: 4,
        analyzing_data: 2
      },
      skills: {
        project_management: 4,
        business_strategy: 3,
        data_analysis: 2,
        communication: 3
      },
      workStyle: {
        leadership_responsibility: 4,
        structured_organized: 4,
        collaborative_team: 3
      },
      leadership: {
        team_management: 4,
        strategic_planning: 3
      },
      business: {
        operations_efficiency: 4
      }
    },
    averageSalary: '$75,000 - $130,000',
    growthRate: 'Medium (8%)',
    keySkills: ['Process Improvement', 'Team Leadership', 'Budget Management', 'Analytics']
  },

  'Content Creator': {
    title: 'Content Creator',
    category: 'Creative',
    description: 'Develop engaging content across various digital platforms and media',
    matchCriteria: {
      interests: {
        creating: 4,
        communicating: 4,
        innovating: 2
      },
      skills: {
        design_creative: 3,
        communication: 4,
        technical_programming: 2
      },
      workStyle: {
        creative_flexible: 4,
        independent_focused: 3
      },
      creative: {
        writing_content: 4,
        video_multimedia: 3,
        marketing_creative: 3
      }
    },
    averageSalary: '$35,000 - $80,000',
    growthRate: 'High (13%)',
    keySkills: ['Content Strategy', 'Social Media', 'Video Production', 'SEO']
  }
};

// Enhanced matching function for adaptive assessment
export function matchCareersToAdaptiveAnswers(answers, userInsights) {
  const matches = [];

  Object.entries(ENHANCED_CAREER_PROFILES).forEach(([careerKey, profile]) => {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const matchDetails = {};

    // Calculate scores for each category
    Object.entries(profile.matchCriteria).forEach(([category, criteria]) => {
      const userAnswers = answers[category] || [];
      let categoryScore = 0;
      let categoryMax = 0;

      Object.entries(criteria).forEach(([skill, weight]) => {
        categoryMax += weight;
        
        if (Array.isArray(userAnswers)) {
          // Multiple choice answers
          if (userAnswers.includes(skill)) {
            categoryScore += weight;
          }
        } else if (userAnswers === skill) {
          // Single choice answer
          categoryScore += weight;
        }
      });

      matchDetails[category] = {
        score: categoryScore,
        maxScore: categoryMax,
        percentage: categoryMax > 0 ? Math.round((categoryScore / categoryMax) * 100) : 0
      };

      totalScore += categoryScore;
      maxPossibleScore += categoryMax;
    });

    // Calculate fit percentage
    const fitPercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

    // Generate personalized explanation
    const explanation = generatePersonalizedExplanation(profile, answers, matchDetails, userInsights);

    matches.push({
      ...profile,
      fitScore: fitPercentage,
      totalScore,
      maxPossibleScore,
      matchDetails,
      explanation,
      reasons: generateMatchReasons(profile, answers, matchDetails)
    });
  });

  // Sort by fit score and return top matches
  return matches
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 8);
}

// Generate personalized explanation for each career match
function generatePersonalizedExplanation(profile, answers, matchDetails, userInsights) {
  const strengths = [];
  const considerations = [];

  // Analyze strongest match areas
  Object.entries(matchDetails).forEach(([category, details]) => {
    if (details.percentage >= 70) {
      const categoryName = category.replace(/([A-Z])/g, ' $1').trim();
      strengths.push(`Strong ${categoryName.toLowerCase()} alignment (${details.percentage}%)`);
    } else if (details.percentage > 0 && details.percentage < 40) {
      const categoryName = category.replace(/([A-Z])/g, ' $1').trim();
      considerations.push(`Consider developing ${categoryName.toLowerCase()} skills`);
    }
  });

  let explanation = `This role aligns well with your profile because `;
  
  if (strengths.length > 0) {
    explanation += `you have ${strengths.join(', ')}.`;
  } else {
    explanation += `it matches several of your interests and skills.`;
  }

  if (considerations.length > 0) {
    explanation += ` To strengthen your fit, you might ${considerations.join(' and ')}.`;
  }

  return explanation;
}

// Generate specific reasons why a career matches
function generateMatchReasons(profile, answers, matchDetails) {
  const reasons = [];

  // Check for strong category matches
  Object.entries(matchDetails).forEach(([category, details]) => {
    if (details.percentage >= 60) {
      const categoryMap = {
        interests: 'Your interests in',
        skills: 'Your current skills in',
        workStyle: 'Your preferred work style of',
        technical: 'Your technical interests in',
        creative: 'Your creative interests in',
        leadership: 'Your leadership style of',
        people: 'Your people-focused approach to',
        business: 'Your business interests in'
      };

      const prefix = categoryMap[category] || 'Your';
      reasons.push(`${prefix} this area strongly aligns with this role`);
    }
  });

  // Ensure we have at least one reason
  if (reasons.length === 0) {
    reasons.push('This role matches several aspects of your professional profile');
  }

  return reasons.slice(0, 3); // Limit to top 3 reasons
}

// Generate enhanced skills analysis
export function generateEnhancedSkillsAnalysis(answers, userInsights) {
  const skillCategories = {
    technical: {
      name: 'Technical Skills',
      skills: ['Programming', 'Data Analysis', 'System Design', 'Cloud Computing'],
      userLevel: calculateSkillLevel(answers, 'technical')
    },
    creative: {
      name: 'Creative Skills',
      skills: ['Design Thinking', 'Visual Design', 'Content Creation', 'Innovation'],
      userLevel: calculateSkillLevel(answers, 'creative')
    },
    leadership: {
      name: 'Leadership Skills',
      skills: ['Team Management', 'Strategic Planning', 'Decision Making', 'Communication'],
      userLevel: calculateSkillLevel(answers, 'leadership')
    },
    analytical: {
      name: 'Analytical Skills',
      skills: ['Problem Solving', 'Research', 'Critical Thinking', 'Data Interpretation'],
      userLevel: calculateSkillLevel(answers, 'analytical')
    },
    interpersonal: {
      name: 'Interpersonal Skills',
      skills: ['Communication', 'Collaboration', 'Empathy', 'Networking'],
      userLevel: calculateSkillLevel(answers, 'people')
    }
  };

  // Categorize skills by strength level
  const strong = [];
  const developing = [];
  const growth = [];

  Object.entries(skillCategories).forEach(([key, category]) => {
    const skillData = {
      name: category.name,
      level: category.userLevel,
      skills: category.skills
    };

    if (category.userLevel >= 70) {
      strong.push(skillData);
    } else if (category.userLevel >= 40) {
      developing.push(skillData);
    } else {
      growth.push(skillData);
    }
  });

  return {
    strong,
    developing,
    growth,
    summary: generateSkillsSummary(strong, developing, growth)
  };
}

// Calculate skill level based on answers
function calculateSkillLevel(answers, skillCategory) {
  const categoryMappings = {
    technical: ['technical_programming', 'data_analysis', 'problem_solving', 'analyzing_data'],
    creative: ['design_creative', 'creating', 'innovating'],
    leadership: ['project_management', 'leading_teams', 'business_strategy'],
    analytical: ['data_analysis', 'analyzing_data', 'problem_solving'],
    people: ['communication', 'teaching_mentoring', 'helping_people', 'sales_persuasion']
  };

  const relevantSkills = categoryMappings[skillCategory] || [];
  let matchCount = 0;
  let totalChecked = 0;

  // Check all answers for relevant skills
  Object.values(answers).forEach(answer => {
    if (Array.isArray(answer)) {
      answer.forEach(item => {
        if (relevantSkills.includes(item)) {
          matchCount++;
        }
      });
      totalChecked += answer.length;
    } else if (relevantSkills.includes(answer)) {
      matchCount++;
      totalChecked++;
    }
  });

  // Return percentage based on matches
  return totalChecked > 0 ? Math.min(Math.round((matchCount / relevantSkills.length) * 100), 100) : 0;
}

// Generate skills summary
function generateSkillsSummary(strong, developing, growth) {
  let summary = '';

  if (strong.length > 0) {
    summary += `You have strong capabilities in ${strong.map(s => s.name.toLowerCase()).join(', ')}. `;
  }

  if (developing.length > 0) {
    summary += `You're developing skills in ${developing.map(s => s.name.toLowerCase()).join(', ')}. `;
  }

  if (growth.length > 0) {
    summary += `Consider focusing on ${growth.map(s => s.name.toLowerCase()).join(', ')} for career growth.`;
  }

  return summary || 'Continue developing your professional skills across multiple areas.';
}

export default {
  matchCareersToAdaptiveAnswers,
  generateEnhancedSkillsAnalysis,
  ENHANCED_CAREER_PROFILES
}; 