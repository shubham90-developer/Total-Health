"use client";
import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";

const Subscribe = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#f8fdf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Subscribe & Save
          </h2>
          <Image
            src="/img/sub.png"
            alt="Envelope Icon"
            width={48}
            height={48}
            className="inline-block"
          />
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10">
          Sign-up to the Totally Health Life mailing list to receive the latest
          news and exclusive offers from Totally Health.
        </p>

        {/* Form */}
        <form className="bg-white shadow-lg rounded-2xl sm:rounded-full px-4 py-5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-3 w-full">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 text-sm"
          />
          <button
            type="submit"
            className="w-full cursor-pointer sm:w-auto bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 text-sm transition-all"
          >
            <FaPaperPlane className="text-sm" />
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
