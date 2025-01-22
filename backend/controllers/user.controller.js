const db = require('../db');
const bcrypt = require('bcrypt');

// View all users
const index = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return res.status(200).json({ success: true, message: rows });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }    
};

// View specific users
const show = async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return res.status(200).json({ success: true, message: rows});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }    
};


module.exports = { index, show };