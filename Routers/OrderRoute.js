// orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrdersByUserId, getAllOrders, getmyOrder, addDeliveryDate } = require('../Controllers/OrderController');
const verifyToken = require('../Middleware/Authenticating');

router.get('/myorders/:currency', verifyToken, getOrdersByUserId);
router.get('/myorder/:orderid', verifyToken, getmyOrder);
router.get('/', verifyToken, getAllOrders);
router.put("/:id", verifyToken, updateOrderStatus)
router.post("/:id", verifyToken, addDeliveryDate)


module.exports = router;
