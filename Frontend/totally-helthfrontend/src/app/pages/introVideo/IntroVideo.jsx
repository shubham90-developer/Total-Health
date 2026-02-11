"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";
import { useGetIntroVideoQuery } from "../../../../store/introVideo/introVideoApi";

const IntroVideo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: introVideo, isLoading, isError } = useGetIntroVideoQuery();

  // ✅ Since API returns object, not array
  const activeVideo = introVideo?.data;

  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-4xl">
          <div className="h-[350px] bg-gray-200 animate-pulse rounded-xl" />
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-[95%] md:max-w-4xl">
        {/* Thumbnail */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
          <Image
            src={activeVideo?.thumbnail || "/img/video/1.jpg"}
            alt="Video Background"
            fill
            className="object-cover"
            priority
          />

          {/* Play Button */}
          <div className="absolute cursor-pointer inset-0 flex items-center justify-center z-20">
            <button
              onClick={() => setIsOpen(true)}
              className="relative cursor-pointer w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping z-0" />
              <FaPlay className="ml-1 z-10 relative text-lg md:text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 z-10"
            >
              <FaTimes />
            </button>

            <iframe
              className="w-full h-full"
              src={activeVideo?.videoUrl}
              title="Intro Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default IntroVideo;
