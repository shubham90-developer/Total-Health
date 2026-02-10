"use client";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderBar from "./Header";
import RestaurantHeaderBar from "./RestaurantHeader";

// ✅ Dynamically load CountdownTimer (no SSR)
const CountdownTimer = dynamic(() => import("./CountdownTimer"), {
  ssr: false,
});

const RestaurantNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const social = [
    { id: 1, icon: FaFacebookF, link: "#" },
    { id: 2, icon: FaInstagram, link: "#" },
    { id: 3, icon: FaTwitter, link: "#" },
    { id: 4, icon: FaYoutube, link: "#" },
  ];

  return (
    <>
      <header className="w-full bg-white z-50 relative">
        {/* Mobile Menu */}
        {isMounted && menuOpen && (
          <div className="absolute top-[100%] left-0 w-full bg-white border-t shadow-md md:hidden z-50">
            <ul className="flex flex-col text-gray-800 font-medium p-4 space-y-4">
              {["Home", "Pages", "Shop", "Services", "Blog", "Contact Us"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#" onClick={() => setMenuOpen(false)}>
                      {item}
                    </a>
                  </li>
                )
              )}
              <li>
                <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800">
                  Book An Appointment
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Sticky Nav or Other Header */}
      <RestaurantHeaderBar />
    </>
  );
};

export default RestaurantNav;
