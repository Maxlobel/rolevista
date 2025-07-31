// Assessment questions data based on Ikigai principles
export const assessmentQuestions = [
  // Personal Values Section (1-5)
  {
    id: 'values-1',
    type: 'multiple-choice',
    category: 'Values',
    question: 'What motivates you most in your work?',
    description: 'Select the option that resonates most strongly with you.',
    options: [
      {
        value: 'impact',
        label: 'Making a positive impact on others',
        description: 'I want my work to improve lives and create meaningful change'
      },
      {
        value: 'creativity',
        label: 'Creative expression and innovation',
        description: 'I thrive when I can create something new and express my ideas'
      },
      {
        value: 'security',
        label: 'Financial stability and security',
        description: 'I value steady income and job security above other factors'
      },
      {
        value: 'growth',
        label: 'Personal and professional growth',
        description: 'I want continuous learning and development opportunities'
      }
    ]
  },
  {
    id: 'values-2',
    type: 'slider',
    category: 'Values',
    question: 'How important is work-life balance to you?',
    description: 'Rate the importance on a scale from not important to extremely important.',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 50,
    scaleLabels: {
      min: 'Not Important',
      max: 'Extremely Important'
    },
    valueLabels: [
      { value: 25, label: 'Low Priority' },
      { value: 50, label: 'Moderate' },
      { value: 75, label: 'High Priority' }
    ]
  },
  {
    id: 'values-3',
    type: 'ranking',
    category: 'Values',
    question: 'Rank these work environment factors by importance to you:',
    description: 'Drag to reorder from most important (top) to least important (bottom).',
    options: [
      {
        label: 'Collaborative team environment',
        description: 'Working closely with others on shared goals'
      },
      {
        label: 'Autonomous work style',
        description: 'Independence to work on your own terms'
      },
      {
        label: 'Structured processes',
        description: 'Clear guidelines and established procedures'
      },
      {
        label: 'Fast-paced innovation',
        description: 'Rapid changes and cutting-edge projects'
      },
      {
        label: 'Mentorship opportunities',
        description: 'Guidance from experienced professionals'
      }
    ]
  },
  {
    id: 'values-4',
    type: 'multiple-choice',
    category: 'Values',
    question: 'Which type of recognition matters most to you?',
    options: [
      {
        value: 'public',
        label: 'Public recognition and awards',
        description: 'Acknowledgment in front of peers and industry'
      },
      {
        value: 'private',
        label: 'Private feedback and appreciation',
        description: 'Personal recognition from managers and colleagues'
      },
      {
        value: 'financial',
        label: 'Financial rewards and bonuses',
        description: 'Monetary compensation for good performance'
      },
      {
        value: 'growth',
        label: 'Promotion and career advancement',
        description: 'Opportunities to move up in the organization'
      }
    ],
    skippable: true
  },
  {
    id: 'values-5',
    type: 'slider',
    category: 'Values',
    question: 'How much do you value making a social impact through your work?',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    scaleLabels: {
      min: 'Not Important',
      max: 'Essential'
    },
    hint: 'Consider whether contributing to society is a key driver for your career choices.'
  },

  // Skills & Interests Section (6-10)
  {
    id: 'skills-1',
    type: 'multiple-choice',
    category: 'Skills',
    question: 'Which activity energizes you the most?',
    options: [
      {
        value: 'problem-solving',
        label: 'Solving complex problems',
        description: 'Analyzing challenges and finding innovative solutions'
      },
      {
        value: 'communication',
        label: 'Communicating with people',
        description: 'Presenting ideas, teaching, or building relationships'
      },
      {
        value: 'creating',
        label: 'Creating and designing',
        description: 'Building something new from your imagination'
      },
      {
        value: 'organizing',
        label: 'Organizing and managing',
        description: 'Coordinating projects and leading teams'
      }
    ]
  },
  {
    id: 'skills-2',
    type: 'ranking',
    category: 'Skills',
    question: 'Rank your natural strengths:',
    description: 'Order these from your strongest (top) to areas for development (bottom).',
    options: [
      {
        label: 'Analytical thinking',
        description: 'Breaking down complex information and finding patterns'
      },
      {
        label: 'Creative thinking',
        description: 'Generating innovative ideas and solutions'
      },
      {
        label: 'Leadership abilities',
        description: 'Inspiring and guiding others toward goals'
      },
      {
        label: 'Technical skills',
        description: 'Working with tools, technology, and systems'
      },
      {
        label: 'Interpersonal skills',
        description: 'Building relationships and communicating effectively'
      },
      {
        label: 'Detail orientation',
        description: 'Ensuring accuracy and quality in work'
      }
    ]
  },
  {
    id: 'skills-3',
    type: 'slider',
    category: 'Skills',
    question: 'How comfortable are you with learning new technologies?',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 60,
    scaleLabels: {
      min: 'Prefer Familiar Tools',
      max: 'Love New Tech'
    }
  },
  {
    id: 'skills-4',
    type: 'multiple-choice',
    category: 'Skills',
    question: 'In group projects, you naturally tend to:',
    options: [
      {
        value: 'lead',
        label: 'Take charge and lead the group',
        description: 'Organize tasks and guide the team direction'
      },
      {
        value: 'contribute',
        label: 'Contribute specialized expertise',
        description: 'Focus on your area of strength within the team'
      },
      {
        value: 'support',
        label: 'Support others and facilitate',
        description: 'Help team members succeed and collaborate'
      },
      {
        value: 'independent',
        label: 'Work independently on your part',
        description: 'Complete your tasks with minimal collaboration'
      }
    ]
  },
  {
    id: 'skills-5',
    type: 'slider',
    category: 'Skills',
    question: 'How much do you enjoy public speaking or presentations?',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 40,
    scaleLabels: {
      min: 'Strongly Dislike',
      max: 'Love It'
    },
    skippable: true
  },

  // Work Preferences Section (11-15)
  {
    id: 'work-1',
    type: 'multiple-choice',
    category: 'Work Style',
    question: 'What type of work schedule appeals to you most?',
    options: [
      {
        value: 'traditional',
        label: 'Traditional 9-5 schedule',
        description: 'Consistent hours with clear work-life boundaries'
      },
      {
        value: 'flexible',
        label: 'Flexible hours',
        description: 'Ability to adjust your schedule as needed'
      },
      {
        value: 'remote',
        label: 'Remote work',
        description: 'Working from home or anywhere'
      },
      {
        value: 'project-based',
        label: 'Project-based work',
        description: 'Intense periods followed by breaks'
      }
    ]
  },
  {
    id: 'work-2',
    type: 'slider',
    category: 'Work Style',
    question: 'How much variety do you want in your daily tasks?',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 60,
    scaleLabels: {
      min: 'Routine Tasks',
      max: 'Constant Variety'
    }
  },
  {
    id: 'work-3',
    type: 'ranking',
    category: 'Work Style',
    question: 'Rank these company characteristics by importance:',
    options: [
      {
        label: 'Company mission alignment',
        description: 'Values and purpose match your beliefs'
      },
      {
        label: 'Growth opportunities',
        description: 'Clear path for career advancement'
      },
      {
        label: 'Compensation package',
        description: 'Competitive salary and benefits'
      },
      {
        label: 'Work culture',
        description: 'Positive, supportive work environment'
      },
      {
        label: 'Industry reputation',
        description: 'Well-respected company in the field'
      }
    ]
  },
  {
    id: 'work-4',
    type: 'multiple-choice',
    category: 'Work Style',
    question: 'How do you prefer to receive feedback?',
    options: [
      {
        value: 'regular',
        label: 'Regular scheduled reviews',
        description: 'Formal feedback sessions at set intervals'
      },
      {
        value: 'immediate',
        label: 'Immediate, informal feedback',
        description: 'Real-time input as work progresses'
      },
      {
        value: 'self-directed',
        label: 'Self-directed assessment',
        description: 'Opportunity to evaluate your own performance'
      },
      {
        value: 'peer',
        label: 'Peer feedback',
        description: 'Input from colleagues and team members'
      }
    ]
  },
  {
    id: 'work-5',
    type: 'slider',
    category: 'Work Style',
    question: 'How important is travel for work to you?',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 30,
    scaleLabels: {
      min: 'No Travel',
      max: 'Frequent Travel'
    }
  },

  // Career Aspirations Section (16-20)
  {
    id: 'career-1',
    type: 'multiple-choice',
    category: 'Aspirations',
    question: 'Where do you see yourself in 5 years?',
    options: [
      {
        value: 'leadership',
        label: 'Leading a team or department',
        description: 'Managing people and strategic initiatives'
      },
      {
        value: 'expert',
        label: 'Becoming a subject matter expert',
        description: 'Deep specialization in your field'
      },
      {
        value: 'entrepreneur',
        label: 'Starting your own business',
        description: 'Building something from the ground up'
      },
      {
        value: 'consultant',
        label: 'Working as an independent consultant',
        description: 'Advising multiple organizations'
      }
    ]
  },
  {
    id: 'career-2',
    type: 'slider',
    category: 'Aspirations',
    question: 'How important is rapid career advancement to you?',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 50,
    scaleLabels: {
      min: 'Steady Progress',
      max: 'Fast Track'
    }
  },
  {
    id: 'career-3',
    type: 'ranking',
    category: 'Aspirations',
    question: 'Rank these long-term career goals:',
    options: [
      {
        label: 'Financial independence',
        description: 'Building wealth and financial security'
      },
      {
        label: 'Industry recognition',
        description: 'Being known as a leader in your field'
      },
      {
        label: 'Work-life integration',
        description: 'Balancing career success with personal fulfillment'
      },
      {
        label: 'Social impact',
        description: 'Making a meaningful difference in the world'
      },
      {
        label: 'Creative fulfillment',
        description: 'Expressing creativity through your work'
      }
    ]
  },
  {
    id: 'career-4',
    type: 'multiple-choice',
    category: 'Aspirations',
    question: 'What type of legacy do you want to leave through your career?',
    options: [
      {
        value: 'innovation',
        label: 'Innovative breakthroughs',
        description: 'Creating something that changes the industry'
      },
      {
        value: 'mentorship',
        label: 'Developing others',
        description: 'Helping the next generation succeed'
      },
      {
        value: 'social-good',
        label: 'Positive social change',
        description: 'Improving society through your work'
      },
      {
        value: 'excellence',
        label: 'Excellence in execution',
        description: 'Being known for quality and reliability'
      }
    ],
    skippable: true,
    hint: 'Think about what you want to be remembered for in your professional life.'
  },
  {
    id: 'career-5',
    type: 'slider',
    category: 'Aspirations',
    question: 'How willing are you to take career risks for potential rewards?',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 40,
    scaleLabels: {
      min: 'Risk Averse',
      max: 'High Risk Tolerance'
    },
    hint: 'Consider your comfort level with uncertainty in exchange for potentially greater opportunities.'
  }
];