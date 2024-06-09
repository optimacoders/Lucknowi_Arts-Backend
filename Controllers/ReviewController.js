const Review = require("../Models/ReviewModel")

const addReview = async (req, res) => {
    try {
        const { productId, rating, comment, productImages, desc } = req.body;
        if (!productId || !rating || !comment) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const userId = req.user._id;
        const review = new Review({
            userId,
            productId,
            rating,
            comment,
            productImages,
            desc
        });

        await review.save();
        res.status(201).json({ status: true, message: "Review added successfully", review });
    } catch (error) {

    }

}


const fetchProductReview = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const reviews = await Review.find({ productId }).populate('userId').populate("productId");

        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const WebsiteReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ message: "Required fields are missing" });
        }
        const userId = req.user._id;

        const review = new Review({
            userId,
            rating,
            comment,
            isWebsiteReviews: true
        });

        await review.save();
        res.status(201).json({ message: "Website review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const fetchWebsiteReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ isWebsiteReviews: true }).populate('userId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
module.exports = { addReview, fetchProductReview, WebsiteReview, fetchWebsiteReviews }