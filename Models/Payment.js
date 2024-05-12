const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    razorpaySignature: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
