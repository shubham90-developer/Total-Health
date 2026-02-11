import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <Link href="/" className="inline-block">
      <Image
        src="/img/logo.png"
        alt="Logo"
        width={50}
        height={50}
        className={className}
      />
    </Link>
  );
};

export default Logo;
