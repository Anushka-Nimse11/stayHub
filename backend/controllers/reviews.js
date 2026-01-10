const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res) =>{
  try{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
     const newReview = new Review(req.body);
    newReview.author = req.user._id;

    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    
    res.json(newReview);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}