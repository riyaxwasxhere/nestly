import axios from "axios";
import { serverUrl } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSavedListings,
  removeFromSavedListings
} from "../../../redux/savedSlice";

function ListingCard({ listing, onClick }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user?.userData?._id);
  const savedListings = useSelector((state) => state.saved?.savedListings);
  const isSaved = savedListings.some(
    (item) => item.savedListing?._id === listing._id
  );

  const handleSave = async () => {
    try {
      if (!isSaved) {
        const response = await axios.post(
          `${serverUrl}/api/saved/save`,
          {
            userId: currentUserId,
            savedListingId: listing._id
          },
          {
            withCredentials: true
          }
        );
        console.log(savedListings);
        dispatch(addToSavedListings(response.data));
      } else {
        await axios.delete(`${serverUrl}/api/saved/remove`, {
          data: {
            userId: currentUserId,
            savedListingId: listing._id
          },
          withCredentials: true
        });
        dispatch(removeFromSavedListings(listing._id));
      }
    } catch (error) {
      console.log("failed to save:", error);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-[#261A0A] rounded-xl cursor-pointer border border-[#5a462657] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative">
        <div
          className="h-40 bg-center bg-cover rounded-t-xl"
          style={{
            backgroundImage:
              listing.photos?.length > 0
                ? `url('${listing.photos[0]}')`
                : "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=70')"
          }}
        >
          <div className="flex items-center justify-between px-3 py-2 text-xs text-[#867a5f]absolute">
            <span className="px-2 bg-[#362704cf] rounded-4xl border border-[#8d8269]">
              {listing.averageRating > 0
                ? `⭐ ${listing.averageRating} (${listing.totalReviews} reviews)`
                : "No reviews yet"}
            </span>
            <span
              className="p-1 text-[16px] border rounded-full bg-[#f5236d62] border-rose-500"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            >
              {isSaved ? "❤️" : "🤍"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-2">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-semibold">{listing.title}</h3>
            <p className="text-xs text-[#867a5f] font-medium">
              📍{listing.address?.locality}, {listing.address?.city}
            </p>
          </div>
          <div>
            <span
              className={`px-4 backdrop-blur-md bg-black/30 border rounded-2xl flex items-center ${
                listing.bookingStatus === "open"
                  ? "border-green-500 text-green-400"
                  : "border-red-500 text-red-400"
              }`}
            >
              {listing.bookingStatus}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between my-2">
          <p className="text-xs text-[#867a5f]">
            <span className="text-[#F5A623] font-bold text-[16px]">
              ₹{listing.pricePerMonth}
            </span>
            /month
          </p>
          <span className="text-xs text-[#d0cbbc] font-medium rounded-sm ">
            Gender : {listing.genderPreference}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
