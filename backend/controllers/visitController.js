import Listing from "../models/Listing.js";
import VisitRequest from "../models/VisitRequest.js";

export const requestVisit = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { listingId, visitDate, message } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listingId) {
      return res.status(404).json({
        success: false,
        message: "Listing not found"
      });
    }
    if (listing.owner.toString() === studentId) {
      return res.status(400).json({
        success: false,
        message: "You cannot request a visit for your own listing"
      });
    }
    const selectedDate = new Date(visitDate);

    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);

    nextDay.setDate(nextDay.getDate() + 1);

    const existingRequest = await VisitRequest.findOne({
      student: studentId,
      listing: listingId,
      visitDate: {
        $gte: selectedDate,
        $lt: nextDay
      }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "You have already sent a request for this date"
      });
    }

    const newVisitRequest = await VisitRequest.create({
      student: studentId,
      owner: listing.owner,
      listing: listingId,
      visitDate: selectedDate,
      message
    });
    return res.status(201).json({
      success: true,
      message: "Visit request sent successfully",
      visitRequest: newVisitRequest
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!!"
    });
  }
};

export const getStudentVisitRequests = async (req, res) => {
  try {
    const studentId = req.user.id;
    const visitRequests = await VisitRequest.find({
      student: studentId
    })
      .populate("listing")
      .populate("owner")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      visitRequests
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const cancelVisitRequest = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { visitRequestId } = req.params;

    const visitRequest = await VisitRequest.findById(
      visitRequestId
    );

    if (!visitRequest) {
      return res.status(404).json({
        success: false,
        message: "Visit request not found"
      });
    }

    if (
      visitRequest.student.toString() !== studentId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    await VisitRequest.findByIdAndDelete(
      visitRequestId
    );

    return res.status(200).json({
      success: true,
      message: "Visit request cancelled successfully"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
