import mongoose from "mongoose";

const bookingRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected" ],
      default: "Pending"
    }
  },
  { timestamps: true }
);

bookingRequestSchema.index(
  {
    student: 1,
    listing: 1,
    status: 1
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "Pending"
    }
  }
);

const BookingRequest = mongoose.model("BookingRequest", bookingRequestSchema);
export default BookingRequest;
