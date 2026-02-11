"use client";

import React from "react";
import { useGetPrivacyPolicyQuery } from "../../../../store/privacyPolicy/privacyPolicy";

const PrivacyPolicy = () => {
  const {
    data: privacyPolicy,
    isLoading,
    isError,
  } = useGetPrivacyPolicyQuery();

  const privacyData = privacyPolicy?.data || {};
  console.log(privacyData);

  if (isLoading)
    return <div className="animate-pulse h-40 bg-gray-200 rounded" />;

  if (isError) return <p>Error loading privacy policy</p>;

  return (
    <section className="py-16 bg-[#f8f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Privacy Policy
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> /{" "}
            <span>Privacy Policy</span>
          </p>
        </div>
        <div className="bg-white shadow-sm p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line ">
            Privacy Policy
          </h3>
          <div
            className="text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: privacyData?.content || "",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
