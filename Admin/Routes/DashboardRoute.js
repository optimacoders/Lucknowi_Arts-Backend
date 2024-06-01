const express = require("express")
const router = express.Router()

const { cardsData, getOrdersLast7Days } = require("../Controllers/DashboardController")
const verifyToken = require("../../Middleware/Authenticating")

router.get("/cardsData", verifyToken, cardsData);
router.get("/graphData", verifyToken, getOrdersLast7Days);

module.exports = router;