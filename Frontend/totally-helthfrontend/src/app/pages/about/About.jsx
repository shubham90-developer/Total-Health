import React from "react";
import { FaDumbbell, FaLeaf } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import Image from "next/image"; // only for Next.js
import CustomBtn from "@/app/components/CustomBtn";

const About = () => {
  return (
    <section className="relative bg-white py-16 px-6 md:px-16 overflow-hidden">
      {/* Floating Leaves */}
      <div className="absolute left-2 top-1/4 animate-pulse z-0">
        <Image
          src="/img/hero/shape2.png"
          alt="shape"
          width={10}
          height={10}
          className="w-10 h-10 animate-pulse"
        />
      </div>
      <div className="absolute left-8 bottom-4 animate-bounce z-0">
        <Image
          src="/img/hero/shape4.png"
          alt="shape"
          width={50}
          height={50}
          className="w-16 h-16 animate-pulse"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="md:w-1/2 w-full mb-10 md:mb-0 md:pr-8">
          <p className="text-green-700 font-semibold mb-2">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Change Your Life in the next <br /> 90 Days of Practice
          </h2>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            , Totally Healthyhas transformed healthy eating in the UAE. We’ve
            created a destination where simple, nutritious, and wholesome food
            is accessible to everyone. At Totally healthy, we believe the
            choices we make about what we eat and how it’s prepared should
            empower healthier lifestyles.
          </p>

          {/* Two Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#61844c] text-white p-3 rounded-full">
                <GiMeal className="text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-2 text-gray-800">
                  Personalized Nutrition Plan
                </h4>
                <p className="text-gray-600 text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-[#61844c] text-white p-3 rounded-full">
                <FaDumbbell className="text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-2 text-gray-800">
                  Personalized Exercises Plan
                </h4>
                <p className="text-gray-600 text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center relative">
          <Image
            src="/img/about/1.png"
            alt="Yoga Illustration"
            width={500}
            height={400}
            className="w-full h-auto max-w-md animate-pulse"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
