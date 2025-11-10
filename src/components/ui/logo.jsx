import React from "react";
import logotrip from "@/assets/logotrip.svg";
import Image from "next/image";

const Logo = () => {
  return <Image src={logotrip} alt="Logo" width={40} height={40} />;
};

export default Logo;
