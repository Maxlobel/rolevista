const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { getUserByEmail, createUser, logUserActivity } = require('../config/database');

const router = express.Router();

// JWT secret from environment variables (required)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Validation middleware - Made more user-friendly
const validateRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required')
    .matches(/^[a-zA-Z\s\-\'\.]*$/)
    .withMessage('First name contains invalid characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required')
    .matches(/^[a-zA-Z\s\-\'\.]*$/)
    .withMessage('Last name contains invalid characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('acceptTerms')
    .custom(value => {
      // Accept boolean true or string "true"
      return value === true || value === 'true';
    })
    .withMessage('You must accept the terms and conditions')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Debug endpoint to see what data is being sent
router.post('/debug-register', (req, res) => {
  console.log('🔍 Registration Debug - Received data:');
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  res.json({
    success: true,
    message: 'Debug endpoint - check server logs',
    receivedData: req.body,
    dataTypes: Object.keys(req.body).reduce((acc, key) => {
      acc[key] = typeof req.body[key];
      return acc;
    }, {})
  });
});

// User registration
router.post('/register', validateRegistration, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userUuid = uuidv4();
    const newUser = await createUser({
      uuid: userUuid,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword
    });

    // Log user activity
    await logUserActivity({
      userId: newUser.id,
      activityType: 'user_registered',
      description: 'User registered successfully',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        uuid: userUuid, 
        email: email.toLowerCase() 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: userUuid,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.toLowerCase(),
          isVerified: false,
          isPremium: false
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// Login endpoint
router.post('/login', validateLogin, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await getUserByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Log user activity
    await logUserActivity({
      userId: user.id,
      activityType: 'user_login',
      description: 'User logged in successfully',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        uuid: user.uuid, 
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isVerified: Boolean(user.isVerified),
          isPremium: Boolean(user.isPremium),
          profileCompletion: user.profileCompletion || 0,
          joinedAt: user.joinedAt
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Verify token endpoint
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getUserByEmail(decoded.email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isVerified: Boolean(user.isVerified),
          isPremium: Boolean(user.isPremium),
          profileCompletion: user.profileCompletion || 0,
          joinedAt: user.joinedAt
        }
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Logout endpoint (for logging purposes)
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      await logUserActivity({
        userId: decoded.userId,
        activityType: 'user_logout',
        description: 'User logged out',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    // Even if there's an error, we consider logout successful
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }
});

module.exports = router; 