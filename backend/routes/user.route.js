const express = require('express');
const { store, index,show } = require("../controllers/user.controller");
//import { userVerification } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/", store);

router.get("/", index);

// router.get("/chat/:id", userVerification, showChat)

router.get("/:id", show)

// router.put("/:id", update)

module.exports = router;