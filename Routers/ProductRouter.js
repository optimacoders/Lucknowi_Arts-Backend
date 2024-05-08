    const express = require('express');
    const { addproduct, getProducts, getProductById } = require('../Controllers/ProductController');
    const router = express.Router();

    router.post('/', addproduct);

    router.get('/', getProducts);

    router.get('/:id', getProductById);


    module.exports=router















    