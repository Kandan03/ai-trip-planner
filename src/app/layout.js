"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { useMutation } from "convex/react";
import { useEffect, useCallback } from "react";
import { api } from "../../convex/_generated/api";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }) {
  const createUser = useMutation(api.users.createUser);
  const { user } = useUser();

  const createNewUser = useCallback(async () => {
    if (user && createUser) {
      try {
        await createUser({
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          imageUrl: user?.imageUrl ?? "",
          name: user?.fullName ?? "",
          userId: user?.id ?? "",
        });
      } catch (error) {
        console.error("Error creating user:", error.message);
      }
    }
  }, [user, createUser]);

  useEffect(() => {
    createNewUser();
  }, [createNewUser]);

  return children;
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
            <Toaster position="top-center" richColors />
          </ConvexClientProvider>
        </body>
        
      </html>
    </ClerkProvider>
  );
}
