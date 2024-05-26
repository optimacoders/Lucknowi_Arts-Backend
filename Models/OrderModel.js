const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'out', 'Delivered', 'cancelled'],
        default: 'Pending'
    },
    orderDateTime: {
        type: Date,
        default: Date.now
    },
    orderValue: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_payment_id: {
        type: String,
    }, Delivery: {
        default: null,
        type: Date,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
