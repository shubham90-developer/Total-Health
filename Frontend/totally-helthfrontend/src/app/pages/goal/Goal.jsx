import Image from "next/image";
import Link from "next/link";
import React from "react";

const features = [
  {
    icon: "/img/icons/3.webp",
    title: "Daily Exercise",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    leaf: "/img/icons/shape5.png",
    url: "body-assessment",
  },
  {
    icon: "/img/icons/4.webp",
    title: "Natural Foods",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    leaf: "/img/icons/shape5.png",
    url: "body-assessment",
  },
  {
    icon: "/img/icons/5.webp",
    title: "Nutrition Plans",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    leaf: "/img/icons/shape5.png",
    url: "body-assessment",
  },
];

const Goal = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            What is Your Goal?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Use the body assessment tool below to find out exactly what your
            body needs to achieve your transformation goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* Link */}
              <Link
                href={item.url}
                className="text-green-600 font-semibold hover:underline text-sm"
              >
                Find my meal Plan
              </Link>

              {/* Decorative Leaf */}
              <Image
                src={item.leaf}
                alt="Decorative Leaf"
                width={50}
                height={50}
                className="absolute top-4 right-4 opacity-80 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goal;
