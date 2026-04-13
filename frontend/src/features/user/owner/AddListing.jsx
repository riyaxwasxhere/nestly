import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "./Section";
import Field from "./Field";
import { serverUrl } from "../../../App";

const amenitiesList = [
  "WiFi",
  "AC",
  "Laundry",
  "Parking",
  "CCTV",
  "Geyser",
  "Study room",
  "Power backup",
  "Refrigerator",
  "Washing machine"
];

function AddListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: {
      house: "",
      street: "",
      locality: "",
      city: "",
      state: "",
      pincode: "",
      landmark: ""
    },
    pricePerMonth: "",
    roomType: "",
    genderPreference: "",
    foodIncluded: false,
    bookingStatus: "open",
    amenities: [],
    location: { type: "Point", coordinates: [] }
  });

  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detecting, setDetecting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setForm({
      ...form,
      address: { ...form.address, [e.target.name]: e.target.value }
    });
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const detectLocation = () => {
    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setForm((prev) => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [lon, lat]
          }
        }));

        try {
          const res = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${import.meta.env.VITE_GEOAPIFY_APIKEY}`
          );

          const data = await res.json();
          const addr = data.features[0].properties;

          setForm((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              house: addr.housenumber || "",
              street: addr.street || "",
              locality: addr.suburb || addr.city_district || "",
              city: addr.city || addr.town || addr.village || "",
              state: addr.state || "",
              pincode: addr.postcode || "",
              landmark: addr.name || ""
            }
          }));
        } catch (err) {
          console.log(err);
          setError("Failed to autofill address");
        }

        setDetecting(false);
      },
      () => {
        setError("Allow location access to autofill address");
        setDetecting(false);
      }
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("address", JSON.stringify(form.address));
      formData.append("pricePerMonth", form.pricePerMonth);
      formData.append("roomType", form.roomType);
      formData.append("genderPreference", form.genderPreference);
      formData.append("foodIncluded", form.foodIncluded);
      formData.append("bookingStatus", form.bookingStatus);
      formData.append("amenities", JSON.stringify(form.amenities));
      formData.append("location", JSON.stringify(form.location));
      photos.forEach((photo) => formData.append("photos", photo));

      await axios.post(`${serverUrl}/api/listings/create`, formData, {
        withCredentials: true
      });
      navigate("/owner/dashboard");
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto no-scrollbar py-8 px-8 text-[#e8d5b0]">
      <h1
        className="mb-1 text-3xl font-extrabold"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Add New <span className="text-[#F5A623]">Listing</span>
      </h1>
      <p className="text-[#f0e3c77c] text-sm mb-8">
        Fill in the details below to publish your property
      </p>

      <Section title="Basic Details">
        <Field label="Listing Title">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
            placeholder="e.g. Sunny PG near SIT College"
          />
        </Field>
        <Field label="Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="resize-none w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
            rows={3}
            placeholder="Describe your property — amenities, rules, nearby landmarks..."
          />
        </Field>
      </Section>

      <Section title="Address">
        <div className="grid grid-cols-2 gap-4">
          <Field label="House No.">
            <input
              name="house"
              value={form.address.house}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. 12A"
            />
          </Field>
          <Field label="Street">
            <input
              name="street"
              value={form.address.street}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. Hill Cart Road"
            />
          </Field>
          <Field label="Locality">
            <input
              name="locality"
              value={form.address.locality}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. Sevoke Road"
            />
          </Field>
          <Field label="City">
            <input
              name="city"
              value={form.address.city}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. Siliguri"
            />
          </Field>
          <Field label="State">
            <input
              name="state"
              value={form.address.state}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. West Bengal"
            />
          </Field>
          <Field label="Pincode">
            <input
              name="pincode"
              value={form.address.pincode}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. 734001"
            />
          </Field>
          <Field label="Landmark (optional)" className="col-span-2">
            <input
              name="landmark"
              value={form.address.landmark}
              onChange={handleAddressChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. Near SIT Gate"
            />
          </Field>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={detectLocation}
            className="flex items-center gap-2 border border-[#5a4626] rounded-xl px-4 py-2 text-sm text-[#F5A623] hover:border-[#F5A623] transition-all cursor-pointer"
          >
            {detecting ? "Detecting..." : "📍 Detect my location"}
          </button>
        </div>
      </Section>

      <Section title="Room Details">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price / Month (₹)">
            <input
              name="pricePerMonth"
              type="number"
              value={form.pricePerMonth}
              onChange={handleChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
              placeholder="e.g. 4500"
            />
          </Field>
          <Field label="Room Type">
            <select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
            >
              <option value="" disabled>
                Select type
              </option>
              <option className="bg-[#1a1208]" value="single">
                Single
              </option>
              <option className="bg-[#1a1208]" value="double">
                Double
              </option>
              <option className="bg-[#1a1208]" value="sharing">
                Sharing
              </option>
              <option className="bg-[#1a1208]" value="other">
                Other
              </option>
            </select>
          </Field>
          <Field label="Gender Preference">
            <select
              name="genderPreference"
              value={form.genderPreference}
              onChange={handleChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
            >
              <option value="" disabled>
                Select
              </option>
              <option className="bg-[#1a1208]" value="boys">
                Boys
              </option>
              <option className="bg-[#1a1208]" value="girls">
                Girls
              </option>
              <option className="bg-[#1a1208]" value="any">
                Any
              </option>
            </select>
          </Field>
          <Field label="Booking Status">
            <select
              name="bookingStatus"
              value={form.bookingStatus}
              onChange={handleChange}
              className="w-full bg-[#0e0a04] border border-[#3d2b0f] rounded-lg px-3.5 py-2.5 text-[13px] text-[#e8d5b0] outline-none transition-colors duration-200 placeholder:text-[#3d2b0f] focus:border-[#F5A623]"
            >
              <option className="bg-[#1a1208]" value="open">
                Open
              </option>
              <option className="bg-[#1a1208]" value="closed">
                Closed
              </option>
            </select>
          </Field>
        </div>

        <div className="flex items-center justify-between mt-4 bg-[#1a1208] border border-[#3d2b0f] rounded-xl px-4 py-3">
          <span className="text-sm text-[#a07840]">Food included?</span>
          <button
            onClick={() =>
              setForm({ ...form, foodIncluded: !form.foodIncluded })
            }
            className={`w-10 h-5 cursor-pointer rounded-full transition-all duration-300 relative ${form.foodIncluded ? "bg-[#F5A623]" : "bg-[#3d2b0f]"}`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${form.foodIncluded ? "left-5 bg-[#1a1208]" : "left-0.5 bg-[#7a5c30]"}`}
            />
          </button>
        </div>
      </Section>

      <Section title="Amenities">
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map((a) => (
            <button
              key={a}
              onClick={() => toggleAmenity(a)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer
                ${
                  form.amenities.includes(a)
                    ? "bg-[#2a1f0e] border-[#F5A623] text-[#F5A623]"
                    : "bg-[#1a1208] border-[#3d2b0f] text-[#7a5c30]"
                }`}
            >
              {a}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Photos">
        <label className="flex flex-col items-center justify-center border border-dashed border-[#3d2b0f] rounded-xl py-8 cursor-pointer hover:border-[#F5A623] transition-all">
          <span className="mb-2 text-2xl">📷</span>
          <span className="text-sm text-[#5a4626]">
            Click to upload photos{" "}
            <span className="text-[#F5A623]">· max 10</span>
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotos}
            className="hidden"
          />
        </label>
        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mt-4">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-full h-24 object-cover rounded-xl border border-[#3d2b0f]"
              />
            ))}
          </div>
        )}
      </Section>

      {error && (
        <p className="mb-4 text-sm text-center text-red-400">{error}</p>
      )}

      <div className="flex justify-end gap-4 pb-8">
        <button
          onClick={() => navigate("/owner/dashboard")}
          className="border border-[#3d2b0f] rounded-xl px-6 py-3 text-sm text-[#7a5c30] cursor-pointer hover:border-[#F5A623] transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#F5A623] cursor-pointer text-black font-bold rounded-xl px-8 py-3 text-sm hover:-translate-y-0.5 transition-all"
        >
          {loading ? "Publishing..." : "Publish Listing →"}
        </button>
      </div>
    </div>
  );
}

export default AddListing;
