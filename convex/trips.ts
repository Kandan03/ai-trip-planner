import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to create a new trip
export const createTrip = mutation({
  args: {
    userId: v.string(),
    userEmail: v.string(),
    location: v.string(),
    noOfDays: v.number(),
    budget: v.string(),
    traveler: v.string(),
    tripData: v.any(),
  },
  handler: async (ctx, args) => {
    const tripId = await ctx.db.insert("trips", {
      userId: args.userId,
      userEmail: args.userEmail,
      location: args.location,
      noOfDays: args.noOfDays,
      budget: args.budget,
      traveler: args.traveler,
      tripData: args.tripData,
      createdAt: Date.now(),
    });
    return tripId;
  },
});

// Query to get all trips for a user
export const getUserTrips = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db
      .query("trips")
      .withIndex("by_userEmail", (q) => q.eq("userEmail", args.userEmail))
      .order("desc")
      .collect();
    return trips;
  },
});

// Query to get a single trip by ID
export const getTripById = query({
  args: {
    tripId: v.id("trips"),
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.tripId);
    return trip;
  },
});
