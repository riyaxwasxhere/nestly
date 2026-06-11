import React, { useEffect, useRef, useState } from "react";

function FilterDropDown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = value !== options[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 bg-[#1A1208] py-2 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm transition-colors
          ${
            isActive
              ? "border-[#F5A623] text-[#F5A623]"
              : "border-[#5a4626] text-[#F0E8D8]"
          }`}
      >
        <span className="max-w-[100px] sm:max-w-none truncate">{value}</span>
        <span
          className={`text-[10px] transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 bg-[#1A1208] border border-[#5a4626] rounded-xl overflow-hidden min-w-[150px] sm:min-w-[180px]">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`flex items-center justify-between px-3 sm:px-4 py-2.5 text-xs sm:text-sm cursor-pointer hover:bg-[#261A0A] transition-colors
                ${value === opt ? "text-[#F5A623]" : "text-[#D4C4A0]"}`}
            >
              <span>{opt}</span>
              {value === opt && (
                <span className="text-[#F5A623] text-xs shrink-0">✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropDown;
