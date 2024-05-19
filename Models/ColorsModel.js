const mongoose = require("mongoose");

const ColorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colorCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ColorModel = mongoose.model("Color", ColorSchema);

module.exports = ColorModel;
