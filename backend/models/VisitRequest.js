import mongoose from "mongoose";

const visitRequestSchema = new mongoose.Schema(
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
    visitDate: {
      type: Date,
      required: true
    },
    message: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejectes", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

visitRequestSchema.index(
  {
    student: 1,
    listing: 1,
    visitDate: 1
  },
  { unique: true }
);

export default mongoose.model("VisitRequest", visitRequestSchema);
