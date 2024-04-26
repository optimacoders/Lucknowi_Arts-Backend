// orderRoutes.js

const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, updateOrderStatus, getOrdersByUserId, getAllOrders } = require('../Controllers/OrderController');
const { body, param } = require('express-validator');

// Create Order API
router.post('/', [
    body('userId').exists(),
    body('productIds').isArray(),
    body('address').exists(),
    body('phoneNo').exists(),
    body('orderValue').isNumeric()
], createOrder);

// Get Order by ID API
router.get('/:orderId', [
    param('orderId').isMongoId()
], getOrderById);

// Update Order Status API
router.put('/:orderId/status', [
    param('orderId').isMongoId(),
    body('status').isIn(['Preparing', 'Shipment', 'Completed'])
], updateOrderStatus);

// Get Orders by User ID API
router.get('/user/:userId', [
    param('userId').isMongoId()
], getOrdersByUserId);

// Get All Orders API
router.get('/', getAllOrders);

module.exports = router;
