"use client";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import Link from "next/link";
import dynamic from "next/dynamic";
import HeaderBar from "./Header";

// ✅ Dynamically load CountdownTimer (no SSR)
const CountdownTimer = dynamic(() => import("./CountdownTimer"), {
  ssr: false,
});

const Navbar = () => {
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
        {/* Top bar */}
        <div className="bg-[#61844c] text-white">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-2 text-sm">
            <div className="flex items-center gap-3 xs:hidden md:flex">
              <span className="font-medium">
                15% OFF any meal plan – Ends in:
              </span>
              {/* ✅ Countdown only after mount */}
              {isMounted && <CountdownTimer targetDate="2025-07-11T23:59:59" />}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span>Follow us:</span>
              {social.map((item) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="w-5 h-5 flex items-center justify-center bg-white text-teal-600 rounded hover:bg-black hover:text-white transition"
                >
                  <item.icon size={10} />
                </Link>
              ))}

              <IoLanguage />
              <select className="bg-transparent text-white border border-white px-2 py-0.5 text-xs rounded focus:outline-none focus:ring-2 focus:ring-white">
                <option className="text-black" value="en">
                  English
                </option>
                <option className="text-black" value="ar">
                  العربية
                </option>
              </select>
            </div>
          </div>
        </div>

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
      <HeaderBar />
    </>
  );
};

export default Navbar;
