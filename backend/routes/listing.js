const express = require("express");
const router = express.Router();
// const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

router
  .route("/")
  .get(listingController.index)
  .post(isLoggedIn, upload.single("image"), listingController.newListing);

router
  .route("/:id")
  .get(listingController.singleListing)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    listingController.updateListing
  );

// delete
router.delete("/delete/:id", isLoggedIn, isOwner, listingController.destroyListing);


/*
Get all listings (API)
router.get("/", listingController.index);

// Create route
router.post("/", isLoggedIn, listingController.newListing);

Get single listing
router.get("/:id", listingController.singleListing);

// Edit
router.put("/:id", isLoggedIn, isOwner, listingController.updateListing);

*/


module.exports = router;