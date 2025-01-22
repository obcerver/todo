const db = require("../db");
require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const store = async (username, email) => {
  try {
    if (!username || !email) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide both username and email",
        });
    }

    // Insert user into the database
    const [result] = await db.query(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );

    // No response should be sent here; just return
    return true;
  } catch (error) {
    console.error("Error in store function:", error);
    return false;
  }
};

const login = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Credential is required" });
  }

  try {
    // Verify the Google JWT token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.CLIENT_ID, // Your Google Client ID
    });

    const user = ticket.getPayload(); // Extract user info

    // Check if the user exists in the database (mocked database check here)
    // Replace this with your actual database logic
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      user.email,
    ]);

    if (rows.length === 0) {
      // If user does not exist, store the user in the database
      const storeSuccess = await store(user.name, user.email);

      if (storeSuccess) {
        // After storing the user, log them in by setting the cookie
        res.cookie("token", credential, {
          httpOnly: true, // Prevent JavaScript access to the cookie
          secure: true, // Ensure the cookie is only sent over HTTPS (use only in production)
          sameSite: "Strict", // Prevent CSRF attacks
          path: "/", // Make cookie available across the entire site
        });

        // Send a response after successful login
        return res
          .status(200)
          .json({ message: "New user created and logged in successfully" });
      } else {
        return res
          .status(2400)
          .json({ message: "Failed to create new user" });
      }
    } else {
      // If user exists, just log them in by setting the cookie
      res.cookie("token", credential, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      // Send the response after logging in
      return res.status(200).json({ message: "Logged in successfully" });
    }
  } catch (error) {
    console.error("Token verification error1:", error);
    // Differentiate between error types if needed
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

const logout = (req, res) => {
  // Clear the authentication token cookie by setting its expiration to a past date
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // Ensure this matches your site's HTTPS configuration
    sameSite: "Strict", // Should match the cookie's sameSite configuration
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { store, login, logout };
