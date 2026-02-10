"use client";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import React from "react";
import { useGetWhyChooseUsQuery } from "../../../../store/whyChoose/whyChooseApi";

const WhyChoose = () => {
  const { data: whychoose, isLoading, isError } = useGetWhyChooseUsQuery();

  const whychooseus = whychoose?.data || {};

  // ✅ Create dynamic cards array
  const cards = [
    whychooseus?.card1,
    whychooseus?.card2,
    whychooseus?.card3,
  ].filter(Boolean);

  /* ---------------- Skeleton ---------------- */
  if (isLoading) {
    return (
      <section className="py-16 bg-green-50 animate-pulse">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="h-8 bg-gray-300 w-1/3 mx-auto rounded"></div>
          <div className="h-4 bg-gray-300 w-1/2 mx-auto rounded"></div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl space-y-4">
                <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
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
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {whychooseus?.title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {whychooseus?.subTitle}
          </p>
        </div>

        {/* Dynamic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 border border-green-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={card?.icon}
                  alt={card?.title}
                  width={36}
                  height={36}
                />
                <h4 className="text-xl font-bold text-gray-900">
                  {card?.title}
                </h4>
              </div>

              <ul className="space-y-2 mt-4">
                {card?.items?.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-800"
                  >
                    <FaCheck className="text-green-500 mt-1" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
