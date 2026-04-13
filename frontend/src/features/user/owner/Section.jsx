import React from 'react'

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-bold text-[#F5A623] uppercase tracking-widest mb-4">
        {title}
      </p>
      <div className="bg-[#1a1208] border border-[#3d2b0f] rounded-2xl p-5 gap-4 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default Section
