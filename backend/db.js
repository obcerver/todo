const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,      
  password: process.env.DB_PASSWORD,     
  database: process.env.DB_NAME 
});

// Export a promise-based connection
const promisePool = pool.promise();

module.exports = promisePool;