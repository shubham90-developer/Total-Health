import CustomBtn from "@/app/components/CustomBtn";
import Image from "next/image";
import React from "react";

const services = [
  {
    title: "Partner In Health",
    description: "Strategic collaborations to help improve people's lives.",
    image: "/img/our-seervices/1.webp",
  },
  {
    title: "Totally HealthyRestaurants",
    description: "Healthy, casual, dine-in restaurants and delivery.",
    image: "/img/our-seervices/2.webp",
  },
  {
    title: "Fuel-Up Meal Prep",
    description: "Fully customisable meal prep delivery.",
    image: "/img/our-seervices/3.webp",
  },
  {
    title: "Fuel-Up Stations",
    description: "Nutrition-focused dine-in and food delivery.",
    image: "/img/our-seervices/4.webp",
  },
  {
    title: "Fuel-Up Supplements",
    description: "High-quality nutrition supplements for performance.",
    image: "/img/our-seervices/5.webp",
  },
  {
    title: "Spring Feeling",
    description:
      "Delicious, convenient cook-at-home meal kit delivery services.",
    image: "/img/our-seervices/6.webp",
  },
];

const OurServices = () => {
  return (
    <section className="py-14 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Services
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Totally Healthyis about more than meal plans. We deliver top
            quality, great-tasting nutrition services across the UAE.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01]"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold mb-2 text-gray-900">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {service.description}
                </p>
                <CustomBtn href="restaurants" className="px-3 py-2">
                  Learn More
                </CustomBtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
