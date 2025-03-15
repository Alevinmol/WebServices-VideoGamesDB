const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:id", userController.getUser);

// Add or update a user
router.post("/", userController.addOrUpdateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;