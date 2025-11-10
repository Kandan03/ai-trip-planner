import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import React from "react";

const Header = () => {
  return (
    <header className="p-5 shadow-md flex justify-between items-center">
        <Logo />
        <Button>Sign In</Button>
    </header>
  );
};

export default Header;
