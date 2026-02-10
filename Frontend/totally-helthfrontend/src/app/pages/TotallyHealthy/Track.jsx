import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

// Optional: Replace with real image names (without extensions)
const slides = ["t1", "t2", "t3", "t4"];

const features = [
  {
    icon: "/img/icons/3.webp",
    title: "Precise heart rate monitoring",
    text: "With Totally Healthy Fit, you can easily monitor your heart rate throughout the day. Whether you're working out or resting, Totally Healthy Fit provides real-time heart rate data to help you understand your body’s needs and optimize your fitness routine.",
    leaf: "/img/icons/shape5.png",
  },
  {
    icon: "/img/icons/4.webp",
    title: "Fully automatic meal logging",
    text: "Totally Healthy Fit automatically logs every meal from our plans into the Totally Healthy app, giving you an accurate count of your daily calorie intake without any effort. Stay on track with your health goals effortlessly and enjoy the convenience of automatic meal tracking.",
    leaf: "/img/icons/shape5.png",
  },
  {
    icon: "/img/icons/5.webp",
    title: "Sleep phase tracking",
    text: "Totally Healthy Fit takes your wellness a step further by tracking your sleep phases. By monitoring your sleep cycles, Totally Healthy Fit provides insights into your rest quality and duration. Use this data to improve your sleep habits, ensuring you wake up refreshed and ready to tackle the day.",
    leaf: "/img/icons/shape5.png",
  },
];

const Track = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Track what’s important
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Health data that matters
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          loop={true}
          //   pagination={{ clickable: true }}
          className="max-w-7xl mx-auto px-4"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide}>
              <div className="w-full relative">
                <img
                  src={`/img/features/${slide}.webp`}
                  alt={`Slide ${slide}`}
                  className="w-full max-w-3xl mx-auto "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Cards */}
        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative border border-green-300 p-6 rounded-lg bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:bg-green-100 cursor-pointer"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Track;
