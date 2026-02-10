import Image from "next/image";
import React from "react";
import { FaMoon, FaTh, FaThermometer } from "react-icons/fa";

const Benefits = () => {
  return (
    <>
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Unbeatable benefits
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get full control over your activity and nutrition data in one
              place with our brand-new fitness tracker.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white">
            {/* Card 1 */}
            <div className="rounded-xl border border-teal-100 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Automatic meal tracking</h2>
              </div>
              <Image
                src="/img/features/2.webp"
                width={40}
                height={40}
                alt="Heart rate"
              />
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-teal-100 p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Heart rate monitoring</h2>
              <Image
                src="/img/features/3.gif"
                width={40}
                height={40}
                alt="Heart rate"
              />
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-teal-100 p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Sleep quality measuring</h2>
              <FaMoon />
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-teal-100 p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Step counting</h2>
              <Image
                src="/img/features/4.gif"
                width={32}
                height={32}
                alt="Running"
              />
            </div>

            {/* Card 5 */}
            <div className="rounded-xl border border-teal-100 p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Temperature capturing</h2>
              <FaThermometer className="text-yellow-600" />
            </div>

            {/* Card 6 */}
            <div className="rounded-xl border border-teal-100 p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">
                Ultimate control of activity and nutrition
              </h2>
              <Image
                src="/img/features/5.gif"
                width={64}
                height={32}
                alt="Control"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
