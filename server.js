const express = require('express');
const mongoose = require("mongoose")
const productrouter = require("./Routers/ProductRouter");
const dotenv = require('dotenv');

const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")

const app = express();


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/admin/product", productrouter)
app.use("/auth/", auth)
app.use("/order/", orders)





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
