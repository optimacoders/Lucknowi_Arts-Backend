const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product model
    }],
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
        enum: ['Preparing', 'Shipment', 'Completed'],
        default: 'Preparing'
    },
    orderDateTime: {
        type: Date,
        default: Date.now
    },
    orderValue: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
