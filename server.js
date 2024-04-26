const express = require('express');
const mongoose = require("mongoose")
const user = require("./Models/Usermodel")
const productrouter=require("./Routers/ProductRouter");
const dotenv = require('dotenv'); 
const app = express();



app.get('/', (req, res) => {
    res.send('Hello, world!');
});


dotenv.config();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/admin",productrouter)


const mongoDB=process.env.MONGODB_URL;
console.log(mongoDB);
mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true })
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
