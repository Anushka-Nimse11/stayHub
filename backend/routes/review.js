const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Reviews Post Route
router.post("/", isLoggedIn, reviewController.createReview);


// Delete review
router.delete("/:reviewId", isLoggedIn, isAuthor, reviewController.destroyReview);

module.exports = router;