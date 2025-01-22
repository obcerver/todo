require("dotenv").config();
const db = require("../db");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const index = async (req, res) => {
  const user = req.user;

  try {
    return res
      .status(200)
      .json({ message: "Logged in successfully", user: user });
  } catch (error) {
    console.error("Token verification error3:", error);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

const store = async (req, res) => {
  const { description } = req.body;
  const user = req.user;

  if (!description) {
    return res.status(400).json({
      success: false,
      message: "Please provide all credential",
    });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      user.email,
    ]);

    if (rows.length === 1) {
      const userInfo = rows[0];
      const id = userInfo.id;

      // Insert tasks into the database
      await db.query("INSERT INTO tasks (description, user) VALUES (?, ?)", [
        description, id,
      ]);
    }

    return res
      .status(200)
      .json({ message: "Successfully created to-do", user: user });
  } catch (error) {
    console.error("Token verification error3:", error);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

module.exports = { index, store };
