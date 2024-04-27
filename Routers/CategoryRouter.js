// orderRoutes.js

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { addCategory } = require('../Controllers/CategoryController');



router.post("/add-category",addCategory)

module.exports = router;
