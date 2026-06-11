import React from "react";
import logo from "../../assets/images/logo.jpg";

const Footer = () => {
  return (
    <div className="bg-amber-950 border-t-[0.3px] border-t-white/10">
      <div className="bg-black/80 inset-0 h-full p-6 sm:p-10 px-4 sm:px-10 xl:px-55 text-white flex flex-col lg:grid lg:grid-cols-[2fr_5fr] gap-8 lg:gap-0">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-cover rounded-full h-14 w-14 sm:h-20 sm:w-20 shrink-0"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <h2 className="text-3xl font-extrabold sm:text-5xl text-amber-500">
            Nestly
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0">
          <div>
            <h3 className="mb-3 text-base font-semibold sm:text-xl">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>Home</li>
              <li>Browse Properties</li>
              <li>Search by Budget</li>
              <li>Search by Type</li>
              <li>Map View</li>
              <li>Contact Owner</li>
              <li>Owner Dashboard</li>
              <li>Post Your Property</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-base font-semibold sm:text-xl">
              For Students
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>How It Works</li>
              <li>Safety Tips</li>
              <li>Student Reviews</li>
              <li>PG vs Flat Guide</li>
              <li>Move-In Checklist</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-base font-semibold sm:text-xl">
              For Owners
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>Post Your Property</li>
              <li>Owner Login</li>
              <li>Pricing / Free Listing</li>
              <li>Verification Guide</li>
              <li>Photo/Video Guidelines</li>
              <li>Owner Support</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-base font-semibold sm:text-xl">
              Support & Policies
            </h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm">
              <li>Contact Us</li>
              <li>Help Center / FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="inset-0 h-full p-4 px-4 text-xs text-center text-white bg-black/80 sm:p-5 sm:px-10 xl:px-55 sm:text-sm">
        <p>© 2025 Nestly. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
