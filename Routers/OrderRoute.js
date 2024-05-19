// orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrdersByUserId, getAllOrders } = require('../Controllers/OrderController');

router.post('/create', createOrder);
router.get('/user/:userId', getOrdersByUserId);


module.exports = router;
