// orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrdersByUserId, getAllOrders } = require('../Controllers/OrderController');
const verifyToken = require('../Middleware/Authenticating');

router.post('/create',verifyToken, createOrder);
router.get('/myorders',verifyToken, getOrdersByUserId);


module.exports = router;
