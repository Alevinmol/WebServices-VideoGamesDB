const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// GET request for list of all games
router.get("/", gameController.getAllGames);

// PUT request to add or update a game
router.put("/:id", gameController.addOrUpdateGame);

module.exports = router;