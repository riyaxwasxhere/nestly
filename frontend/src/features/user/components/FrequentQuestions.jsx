import React, { useRef, useState } from "react";

function FrequentQuestions({ question, answer }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border border-[#5a462657] rounded-xl bg-[#211608] overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full gap-3 px-3 py-3 text-left cursor-pointer sm:px-5 sm:py-4"
      >
        <h1 className="text-xs font-semibold leading-snug sm:text-sm">
          {question}
        </h1>
        <span
          className={`text-[#F5A623] transition-transform duration-300 shrink-0 text-xs sm:text-base ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-3 pb-3 sm:px-5 sm:pb-4 text-[12px] sm:text-[13px] text-[#867a5f] leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrequentQuestions;
