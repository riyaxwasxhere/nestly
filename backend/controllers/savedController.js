import Saved from "../models/Saved.js";

export const saveListing = async (req, res) => {
  try {
    const { userId, savedListingId } = req.body;

    const newSaved = await Saved.create({
      user: userId,
      savedListing: savedListingId
    });

    const existing = await Saved.findOne({
      user: userId,
      savedListing: savedListingId
    });

    if (existing) {
      return res.status(400).json({
        message: "Already saved"
      });
    }

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
    }).populate("savedListing");
    res.status(200).json(savedListings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const removeSavedListing = async (req, res) => {
  try {
    const { userId, savedListingId } = req.body;

    const deleted = await Saved.findOneAndDelete({
      user: userId,
      savedListing: savedListingId
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
