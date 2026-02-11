"use client";
import React from "react";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1d3229] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Logo className="md:col-span-1 w-2xl" />

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link
                href="about-us"
                className="hover:text-green-300 tracking-wider"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="contact-us"
                className="hover:text-green-300 tracking-wider"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href="partner-in-health"
                className="hover:text-green-300 tracking-wider"
              >
                Partner In Health
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Services</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link
                href="restaurants"
                className="hover:text-green-300 tracking-wider"
              >
                Restaurants Menu
              </Link>
            </li>
            <li>
              <Link
                href="meal-plans"
                className="hover:text-green-300 tracking-wider"
              >
                Meal Plans
              </Link>
            </li>
            <li>
              <Link
                href="restaurants-location"
                className="hover:text-green-300 tracking-wider"
              >
                Restaurants Location
              </Link>
            </li>
            {/* <li>
              <Link
                href="why-health-meal-plans"
                className="hover:text-green-300 tracking-wider"
              >
                Why Totally Health Meal Plans
              </Link>
            </li> */}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link
                href="privacy-policy"
                className="hover:text-green-300 tracking-wider"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="terms-and-conditions"
                className="hover:text-green-300 tracking-wider"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="faqs" className="hover:text-green-300 tracking-wider">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Social + Apps */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Follow us on</h3>
            <div className="flex gap-4 text-xl">
              <Link
                href=""
                className="border border-white  rounded-full w-8 h-8 flex justify-center items-center hover:bg-green-400 hover:text-white"
              >
                <FaInstagram className="text-white text-xs" />
              </Link>
              <Link
                href=""
                className="border border-white  rounded-full w-8 h-8 flex justify-center items-center hover:bg-green-400 hover:text-white"
              >
                <FaFacebook className="text-white text-xs" />
              </Link>
              <Link
                href=""
                className="border border-white  rounded-full w-8 h-8 flex justify-center items-center hover:bg-green-400 hover:text-white"
              >
                <FaTiktok className="text-white text-xs" />
              </Link>
              <Link
                href=""
                className="border border-white  rounded-full w-8 h-8 flex justify-center items-center hover:bg-green-400 hover:text-white"
              >
                {" "}
                <FaYoutube className="text-white text-xs" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Download the App</h3>
            <div className="flex gap-2 flex-wrap">
              <Link href="">
                <Image
                  src="/img/google-store.webp"
                  alt="Play"
                  width={120}
                  height={40}
                />
              </Link>
              <Link href="">
                <Image
                  src="/img/app-store.webp"
                  alt="App"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-white/20 pt-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2025–2026 Totally Health. All rights reserved.</p>
          <div className="flex gap-3">
            <Image src="/img/1.png" alt="Apple" width={100} height={25} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
