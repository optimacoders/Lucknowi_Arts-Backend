const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    }
   

});

const Usermodel = mongoose.model("User", UserSchema);

module.exports = Usermodel;