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
        {
          listingId: listing._id,
          rating,
          review
        },
        {
          withCredentials: true
        }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl border border-[#6b3d18] bg-[#1d0f05] p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#4a2d16]">
          <h2
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-2xl font-bold text-[#F0E8D8]"
          >
            Leave a Review
          </h2>

          <button
            onClick={onClose}
            className="p-2 transition-all rounded-full hover:bg-white/10"
          >
            <X size={28} className="text-[#c9b18b]" />
          </button>
        </div>

        <div className="pb-8 mb-8 border-b border-[#4a2d16]">
          <div className="flex flex-col gap-6 md:flex-row">
            <img
              src={
                listing?.photos?.[0] ||
                "https://placehold.co/600x400?text=Property"
              }
              alt={listing.title}
              className="object-cover w-full h-52 md:w-72 rounded-2xl border border-[#6b3d18]"
            />

            <div className="flex flex-col justify-center">
              <p className="text-[#b08b5a] mb-2">Property</p>

              <h3
                style={{ fontFamily: "Playfair Display, serif" }}
                className="text-3xl md:text-5xl font-bold text-[#F0E8D8]"
              >
                {listing.title}
              </h3>

              <div className="flex items-center gap-2 mt-4 text-[#c9b18b]">
                <MapPin size={18} />
                <p>
                  {listing?.address?.house}, {listing?.address?.street},{" "}
                  {listing?.address?.locality}, {listing?.address?.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8 mb-8 border-b border-[#4a2d16]">
          <p className="mb-5 text-xl text-[#d4b27a]">
            How was your experience?
          </p>

          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
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

          <p className="mt-5 text-2xl font-medium text-[#d4b27a]">
            {labels[rating] || "Select Rating"}
          </p>
        </div>

        <div className="mb-8">
          <label className="block mb-4 text-xl text-[#d4b27a]">
            Write your review
          </label>

          <textarea
            rows={7}
            maxLength={500}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this property..."
            className="w-full min-h-[180px] resize-none rounded-2xl border border-[#6b3d18] bg-[#120801] p-5 text-white outline-none transition-all focus:border-[#d4b27a]"
          />

          <div className="mt-3 text-right text-[#867a5f]">
            {review.length}/500
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-10 py-3 border border-[#8c6239] rounded-2xl text-[#e3c28f] transition-all hover:bg-[#2d1708]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!rating || !review.trim()}
            className="px-10 py-3 rounded-2xl bg-[#F4A523] text-[#1d0f05] font-semibold transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default RateModal;
