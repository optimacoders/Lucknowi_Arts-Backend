
const express = require('express');
const { addFavouriates } = require('../Controllers/FavouriateController');
const router = express.Router();



router.post("/",addFavouriates)


module.exports=router;