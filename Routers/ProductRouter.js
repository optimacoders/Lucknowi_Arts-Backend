const express = require('express');
const { addproduct, getProducts, getProductById, getSimilarProducts, editProduct, deleteProduct, searchProduct, latestProducts } = require('../Controllers/ProductController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();

router.post('/', addproduct);
router.get('/:currency', getProducts);
router.get('/latestProducts', latestProducts);
router.get('/:id/:currency', getProductById);
router.get('/getsimilarproducts/:category', getSimilarProducts);
router.put('/:id', verifyToken, editProduct)
router.delete("/:id", verifyToken, deleteProduct)
router.post('/search', searchProduct);


module.exports = router