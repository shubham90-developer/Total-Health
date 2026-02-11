"use client";
import React, { useState } from "react";
import { FaTags } from "react-icons/fa6";
import CalorieCalculator from "./CalorieCalculator";
import CustomBtn from "@/app/components/CustomBtn";

const TABS = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "diet-specific", label: "Diet Specific" },
];

const MEAL_PLANS = [
  {
    title: "International Meal Plan",
    description:
      "This plan has the widest variety of dishes from global cuisines.",
    tags: ["all", "popular"],
    img: "/img/meal-plans/1.webp",
    offer: "15% off",
    offerTitle: "Best Result",
    Regular: "1,000 - 1,400 kcal",
    Upsized: "1,400 - 1,700 kcal",
    Delivereddaily: ["3 meals", "2 snacks", "2 drinks"],
    Suitablefor: ["Global Tastes", "Weight Maintenance", "Weight Loss"],
    url: "",
  },
  {
    title: "Arabic Meal Plan",
    description:
      "Filled with dishes inspired by popular Middle Eastern cuisines.",
    tags: ["all", "popular", "weight-loss"],
    img: "/img/meal-plans/1.webp",
    offer: "15% off",
    offerTitle: "Best Result",
    Regular: "1,000 - 1,400 kcal",
    Upsized: "1,400 - 1,700 kcal",
    Delivereddaily: ["3 meals", "2 snacks", "2 drinks"],
    Suitablefor: ["Global Tastes", "Weight Maintenance", "Weight Loss"],
    url: "",
  },
  {
    title: "Diabetic Meal Plan",
    description:
      "With delicious, low-GI meals ideal for managing blood glucose.",
    tags: ["all", "popular"],
    img: "/img/meal-plans/1.webp",
    offer: "15% off",
    offerTitle: "Best Result",
    Regular: "1,000 - 1,400 kcal",
    Upsized: "1,400 - 1,700 kcal",
    Delivereddaily: ["3 meals", "2 snacks", "2 drinks"],
    Suitablefor: ["Global Tastes", "Weight Maintenance", "Weight Loss"],
    url: "",
  },
  {
    title: "Pescatarian Meal Plan",
    description:
      "For those on a pescatarian diet with fish and plant-based dishes.",
    tags: ["all", "popular", "weight-loss"],
    img: "/img/meal-plans/1.webp",
    offer: "15% off",
    offerTitle: "Best Result",
    Regular: "1,000 - 1,400 kcal",
    Upsized: "1,400 - 1,700 kcal",
    Delivereddaily: ["3 meals", "2 snacks", "2 drinks"],
    Suitablefor: ["Global Tastes", "Weight Maintenance", "Weight Loss"],
    url: "",
  },
  {
    title: "Vegan Meal Plan",
    description:
      "For those on a vegan diet with plant-based dishes and no meat.",
    tags: ["all", "popular"],
    img: "/img/meal-plans/1.webp",
    offer: "15% off",
    offerTitle: "Best Result",
    Regular: "1,000 - 1,400 kcal",
    Upsized: "1,400 - 1,700 kcal",
    Delivereddaily: ["3 meals", "2 snacks", "2 drinks"],
    Suitablefor: ["Global Tastes", "Weight Maintenance", "Weight Loss"],
    url: "",
  },
  {
    title: "Vegetarian Meal Plan",
    description:
      "For those on a vegetarian diet with plant-based dishes and no meat.",
    tags: ["all", "popular", "diet-specific"],
    img: "/img/meal-plans/1.webp",
    offer: "15% off",
    offerTitle: "Best Result",
    Regular: "1,000 - 1,400 kcal",
    Upsized: "1,400 - 1,700 kcal",
    Delivereddaily: ["3 meals", "2 snacks", "2 drinks"],
    Suitablefor: ["Global Tastes", "Weight Maintenance", "Weight Loss"],
    url: "",
  },
];

const MealPlans = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const filteredPlans = MEAL_PLANS.filter((plan) =>
    plan.tags.includes(selectedTab)
  );

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-10 bg-green-100 justify-center p-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors hover:bg-green-800 hover:text-white cursor-pointer ${
                selectedTab === tab.id
                  ? "bg-[#61844c] text-white "
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Offer banner + calculator */}
        <div className="md:flex block mb-5 justify-between">
          <div className="flex items-center gap-2 mb-4 bg-red-400 p-1 rounded text-white">
            <FaTags />
            <p className="text-xs font-bold">
              LIMITED TIME OFFER: Get 15% OFF Any Meal Plan
            </p>
          </div>
          <div>
            <CalorieCalculator />
          </div>
        </div>

        {/* Meal Plan Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-green-50 rounded-xl p-4  shadow hover:shadow-md transition overflow-hidden"
            >
              {/* Top-left Offer */}
              <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                {plan.offer}
              </div>

              {/* Top-right Ribbon */}
              <div className="absolute top-8 right-0 rotate-45 translate-x-[30%] -translate-y-1/2 bg-green-500 text-white text-[10px] font-semibold px-10 py-1 shadow">
                {plan.offerTitle}
              </div>

              {/* Image */}
              <img
                src={plan.img}
                alt={plan.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Title + Desc */}
              <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{plan.description}</p>

              {/* Calorie Info */}
              <div className="flex gap-2 text-[11px] font-medium mb-2">
                <span className="border border-green-400 text-green-700 px-2 py-0.5 rounded-full">
                  Regular: {plan.Regular}
                </span>
                <span className="border border-blue-400 text-blue-700 px-2 py-0.5 rounded-full">
                  Upsized: {plan.Upsized}
                </span>
              </div>

              {/* Delivered Daily */}
              <p className="text-xs text-gray-500 mb-1">Delivered daily</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {plan.Delivereddaily.map((item, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Suitable For */}
              <p className="text-xs text-gray-500 mb-1">Suitable for:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {plan.Suitablefor.map((item, i) => (
                  <span
                    key={i}
                    className="border border-gray-300 text-gray-700 text-[11px] px-2 py-0.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <CustomBtn
                  href="meal-plans/customise-meal-plan"
                  className="py-2 px-5"
                >
                  Customise your plan
                </CustomBtn>
                <CustomBtn href="meal-plans/sample-menu" className="py-2 px-5">
                  Sample Menu
                </CustomBtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealPlans;
