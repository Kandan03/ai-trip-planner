import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";

/**
 * Get place photo using Google Places API
 * @param {string} placeName - Name of the place
 * @returns {Promise<string>} Photo URL
 */
export const getPlacePhoto = async (placeName) => {
  if (!placeName) {
    return null;
  }

  try {
    const data = {
      textQuery: placeName
    };

    const response = await GetPlaceDetails(data);
    
    if (response.data.places && response.data.places.length > 0) {
      const place = response.data.places[0];
      
      if (place.photos && place.photos.length > 0) {
        const photoName = place.photos[0].name;
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        return photoUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching place photo:', error.message);
    return null;
  }
};

/**
 * Get image URL with fallback to placeholder
 * @param {string} placeImageUrl - AI provided image URL
 * @param {string} placeName - Place name for Google API
 * @returns {string} Image URL
 */
export const getPlaceImageSync = (placeImageUrl, placeName) => {
  // If valid URL provided, use it
  if (placeImageUrl && 
      placeImageUrl !== "None" && 
      placeImageUrl !== "null" && 
      placeImageUrl !== "undefined" &&
      placeImageUrl.startsWith('http')) {
    try {
      new URL(placeImageUrl);
      return placeImageUrl;
    } catch {
      // Invalid URL, will use fallback
    }
  }

  // Return placeholder, will be replaced by actual photo
  return null;
};

