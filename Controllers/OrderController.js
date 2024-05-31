const Order = require('../Models/OrderModel');
const Usermodel = require('../Models/Usermodel');
const applyPagination = require('../utils/dataUtils');


const createOrder = async (req, res) => {
    try {
        const { address, phoneNo, orderValue, razorpay_order_id, razorpay_payment_id, paymentStatus } = req.body;
        const userId = req.user._id
        const user = await Usermodel.findById(userId);
        const cart = user.cart;

        const createdOrders = [];
        for (const cartItem of cart) {
            const { product, quantity, color, size } = cartItem;

            const order = new Order({
                userId,
                productId: product,
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


const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }

        res.status(200).json({ status: true, message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addDeliveryDate = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { Delivery } = req.body

        const [year, month, day] = Delivery.split('-');
        const deliveryDate = new Date(`${year}-${month}-${day}`);

        const order = await Order.findByIdAndUpdate(orderId, { Delivery: deliveryDate }, { new: true });
        if (!order) {
            return res.status(404).json({ status: false, message: 'Order not found' });
        }

        res.status(200).json({ status: true, message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const filterQuery = req.query.filter || "";
        let filter = {};
        if (filterQuery) {
            filter.status = filterQuery;
        }
        const orders = await Order.find({ userId, ...filter }).populate("productId").sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error retrieving orders by user ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const searchQuery = req.query.q || "";
        const filterQuery = req.query.filter || "";

        let filter = {};
        if (searchQuery) {
            filter.name = { $regex: searchQuery, $options: 'i' };
        }

        if (filterQuery) {
            filter.status = filterQuery;
        }
        const orders = await Order.find(filter).sort({ createdAt: -1 })
            .populate({
                path: 'productId',
                select: 'title'
            })
            .populate({
                path: 'userId',
                select: 'name'
            });

        const paginatedData = applyPagination(orders, page);
        res.status(200).json({ status: true, response: paginatedData });
    } catch (error) {
        console.error('Error retrieving all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getmyOrder = async (req, res) => {
    try {
        const orderid = req.params.orderid
        const order = await Order.findById(orderid).populate("productId");
        res.status(200).json({ order });
    } catch (error) {
        console.error('Error retrieving all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { createOrder, updateOrderStatus, getOrdersByUserId, getAllOrders, getmyOrder, addDeliveryDate };
