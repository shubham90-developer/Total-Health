import Link from "next/link";
import React from "react";

const CustomBtn = ({ href = "", className, onClick, children }) => {
  return (
    <Link href={href} className={`${className} default-btn`} onClick={onClick}>
      {children}
    </Link>
  );
};

export default CustomBtn;
