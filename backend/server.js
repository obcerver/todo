const express = require('express');
const db = require('./db');
const cors = require('cors');

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env

// Middleware to parse JSON
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',  // Frontend URL
    methods: ['GET', 'POST', 'PUT' ,'PATCH', 'DELETE'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/todos", todoRouter)

//Test Route to Fetch Data
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users'); // Example query
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
