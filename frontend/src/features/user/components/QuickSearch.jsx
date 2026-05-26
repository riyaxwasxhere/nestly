import FilterDropDown from "./FilterDropDown";

const budgetOptions = [
  "Any Budget",
  "Under ₹5,000",
  "₹5,000 - ₹8,000",
  "₹8,000 - ₹12,000",
  "₹12,000 - ₹20,000",
  "Above ₹20,000"
];

const typeOptions = ["Room Type", "single", "double", "sharing", "other"];

const genderOptions = ["Gender", "boys", "girls", "any"];

function QuickSearch({
  searchQuery,
  setSearchQuery,
  budget,
  setBudget,
  roomType,
  setRoomType,
  gender,
  setGender
}) {
  const hasFilters =
    searchQuery ||
    budget !== "Any Budget" ||
    roomType !== "Room Type" ||
    gender !== "Gender";

  const clearAll = () => {
    setSearchQuery("");
    setBudget("Any Budget");
    setRoomType("Room Type");
    setGender("Gender");
  };
  return (
    <div className="p-8 bg-[#261A0A] rounded-2xl m-6 border border-[#5a4626]">
      <div>
        <h2 className="font-bold text-[#F0E8D8] ">🔍 Quick Search</h2>
      </div>
      <div className="flex gap-2 mb-3 ">
        <div className="flex-1 items-center justify-between my-4 bg-[#1A1208] py-2 px-4 rounded-xl border border-[#5a4626] ">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm text-[#867a5f] w-full outline-0"
            type="text"
            placeholder="Search by area, college or locality..."
          />
        </div>
        <button className="bg-[#F5A623] items-center justify-between my-4 cursor-pointer py-2 px-5 rounded-xl text-black text-sm font-semibold hover:shadow-sm hover:shadow-[#F5A623] transition-shadow duration-100">
          Search Rooms
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterDropDown
          label="Budget"
          options={budgetOptions}
          value={budget}
          onChange={setBudget}
        />
        <FilterDropDown
          label="Room Type"
          options={typeOptions}
          value={roomType}
          onChange={setRoomType}
        />
        <FilterDropDown
          label="Gender"
          options={genderOptions}
          value={gender}
          onChange={setGender}
        />
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 bg-[#1A1208] py-2 px-4 rounded-xl border border-[#5a4626] text-[#a8784a] text-sm hover:border-[#F5A623] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      {hasFilters && (
        <p className="mt-3 text-xs text-[#867a5f]">
          Filtering by:{" "}
          {[
            searchQuery && `"${searchQuery}"`,
            budget !== "Any Budget" && budget,
            roomType !== "Room Type" && roomType,
            gender !== "Gender" && gender
          ]
            .filter(Boolean)
            .map((f, i) => (
              <span key={i} className="text-[#F5A623] font-semibold">
                {i > 0 ? ", " : ""}
                {f}
              </span>
            ))}
        </p>
      )}
    </div>
  );
}

export default QuickSearch;
