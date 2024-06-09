const express = require("express");
const router = express.Router()

const verifyToken = require("../Middleware/Authenticating");
const { addWatchHistory, getUserWatchHistory } = require("../Controllers/WatchHistoryController")


router.post("/", verifyToken, addWatchHistory)
router.get("/:currency", verifyToken, getUserWatchHistory)

module.exports = router;