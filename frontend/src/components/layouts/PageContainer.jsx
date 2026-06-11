import React from "react";
import home from "../../assets/images/home.jpg";
import { FaSearch } from "react-icons/fa";
import ValueCard from "../ui/ValueCard";
import CategorySlider from "../ui/CategorySlider";
import BudgetCard from "../ui/BudgetCard";
import house from "../../assets/images/house.png";

const PageContainer = () => {
  return (
    <main>
      {/* hero-section */}
      <section
        className="relative h-screen overflow-hidden bg-center bg-cover"
        style={{ backgroundImage: `url(${home})` }}
      >
        <div className="absolute inset-0 overflow-hidden z-99 bg-black/60">
          <div className="relative flex flex-col items-center justify-center w-full h-full z-1000">
            <div className="flex flex-col items-center justify-center px-4 my-10 text-white">
              <h1 className="text-4xl font-extrabold text-center sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your Perfect
              </h1>
              <h1 className="text-4xl font-extrabold text-center sm:text-5xl md:text-6xl lg:text-7xl text-amber-500">
                Stay Near Campus
              </h1>
              <p className="mt-5 text-sm sm:text-base lg:text-lg w-full sm:w-[80%] lg:w-[70%] text-center">
                Discover affordable PGs, hostels, and flats near your college.
                Verified listings, honest prices, and zero brokerage.
              </p>
            </div>

            <div className="bg-orange-50/40 w-[90%] sm:w-[60%] md:w-[45%] lg:w-[35%] h-10 rounded-3xl border-amber-500 border-2 pl-2 flex items-center text-white justify-between">
              <input
                className="flex-1 text-sm text-white bg-transparent border-0 outline-0"
                type="text"
                name="search"
                id="search"
                placeholder="Search by area or college ..."
              />
              <button className="flex items-center justify-center w-10 h-full text-white rounded-full cursor-pointer bg-amber-500 shrink-0">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by accomodation type */}
      <section className="bg-amber-950">
        <div className="inset-0 h-full px-4 py-10 text-white sm:px-10 md:px-16 lg:px-20 xl:px-55 bg-black/80">
          <div className="mb-10 text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
            <h2>Browse by Accommodation Type</h2>
          </div>
          <div className="">
            <CategorySlider />
          </div>
        </div>
      </section>

      {/* top listings */}
      <section className="bg-amber-950">
        <div className="inset-0 h-full px-4 py-10 text-white sm:px-10 md:px-16 lg:px-20 xl:px-55 bg-black/80">
          <div className="mb-10 text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
            <h2>Top Listings</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            <div className="w-full max-w-xs bg-amber-50 h-80 rounded-xl">
              <div className="bg-rose-300 h-60 rounded-t-xl"></div>
            </div>
            <div className="w-full max-w-xs bg-amber-50 h-80 rounded-xl">
              <div className="bg-rose-300 h-60 rounded-t-xl"></div>
            </div>
            <div className="w-full max-w-xs bg-amber-50 h-80 rounded-xl">
              <div className="bg-rose-300 h-60 rounded-t-xl"></div>
            </div>
            <div className="w-full max-w-xs bg-amber-50 h-80 rounded-xl">
              <div className="bg-rose-300 h-60 rounded-t-xl"></div>
            </div>
            <div className="w-full max-w-xs bg-amber-50 h-80 rounded-xl">
              <div className="bg-rose-300 h-60 rounded-t-xl"></div>
            </div>
            <div className="w-full max-w-xs bg-amber-50 h-80 rounded-xl">
              <div className="bg-rose-300 h-60 rounded-t-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* map view and rooms with budgets */}
      <article className="bg-amber-950 grid grid-cols-1 lg:grid-cols-[3fr_4fr]">
        <section>
          <div className="inset-0 h-full px-4 py-10 text-white sm:px-10 md:px-16 lg:py-20 lg:pl-20 xl:pl-55 bg-black/80">
            <div className="mb-10 text-2xl font-semibold sm:text-3xl lg:text-4xl">
              <h2>Find Rooms Within Your Budget</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <BudgetCard budget="Under ₹4,000" />
              <BudgetCard budget="₹4,000 - ₹6,000" />
              <BudgetCard budget="₹6,000 - ₹8,000" />
              <BudgetCard budget="₹8,000 - ₹10,000" />
              <BudgetCard budget="₹10,000 - ₹12,000" />
              <BudgetCard budget="Above ₹12,000" />
            </div>
          </div>
        </section>

        <aside>
          <div className="inset-0 flex flex-col items-start h-full px-4 py-10 text-white sm:px-10 md:px-16 lg:pt-20 lg:pl-10 lg:pr-20 xl:pr-55 bg-black/80 font-extralight">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Explore Rooms Closest to your College
              </h2>
              <h3 className="mt-2 text-sm sm:text-base">
                View all verified properties on an interactive map and choose
                the perfect distance from your college.
              </h3>
              <button className="p-2 mt-5 text-sm border cursor-pointer rounded-2xl">
                Open Map
              </button>
            </div>
            <div className="flex items-center justify-center flex-1 w-full my-5 font-semibold text-black rounded-lg min-h-48 bg-amber-50/40">
              <h2>Map Preview</h2>
            </div>
          </div>
        </aside>
      </article>

      {/* why this platform */}
      <section className="bg-amber-950">
        <div className="inset-0 h-full px-4 py-10 text-white sm:px-10 md:px-16 lg:p-20 xl:px-55 bg-black/80">
          <div className="my-6 text-2xl font-semibold text-center lg:m-10 sm:text-3xl lg:text-4xl">
            <h2>Why Students Love Our Platform?❤️</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <ValueCard
              photo="src/assets/images/verify.png"
              heading="Verified Listings"
              text="Real Photos, real owners, no scams."
            />
            <ValueCard
              photo="src/assets/images/no-brokerage.jpg"
              heading="No Brokerage"
              text="Direct owner-to-student communication."
            />
            <ValueCard
              photo="src/assets/images/map.png"
              heading="Map-Based Search"
              text="See properties closest to your college."
            />
            <ValueCard
              photo="src/assets/images/student.png"
              heading="Made for Students"
              text="PGs, flats, and hostels that fit student budgets."
            />
            <ValueCard
              photo="src/assets/images/contact.jpg"
              heading="Instant Contact"
              text="Call or message the owner directly."
            />
            <ValueCard
              photo="src/assets/images/room.png"
              heading="Photo & Video Tours"
              text="Check rooms online before visiting."
            />
          </div>
        </div>
      </section>

      <section className="bg-amber-950">
        <div className="inset-0 flex flex-col items-center justify-between h-full gap-8 px-4 py-10 text-white sm:flex-row sm:px-10 md:px-16 lg:p-20 xl:px-55 bg-black/60">
          <div className="flex flex-col justify-between w-full gap-5 sm:w-auto">
            <h2 className="mb-4 text-2xl font-bold sm:mb-10 sm:text-3xl">
              How It Works
            </h2>
            <div>
              <p className="font-semibold">Step 1 — Search</p>
              <p className="text-sm">
                Use filters to find PGs, flats, and hostels near SIT.
              </p>
            </div>
            <div>
              <p className="font-semibold"> Step 2 — Compare</p>
              <p className="text-sm">
                Check photos, rent, distance, and amenities.
              </p>
            </div>
            <div>
              <p className="font-semibold">Step 3 — Contact Owner</p>
              <p className="text-sm">
                Call/message the owner directly. No brokers.
              </p>
            </div>
          </div>
          <div
            className="w-48 h-48 bg-center bg-cover sm:h-60 sm:w-60 lg:h-75 lg:w-75 shrink-0"
            style={{ backgroundImage: `url(${house})` }}
          ></div>
        </div>
      </section>
    </main>
  );
};

export default PageContainer;
