import React from "react";
import logotrip from "@/assets/logotrip.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logotrip} alt="Logo" width={40} height={40} />
    </Link>
  );
};

export default Logo;
