import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    userId: v.string(), // Clerk user ID
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  }).index("by_userId", ["userId"]), // Index for efficient lookups
  
  trips: defineTable({
    userId: v.string(), // Clerk user ID
    userEmail: v.string(),
    location: v.string(),
    noOfDays: v.number(),
    budget: v.string(),
    traveler: v.string(),
    tripData: v.any(), // Stores the complete AI response (hotels + itinerary)
    createdAt: v.number(),
  })
  .index("by_userId", ["userId"])
  .index("by_userEmail", ["userEmail"]),
})
