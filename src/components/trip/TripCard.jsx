"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPlacePhoto } from "@/lib/google-photos";

const TripCard = ({ trip, index }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      // Stagger API requests to prevent rate limiting
      const delay = index * 300;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      try {
        const url = await getPlacePhoto(trip.location);
        setPhotoUrl(url);
      } catch (error) {
        console.error("Error fetching trip photo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (trip.location) {
      fetchPhoto();
    } else {
      setLoading(false);
    }
  }, [trip.location, index]);

  return (
    <Link href={`/trip-details/${trip._id}`}>
      <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full">
        <div className="relative w-full h-[200px] bg-linear-to-br from-blue-400 to-purple-500">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : photoUrl ? (
            <img
              src={photoUrl}
              alt={trip.location}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="absolute inset-0 flex items-center justify-center text-white text-center bg-linear-to-br from-blue-400 to-purple-500"
            style={{ display: photoUrl && !loading ? 'none' : 'flex' }}
          >
            <h3 className="text-2xl font-bold px-4">{trip.location}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{trip.location}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {trip.tripData?.destination || trip.location}
          </p>
          
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              📅 {trip.noOfDays} Days
            </span>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              💰 {trip.budget}
            </span>
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              👥 {trip.traveler}
            </span>
          </div>
          
          <p className="text-xs text-gray-500">
            Created: {new Date(trip.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
