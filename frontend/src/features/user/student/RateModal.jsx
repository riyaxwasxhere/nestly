import React, { useState } from "react";
import { Star, X, MapPin } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../../../App";

function RateModal({ listing, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  if (!listing) return null;

  const labels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent"
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/reviews/create`,
        { listingId: listing._id, rating, review },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Review posted successfully");
        onClose();
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl sm:rounded-3xl border border-[#6b3d18] bg-[#1d0f05] p-5 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-[#4a2d16]">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-xl sm:text-2xl font-bold text-[#F0E8D8]"
          >
            Leave a Review
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 transition-all rounded-full hover:bg-white/10"
          >
            <X size={24} className="text-[#c9b18b]" />
          </button>
        </div>

        <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-[#4a2d16]">
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
            <img
              src={
                listing?.photos?.[0] ||
                "https://placehold.co/600x400?text=Property"
              }
              alt={listing.title}
              className="object-cover w-full h-44 sm:h-52 md:w-72 rounded-xl sm:rounded-2xl border border-[#6b3d18]"
            />
            <div className="flex flex-col justify-center">
              <p className="text-[#b08b5a] mb-1 sm:mb-2 text-sm sm:text-base">
                Property
              </p>
              <h3
                style={{ fontFamily: "Playfair Display, serif" }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F0E8D8] leading-tight"
              >
                {listing.title}
              </h3>
              <div className="flex items-start gap-2 mt-3 sm:mt-4 text-[#c9b18b]">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <p className="text-sm leading-snug sm:text-base">
                  {listing?.address?.house}, {listing?.address?.street},{" "}
                  {listing?.address?.locality}, {listing?.address?.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-[#4a2d16]">
          <p className="mb-4 sm:mb-5 text-base sm:text-xl text-[#d4b27a]">
            How was your experience?
          </p>
          <div className="flex gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                  star <= (hover || rating)
                    ? "fill-[#FFC94A] text-[#FFC94A]"
                    : "text-[#6b5640]"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 sm:mt-5 text-lg sm:text-2xl font-medium text-[#d4b27a]">
            {labels[rating] || "Select Rating"}
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <label className="block mb-3 sm:mb-4 text-base sm:text-xl text-[#d4b27a]">
            Write your review
          </label>
          <textarea
            rows={5}
            maxLength={500}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this property..."
            className="w-full min-h-[140px] sm:min-h-[180px] resize-none rounded-xl sm:rounded-2xl border border-[#6b3d18] bg-[#120801] p-4 sm:p-5 text-sm sm:text-base text-white outline-none transition-all focus:border-[#d4b27a]"
          />
          <div className="mt-2 sm:mt-3 text-right text-xs sm:text-sm text-[#867a5f]">
            {review.length}/500
          </div>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 border border-[#8c6239] rounded-xl sm:rounded-2xl text-[#e3c28f] text-sm sm:text-base transition-all hover:bg-[#2d1708]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!rating || !review.trim()}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 rounded-xl sm:rounded-2xl bg-[#F4A523] text-[#1d0f05] text-sm sm:text-base font-semibold transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default RateModal;
