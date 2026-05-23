export const saveListing = async (req, res) => {
  try {
    const { userId, listingId } = req.body;

    const alreadySaved = await Saved.findOne({
      user: userId,
      listing: listingId
    });

    if (alreadySaved) {
      return res.status(400).json({
        message: "Listing already saved"
      });
    }

    const newSaved = await Saved.create({
      user: userId,
      listing: listingId
    });

    res.status(201).json(newSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getSavedListings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const savedListings = await Saved.find({
      user: userId
    }).populate("listing");

    res.status(200).json(savedListings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const removeSavedListing = async (req, res) => {
  try {
    const { userId, listingId } = req.body;

    const deleted = await Saved.findOneAndDelete({
      user: userId,
      listing: listingId
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Saved listing not found"
      });
    }

    res.status(200).json({
      message: "Removed from saved"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
