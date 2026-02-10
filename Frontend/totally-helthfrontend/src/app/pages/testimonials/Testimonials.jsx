"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { useGetTestimonialsQuery } from "../../../../store/testimonials/testimonialsApi";

const Testimonials = () => {
  const { data: testimonial, isLoading, isError } = useGetTestimonialsQuery();

  // ✅ Ensure safe array
  const review = Array.isArray(testimonial?.data) ? testimonial.data : [];

  const activeReview = review.filter((item) => item.status === "active");

  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center animate-pulse">
          <div className="h-6 bg-gray-300 w-32 mx-auto rounded mb-4"></div>
          <div className="h-8 bg-gray-300 w-1/2 mx-auto rounded mb-10"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: "url(/img/testimonials-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-green-600 font-semibold mb-2">Testimonials</p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Customer Satisfaction
        </h2>

        {activeReview.length > 0 && (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: false }}
            loop={true}
            className="w-full"
          >
            {activeReview.map((item) => (
              <SwiperSlide key={item._id}>
                <FaQuoteLeft className="text-4xl text-[#121a2f] mx-auto mb-6" />

                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {item.quote}
                </p>

                <h4 className="text-lg font-semibold text-gray-900">
                  {item.authorName}
                </h4>

                <p className="text-green-600 font-medium text-sm">
                  {item.authorProfession}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
