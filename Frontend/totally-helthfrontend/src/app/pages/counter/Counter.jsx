"use client";
import React from "react";
import { FaStar, FaBellConcierge, FaUsers } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { useGetCounterQuery } from "../../../../store/counter/counterApi";

const Counter = () => {
  const { data: counter, isLoading, isError } = useGetCounterQuery();
  const count = counter?.data;
  console.log(count);
  const stats = [
    {
      icon: FaStar,
      number: `${count?.totalReviews}`,
      label: "Reviews",
    },
    {
      icon: FaBellConcierge,
      number: `${count?.totalMealItems}`,
      label: "Meal Items",
    },
    {
      icon: FaSmile,
      number: `${count?.happyClients}`,
      label: "Happy Clients",
    },
    {
      icon: FaUsers,
      number: `${count?.yearsHelpingPeople}`,
      label: "Years Helping People",
    },
  ];
  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-10 bg-green-50 border border-green-100 animate-pulse">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200 text-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="px-4 py-6">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return null;

  return (
    <section className="py-10 bg-green-50 border border-green-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="px-4 py-6">
                <div className="flex flex-col items-center">
                  <Icon className="text-2xl text-green-700 mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counter;
