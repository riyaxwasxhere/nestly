import BookingRequest from "../models/BookingRequest.js";
import Listing from "../models/Listing.js";

export const requestBooking = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found"
      });
    }
    if (listing.owner.toString() === studentId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot request a booking for your own listing"
      });
    }

    const existingRequest = await BookingRequest.findOne({
      student: studentId,
      listing: listingId,
      status: "Pending"
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending booking request for this property"
      });
    }

    const newBooking = await BookingRequest.create({
      student: studentId,
      owner: listing.owner,
      listing: listingId
    });

    return res.status(201).json({
      success: true,
      newBooking,
      requestId: newBooking._id
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getBookingRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let requests;

    if (role === "student") {
      requests = await BookingRequest.find({
        student: userId
      })
        .populate("owner")
        .populate("listing")
        .sort({ createdAt: -1 });
    } else {
      requests = await BookingRequest.find({
        owner: userId
      })
        .populate("student")
        .populate("listing")
        .sort({ createdAt: -1 });
    }
    return res.status(200).json({
      success: true,
      requests
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const checkBookingRequest = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { listingId } = req.params;
    const request = await BookingRequest.findOne({
      student: studentId,
      listing: listingId,
      status: "Pending"
    });

    return res.status(200).json({
      success: true,
      hasRequested: !!request,
      requestId: request?._id
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const cancelBookingRequest = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { requestId } = req.params;
    const request = await BookingRequest.findOne({
      _id: requestId,
      student: studentId,
      status: "Pending"
    });
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found"
      });
    }
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Request cancelled"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await BookingRequest.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking request not found"
      });
    }
    if (booking.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
