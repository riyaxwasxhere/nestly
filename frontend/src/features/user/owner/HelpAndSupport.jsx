import React from "react";
import HelpCard from "../components/HelpCard";
import FrequentQuestions from "../components/FrequentQuestions";

function HelpAndSupport() {
  return (
    <div className="h-screen px-4 py-6 pb-20 overflow-y-auto sm:px-10 sm:py-8 no-scrollbar">
      <div>
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-4 text-base font-bold sm:text-lg"
        >
          💡 Help & Support
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <HelpCard
            icon="💬"
            heading="Live Chat Support"
            desc="Chat with our support team. Available Mon-Sat, 9 AM-7 PM."
            btn="Start Chat"
          />
          <HelpCard
            icon="📧"
            heading="Email Us"
            desc="Send us your query at support@nestly.in and we'll respond within 24 hours."
            btn="Send Email"
          />
          <HelpCard
            icon="📞"
            heading="Call Support"
            desc="Reach us at +91-800-NESTLY. Available for urgent issues during business hours."
            btn="Call Now"
          />
          <HelpCard
            icon="🐛"
            heading="Report an Issue"
            desc="Found a bug or scam listing? Report it and we'll investigate within 48 hours."
            btn="Report"
          />
        </div>
      </div>

      <div className="py-6 sm:py-8">
        <h2
          style={{ fontFamily: "Playfair Display, serif" }}
          className="mb-4 text-base font-bold sm:text-lg"
        >
          ❓ Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4">
          <FrequentQuestions
            question="How do I add a new property listing?"
            answer="Go to the Add Listing section, fill in your property details, upload property images, set rent and amenities, then publish your listing."
          />
          <FrequentQuestions
            question="Can I edit or remove my listing later?"
            answer="Yes, you can edit property details, update rent, change images, or remove your listing anytime from the My Listings section."
          />
          <FrequentQuestions
            question="How do scheduled visits work?"
            answer="Students can request visits for your property. You can accept, reject, or reschedule them from the Scheduled Visits section."
          />
          <FrequentQuestions
            question="How do I contact interested students?"
            answer="You can directly message students through the Messages section once they show interest in your property."
          />
          <FrequentQuestions
            question="Are owner listings verified?"
            answer="Yes, our team may verify property details, owner identity, and uploaded images before marking listings as verified."
          />
          <FrequentQuestions
            question="Can I manage multiple properties?"
            answer="Yes, you can add and manage multiple property listings from your dashboard."
          />
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
