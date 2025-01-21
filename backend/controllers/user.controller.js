const db = require('../db');
const bcrypt = require('bcrypt');

// Add a new user
const store = async (req, res) => {

    const { username, email, password } = req.body;


    //tes
    try {

        if(!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all credentials" });
        }

        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: "The email is unavailable" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashPassword]);

        return res.status(200).json({ success: true, message: "User registered" });

    } catch (error) {
        console.error("Error in store function:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

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


module.exports = { store, index, show };