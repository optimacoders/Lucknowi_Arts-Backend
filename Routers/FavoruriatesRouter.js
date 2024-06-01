
const express = require('express');
const { addFavouriates, getuserFavouriates, removeuserFavouriates } = require('../Controllers/FavouriateController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();



router.post("/",verifyToken, addFavouriates)
router.get("/",verifyToken, getuserFavouriates)
router.post("/remove",verifyToken, removeuserFavouriates)


module.exports=router;