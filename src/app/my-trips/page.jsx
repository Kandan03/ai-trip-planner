"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/sections/Header";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TripCard from "@/components/trip/TripCard";

const MyTrips = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const trips = useQuery(api.trips.getUserTrips, 
    user?.primaryEmailAddress?.emailAddress 
      ? { userEmail: user.primaryEmailAddress.emailAddress }
      : "skip"
  );

  // Show loading while Clerk is checking authentication
  if (!isLoaded) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show sign in message only after auth is loaded and user is not signed in
  if (!user) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please sign in to view your trips</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-3xl">My Trips</h2>
          <Link href="/trip">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
              + Create New Trip
            </button>
          </Link>
        </div>

        {!trips ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your trips...</p>
            </div>
          </div>
        ) : trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
              <p className="text-gray-500 mb-6">Start planning your first adventure!</p>
              <Link href="/trip">
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
                  Plan Your First Trip
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <TripCard key={trip._id} trip={trip} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
