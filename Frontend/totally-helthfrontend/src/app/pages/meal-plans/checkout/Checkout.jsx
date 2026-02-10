"use client";

import CustomBtn from "@/app/components/CustomBtn";
import React, { useState } from "react";
import ConsultationForm from "./ConsultationForm";
import DeliveryLocationForm from "./DeliveryLocationForm";
import PlanStartDate from "./PlanStartDate";

const Checkout = () => {
  const [authMode, setAuthMode] = useState("register"); // or "signin"
  return (
    <section className="py-16 bg-[#f8fdfa]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Checkout Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Checkout</h2>
              <span className="text-green-600 font-medium text-xs bg-green-100 px-3   py-2">
                Completed
              </span>
            </div>

            {/* Plan Details */}
            <div className="bg-[#e4f5f0] p-3 rounded-lg text-sm flex gap-2">
              <strong>Plan details:</strong> <br />
              <p className="border rounded-full px-2 py-1 text-xs pr-2 bg-green-400 text-white">
                8 Weeks
              </p>
              <p className="border rounded-full px-2 py-1 text-xs pr-2 bg-green-400 text-white">
                {" "}
                6 Days{" "}
              </p>
              <p className="border rounded-full px-2 py-1 text-xs pr-2 bg-green-400 text-white">
                {" "}
                3 Meals{" "}
              </p>
              <p className="border rounded-full px-2 py-1 text-xs pr-2 bg-green-400 text-white">
                {" "}
                2 Snacks{" "}
              </p>
            </div>

            {/* Account Register / Sign In */}
            <div className="space-y-3 border border-dotted p-3 shadow rounded-md">
              {/* Toggle Buttons */}
              <div className="flex mb-3">
                <button
                  className={`flex-1 py-2 rounded-l-md font-medium transition ${
                    authMode === "register"
                      ? "bg-[#61844c] text-white"
                      : "bg-[#e0e0e0] text-gray-600"
                  }`}
                  onClick={() => setAuthMode("register")}
                >
                  Register
                </button>
                <button
                  className={`flex-1 py-2 rounded-r-md font-medium transition ${
                    authMode === "signin"
                      ? "bg-[#61844c] text-white"
                      : "bg-[#e0e0e0] text-gray-600"
                  }`}
                  onClick={() => setAuthMode("signin")}
                >
                  Sign In
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {authMode === "register" && (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="input"
                    />
                    <input
                      type="tel"
                      placeholder="+971 | Phone Number"
                      className="input"
                    />
                  </>
                )}
                <input type="email" placeholder="Email" className="input" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                />
              </div>

              {/* Confirm Button */}
              <div className="text-right">
                <CustomBtn className="py-2 px-3 mt-3">
                  {authMode === "register" ? "Register" : "Sign In"}
                </CustomBtn>
              </div>
            </div>
            {/* Optional Steps */}
            <div className="space-y-3 border border-dotted p-3 shadow rounded-md">
              <ConsultationForm />
            </div>
            <div className="space-y-3 border border-dotted p-3 shadow rounded-md">
              <DeliveryLocationForm />
            </div>
            <div className="space-y-3 border border-dotted p-3 shadow rounded-md">
              <PlanStartDate />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">Diabetic Meal Plan</p>
              <p>8 weeks (6 days per week)</p>
              <p>3 meals & 2 snacks per day</p>
            </div>

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>8 Weeks + 4 Weeks Free</span>
                <span className="text-red-500 font-medium">AED 0.00</span>
              </div>
              <p className="text-green-600 text-xs">FREE Four weeks</p>

              <div className="flex justify-between">
                <span>Daily Delivery</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Bag Deposit (Refundable)</span>
                <span className="text-gray-800">+ AED 250.00</span>
              </div>

              <div className="flex justify-between">
                <span>VAT (5%) Amount</span>
                <span className="text-gray-800">AED 357.14</span>
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Referral Code"
                className="input"
              />
              <CustomBtn className="px-4 py-2">Apply</CustomBtn>
            </div>

            <div className="bg-[#fdecea] p-3 rounded-md border border-red-200 text-sm">
              <span className="text-red-600 font-medium">
                Summer 2025 - 15%
              </span>
            </div>

            <div className="bg-[#e8f5e9] p-3 rounded-md border border-green-200 text-sm text-green-700">
              8 Weeks + 4 Weeks Free
              <br />
              <span className="text-xs text-gray-600">
                You’re saving 33% off!
              </span>
            </div>

            {/* Bottom Summary Section */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-[#f5fafa] p-4 rounded-md mt-4">
              <div className="text-sm text-gray-700">
                <p className="font-semibold">
                  Weekly:{" "}
                  <span className="line-through text-gray-400 mr-1">
                    AED 969
                  </span>
                  <span className="text-red-600">AED 646</span>
                </p>
                <p className="font-semibold mt-1">
                  TOTAL: <span className="text-black">AED 7,750</span>
                </p>
              </div>

              <button
                disabled
                className="bg-gray-200 text-gray-400 px-6 py-3 rounded-md font-semibold mt-4 md:mt-0 cursor-not-allowed"
              >
                Add payment method
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info Strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 text-center gap-4 text-sm text-gray-600">
          <div>
            <p className="text-xl font-semibold text-black">4.9+</p>
            <p>1,012+ Ratings</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-black">5000+</p>
            <p>Subscriptions</p>
          </div>
          <div>Trusted by 10,000+ customers across the UAE since 2013</div>
          <div className="flex justify-center items-center gap-3">
            <img src="/img/iso-22000.webp" alt="ISO" className="h-8" />
            <img src="/img/urs-haccp.webp" alt="GCC" className="h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
