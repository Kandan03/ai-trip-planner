"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();
  
  const onSend = () => {
    // Navigate to trip planning page when user is signed in
    router.push('/trip');
  };

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
        {user ? (
          <Button variant="secondary" onClick={onSend}>
            Plan Your Trip Now
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button variant="secondary">
              Plan Your Trip Now
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Hero;
