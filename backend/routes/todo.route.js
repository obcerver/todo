const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../middleware/auth.middleware');
const { index, store } = require('../controllers/todo.controller');

router.get("/", authMiddleware, index);
router.post("/", authMiddleware, store)

module.exports = router;