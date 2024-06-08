const express = require('express');
const router = express.Router();
const {dohash } = require('../Controllers/PaymentController');
const Order = require('../Models/OrderModel');
const Usermodel = require('../Models/Usermodel');
const Productmodel = require('../Models/Productmodel');


const FRONTEND_REACT=process.env.FRONTEND_REACT;
// const frontend = process.env.PAYU_SALT 

const paysuccess = async (req, res) => {
    if (req.body.status === "success") {
      try {
        const user = await Usermodel.findOne({ email: req.body.email });
  
        if (!user) {
          return res.status(404).json({ status: false, message: "User not found" });
        }
  
        const cart = user.cart;
        if (!Array.isArray(cart)) {
          return res.status(400).json({ status: false, message: "Cart is not iterable" });
        }
  
        const createdOrders = [];
  
        for (const cartItem of cart) {
          const { product, quantity, color, size } = cartItem;
  
          const order = new Order({
            userId: user._id,
            productId: product,
            quantity,
            color,
            size,
            address: user.address,
            phoneNo: user.mobileNo,
            orderValue: req.body.amount,
            paymentStatus: "done",
            payu_transaction_id:req.body.mihpayid

          });
  
          console.log("Order:", order);
  
          const reduceQuantity = await Productmodel.findById(product);
  
          if (!reduceQuantity) {
            return res.status(404).json({ status: false, message: "Product not found" });
          }
  
          reduceQuantity.quantity -= quantity;
          await reduceQuantity.save();
  
          await order.save();
          createdOrders.push(order);
        }
  
        user.cart = [];
        await user.save();
  
        if (createdOrders.length > 0) {
          const orderId = createdOrders[0]._id;
          return res.redirect(`${FRONTEND_REACT}/profile/myorder/${orderId}`);
        } else {
          return res.status(500).json({ status: false, message: "No orders were created" });
        }
      } catch (error) {
        console.error('Error creating orders:', error);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
      }
    } else {
      return res.status(400).json({ status: false, message: 'Payment failed' });
    }
  };
  
  module.exports = paysuccess;
  
  
router.post('/payu_success', paysuccess);;
router.post('/hash',dohash);

module.exports = router;
