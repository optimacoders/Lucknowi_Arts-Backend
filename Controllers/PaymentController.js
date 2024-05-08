// paymentController.js

const Payment = require('../Models/Payment');
const { validationResult } = require('express-validator');

// Create Payment API
const createPayment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, paymentId, orderId, razorpaySignature, verified } = req.body;

        const payment = new Payment({
            userId,
            paymentId,
            orderId,
            razorpaySignature,
            verified
        });

        await payment.save();

        res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Payment by ID API
const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;

        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ payment });
    } catch (error) {
        console.error('Error retrieving payment by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Payment API
const updatePayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const { verified } = req.body;

        const payment = await Payment.findByIdAndUpdate(paymentId, { verified }, { new: true });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment updated successfully', payment });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Payment API
const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;

        const payment = await Payment.findByIdAndDelete(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Payments API
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({ payments });
    } catch (error) {
        console.error('Error retrieving all payments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createPayment, getPaymentById, updatePayment, deletePayment, getAllPayments };
