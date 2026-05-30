import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    type: {
      type: String,
      enum: [
        "visit_requested",
        "visit_approved",
        "visit_rejected",
        "visit_cancelled",
        "message",
        "booking_requested",
        "booking_approved",
        "booking_rejected",
        "booking_cancelled"
      ],
      required: true
    },
    title: {
      type: String
    },
    message: {
      type: String
    },
    isRead: {
      type: Boolean,
      default: false
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId
    },
    relatedModel: {
      type: String
    }
  },
  { timestamps: true }
);

notificationSchema.index({
  recipient: 1,
  createdAt: -1
});

notificationSchema.index({
  recipient: 1,
  isRead: 1
});


const Notification = mongoose.model("Notification", notificationSchema);
export default Notification 
