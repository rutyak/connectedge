const express = require("express");
const userRouter = express();
const userAuth = require("../middleware/userAuth");
const {
  requests,
  connections,
  feeds,
} = require("../controller/userController");

userRouter.get("/user/requests", userAuth, requests);

userRouter.get("/user/connections", userAuth, connections);

userRouter.get("/feeds", userAuth, feeds);

module.exports = userRouter;
