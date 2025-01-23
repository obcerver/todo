const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    },
});

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Attach io to app
app.set('io', io);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
