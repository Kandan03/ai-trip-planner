import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to create or update a user
export const createUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("UserTable")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        imageUrl: args.imageUrl,
        email: args.email,
      });
      return existingUser._id;
    } else {
      const userId = await ctx.db.insert("UserTable", {
        userId: args.userId,
        name: args.name,
        imageUrl: args.imageUrl,
        email: args.email,
      });
      return userId;
    }
  },
});

// Query to get user by Clerk userId
export const getUserByClerkId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("UserTable")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    return user;
  },
});

// Query to get all users
export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("UserTable").collect();
  },
});
