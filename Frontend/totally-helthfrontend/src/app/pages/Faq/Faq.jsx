"use client";
import Image from "next/image";
import { useState } from "react";

import React from "react";
import { useGetFaqQuery } from "../../../../store/faq/faqApi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const { data: faq, isLoading, isError } = useGetFaqQuery();
  const faqs = faq?.data || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-[#f8f5f0]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb Skeleton */}
          <div className="mb-12 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>

          {/* Content Card Skeleton */}
          <div className="bg-white shadow-sm p-6 animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>

            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 text-center">
        <p className="text-red-500">Error loading FAQs</p>
      </section>
    );
  }

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <>
      <section
        className="py-16"
        style={{
          backgroundImage: "url('/img/pricing/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-6xl mx-auto  px-4">
          <h3 className="text-2xl font-medium mb-4">
            Frequently Asked Questions
          </h3>
          <p className=" font-medium text-sm">
            Here, you can find out everything you need to know about Totally
            HealthyMeal Plans. If you have any other questions, you can contact
            us here or call 800-39872.
          </p>
        </div>
      </section>
      <section className="bg-[#f8f5f0] py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid  md:grid-cols-[1fr_2fr] grid-cols-1 gap-12">
            <div className="bg-white shadow-sm p-3">
              <Image src="/img/faq.jpg" alt="faq" width={500} height={500} />
            </div>
            <div className="">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200  bg-white shadow-xs"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-4  tracking-wider font-bold text-sm cursor-pointer text-gray-800 hover:text-[#aa8453] transition flex justify-between items-center"
                    >
                      {faq.question}
                      <span className="ml-2 text-xl">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>

                    {openIndex === index && (
                      <div className="px-4 pb-4 text-xs leading-loose  text-gray-500 tracking-widest">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
