const db = require('../db');

// Get all users
const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

// Add a new user
const store = async (name, email) => {
  const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  return result;
};

module.exports = { store };
