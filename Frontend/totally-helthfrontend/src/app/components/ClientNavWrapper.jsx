"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import RestaurantNav from "./RestaurantNav";

const ClientNavWrapper = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/restaurants")) {
    return <RestaurantNav />;
  }

  return <Navbar />;
};

export default ClientNavWrapper;
