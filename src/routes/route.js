const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Define your routes
router.get("/fahad", userController.getUsers);
router.post("/fahad", userController.saveUser);
// Add more routes as needed

module.exports = router;
