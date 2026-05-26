import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    savedListing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    }
  },
  { timestamps: true }
);

savedSchema.index({ user: 1, savedListing: 1 }, { unique: true });

const Saved = mongoose.model("Saved", savedSchema);

export default Saved;
