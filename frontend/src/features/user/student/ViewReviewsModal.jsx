import { Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

function ViewReviewsModal({ listing, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/reviews/getReviews/listing/${listing._id}`
        );
        if (res.data.success) {
          setReviews(res.data.reviews);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (listing?._id) {
      fetchReviews();
    }
  }, [listing, reviews]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-2xl sm:rounded-3xl border border-[#6b3d18] bg-[#1d0f05] p-5 sm:p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-[#4a2d16]">
          <div>
            <h2
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-2xl sm:text-3xl font-bold text-[#F0E8D8]"
            >
              All Reviews
            </h2>
            <div className="flex items-center gap-2 mt-2 text-[#d4b27a]">
              <Star
                size={16}
                className="fill-[#FFC94A] text-[#FFC94A] shrink-0"
              />
              <span className="text-sm sm:text-base">{averageRating}</span>
              <span className="text-[#867a5f] text-sm sm:text-base">
                · {reviews.length} reviews
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 ml-4 rounded-full hover:bg-white/10 shrink-0"
          >
            <X size={22} className="text-[#c9b18b] sm:w-7 sm:h-7" />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-[#867a5f] py-10">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center sm:py-16">
            <span className="text-4xl">⭐</span>
            <h3 className="text-lg sm:text-xl text-[#F0E8D8] mt-3">
              No reviews yet
            </h3>
            <p className="mt-2 text-sm text-[#867a5f]">
              Be the first person to review this property.
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-5">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 sm:p-5 border rounded-xl sm:rounded-2xl border-[#4a2d16] bg-[#241307]"
              >
                <div className="flex gap-3 sm:gap-4">
                  <img
                    src={
                      review.student?.profilePic ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt=""
                    className="object-cover w-10 h-10 rounded-full sm:w-14 sm:h-14 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    {/* Name + Stars row */}
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-[#F0E8D8] truncate">
                          {review.student?.fullname}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#867a5f]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-0.5 sm:gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= review.rating
                                ? "fill-[#FFC94A] text-[#FFC94A]"
                                : "text-[#6b5640]"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-2 sm:mt-3 text-sm text-[#d7c3a0] italic leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReviewsModal;
