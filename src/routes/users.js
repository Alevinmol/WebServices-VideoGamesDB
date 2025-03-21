const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID
router.get("/:username", userController.getUser);

// Add or update a user
router.post("/", userController.addOrUpdateUser);

// Update a user by ID
router.put("/:username", userController.addOrUpdateUser);

// Delete a user by ID
router.delete("/:username", userController.deleteUser);

module.exports = router;