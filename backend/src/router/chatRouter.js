const express = require("express");
const userAuth = require("../middleware/userAuth");
const { chat } = require("../controller/chatController");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, chat);

module.exports = chatRouter;
