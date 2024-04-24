const express = require('express');
const { addproduct } = require('../Controllers/ProductController');
const router = express.Router();

router.post('/add-product',addproduct);


module.exports=router