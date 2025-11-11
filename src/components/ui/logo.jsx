import React from "react";
import logotrip from "@/assets/logotrip.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={logotrip} alt="Logo" width={40} height={40} />
      <h1 className="text-2xl font-sans font-semibold">Tripate</h1>
    </Link>
  );
};

export default Logo;
