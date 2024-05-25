// orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrdersByUserId, getAllOrders, getmyOrder } = require('../Controllers/OrderController');
const verifyToken = require('../Middleware/Authenticating');

router.post('/create',verifyToken, createOrder);
router.get('/myorders',verifyToken, getOrdersByUserId);
router.get('/myorder/:orderid',verifyToken, getmyOrder);


module.exports = router;
