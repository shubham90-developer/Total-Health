"use client";

import React from "react";
import { useGetTermsConditionsQuery } from "../../../../store/termsConditions/termsConditionsApi";

const TermsConditions = () => {
  const {
    data: termsConditions,
    isLoading,
    isError,
  } = useGetTermsConditionsQuery();

  const termsData = termsConditions?.data || {};

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse h-40 bg-gray-200 rounded" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 text-center">
        <p className="text-red-500">Error loading Terms & Conditions</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f8f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Terms & Conditions
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> / Terms & Conditions
          </p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm p-8 prose max-w-none">
          <div
            className="text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: termsData?.content || "",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
