const express = require('express');
const mongoose = require("mongoose")
const user = require("./Models/User")

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});



const mongoDB = "mongodb+srv://optimacoders:l0EMR8N43VOyeIVb@optima.ynqq6o3.mongodb.net/?retryWrites=true&w=majority&appName=optima";

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
