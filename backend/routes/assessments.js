const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const {
  getUserByUuid,
  createAssessmentSession,
  getAssessmentSession,
  updateAssessmentSession,
  saveAssessmentAnswer,
  getAssessmentAnswers,
  logUserActivity
} = require('../config/database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getUserByUuid(decoded.uuid);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Validation middleware
const validateAssessmentStart = [
  body('totalQuestions')
    .isInt({ min: 1, max: 100 })
    .withMessage('Total questions must be between 1 and 100')
];

const validateAssessmentAnswer = [
  body('questionId')
    .notEmpty()
    .withMessage('Question ID is required'),
  
  body('questionText')
    .notEmpty()
    .withMessage('Question text is required'),
  
  body('questionType')
    .isIn(['rating', 'preference', 'behavioral', 'values', 'goals', 'ikigai'])
    .withMessage('Invalid question type'),
  
  body('selectedOption')
    .notEmpty()
    .withMessage('Selected option is required'),
  
  body('optionLabel')
    .notEmpty()
    .withMessage('Option label is required')
];

// Start new assessment session
router.post('/start', authenticateToken, validateAssessmentStart, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { totalQuestions } = req.body;
    const sessionUuid = uuidv4();

    // Create assessment session
    const session = await createAssessmentSession({
      uuid: sessionUuid,
      userId: req.user.id,
      totalQuestions
    });

    // Log activity
    await logUserActivity({
      userId: req.user.id,
      activityType: 'assessment_started',
      description: 'Started new career assessment',
      metadata: { sessionId: session.id, totalQuestions },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({
      success: true,
      message: 'Assessment session started',
      data: {
        sessionId: sessionUuid,
        totalQuestions,
        startedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Start assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start assessment. Please try again.'
    });
  }
});

// Save assessment answer
router.post('/answer', authenticateToken, validateAssessmentAnswer, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      sessionId,
      questionId,
      questionText,
      questionType,
      selectedOption,
      optionLabel,
      optionDescription
    } = req.body;

    // Get session
    const session = await getAssessmentSession(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Assessment session not found'
      });
    }

    // Verify session belongs to user
    if (session.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this assessment session'
      });
    }

    // Save answer
    await saveAssessmentAnswer({
      sessionId: session.id,
      questionId,
      questionText,
      questionType,
      selectedOption,
      optionLabel,
      optionDescription
    });

    // Get all answers to calculate progress
    const allAnswers = await getAssessmentAnswers(session.id);
    const answeredQuestions = allAnswers.length;
    const completionPercentage = Math.round((answeredQuestions / session.totalQuestions) * 100);

    // Update session progress
    await updateAssessmentSession(session.id, {
      answeredQuestions,
      completionPercentage
    });

    // Log activity
    await logUserActivity({
      userId: req.user.id,
      activityType: 'assessment_answer_saved',
      description: `Answered question ${questionId}`,
      metadata: { 
        sessionId: session.id, 
        questionId, 
        questionType,
        completionPercentage 
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Answer saved successfully',
      data: {
        answeredQuestions,
        totalQuestions: session.totalQuestions,
        completionPercentage,
        isComplete: completionPercentage === 100
      }
    });

  } catch (error) {
    console.error('Save answer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save answer. Please try again.'
    });
  }
});

// Get assessment progress
router.get('/progress/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Get session
    const session = await getAssessmentSession(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Assessment session not found'
      });
    }

    // Verify session belongs to user
    if (session.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this assessment session'
      });
    }

    // Get all answers
    const answers = await getAssessmentAnswers(session.id);

    res.json({
      success: true,
      data: {
        session: {
          id: session.uuid,
          status: session.status,
          startedAt: session.startedAt,
          totalQuestions: session.totalQuestions,
          answeredQuestions: session.answeredQuestions || 0,
          completionPercentage: session.completionPercentage || 0
        },
        answers: answers.map(answer => ({
          questionId: answer.questionId,
          questionText: answer.questionText,
          questionType: answer.questionType,
          selectedOption: answer.selectedOption,
          optionLabel: answer.optionLabel,
          optionDescription: answer.optionDescription,
          answeredAt: answer.answeredAt
        }))
      }
    });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get assessment progress'
    });
  }
});

// Complete assessment and generate results
router.post('/complete/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Get session
    const session = await getAssessmentSession(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Assessment session not found'
      });
    }

    // Verify session belongs to user
    if (session.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this assessment session'
      });
    }

    // Get all answers
    const answers = await getAssessmentAnswers(session.id);

    // Generate basic results based on answers
    const results = generateAssessmentResults(answers);

    // Update session as completed
    await updateAssessmentSession(session.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      duration: Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000)
    });

    // Log completion
    await logUserActivity({
      userId: req.user.id,
      activityType: 'assessment_completed',
      description: 'Completed career assessment',
      metadata: { 
        sessionId: session.id, 
        totalAnswers: answers.length,
        overallScore: results.overallScore
      },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      success: true,
      message: 'Assessment completed successfully',
      data: {
        sessionId: session.uuid,
        completedAt: new Date().toISOString(),
        results
      }
    });

  } catch (error) {
    console.error('Complete assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete assessment. Please try again.'
    });
  }
});

// Get user's assessment history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    // This would get all assessments for the user
    // For now, returning a basic structure
    res.json({
      success: true,
      data: {
        assessments: [],
        totalAssessments: 0,
        lastAssessment: null
      }
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get assessment history'
    });
  }
});

// Helper function to generate assessment results
const generateAssessmentResults = (answers) => {
  // Basic scoring logic - this would be much more sophisticated in a real app
  const skillCategories = {
    technical: 0,
    communication: 0,
    leadership: 0,
    creativity: 0,
    analytical: 0
  };

  const personalityTraits = {
    extroversion: 0,
    openness: 0,
    conscientiousness: 0,
    agreeableness: 0,
    neuroticism: 0
  };

  // Analyze answers to determine scores
  answers.forEach(answer => {
    // Simple scoring based on question types and answers
    switch (answer.questionType) {
      case 'rating':
        if (answer.selectedOption === 'advanced' || answer.selectedOption === 'expert') {
          skillCategories.technical += 2;
        }
        break;
      case 'preference':
        if (answer.selectedOption === 'collaborative') {
          personalityTraits.extroversion += 1;
          skillCategories.communication += 1;
        }
        break;
      case 'leadership':
        if (answer.selectedOption === 'leadership') {
          skillCategories.leadership += 2;
        }
        break;
    }
  });

  // Calculate overall score
  const totalSkillPoints = Object.values(skillCategories).reduce((sum, val) => sum + val, 0);
  const overallScore = Math.min(100, Math.max(0, Math.round((totalSkillPoints / answers.length) * 20)));

  // Determine career archetype based on highest skills
  const topSkill = Object.entries(skillCategories).reduce((a, b) => 
    skillCategories[a[0]] > skillCategories[b[0]] ? a : b
  )[0];

  const archetypes = {
    technical: 'The Innovator',
    communication: 'The Connector',
    leadership: 'The Visionary',
    creativity: 'The Creator',
    analytical: 'The Strategist'
  };

  return {
    overallScore,
    careerArchetype: archetypes[topSkill] || 'The Explorer',
    topSkills: Object.entries(skillCategories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([skill]) => skill),
    recommendedRoles: [
      'Software Engineer',
      'Product Manager',
      'Data Analyst',
      'UX Designer',
      'Marketing Specialist'
    ],
    strengthsAnalysis: {
      primary: topSkill,
      secondary: Object.entries(skillCategories).sort(([,a], [,b]) => b - a)[1][0]
    },
    personalityProfile: personalityTraits,
    detailedInsights: {
      workStyle: 'Collaborative and detail-oriented',
      idealEnvironment: 'Dynamic team with growth opportunities',
      developmentAreas: ['Public speaking', 'Strategic thinking']
    }
  };
};

module.exports = router; 