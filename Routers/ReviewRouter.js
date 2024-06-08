const express = require('express');
const { addReview, fetchProductReview, WebsiteReview, fetchWebsiteReviews } = require('../Controllers/ReviewController');
const verifyToken = require('../Middleware/Authenticating');
const router = express.Router();



router.get('/websiteReviews', fetchWebsiteReviews);
router.get("/:productId", fetchProductReview)
router.post("/WebsiteReview",verifyToken, WebsiteReview)
router.post("/",verifyToken, addReview)
module.exports=router