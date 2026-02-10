"use client";

import React, { useEffect, useState } from "react";
import CustomBtn from "@/app/components/CustomBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IoFastFood } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import TrustSection from "./TrustSection";

const HeroBanner = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <div className="relative bg-[#f2fef2] overflow-hidden py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="max-w-7xl mx-auto px-4"
        >
          {[1, 2, 3].map((slide) => (
            <SwiperSlide key={slide}>
              <div className="flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    The tastiest and easiest way to lose weight fast.
                    <br />
                  </h1>
                  <p className="text-gray-600 mb-6 text-base md:text-lg">
                    Cooking up made-to-order meal plans to help you look and
                    feel fantastic! Choose from thousands of meal combinations
                    and get healthy, nutritious and delicious meals delivered
                    straight to your door.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <CustomBtn
                      href="meal-plans"
                      className="bg-green-600 text-white px-6 py-3  hover:bg-green-700 transition flex gap-2 items-center"
                    >
                      <IoFastFood /> Choose My Meal plan
                    </CustomBtn>
                    <CustomBtn
                      href="contact-us"
                      className="bg-gray-900 text-white px-6 py-2  hover:bg-gray-800 transition flex gap-2 items-center"
                    >
                      <FaAddressBook /> Contact Us
                    </CustomBtn>
                  </div>
                  <TrustSection />
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center relative">
                  <img
                    src={`/img/hero/${slide}.jpg`}
                    alt={`Slide ${slide}`}
                    className="w-full max-w-md mx-auto rounded-bl-[30px] shadow-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Animated Leaf Shapes */}
        <img
          src="/img/hero/shape2.png"
          alt="shape"
          className="absolute w-10 top-10 left-6 animate-floatSlow z-0 animate-pulse"
        />
        <img
          src="/img/hero/shape2.png"
          alt="shape"
          className="absolute w-10 bottom-6 left-6 animate-bounceSlow z-0 animate-pulse"
        />
        <img
          src="/img/hero/shape4.png"
          alt="shape"
          className="absolute w-12 bottom-10 right-10 animate-floatSlow z-0 animate-pulse"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
