import React from "react";
import DayPlan from "./DayPlan";

const Itinerary = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h2 className="font-bold text-2xl mb-5">🗓️ Daily Itinerary</h2>
      <div className="space-y-5">
        {itinerary.map((day, index) => (
          <DayPlan key={index} day={day} dayNumber={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
