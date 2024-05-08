const express = require('express');
const mongoose = require("mongoose")
const productrouter = require("./Routers/ProductRouter");
const dotenv = require('dotenv');
const cors =require("cors")
const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")
const category=require("./Routers/CategoryRouter")
const cart =require("./Routers/CartRouter")
const app = express();

<<<<<<< HEAD


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

=======
>>>>>>> b92fa63bc7c2b4f0558fdf4c9cbf870f19a980dd

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors({
  origin: "*"
}))

app.use("/admin/product", productrouter)
app.use("/auth/", auth)
app.use("/order/", orders)
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




<<<<<<< HEAD
const PORT = process.env.PORT || 9000;
=======
const PORT = process.env.PORT || 5000;
>>>>>>> b92fa63bc7c2b4f0558fdf4c9cbf870f19a980dd
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
