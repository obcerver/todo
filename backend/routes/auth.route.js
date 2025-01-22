const express = require('express');
const { store, login, logout } = require("../controllers/auth.contoller");

const router = express.Router();

router.post("/store", store)
router.post("/", login)
router.post("/logout", logout)

module.exports = router;