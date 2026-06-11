import React from "react";

const BudgetCard = (props) => {
  return (
    <div className="flex items-center justify-center w-full h-12 p-2 transition-all duration-200 border rounded-lg cursor-pointer bg-yellow-800/30 hover:scale-105 border-white/20 sm:h-15 sm:w-56 lg:w-50">
      <h4 className="text-sm sm:text-base">{props.budget}</h4>
    </div>
  );
};

export default BudgetCard;
