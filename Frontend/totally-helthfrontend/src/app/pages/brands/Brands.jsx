"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useGetBrandsQuery } from "../../../../store/brands/brandsApi";

const Brands = () => {
  const { data: brands, isLoading, isError } = useGetBrandsQuery();

  const brandsData = brands?.data || [];
  const activeBrands = brandsData.filter((brand) => brand.status === "active");

  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-10 bg-[#f2fef2] border-b border-dotted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-6 justify-between animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-24 h-24 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  /* ---------------- Actual Slider ---------------- */

  return (
    <section className="py-10 bg-[#f2fef2] border-b border-dotted">
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
        >
          {activeBrands.map((brand) => (
            <SwiperSlide key={brand._id} className="flex justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain w-20 h-20"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
