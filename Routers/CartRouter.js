const express = require('express');
const { addtoCart, getUserCart, removeProduct, editCart } = require('../Controllers/CartController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();

router.post('/',verifyToken, addtoCart);
router.get('/',verifyToken, getUserCart);
router.post('/:productId',verifyToken,removeProduct);
router.put('/:productId',verifyToken, editCart);

module.exports=router















