"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    router.push("/trip");
  };

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,var(--color-primary-color)_100%)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[60px_40px] sm:bg-size-[75px_50px] md:bg-size-[90px_70px] mask-[radial-gradient(ellipse_60%_70%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      <h1 className="text-6xl font-bold text-center mt-20">
        <span className="text-primary-color">Tripate</span> AI Trip Planner
      </h1>
      <p className="text-center mt-4 text-2xl text-black/50 mx-auto md:w-2xl sm:w-2xl">
        Transform your travel dreams into reality with our intelligent trip
        planner. Tripate creates personalized, budget-friendly itineraries
        tailored to your interests, travel style, and preferences – completely
        free.
      </p>
      <div className="flex justify-center mt-8">
        {user ? (
          <Button variant="default" onClick={onSend}>
            Plan Your Trip Now
          </Button>
        ) : (
          <SignInButton mode="modal" forceRedirectUrl="/trip">
            <Button variant="default">Plan Your Trip Now</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Hero;
