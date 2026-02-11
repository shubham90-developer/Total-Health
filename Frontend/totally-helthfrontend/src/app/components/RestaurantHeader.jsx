"use client";

import React, { useState, useEffect } from "react";
import {
  FaDownload,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";
import Logo from "./Logo";
import Link from "next/link";
import CustomBtn from "./CustomBtn";
import { FaBowlFood } from "react-icons/fa6";

const RestaurantHeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Optional: prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "Our Story" },
    { href: "/menu", label: "Menu" },
    { href: "/blog", label: "Blog" },
    { href: "/body-assessment", label: "Body Assessment" },
    { href: "/totally-healthy-fit", label: "Totally Healthy Fit" },
  ];

  return (
    <header className="border-b bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-10">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-green-900 font-semibold hover:text-green-600 text-xs"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Buttons + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* <CustomBtn
              href="/weekly-order"
              className="flex items-center gap-2 py-2 px-3"
            >
              <FaSignInAlt /> Weekly Order
            </CustomBtn> */}
            <CustomBtn
              href="menu-list"
              className="flex items-center gap-2 py-2 px-3"
            >
              <FaBowlFood />
              Order Now
            </CustomBtn>
            <CustomBtn
              href="cart"
              className="flex items-center gap-2 py-2 px-3"
            >
              <FaShoppingCart />
              Cart
            </CustomBtn>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-green-900 text-2xl focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-5 space-y-5 text-sm text-green-900 font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block hover:text-green-600 border-b border-gray-200 py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            {/* <CustomBtn
              href="/weekly-order"
              className="w-full flex justify-center gap-2 py-2"
            >
              <FaSignInAlt /> Weekly Order
            </CustomBtn> */}
            <CustomBtn
              href="/menu-list"
              className="w-full flex justify-center gap-2 py-2"
            >
              <FaDownload />
              Order Now
            </CustomBtn>
            <CustomBtn
              href="/cart"
              className="w-full flex justify-center gap-2 py-2"
            >
              <FaDownload />
              Cart
            </CustomBtn>
          </div>
        </div>
      )}
    </header>
  );
};

export default RestaurantHeaderBar;
