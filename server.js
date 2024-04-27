const express = require('express');
const mongoose = require("mongoose")
// const user = require("./Models/Usermodel")
const productrouter = require("./Routers/ProductRouter");
const dotenv = require('dotenv');
const auth = require("./Routers/AuthRouter")
const orders = require("./Routers/OrderRoute")

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


dotenv.config();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/admin", productrouter)
app.use("/auth/", auth)
app.use("/order/", orders)




const cloudinary = require('./Utils/imageupload')

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });



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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
