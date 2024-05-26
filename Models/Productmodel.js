const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    original_price: {
        type: String,
        required: true,
    },
    selling_price: {
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    size: [{
        type: String,
        required: true,
    }],
    color: [{
        type: String,
        required: true,
    }],
    video: {
        type: String
    },
    material: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Productmodel = mongoose.model("Product", ProductSchema);

module.exports = Productmodel;