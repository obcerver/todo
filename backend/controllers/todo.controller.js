require("dotenv").config();
const db = require("../db");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

const index = async (req, res) => {
  const user = req.user;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      user.email,
    ]);

    if (rows.length === 1) {
      const userInfo = rows[0];
      const id = userInfo.id;

      // Insert tasks into the database
      const [todos] = await db.query("SELECT * FROM tasks WHERE user = ? ORDER BY CreatedOn DESC", [
        id,
      ]);

      return res
        .status(200)
        .json({
          message: "Successfully fetched to-do",
          todos: todos,
          user: user,
        });
    }

    return res.status(401).json({ message: "Failed to fetch your to-dos" });
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
      message: "Please provide all credentials",
    });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      user.email,
    ]);

    if (rows.length === 1) {
      const userInfo = rows[0];
      const id = userInfo.id;

      // Insert task into the database
      const [result] = await db.query(
        "INSERT INTO tasks (description, user) VALUES (?, ?)",
        [description, id]
      );

      // Fetch the newly inserted task to include all fields (e.g., date)
      const [newTodo] = await db.query("SELECT * FROM tasks WHERE id = ?", [
        result.insertId,
      ]);

      // Emit the event to all connected clients
      req.app.get("io").emit("todoAdded", newTodo[0]);

      return res.status(200).json({
        message: "Successfully created to-do",
        todo: newTodo,
        user: user,
      });
    }

    return res.status(404).json({
      message: "User not found",
    });
  } catch (error) {
    console.error("Error creating to-do:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const update = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;
  const user = req.user;

  if (!description) {
    return res.status(400).json({
      success: false,
      message: "Please provide all credentials",
    });
  }

  try {
    // Insert task into the database
    const [result] = await db.query(
      "UPDATE tasks SET description = ? WHERE id = ?",
      [description, id]
    );

    return res.status(200).json({
      message: "Successfully updated to-do",
    });
  } catch (error) {
    console.error("Error updating to-do:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { index, store, update };
