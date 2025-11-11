import React from "react";
import PlaceCard from "./PlaceCard";

const DayPlan = ({ day, dayNumber }) => {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-bold text-xl mb-4">
        {day?.day || `Day ${dayNumber}`}
      </h3>
      
      {day?.plan && day.plan.length > 0 ? (
        <div className="space-y-4">
          {day.plan.map((place, index) => (
            <PlaceCard key={index} place={place} delay={index * 300} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No activities planned for this day.</p>
      )}
    </div>
  );
};

export default DayPlan;
