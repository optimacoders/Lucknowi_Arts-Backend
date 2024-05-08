const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'         
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    color:{
        type:String
    },
    size:{
        type:String
    }
});

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
        enum: ['normal', 'admin'],
        default: 'normal',
        required: true
    },cart: [ProductSchema]


});

const Usermodel = mongoose.model("User", UserSchema);

module.exports = Usermodel;