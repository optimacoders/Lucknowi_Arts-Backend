// orderRoutes.js

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { addCategory, getAllCategories } = require('../Controllers/CategoryController');



router.post("/add-category",addCategory)
router.get("/",getAllCategories)
module.exports = router;
