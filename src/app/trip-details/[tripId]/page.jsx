"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Header from "@/sections/Header";
import { toast } from "sonner";
import InfoSection from "@/components/trip/InfoSection";
import Hotels from "@/components/trip/Hotels";
import Itinerary from "@/components/trip/Itinerary";

const TripDetails = () => {
  const { tripId } = useParams();
  
  const trip = useQuery(api.trips.getTripById, { 
    tripId: tripId 
  });

  if (!trip) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Loading trip details...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        {/* Trip Info Section */}
        <InfoSection trip={trip} />

        {/* Recommended Hotels */}
        <Hotels hotels={trip?.tripData?.hotels} />

        {/* Daily Itinerary */}
        <Itinerary itinerary={trip?.tripData?.itinerary} />
      </div>
    </div>
  );
};

export default TripDetails;
