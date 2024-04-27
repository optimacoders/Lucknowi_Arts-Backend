    const express = require('express');
    const { addproduct, getProducts } = require('../Controllers/ProductController');
    const router = express.Router();

    router.post('/add-product',addproduct);
    router.get('/fetch-products',getProducts)

    module.exports=router