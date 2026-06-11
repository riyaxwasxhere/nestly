import { Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

function ViewReviewsModal({ listing, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(reviews)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/reviews/getReviews/listing/${listing._id}`
        );
        
        if (res.data.success) {
          setReviews(res.data.reviews);
        }
          console.log(reviews)

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl border border-[#6b3d18] bg-[#1d0f05] p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#4a2d16]">
          <div>
            <h2
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-3xl font-bold text-[#F0E8D8]"
            >
              All Reviews
            </h2>
            <div className="flex items-center gap-2 mt-2 text-[#d4b27a]">
              <Star
                size={18}
                className="fill-[#FFC94A] text-[#FFC94A]"
              />
              <span>{averageRating}</span>
              <span className="text-[#867a5f]">
                • {reviews.length} reviews
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <X size={28} className="text-[#c9b18b]" />
          </button>
        </div>
        {loading ? (
          <p className="text-center text-[#867a5f]">
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-xl text-[#F0E8D8]">
              No reviews yet
            </h3>
            <p className="mt-2 text-[#867a5f]">
              Be the first person to review this property.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 border rounded-2xl border-[#4a2d16] bg-[#241307]"
              >
                <div className="flex gap-4">
                  <img
                    src={
                      review.student?.profilePic ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt=""
                    className="object-cover rounded-full w-14 h-14"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-[#F0E8D8]">
                          {review.student?.fullname}
                        </h3>

                        <p className="text-sm text-[#867a5f]">
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= review.rating
                                ? "fill-[#FFC94A] text-[#FFC94A]"
                                : "text-[#6b5640]"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-[#d7c3a0] italic">
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