"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const brandsData = [
  { id: 1, img: "/img/brands/1.png" },
  { id: 2, img: "/img/brands/2.png" },
  { id: 3, img: "/img/brands/3.png" },
  { id: 4, img: "/img/brands/4.png" },
  { id: 5, img: "/img/brands/5.png" },
];

const Brands = () => {
  return (
    <section className="py-10 bg-[#f2fef2] border-b border-dotted">
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
        >
          {brandsData.map((brand) => (
            <SwiperSlide key={brand.id} className="flex justify-center">
              <Image
                src={brand.img}
                alt={`Brand ${brand.id}`}
                width={100}
                height={100}
                className="object-contain w-15 h-15"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
