const express = require('express');
const { addproduct, getProducts, getProductById, getSimilarProducts } = require('../Controllers/ProductController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();

router.post('/', addproduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/getsimilarproducts/:category', getSimilarProducts);


module.exports = router















