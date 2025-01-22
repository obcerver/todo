require("dotenv").config();
// authMiddleware.js
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Assuming you're using cookie-parser middleware

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
      // Verify the Google JWT token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Your Google Client ID
      });
  
      // Attach user info to the request object
      req.user = ticket.getPayload();
      next();
    } catch (error) {
      console.error("Token verification error2:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = { authMiddleware };

