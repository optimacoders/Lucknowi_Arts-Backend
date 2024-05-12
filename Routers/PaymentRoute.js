// paymentRoutes.js

const express = require('express');
const router = express.Router();
const { createPayment, getPaymentById, updatePayment, deletePayment, getAllPayments } = require('../Controllers/PaymentController');
const { body, param } = require('express-validator');

// Create Payment API
router.post('/', [
    body('userId').exists(),
    body('paymentId').exists(),
    body('orderId').exists(),
    body('razorpaySignature').exists(),
    body('verified').isBoolean()
], createPayment);

// Get Payment by ID API
router.get('/:paymentId', [
    param('paymentId').isMongoId()
], getPaymentById);

// Update Payment API
router.put('/:paymentId', [
    param('paymentId').isMongoId(),
    body('verified').isBoolean()
], updatePayment);

// Delete Payment API
router.delete('/:paymentId', [
    param('paymentId').isMongoId()
], deletePayment);

// Get All Payments API
router.get('/', getAllPayments);

module.exports = router;
