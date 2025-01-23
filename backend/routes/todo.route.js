const express = require("express");
const router = express.Router();

const { authMiddleware } = require('../middleware/auth.middleware');
const { index, store, update, destroy } = require('../controllers/todo.controller');

router.get("/", authMiddleware, index);
router.post("/", authMiddleware, store);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, destroy)

module.exports = router;