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

        const reviewStarsCount = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0
        };

        let totalRating = 0;

        reviews.forEach(review => {
            switch (review.rating) {
                case 1:
                    reviewStarsCount.one += 1;
                    break;
                case 2:
                    reviewStarsCount.two += 1;
                    break;
                case 3:
                    reviewStarsCount.three += 1;
                    break;
                case 4:
                    reviewStarsCount.four += 1;
                    break;
                case 5:
                    reviewStarsCount.five += 1;
                    break;
                default:
                    break;
            }
            totalRating += review.rating;
        });

        const totalCount = reviews.length;
        const averageRating = totalCount ? (totalRating / totalCount).toFixed(2) : 0;

        res.status(200).json({
            reviews,
            totalCount,
            averageRating,
            ratingDistribution: reviewStarsCount
        });
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
        const reviews = await Review.find({ isWebsiteReviews: true })
            .sort({ createdAt: -1 })
            .limit(4).populate('userId');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addReview, fetchProductReview, WebsiteReview, fetchWebsiteReviews }