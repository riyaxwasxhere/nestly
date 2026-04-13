import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    address: {
      house: { type: String, required: true },
      street: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String }
    },
    pricePerMonth: {
      type: Number,
      required: true
    },
    roomType: {
      type: String,
      enum: ["single", "double", "sharing", "other"],
      required: true
    },
    genderPreference: {
      type: String,
      enum: ["boys", "girls", "any"],
      required: true
    },
    foodIncluded: {
      type: Boolean,
      default: false
    },
    photos: [
      {
        type: String
      }
    ],
    amenities: [
      {
        type: String
      }
    ],
    bookingStatus: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number]
      }
    }
  },
  { timestamps: true }
);

listingSchema.index({ location: "2dsphere" });


const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
