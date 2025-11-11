import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPlacePhoto, getPlaceImageSync } from "@/lib/google-photos";

const PlaceCard = ({ place, delay = 0 }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const googleMapsUrl = place?.placeName 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`
    : "#";

  useEffect(() => {
    const fetchPhoto = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
      
      setIsLoading(true);
      
      if (place?.placeImageUrl && 
          place.placeImageUrl !== "None" && 
          place.placeImageUrl !== "null" && 
          place.placeImageUrl !== "undefined" &&
          place.placeImageUrl.startsWith('http') &&
          !place.placeImageUrl.includes('example.com')) {
        try {
          new URL(place.placeImageUrl);
          setPhotoUrl(place.placeImageUrl);
          setIsLoading(false);
          return;
        } catch {
        }
      }
      
      try {
        const photo = await getPlacePhoto(place?.placeName);
        if (photo) {
          setPhotoUrl(photo);
        }
      } catch (error) {
        console.error('Error fetching place photo:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (place?.placeName) {
      fetchPhoto();
    }
  }, [place?.placeName, place?.placeImageUrl, delay]);

  return (
    <Link href={googleMapsUrl} target="_blank">
      <div className="border rounded-lg p-4 my-4 hover:shadow-md transition-all cursor-pointer">
        <div className="flex gap-4">
          <div className="relative w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
            {isLoading ? (
              <div className="text-gray-400 text-xs">Loading...</div>
            ) : photoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photoUrl}
                alt={place?.placeName || "Place"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="text-gray-400 text-xs p-2 text-center">📍<br/>' + (place?.placeName || 'Place') + '</div>';
                }}
              />
            ) : (
              <div className="text-gray-400 text-xs p-2 text-center">
                📍<br/>{place?.placeName || 'Place'}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-lg">{place?.placeName}</h4>
                {place?.time && (
                  <p className="text-sm text-gray-600 mt-1">🕒 {place?.time}</p>
                )}
              </div>
              {place?.ticketPricing && (
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {place?.ticketPricing}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              {place?.placeDetails}
            </p>

            <div className="flex gap-4 mt-3 text-sm">
              {place?.timeToTravel && (
                <span className="text-gray-600">⏱️ {place?.timeToTravel}</span>
              )}
              {place?.rating && (
                <span className="text-gray-600">⭐ {place?.rating}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
