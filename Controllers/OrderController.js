const Order = require('../Models/OrderModel');
const Usermodel = require('../Models/Usermodel');


const createOrder = async (req, res) => {
    try {
        const { address, phoneNo, orderValue, razorpay_order_id, razorpay_payment_id,paymentStatus } = req.body;
        const userId=req.user._id
        const user = await Usermodel.findById(userId);
        const cart = user.cart;

        const createdOrders = [];
        for (const cartItem of cart) {
            const { product, quantity, color, size } = cartItem;

            const order = new Order({
                userId,
                productId:product,
                quantity,
                color,
                size,
                address,
                phoneNo,
                orderValue,
                razorpay_order_id,
                razorpay_payment_id,
                paymentStatus
            });
            await order.save();
            createdOrders.push(order);
        }

        user.cart = [];
        await user.save();

        res.status(201).json({ status: true, message: 'Orders created successfully', orders: createdOrders });
    } catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Update Order Status API
const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(_id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user._id; 
        const orders = await Order.find({ userId }).populate("productId");
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving orders by user ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createOrder, updateOrderStatus, getOrdersByUserId, getAllOrders };
