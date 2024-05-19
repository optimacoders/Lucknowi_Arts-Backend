const Razorpay = require("razorpay");
const dotenv = require('dotenv');
const Payment = require("../Models/Paymentmodel")
const crypto = require("crypto");
dotenv.config();


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
    };
    try {
        const order = await instance.orders.create(options);
        return res.status(200).send({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Failed to create order"
        });
    }
}

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        return res.status(400).json({
            success: false,
        });
    }

}

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

module.exports = { checkout, paymentVerification, createPayment, getPaymentById, updatePayment, deletePayment, getAllPayments };
