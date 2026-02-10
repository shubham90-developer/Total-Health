"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";

const IntroVideo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[95%] md:max-w-4xl">
        {/* Video Thumbnail Section */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] overflow-hidden ">
          {/* Overlay Shape */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/img/video/2.png"
              alt="Overlay Shape"
              fill
              className="object-cover"
            />
          </div>

          {/* Background Image */}
          <Image
            src="/img/video/1.jpg"
            alt="Video Background"
            fill
            className="object-cover z-0"
            priority
          />

          {/* play btn */}
          <div className="absolute inset-0 flex items-center justify-center z-20 ">
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-16 cursor-pointer h-16 md:w-20 md:h-20 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              {/* Animated wave ring */}
              <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping z-0" />

              {/* Icon */}
              <FaPlay className="ml-1 z-10 relative text-lg md:text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative w-full max-w-3xl aspect-video bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 z-10"
            >
              <FaTimes />
            </button>
            {/* Video iframe */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/izWRBNSVlc0"
              title="Intro Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default IntroVideo;
