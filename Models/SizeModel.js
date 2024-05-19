const mongoose = require("mongoose");

const SizeSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SizeModel = mongoose.model("Size", SizeSchema);

module.exports = SizeModel;
