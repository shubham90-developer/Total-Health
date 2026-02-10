"use client";
import React from "react";
import { FaStar, FaBellConcierge, FaUsers } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";

const stats = [
  {
    icon: FaStar,
    number: "1,012+",
    label: "Reviews",
  },
  {
    icon: FaBellConcierge,
    number: "2,000+",
    label: "Meal Items",
  },
  {
    icon: FaSmile,
    number: "300,000+",
    label: "Happy Clients",
  },
  {
    icon: FaUsers,
    number: "15+",
    label: "Years Helping People",
  },
];

const Counter = () => {
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
