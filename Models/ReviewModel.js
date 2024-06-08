const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    productImages: [
        {
            type: String
        }
    ],
    desc: {
        type: String
    },
    isWebsiteReviews: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
