const Razorpay = require("razorpay");
const dotenv = require('dotenv');
const Payment =require("../Models/Paymentmodel")
const crypto=require("crypto");
dotenv.config();
// const { instance } = require("../server");
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log(instance.orders)

const checkout = async (req, res) => {
    const {amount}=req.body;
    const options = {
        amount: Number(amount*100),  
        currency: "INR",
    };
    try {
        const order = await instance.orders.create(options); 
        return res.status(200).send({
            success: true,
            order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create order"
        });
    }
}

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;

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

module.exports = { checkout,paymentVerification };
