import React, { useEffect, useState } from "react";
import { getPlacePhoto } from "@/lib/google-photos";

const InfoSection = ({ trip }) => {
  const [headerImage, setHeaderImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderPhoto = async () => {
      setIsLoading(true);
      if (trip?.location) {
        const photo = await getPlacePhoto(trip.location);
        if (photo) {
          setHeaderImage(photo);
        }
        setIsLoading(false);
      }
    };

    fetchHeaderPhoto();
  }, [trip?.location]);

  return (
    <div className="mb-10">
      <div className="relative w-full h-[340px] rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
        {isLoading ? (
          <div className="text-gray-400">Loading destination image...</div>
        ) : headerImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={headerImage}
            alt={trip?.location || "Travel Destination"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="text-gray-400 p-4 text-center text-xl">🌍<br/>' + (trip?.location || 'Travel Destination') + '</div>';
            }}
          />
        ) : (
          <div className="text-gray-400 p-4 text-center text-xl">
            🌍<br/>{trip?.location || 'Travel Destination'}
          </div>
        )}
      </div>
      
      <div className="mt-5">
        <h2 className="font-bold text-3xl">{trip?.location}</h2>
        
        <div className="flex gap-5 mt-4 flex-wrap">
          <div className="p-3 px-5 bg-gray-100 rounded-lg">
            <h2 className="text-gray-500 text-sm">📅 Duration</h2>
            <p className="font-medium text-lg">{trip?.noOfDays} Days</p>
          </div>
          
          <div className="p-3 px-5 bg-gray-100 rounded-lg">
            <h2 className="text-gray-500 text-sm">💰 Budget</h2>
            <p className="font-medium text-lg">{trip?.budget}</p>
          </div>
          
          <div className="p-3 px-5 bg-gray-100 rounded-lg">
            <h2 className="text-gray-500 text-sm">👥 Travelers</h2>
            <p className="font-medium text-lg">{trip?.traveler}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
