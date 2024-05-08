const express = require('express');
const mongoose = require("mongoose")
// const user = require("./Models/Usermodel")
const productrouter = require("./Routers/ProductRouter");
const dotenv = require('dotenv');
<<<<<<< HEAD
const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")
const payment = require("./Routers/PaymentRoute")

const app = express();

=======
const cors =require("cors")
const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")
const category=require("./Routers/CategoryRouter")
const cart =require("./Routers/CartRouter")
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

<<<<<<< HEAD


>>>>>>> ec5c9fc65548fa6da49a4d4f0f1969f2c52c1a91
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

<<<<<<< HEAD
=======
=======
>>>>>>> b92fa63bc7c2b4f0558fdf4c9cbf870f19a980dd
>>>>>>> ec5c9fc65548fa6da49a4d4f0f1969f2c52c1a91

dotenv.config();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({
  origin: "*"
}))

app.use("/admin", productrouter)
app.use("/auth/", auth)
app.use("/order/", orders)
<<<<<<< HEAD
app.use("/pay", payment)
=======
app.use("/admin/category",category )
app.use("/cart/", cart)
>>>>>>> ec5c9fc65548fa6da49a4d4f0f1969f2c52c1a91




const cloudinary = require('./Utils/imageupload')

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });



<<<<<<< HEAD
app.post("/Image", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image);
    console.log(result);
    return res.status(200).json({ result });
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      err
    })
  }
});
const PORT = process.env.PORT || 9000;
=======

<<<<<<< HEAD
const PORT = process.env.PORT || 9000;
=======
const PORT = process.env.PORT || 5000;
>>>>>>> b92fa63bc7c2b4f0558fdf4c9cbf870f19a980dd
>>>>>>> ec5c9fc65548fa6da49a4d4f0f1969f2c52c1a91
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
