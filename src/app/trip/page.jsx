import Header from "@/sections/Header";
import React from "react";

const Trip = () => {
  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold text-left mt-20 mx-30">
        Tell us your travel preferences
      </h1>
      <p className="text-left mt-4 text-lg text-gray-600 mx-30 md:w-2xl sm:w-2xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
    </div>
  );
};

export default Trip;
