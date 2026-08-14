import React from "react";

const StatsCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-[#254593]/10 flex items-center justify-center text-[#254593] text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;