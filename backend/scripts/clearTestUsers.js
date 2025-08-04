const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database
const dbPath = path.join(__dirname, '..', 'data', 'rolevista.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database');
});

// Clear test users (emails containing "example.com" or "test")
const clearTestUsers = () => {
  console.log('🧹 Clearing test users...');
  
  db.serialize(() => {
    // Get count of test users first
    db.get(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE email LIKE '%example.com%' 
        OR email LIKE '%test%' 
        OR firstName = 'Test'
        OR firstName = 'New'
    `, (err, row) => {
      if (err) {
        console.error('Error counting test users:', err);
        return;
      }
      
      console.log(`📊 Found ${row.count} test users to remove`);
      
      if (row.count > 0) {
        // Delete related assessment data first (foreign key constraints)
        db.run(`
          DELETE FROM assessment_sessions 
          WHERE userId IN (
            SELECT id FROM users 
            WHERE email LIKE '%example.com%' 
              OR email LIKE '%test%' 
              OR firstName = 'Test'
              OR firstName = 'New'
          )
        `, (err) => {
          if (err) {
            console.error('Error deleting assessment sessions:', err);
            return;
          }
          
          // Delete user activities
          db.run(`
            DELETE FROM user_activities 
            WHERE userId IN (
              SELECT id FROM users 
              WHERE email LIKE '%example.com%' 
                OR email LIKE '%test%' 
                OR firstName = 'Test'
                OR firstName = 'New'
            )
          `, (err) => {
            if (err) {
              console.error('Error deleting user activities:', err);
              return;
            }
            
            // Finally delete the test users
            db.run(`
              DELETE FROM users 
              WHERE email LIKE '%example.com%' 
                OR email LIKE '%test%' 
                OR firstName = 'Test'
                OR firstName = 'New'
            `, function(err) {
              if (err) {
                console.error('Error deleting test users:', err);
                return;
              }
              
              console.log(`✅ Successfully removed ${this.changes} test users`);
              console.log('🎉 Database cleaned! You can now test registration with any email.');
              
              // Close database connection
              db.close((err) => {
                if (err) {
                  console.error('Error closing database:', err);
                } else {
                  console.log('📕 Database connection closed');
                }
                process.exit(0);
              });
            });
          });
        });
      } else {
        console.log('✨ No test users found to remove');
        
        // Close database connection
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
          } else {
            console.log('📕 Database connection closed');
          }
          process.exit(0);
        });
      }
    });
  });
};

// Run the cleanup
clearTestUsers(); 