const express = require('express');
const mongoose = require("mongoose")
// const user = require("./Models/Usermodel")
const productrouter = require("./Routers/ProductRouter");
const dotenv = require('dotenv');
const cors = require("cors")
const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")
const category = require("./Routers/CategoryRouter")
const cart = require("./Routers/CartRouter")
const payment = require("./Routers/PaymentRouter")
const Razorpay = require('razorpay');
const AdminUser = require("./Admin/Routes/userRoute")
const AdminSize = require('./Admin/Routes/sizeRoute')
const adminColor = require("./Admin/Routes/colorRoute")
const liked = require("./Routers/FavoruriatesRouter")
const dashboard = require("./Admin/Routes/DashboardRoute")
const WatchHistory = require("./Routers/WatchHistoryRoute")
const review = require("./Routers/ReviewRouter")

const app = express();

dotenv.config();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({
  origin: "*"
}))

app.use("/admin/product", productrouter)
app.use("/auth/", auth)
app.use("/order/", orders)

app.use("/pay", payment)

app.use("/admin/category", category)
app.use("/cart/", cart)
app.use("/admin/user", AdminUser)
app.use("/admin/size", AdminSize)
app.use("/admin/color", adminColor)
app.use("/liked", liked)
app.use("/dashboard", dashboard)
app.use("/watchHistory", WatchHistory)
app.use("/review", review)

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// console.log(instance.orders)
// module.exports = {instance};

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
