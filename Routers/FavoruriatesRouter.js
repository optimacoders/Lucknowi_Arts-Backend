
const express = require('express');
const { addFavouriates, getuserFavouriates } = require('../Controllers/FavouriateController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();



router.post("/",verifyToken, addFavouriates)
router.get("/",verifyToken, getuserFavouriates)


module.exports=router;