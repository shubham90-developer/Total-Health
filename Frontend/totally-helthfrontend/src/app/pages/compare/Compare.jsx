import React from "react";
import Image from "next/image";
import { FaCheck, FaTimes } from "react-icons/fa";
import CustomBtn from "@/app/components/CustomBtn";

const features = [
  "9 Customisable Meal Plans",
  "More than 800 Dishes",
  "Expert Nutrition Team",
  "Optimised for Weight Loss",
  "Choose Every Meal",
  "Nutritionist Consultation",
  "Unlimited Menu Changes",
];

const Compare = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Left Table */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Let's Compare
            </h2>

            <table className="min-w-full border-separate border-spacing-y-4">
              <thead>
                <tr>
                  <th className="text-left text-sm font-semibold text-gray-500">
                    INCLUDED
                  </th>
                  <th className="bg-green-300 text-black text-xs font-bold px-6 py-3 rounded-t-md">
                    TOTALLY HEALTH MEAL PLANS
                  </th>
                  <th className="text-xs font-semibold text-gray-500 px-4 py-2">
                    OTHER MEAL PLANS
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={`feature-${idx}`}
                    className="border-t border-gray-300"
                  >
                    <td className="text-sm text-gray-700 py-3">{feature}</td>
                    <td className="text-center bg-green-100">
                      {/* Render icons safely */}
                      <FaCheck
                        className="text-green-500 inline-block"
                        aria-hidden
                      />
                    </td>
                    <td className="text-center">
                      <FaTimes
                        className="text-gray-400 inline-block"
                        aria-hidden
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px]">
            <Image
              src="/img/compare/2.jpg"
              alt="Meal Kit"
              fill
              priority
              className="object-cover rounded-xl shadow-lg"
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/img/compare/1.webp"
                alt="Meal Tray"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Animated Shape */}
        <div className="absolute left-4 top-12 z-0 pointer-events-none">
          <Image
            src="/img/hero/shape2.png"
            alt="Animated Shape"
            width={40}
            height={40}
            className="motion-safe:animate-pulse opacity-30"
          />
        </div>
      </div>
    </section>
  );
};

export default Compare;
