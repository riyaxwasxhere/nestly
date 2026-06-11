import Listing from "../models/Listing.js";
import Reviews from "../models/Reviews.js";
import VisitRequest from "../models/VisitRequest.js";

export const createReview = async (req, res) => {
  try {
    const studentId = req.user.id;

    const { listingId, rating, review } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found"
      });
    }
    const completedVisit = await VisitRequest.findOne({
      student: studentId,
      listing: listingId,
      status: "Completed"
    });

    if (!completedVisit) {
      return res.status(403).json({
        success: false,
        message: "You can review only after completing a visit"
      });
    }

    if (!review?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Review cannot be empty"
      });
    }

    const existingReview = await Reviews.findOne({
      listing: listingId,
      student: studentId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this property"
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const newReview = await Reviews.create({
      listing: listingId,
      student: studentId,
      owner: listing.owner,
      rating,
      review
    });

    const reviews = await Reviews.find({
      listing: listingId
    });

    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    listing.averageRating = Number(avg.toFixed(1));
    listing.totalReviews = reviews.length;

    await listing.save();

    res.status(201).json({
      success: true,
      review: newReview
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getListingReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({
      listing: req.params.id
    })
      .populate("student", "fullname profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
