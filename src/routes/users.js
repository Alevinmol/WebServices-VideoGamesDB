const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Get all users
router.get("/", usersController.getAllUsers);

// Get a user by ID
router.get("/:username", usersController.getUser);

// Add or update a user
router.post("/", usersController.addOrUpdateUser);

// Update a user by ID
router.put("/:username", usersController.addOrUpdateUser);

// Delete a user by ID
router.delete("/:username", usersController.deleteUser);

module.exports = router;