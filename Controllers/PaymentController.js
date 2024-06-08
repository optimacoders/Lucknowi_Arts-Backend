const crypto = require('crypto');

const PAYU_KEY = process.env.PAYU_KEY || 'your_payu_key';
const PAYU_SALT = process.env.PAYU_SALT || 'your_payu_salt';

const dohash = async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email } = req.body;
    if (!txnid || !amount || !productinfo || !firstname || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    console.log(hash);

    res.json({ hash });
  } catch (error) {
    console.error('Error generating hash:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const paysuccess= async(req,res)=>{
  console.log(req.body)
  console.log(req.query.token);

  const token = req.query.token;
  if (token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
if(req.body.status=="success"){
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
          address:user.address,
          phoneNo:user.mobileNo,
          orderValue:"1000",
          paymentStatus:"done",
          payu_transaction_id:req.body.mihpayid
      });
      console.log("uu",order)
     
      const reduceQuantity = await Productmodel.findById(product); 
      reduceQuantity.quantity = reduceQuantity.quantity - quantity;
      await reduceQuantity.save();
      
      await order.save();
      createdOrders.push(order);
  }

  user.cart = [];
  await user.save();

  res.status(201).json({ status: true, message: 'Orders created successfully', orders: createdOrders });
}
  
}
module.exports = { dohash,paysuccess };
