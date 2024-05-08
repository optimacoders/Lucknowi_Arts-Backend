const express = require('express');
const { addtoCart, getUserCart, removeProduct, editCart } = require('../Controllers/CartController');
const router = express.Router();

router.post('/', addtoCart);
router.get('/:userId', getUserCart);
router.post('/:productId', removeProduct);
router.put('/:productId', editCart);

module.exports=router















