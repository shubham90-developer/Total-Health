"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetGoalsQuery } from "../../../../store/goal/goalApi";

const Goal = () => {
  const { data: goalData, isLoading, isError } = useGetGoalsQuery();

  const goalInfo = goalData?.data?.sections || [];

  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 animate-pulse">
          {/* Heading Skeleton */}
          <div className="text-center mb-12 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Card Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                </div>

                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>

                <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
              </div>
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
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {goalData?.data?.title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {goalData?.data?.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalInfo.map((item, index) => (
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
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              {/* Link */}
              <Link
                href="/meal-plans"
                className="text-green-600 font-semibold hover:underline text-sm"
              >
                Find my meal Plan
              </Link>

              {/* Decorative Leaf */}
              <Image
                src="/img/hero/shape5.webp"
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
