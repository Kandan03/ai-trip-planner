"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import Header from "@/sections/Header";
import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/services/AIModal";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

const Trip = () => {
  const { user } = useUser();
  const router = useRouter();
  const [place, setPlace] = useState();
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  
  const createTrip = useMutation(api.trips.createTrip);
  
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const SaveAiTrip = async (tripData) => {
    try {
      const parsedTripData = JSON.parse(tripData);
      
      // Extract location name from the place object
      const locationName = formData?.location?.formatted_address || 
                          formData?.location?.name || 
                          formData?.location?.label || 
                          "Unknown Location";
      
      const tripId = await createTrip({
        userId: user?.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        location: locationName,
        noOfDays: parseInt(formData?.noOfDays),
        budget: formData?.budget,
        traveler: formData?.traveler,
        tripData: parsedTripData,
      });
      
      toast.success("Trip created successfully!");
      
      router.push(`/trip-details/${tripId}`);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip");
    }
  };

  const OnGenerateTrip = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      setOpenDailog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill all details");
      return;
    }
    setLoading(true);
    toast.loading("Please wait... We are working on it...");
    
    // Extract location name
    const locationName = formData?.location?.formatted_address || 
                        formData?.location?.name || 
                        formData?.location?.label || 
                        "Unknown Location";
    
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      locationName
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  return (
    <div>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="mt-5 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is destination of choice?
            </h2>
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              className="w-full p-2 border border-gray-300 rounded-lg"
              onPlaceSelected={(place) => {
                setPlace(place);
                handleInputChange("location", place);
              }}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip?
            </h2>
            <Input
              placeholder={"Ex.3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border cursor-pointer 
              rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && "shadow-lg border-black"}
              `}
                >
                  <h2 className="font-bold text-lg">
                    {item.icon} {item.title}
                  </h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="grid grid-cols-2 gap-5 mt-5 sm:grid-cols-3 xs:grid-cols-2">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border cursor-pointer rounded-lg
               hover:shadow-lg
               ${formData?.traveler == item.people && "shadow-lg border-black"}
               `}
                >
                  <h2 className="font-bold text-lg">
                    {item.icon} {item.title}
                  </h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button onClick={OnGenerateTrip}>
            Generate Trip Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trip;
