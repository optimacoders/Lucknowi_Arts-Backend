const express = require('express');
const { addproduct, getProducts, getProductById, getSimilarProducts, editProduct, deleteProduct, searchProduct, latestProducts } = require('../Controllers/ProductController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();

router.get('/latestProducts', latestProducts); 
router.get('/:id/:currency', getProductById);
router.get('/getsimilarproducts', getSimilarProducts);
router.get('/', getProducts); 
router.post('/', addproduct);
router.put('/:id', verifyToken, editProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.post('/search', searchProduct);



module.exports = router