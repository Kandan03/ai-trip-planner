import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPlacePhoto, getPlaceImageSync } from "@/lib/google-photos";

const HotelCard = ({ hotel, delay = 0 }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const googleMapsUrl = hotel?.hotelName 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        (hotel.hotelName || "") + " " + (hotel.hotelAddress || "")
      )}`
    : "#";

  useEffect(() => {
    const fetchPhoto = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
      
      setIsLoading(true);
      
      if (hotel?.hotelImageUrl && 
          hotel.hotelImageUrl !== "None" && 
          hotel.hotelImageUrl !== "null" && 
          hotel.hotelImageUrl !== "undefined" &&
          hotel.hotelImageUrl.startsWith('http') &&
          !hotel.hotelImageUrl.includes('example.com')) {
        try {
          new URL(hotel.hotelImageUrl);
          setPhotoUrl(hotel.hotelImageUrl);
          setIsLoading(false);
          return;
        } catch {
        }
      }
      
      try {
        const photo = await getPlacePhoto(hotel?.hotelName);
        if (photo) {
          setPhotoUrl(photo);
        }
      } catch (error) {
        console.error('Error fetching hotel photo:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (hotel?.hotelName) {
      fetchPhoto();
    }
  }, [hotel?.hotelName, hotel?.hotelImageUrl, delay]);

  return (
    <Link href={googleMapsUrl} target="_blank">
      <div className="hover:scale-105 transition-all cursor-pointer border rounded-xl overflow-hidden h-full">
        <div className="relative w-full h-[180px] bg-gray-200 flex items-center justify-center">
          {isLoading ? (
            <div className="text-gray-400 text-sm">Loading...</div>
          ) : photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoUrl}
              alt={hotel?.hotelName || "Hotel"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="text-gray-400 text-sm p-4 text-center">🏨<br/>' + (hotel?.hotelName || 'Hotel') + '</div>';
              }}
            />
          ) : (
            <div className="text-gray-400 text-sm p-4 text-center">
              🏨<br/>{hotel?.hotelName || 'Hotel'}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg">{hotel?.hotelName}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            📍 {hotel?.hotelAddress}
          </p>
          <p className="text-sm mt-2">💵 {hotel?.price}</p>
          <p className="text-sm mt-1">⭐ {hotel?.rating}</p>
          {hotel?.description && (
            <p className="text-xs text-gray-600 mt-2 line-clamp-3">
              {hotel?.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
