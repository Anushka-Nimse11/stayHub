// module.exports.isLoggedIn = (req, res, next) =>{
//       if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//     return res.status(401).json({
//       message: "Please login to listing",
//     });
//   }
//   next();
// }

// module.exports.saveRedirectUrl = (req, res, next) =>{
//   if(req.session.redirectUrl){
//     res.locals.redirectUrl = req.session.redirectUrl
//   }
//   next();
// }


const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");


module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      // Save the URL only if not already saved
      if (!req.session.redirectUrl) {
        req.session.redirectUrl = req.originalUrl;
      }
      return res.status(401).json({
        message: "Please login first",
      });
    }
    next();
  },

  saveRedirectUrl: (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
  },


  isOwner: async (req, res, next) => {
    const { id } = req.params;
    try {
      const listing = await Listing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (!listing.owner.equals(req.user._id)) {
        return res.status(403).json({ message: "You do not have access" });
      }

      // Attach the listing to req object for further use in route if needed
      req.listing = listing;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


isAuthor: async (req, res, next) => {
    const { reviewId } = req.params;
    try {
      const review = await Review.findById(reviewId);
      if (!review) return res.status(404).json({ message: "Review not found" });

      if (!review.author.equals(req.user._id)) {
        return res.status(403).json({ message: "You do not have permission" });
      }

      req.review = review; // attach review for later use if needed
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};


