import React, { useRef, useState } from "react";

function FrequentQuestions({ question, answer }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border border-[#5a462657] rounded-xl bg-[#211608] overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-left cursor-pointer"
      >
        <h1 className="text-sm font-semibold ">{question}</h1>
        <span
          className={`text-[#F5A623] transition-transform duration-300 ${
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
          <p className="px-5 pb-4 text-[13px] text-[#867a5f]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FrequentQuestions;
