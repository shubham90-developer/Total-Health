"use client";
import Image from "next/image";
import React from "react";

const OurFood = () => {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-teal-500 font-semibold mb-2">
            Improve your health
          </p>
          <h2 className="text-3xl font-bold mb-4 text-black">Our Food</h2>
          <p className="text-gray-700 mb-4 text-sm">
            Our menu is an encyclopedia of international flavours, filled with
            calorie-controlled dishes, inspired by our multicultural hometown of
            Dubai. Our mission is to make the world a better place through
            wholesome, tasty food and outstanding service.
          </p>
          <p className="text-gray-700 text-sm">
            With recipes conceptualised by our expert nutrition team and cooked
            up by talented chefs, using only the freshest ingredients in our
            HACCAP and ISO 22000 certified kitchen, we strive to deliver
            high-quality meals 365 days a year.
          </p>
          {/* Logos */}
          <div className="flex gap-4 mt-6">
            <Image
              src="/img/about/2.webp"
              alt="ISO 22000"
              width={60}
              height={60}
            />
            <Image
              src="/img/about/3.webp"
              alt="HACCP Certified"
              width={60}
              height={60}
            />
          </div>
        </div>

        {/* Right Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/img/about/1.jpg"
              alt="Eating Food"
              width={400}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src="/img/about/2.jpg"
              alt="Food Platter"
              width={300}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src="/img/about/3.jpg"
              alt="Taste Box"
              width={300}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurFood;
