import React from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h2 className="font-bold text-2xl mb-5">🏨 Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} delay={index * 500} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
