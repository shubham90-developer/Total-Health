"use client";
import React from "react";
import Image from "next/image";
import { useGetMealPlanWorkQuery } from "../../../../store/mealPlanWork/mealPlanWorkApi";

const HowItWorks = () => {
  const { data: mealPlanWork, isLoading, isError } = useGetMealPlanWorkQuery();

  const sectionData = mealPlanWork?.data || {};
  console.log(sectionData);
  const steps = [
    sectionData?.step1,
    sectionData?.step2,
    sectionData?.step3,
  ].filter(Boolean);

  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-16 bg-white animate-pulse">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <div className="h-8 bg-gray-300 w-1/3 mx-auto rounded"></div>
          <div className="h-4 bg-gray-300 w-1/2 mx-auto rounded"></div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  /* ---------------- Actual Content ---------------- */

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {sectionData?.title || "How It Works"}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {sectionData?.subtitle}
          </p>
        </div>

        <div className="md:flex items-start justify-between gap-10">
          {/* Steps */}
          <div className="w-full md:w-1/2 space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-green-50 p-5 rounded-md shadow-sm"
              >
                <div
                  className="min-w-[64px] min-h-[64px] flex items-center justify-center text-white text-xl font-bold bg-no-repeat bg-center bg-contain"
                  style={{
                    backgroundImage: "url(/img/howwork/1.png)",
                  }}
                >
                  {index + 1}
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-1">
                    {step?.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step?.subTitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex items-center justify-center">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={sectionData?.mainImage || "/img/howwork/2.jpg"}
                alt="How It Works"
                fill
                className="object-cover rounded-xl"
              />

              <div className="absolute -bottom-0 -right-0 w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl">
                <Image
                  src={sectionData?.overlayImage || "/img/howwork/3.png"}
                  alt="Overlay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
