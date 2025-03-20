import { useState, useEffect } from "react";

const PriceRangeSlider = ({ low, high, current }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (high > low) {
      setPercentage(((current - low) / (high - low)) * 100);
    }
  }, [low, high, current]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute top-1/2 left-0 w-full h-3 bg-gray-300 rounded-lg transform -translate-y-1/2"></div>
      
      <div
        className="absolute top-1/2 left-0 h-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg transform -translate-y-1/2"
        style={{ width: `${percentage}%` }}
      ></div>

      <input
        type="range"
        min={low}
        max={high}
        value={current}
        readOnly
        className="relative w-full h-4 opacity-0 cursor-default"
      />
      
      <div className="flex justify-between text-md text-gray-600 mt-6 font-semibold">
        <span>${Number(low)}</span>
        <span className="font-bold">24H Range</span>
        <span>${Number(high)}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
