"use client";

import React, { useState } from "react";
import {
  FaGlobe,
  FaDownload,
  FaSignInAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "./Logo";
import Link from "next/link";
import CustomBtn from "./CustomBtn";
import AccountDropdown from "./AccountDroupdown";
import { usePathname } from "next/navigation";

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/meal-plans", label: "Meal Plans" },
    { href: "/blog", label: "Blog" },
    { href: "/body-assessment", label: "Body Assessment" },
    // { href: "/totally-healthy-fit", label: "Totally Healthy Fit" },
    { href: "/restaurants", label: "Restaurants" },
  ];

  return (
    <header className="border-b bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center justify-between md:w-auto gap-4 md:gap-10">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold ${
                  pathname === link.href
                    ? "text-green-600"
                    : "text-green-900 hover:text-green-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="">
            <AccountDropdown />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <CustomBtn
              href="/login"
              className="flex items-center gap-2 py-2 px-3"
            >
              <FaSignInAlt /> Login
            </CustomBtn>
            <CustomBtn href="#" className="flex items-center gap-2 py-2 px-3">
              <FaDownload /> Download the app
            </CustomBtn>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-green-900 text-xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-5 space-y-4 text-sm text-green-900 font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block text-xs font-semibold ${
                pathname === link.href
                  ? "text-green-600"
                  : "text-green-900 hover:text-green-600"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Account & Buttons */}
          <div className="pt-4 border-t space-y-3">
            <CustomBtn
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              <FaSignInAlt /> Login
            </CustomBtn>
            <CustomBtn
              href="#"
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              <FaDownload /> Download the app
            </CustomBtn>
          </div>
        </div>
      )}

      {/* Bottom Notice Bar */}
      <div className="text-center text-xs text-black py-2 border-t">
        Looking for Totally Health Restaurants and Delivery?{" "}
        <Link
          href="/restaurants"
          className="font-semibold text-green-900 underline"
        >
          Visit Restaurants
        </Link>
      </div>
    </header>
  );
};

export default HeaderBar;
