const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
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
      enum: ['Pending', 'Shipped', 'Out', 'Delivered', 'Cancelled'],
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
    payu_transaction_id: {
      type: String
    },
    razorpay_payment_id: {
      type: String
    },
    delivery: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
