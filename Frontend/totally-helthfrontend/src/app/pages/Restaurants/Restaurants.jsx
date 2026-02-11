"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Restaurants = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <div className="relative bg-[#f2fef2] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="max-w-7xl mx-auto px-4"
        >
          {[1, 2, 3].map((slide) => (
            <SwiperSlide key={slide}>
              <div className="">
                {/* Image */}
                <div className="w-full md:mt-0 text-center relative">
                  <img
                    src={`/img/Restaurants/1.jpg`}
                    alt={`Slide`}
                    className="w-full h-[400px]"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Restaurants;
