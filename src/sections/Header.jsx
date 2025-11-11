import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import React from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="px-2 py-2 shadow-md flex justify-between items-center bg-white w-85 mx-auto my-5 rounded-4xl sm:w-1/2">
      <Logo />
      <div className="flex items-center gap-5">
        <SignedIn>
          <Link href="/my-trips">
            <Button variant="outline">My Trips</Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <Button>Get Started</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
