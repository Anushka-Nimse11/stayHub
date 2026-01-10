const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.json(allListings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.newListing = async (req, res) => {
  try {
    const createListing = new Listing(req.body);
    if (req.file) {
      createListing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

createListing.owner = req.user._id;
await createListing.save();

    res.json(createListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.singleListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {
      path: "author",
    }}).populate("owner");

    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the listing first
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ownership check
    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not have access to edit this listing" });
    }

    // Prepare update data
    const updateData = { ...req.body };

    // Handle new image
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // Prepare original image URL for frontend
    let originalImageUrl = null;
    if (updatedListing.image?.url) {
      originalImageUrl = updatedListing.image.url.replace("/upload", "/upload/w_250");
    }

    // Send response
    res.json({
      updatedListing,
      originalImageUrl,
    });
  } catch (err) {
    console.error(err); // Log error to see the real cause
    res.status(500).json({ error: err.message });
  }
};



module.exports.destroyListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}