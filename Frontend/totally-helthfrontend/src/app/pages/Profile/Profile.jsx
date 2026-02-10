"use client";

import CustomBtn from "@/app/components/CustomBtn";
import Link from "next/link";
import React, { useState } from "react";
import PlanStartDate from "../meal-plans/checkout/PlanStartDate";
import Image from "next/image";

const tabs = [
  "Profile",
  "Change Password",
  "My Meal Plan",
  "My Orders",
  "Logout",
];

const mockCartItems = [
  {
    id: 1,
    title: "Sweet Chili Chicken Bowl",
    price: 52,
    quantity: 2,
    img: "/img/Restaurants/3.jpg",
  },
  {
    id: 2,
    title: "Power Chicken Bowl",
    price: 49,
    quantity: 1,
    img: "/img/Restaurants/4.jpg",
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <form className="space-y-10 p-6">
            {/* Personal Details */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name*"
                  className="input"
                  defaultValue="John"
                />
                <input
                  type="text"
                  placeholder="Last name*"
                  className="input"
                  defaultValue="Doe"
                />
                <input
                  type="email"
                  placeholder="Email address*"
                  className="input"
                  defaultValue="john@example.com"
                />
                <input
                  type="password"
                  placeholder="Password*"
                  className="input"
                  defaultValue="********"
                />
                <select
                  className="input border border-gray-300 rounded-lg text-sm"
                  defaultValue="Male"
                >
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <input
                  type="tel"
                  placeholder="Home/Office telephone*"
                  className="input"
                  defaultValue="+971-123456789"
                />
                <div className="md:col-span-2">
                  <label htmlFor="dob" className="block text-sm mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="input w-full"
                    defaultValue="1990-01-01"
                  />
                </div>
              </div>
            </section>

            {/* Optional Info */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                We'd love to get to know you better (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nationality"
                  className="input"
                  defaultValue="Indian"
                />
                <input
                  type="text"
                  placeholder="Your industry"
                  className="input"
                  defaultValue="IT Services"
                />
              </div>
            </section>

            {/* Delivery Address */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
              <div className="flex gap-6 mb-4">
                {["Home", "Work", "Other"].map((label) => (
                  <label
                    key={label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked={label === "Home"}
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Street name/number"
                  className="input"
                  defaultValue="Main Street 123"
                />
                <input
                  type="text"
                  placeholder="Suite/Building name"
                  className="input"
                  defaultValue="Apt 4B"
                />
                <input
                  type="text"
                  placeholder="Villa/Flat/Office number"
                  className="input"
                  defaultValue="12C"
                />
                <input
                  type="text"
                  placeholder="Landmark"
                  className="input"
                  defaultValue="Near Central Park"
                />
              </div>
            </section>

            {/* Delivery Selection */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Delivery</h3>
              <div className="flex gap-6 mb-4">
                {["Abu Dhabi", "Dubai", "Al Ain"].map((city) => (
                  <label key={city} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="city"
                      defaultChecked={city === "Dubai"}
                    />
                    {city}
                  </label>
                ))}
              </div>
              <select
                className="input border border-gray-300 rounded-lg text-sm py-2 px-4"
                defaultValue="Downtown"
              >
                <option value="Downtown">Downtown</option>
                <option value="JLT">JLT</option>
                <option value="Deira">Deira</option>
              </select>
            </section>

            {/* Submit */}
            <div className="text-center">
              <CustomBtn type="submit" className="py-2 px-4 block">
                Update
              </CustomBtn>
            </div>
          </form>
        );

      case "Change Password":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
              <input
                type="password"
                placeholder="Current Password"
                className="input"
              />
              <input
                type="password"
                placeholder="New Password"
                className="input"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="input"
              />
            </div>
            <div className="mt-5">
              <CustomBtn className="py-2 px-4 block">Update Password</CustomBtn>
            </div>
          </div>
        );

      case "My Meal Plan":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">My Meal Plan</h3>
            {/* Plan Details */}
            <div className="bg-[#e4f5f0] p-3 rounded-lg text-sm flex gap-2 mb-5">
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
            <PlanStartDate />
          </div>
        );

      case "My Orders":
        return (
          <div className="p-6 ">
            <h3 className="text-lg font-semibold mb-4">My Orders</h3>
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {mockCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center border border-gray-200 bg-green-50 rounded-lg p-4 shadow-sm"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-24 h-24"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Price: AED {item.price} × {item.quantity}
                    </p>
                    <p>Your choice of Non-Veg Bowl:</p>
                    <ul className="text-xs font-medium list-disc mx-7">
                      <li>Sweet Chili Chicken Bowl</li>
                      <li>No Rice</li>
                      <li>Protien Cheesecake cup</li>
                      <li>Black Lemonade</li>
                    </ul>
                  </div>
                  <p className="text-right font-bold text-gray-700">
                    AED {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "Logout":
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h3>
            <CustomBtn href="login" className="py-2 px-4 block">
              Logout
            </CustomBtn>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="py-16 bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-200 text-black text-center py-4 px-6">
          <h2 className="text-xl font-semibold">
            Welcome! Manage Your Account
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm py-3 px-4 text-center cursor-pointer ${
                activeTab === tab
                  ? "bg-green-100 font-semibold border-b-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
