"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import CustomBtn from "@/app/components/CustomBtn";

const RecipesData = [
  {
    id: 1,
    img: "/img/recipes/1.webp",
    title: "Breakfast",
    subtitle: "Mediterranean Broccoli Cheese Omelette",
    Calories: "271.0",
    fat: "15.7g",
    carbs: "28.4g",
    protein: "11.8g",
    footerTitle: "Allergens",
    footerDesc: "Dairy, Eggs, Spicy",
  },
  {
    id: 2,
    img: "/img/recipes/2.webp",
    title: "Lunch",
    subtitle: "Grilled Chicken Quinoa Bowl",
    Calories: "410.0",
    fat: "12.5g",
    carbs: "35.2g",
    protein: "35.0g",
    footerTitle: "Allergens",
    footerDesc: "Nuts",
  },
  {
    id: 3,
    img: "/img/recipes/3.webp",
    title: "Dinner",
    subtitle: "Salmon with Steamed Veggies",
    Calories: "390.0",
    fat: "20.1g",
    carbs: "10.3g",
    protein: "36.5g",
    footerTitle: "Allergens",
    footerDesc: "Fish",
  },
  {
    id: 4,
    img: "/img/recipes/4.webp",
    title: "Snacks",
    subtitle: "Greek Yogurt with Berries",
    Calories: "80.0",
    fat: "5.0g",
    carbs: "9.0g",
    protein: "5.0g",
    footerTitle: "Allergens",
    footerDesc: "Dairy",
  },
];

const Recipes = () => {
  return (
    <section className="py-10 bg-[#f2fef2] border-b border-dotted">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            What’s Included
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See our delicious sample recipes
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          //   pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {RecipesData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden p-3 hover:bg-[#f2fef2] hover:border-dotted border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Left: Image */}
                  <div className="relative w-full sm:w-1/3 aspect-[4/3] rounded overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.subtitle}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>

                  {/* Right: Info */}
                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-green-600 font-medium uppercase">
                        {item.title}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-2">
                        {item.subtitle.slice(0, 25).concat("...")}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3 bg-green-50 p-2 rounded">
                        <p>
                          <strong>Calories:</strong> {item.Calories}
                        </p>
                        <p>
                          <strong>Fat:</strong> {item.fat}
                        </p>
                        <p>
                          <strong>Carbs:</strong> {item.carbs}
                        </p>
                        <p>
                          <strong>Protein:</strong> {item.protein}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-3 text-xs text-gray-500 flex justify-between mt-2 flex-wrap gap-1">
                  <strong>{item.footerTitle}:</strong>
                  <p>{item.footerDesc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Recipes;
