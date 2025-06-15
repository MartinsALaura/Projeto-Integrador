const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '', // Using IPv4 instead of 'localhost'
  user: '',
  password: '',
  database: 'projeto_integrador_doacao_livros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;