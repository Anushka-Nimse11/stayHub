const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


// signup
router.post("/signup", userController.signUp);

// login
router.post("/login", saveRedirectUrl, userController.login);

router.post("/logout", userController.logOut);

// get current logged-in user
router.get("/current", userController.currentUser);

module.exports = router