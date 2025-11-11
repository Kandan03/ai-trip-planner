import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
    userId: v.string(), // Clerk user ID
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  }).index("by_userId", ["userId"]), // Index for efficient lookups
})
