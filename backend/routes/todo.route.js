const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../middleware/auth.middleware');
const { index, store, update } = require('../controllers/todo.controller');

router.get("/", authMiddleware, index);
router.post("/", authMiddleware, store);
router.patch("/:id", authMiddleware, update)

module.exports = router;