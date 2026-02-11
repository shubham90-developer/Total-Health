"use client";

import React from "react";
import CustomBtn from "@/app/components/CustomBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IoFastFood } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import TrustSection from "./TrustSection";
import { useGetHomeBannerQuery } from "../../../../store/homeBanner/homeBannerApi";

const HeroBanner = () => {
  const { data: homebanner, isLoading, isError } = useGetHomeBannerQuery();

  const banners = homebanner?.data || [];
  const activeBanners = banners.filter((banner) => banner.status === "active");

  console.log("activeBanners", activeBanners);

  /* ---------------- Skeleton UI ---------------- */
  if (isLoading) {
    return (
      <div className="relative bg-[#f2fef2] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center animate-pulse">
            {/* Text Skeleton */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-10 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-5/6"></div>

              <div className="flex gap-4 mt-6">
                <div className="h-12 w-40 bg-gray-300 rounded"></div>
                <div className="h-12 w-32 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Image Skeleton */}
            <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="w-full max-w-md h-80 bg-gray-300 rounded-bl-[30px]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <div>Failed to load banners</div>;

  /* ---------------- Actual UI ---------------- */

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
          {activeBanners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    {banner.title}
                  </h1>

                  <p className="text-gray-600 mb-6 text-base md:text-lg">
                    {banner.description}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <CustomBtn
                      href="meal-plans"
                      className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition flex gap-2 items-center"
                    >
                      <IoFastFood /> Choose My Meal Plan
                    </CustomBtn>

                    <CustomBtn
                      href="contact-us"
                      className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition flex gap-2 items-center"
                    >
                      <FaAddressBook /> Contact Us
                    </CustomBtn>
                  </div>

                  <TrustSection banner={banner} />
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center relative">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full max-w-md mx-auto rounded-bl-[30px] shadow-lg"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Decorative Shapes */}
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
