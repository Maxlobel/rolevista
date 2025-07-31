const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/rolevista.db');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('📦 Connected to SQLite database');
  }
});

// Initialize database tables
const initDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid TEXT UNIQUE NOT NULL,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          isVerified INTEGER DEFAULT 0,
          isPremium INTEGER DEFAULT 0,
          profileCompletion INTEGER DEFAULT 0,
          joinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          lastLoginAt DATETIME,
          profileData TEXT DEFAULT '{}',
          preferences TEXT DEFAULT '{}'
        )
      `, (err) => {
        if (err) console.error('Error creating users table:', err);
        else console.log('✅ Users table ready');
      });

      // Assessment sessions table
      db.run(`
        CREATE TABLE IF NOT EXISTS assessment_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          uuid TEXT UNIQUE NOT NULL,
          userId INTEGER NOT NULL,
          status TEXT DEFAULT 'in_progress',
          startedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          completedAt DATETIME,
          totalQuestions INTEGER DEFAULT 0,
          answeredQuestions INTEGER DEFAULT 0,
          completionPercentage INTEGER DEFAULT 0,
          duration INTEGER DEFAULT 0,
          FOREIGN KEY (userId) REFERENCES users (id)
        )
      `, (err) => {
        if (err) console.error('Error creating assessment_sessions table:', err);
        else console.log('✅ Assessment sessions table ready');
      });

      // Assessment answers table
      db.run(`
        CREATE TABLE IF NOT EXISTS assessment_answers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sessionId INTEGER NOT NULL,
          questionId TEXT NOT NULL,
          questionText TEXT NOT NULL,
          questionType TEXT NOT NULL,
          selectedOption TEXT NOT NULL,
          optionLabel TEXT NOT NULL,
          optionDescription TEXT,
          answeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sessionId) REFERENCES assessment_sessions (id)
        )
      `, (err) => {
        if (err) console.error('Error creating assessment_answers table:', err);
        else console.log('✅ Assessment answers table ready');
      });

      // Assessment results table
      db.run(`
        CREATE TABLE IF NOT EXISTS assessment_results (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sessionId INTEGER UNIQUE NOT NULL,
          userId INTEGER NOT NULL,
          overallScore INTEGER DEFAULT 0,
          careerArchetype TEXT,
          topSkills TEXT DEFAULT '[]',
          recommendedRoles TEXT DEFAULT '[]',
          strengthsAnalysis TEXT DEFAULT '{}',
          improvementAreas TEXT DEFAULT '[]',
          personalityProfile TEXT DEFAULT '{}',
          fitScores TEXT DEFAULT '{}',
          detailedAnalysis TEXT DEFAULT '{}',
          generatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sessionId) REFERENCES assessment_sessions (id),
          FOREIGN KEY (userId) REFERENCES users (id)
        )
      `, (err) => {
        if (err) console.error('Error creating assessment_results table:', err);
        else console.log('✅ Assessment results table ready');
      });

      // User activity logs
      db.run(`
        CREATE TABLE IF NOT EXISTS user_activities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          activityType TEXT NOT NULL,
          description TEXT NOT NULL,
          metadata TEXT DEFAULT '{}',
          ipAddress TEXT,
          userAgent TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating user_activities table:', err);
          reject(err);
        } else {
          console.log('✅ User activities table ready');
          console.log('🎉 All database tables initialized successfully');
          resolve();
        }
      });

    });
  });
};

// Database helper functions
const dbHelpers = {
  // Get user by email
  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Get user by UUID
  getUserByUuid: (uuid) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE uuid = ?', [uuid], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Create user
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      const { uuid, firstName, lastName, email, password } = userData;
      db.run(
        'INSERT INTO users (uuid, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)',
        [uuid, firstName, lastName, email, password],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, uuid });
        }
      );
    });
  },

  // Create assessment session
  createAssessmentSession: (sessionData) => {
    return new Promise((resolve, reject) => {
      const { uuid, userId, totalQuestions } = sessionData;
      db.run(
        'INSERT INTO assessment_sessions (uuid, userId, totalQuestions) VALUES (?, ?, ?)',
        [uuid, userId, totalQuestions],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, uuid });
        }
      );
    });
  },

  // Save assessment answer
  saveAssessmentAnswer: (answerData) => {
    return new Promise((resolve, reject) => {
      const { sessionId, questionId, questionText, questionType, selectedOption, optionLabel, optionDescription } = answerData;
      db.run(
        `INSERT INTO assessment_answers 
         (sessionId, questionId, questionText, questionType, selectedOption, optionLabel, optionDescription) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [sessionId, questionId, questionText, questionType, selectedOption, optionLabel, optionDescription],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  },

  // Get assessment session
  getAssessmentSession: (uuid) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM assessment_sessions WHERE uuid = ?', [uuid], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Get assessment answers
  getAssessmentAnswers: (sessionId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM assessment_answers WHERE sessionId = ? ORDER BY answeredAt', [sessionId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Update assessment session
  updateAssessmentSession: (sessionId, updates) => {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updates);
      values.push(sessionId);
      
      db.run(`UPDATE assessment_sessions SET ${fields} WHERE id = ?`, values, function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  },

  // Log user activity
  logUserActivity: (activityData) => {
    return new Promise((resolve, reject) => {
      const { userId, activityType, description, metadata, ipAddress, userAgent } = activityData;
      db.run(
        'INSERT INTO user_activities (userId, activityType, description, metadata, ipAddress, userAgent) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, activityType, description, JSON.stringify(metadata || {}), ipAddress, userAgent],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }
};

module.exports = {
  db,
  initDatabase,
  ...dbHelpers
}; 