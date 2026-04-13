import Listing from "../models/Listing.js";

export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      pricePerMonth,
      roomType,
      genderPreference,
      foodIncluded,
      bookingStatus,
      amenities,
      location
    } = req.body;

    const parsedAddress = JSON.parse(address);
    const parsedAmenities = amenities ? JSON.parse(amenities) : [];
    const parsedLocation = location ? JSON.parse(location) : null;

    const photos = req.files ? req.files.map((file) => file.path) : [];

    const newListing = await Listing.create({
      owner: req.user._id,
      title,
      description,
      address: parsedAddress,
      pricePerMonth,
      roomType,
      genderPreference,
      foodIncluded: foodIncluded === "true",
      bookingStatus: bookingStatus || "open",
      photos,
      amenities: parsedAmenities,
      ...(parsedLocation?.coordinates?.length > 0 && {
        location: parsedLocation
      })
    });

    res.status(201).json({
      message: "Listing created successfully",
      listing: newListing
    });
  } catch (error) {
    console.log("CREATE LISTING ERROR:", error.message);
    console.log("FULL ERROR:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: error.message });
  }
};
export const getOwnerListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user._id });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};
