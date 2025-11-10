import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-center mt-20">
        Welcome to <span className="text-primary-color">AI Trip Planner</span>
      </h1>
      <p className="text-center mt-4 text-2xl text-gray-600 mx-auto md:w-2xl sm:w-2xl">
        Transform your travel dreams into reality with our intelligent trip
        planner. Eia creates personalized, budget-friendly itineraries tailored
        to your interests, travel style, and preferences – completely free.
      </p>
      <div className="flex justify-center mt-8">
        <Button variant="secondary" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
