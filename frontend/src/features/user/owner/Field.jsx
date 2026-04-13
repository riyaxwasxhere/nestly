import React from 'react'


function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-bold text-[#5a4626] uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

export default Field
