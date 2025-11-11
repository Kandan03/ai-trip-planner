import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";

/**
 * Get place photo using Google Places API
 * @param {string} placeName - Name of the place
 * @returns {Promise<string>} Photo URL
 */
export const getPlacePhoto = async (placeName) => {
  if (!placeName) {
    console.log('No place name provided');
    return null;
  }

  try {
    const data = {
      textQuery: placeName
    };

    console.log('Fetching photo for:', placeName);
    const response = await GetPlaceDetails(data);
    
    console.log('API Response:', response.data);
    
    if (response.data.places && response.data.places.length > 0) {
      const place = response.data.places[0];
      console.log('Place found:', place);
      
      if (place.photos && place.photos.length > 0) {
        const photoName = place.photos[0].name;
        console.log('Photo name:', photoName);
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        console.log('Photo URL generated:', photoUrl);
        console.log('Full PHOTO_REF_URL template:', PHOTO_REF_URL);
        return photoUrl;
      } else {
        console.log('No photos available for:', placeName);
        console.log('Place data:', place);
      }
    } else {
      console.log('No places found for:', placeName);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching place photo for', placeName, ':', error);
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
    }
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

