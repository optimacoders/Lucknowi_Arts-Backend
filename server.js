const express = require('express');
const mongoose = require("mongoose")
// const user = require("./Models/Usermodel")
const productrouter = require("./Routers/ProductRouter");
const dotenv = require('dotenv');
const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")
const payment = require("./Routers/PaymentRoute")

const app = express();

const cors =require("cors")
const category=require("./Routers/CategoryRouter")
const cart =require("./Routers/CartRouter")


app.get('/', (req, res) => {
  res.send('Hello, world!');
});



app.get('/', (req, res) => {
  res.send('Hello, world!');
});


dotenv.config();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({
  origin: "*"
}))

app.use("/admin", productrouter)
app.use("/auth/", auth)
app.use("/order/", orders)

app.use("/pay", payment)

app.use("/admin/category",category )
app.use("/cart/", cart)







const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });




const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
