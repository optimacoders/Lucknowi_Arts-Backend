const Order = require('../Models/OrderModel');
const { validationResult } = require('express-validator');

// Create Order API
const createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, productIds, address, phoneNo, orderValue } = req.body;

        // Find the latest order and get its orderId
        const latestOrder = await Order.findOne().sort({ orderId: -1 });

        let orderId;
        if (latestOrder) {
            // If there are existing orders, increment the orderId by 1
            orderId = latestOrder.orderId + 1;
        } else {
            // If there are no existing orders, start orderId from 1000
            orderId = 1000;
        }

        // Create a new order
        const order = new Order({
            orderId,
            userId,
            productIds,
            address,
            phoneNo,
            orderValue
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Order by ID API
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
        if (typeof orderId === 'string' && orderId.toLowerCase() === 'getallorders') {
            const orders = await Order.find({});
            return res.status(200).json({ orders });
        }
        console.error('Error retrieving order by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    catch (error) {
        console.error('Error retrieving order by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Order Status API
const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Orders by User ID API
const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ userId });
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving orders by user ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Orders API
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createOrder, getOrderById, updateOrderStatus, getOrdersByUserId, getAllOrders };
