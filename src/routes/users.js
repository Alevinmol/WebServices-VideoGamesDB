const express = require("express");
const router = express.Router();
const userController = require("../controllers/userscontroller");

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by username
router.get("/:username", userController.getUser);

// Add or update a user
router.post("/", userController.addOrUpdateUser);

// Update a user by username
router.put("/:username", userController.addOrUpdateUser);

// Delete a user by username
router.delete("/:username", userController.deleteUser);

// 🔹 Add a search endpoint for users
router.get("/search", userController.searchUsers);

module.exports = router;
