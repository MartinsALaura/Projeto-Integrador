const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '2004',
  database: 'projeto_integrador_doacao_livros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Attempting to connect to database...');
    await connection.ping();
    console.log('Testing database tables...');
    await connection.execute('SELECT 1 FROM usuarios LIMIT 1');
    connection.release();
    console.log('✅ Database connection and tables verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Please ensure:');
    console.error('1. MySQL server is running');
    console.error('2. Database "projeto_integrador_doacao_livros" exists');
    console.error('3. User credentials are correct');
    console.error('4. Required tables are created');
    return false;
  }
}

// Test connection on startup
testConnection().catch(console.error);

module.exports = { pool, testConnection };