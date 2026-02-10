"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaTags } from "react-icons/fa6";
import CalorieCalculator from "../CalorieCalculator";
import Link from "next/link";
import CustomBtn from "@/app/components/CustomBtn";

const images = [
  "/img/meal-plans/1.webp",
  "/img/meal-plans/2.webp",
  "/img/meal-plans/3.webp",
  "/img/meal-plans/4.webp",
];

const CustomiseMealPlan = () => {
  const [calorieOption, setCalorieOption] = useState("regular");
  const [days, setDays] = useState(5);
  const [weeks, setWeeks] = useState(8);
  const [allergy, setAllergy] = useState(false);
  const [nutritionist, setNutritionist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Images and Info */}
          <div>
            {/* Main Image */}
            <div className="border rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedImage}
                alt="Selected Meal"
                width={600}
                height={400}
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto mb-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 border rounded overflow-hidden cursor-pointer ${
                    selectedImage === img ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Meals & Snacks Info */}
            <div className="text-sm text-gray-700 flex gap-2">
              <p className="border border-gray-300 rounded-full px-3 py-1 bg-green-50">
                3 Meals
              </p>
              <p className="border border-gray-300 rounded-full px-3 py-1 bg-green-50">
                2 Snacks
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Options */}
          <div>
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

            {/* Header + Sample Menu */}
            <div className="flex justify-between">
              <h2 className="text-lg font-bold mb-1">Selected Meal Plan</h2>
              <Link
                href="/meal-plans/sample-menu"
                className="text-sm font-medium text-green-600 mb-3 underline cursor-pointer"
              >
                Sample Menu
              </Link>
            </div>

            {/* Plan Dropdown */}
            <div className="mb-4">
              <select className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 rounded p-2 text-xs">
                <option>International Meal Plan</option>
                <option>Domestic Meal Plan</option>
                <option>Vegan Meal Plan</option>
                <option>Gluten Free Meal Plan</option>
                <option>Keto Meal Plan</option>
                <option>Paleo Meal Plan</option>
                <option>Pescatarian Meal Plan</option>
                <option>Vegetarian Meal Plan</option>
                <option>Dairy Free Meal Plan</option>
                <option>Low Carb Meal Plan</option>
                <option>Low Sodium Meal Plan</option>
                <option>Low Sugar Meal Plan</option>
              </select>
            </div>

            {/* Calories */}
            <p className="text-sm font-semibold mb-2">Calories per day</p>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setCalorieOption("regular")}
                className={`px-3 py-2 text-sm border rounded ${
                  calorieOption === "regular"
                    ? "bg-green-100 border-green-500"
                    : ""
                }`}
              >
                1,000 - 1,400
                <br />
                <span className="text-xs text-gray-500">calories/day</span>
              </button>
              <button
                onClick={() => setCalorieOption("extra")}
                className={`px-3 py-2 text-sm border rounded ${
                  calorieOption === "extra"
                    ? "bg-green-100 border-green-500"
                    : ""
                }`}
              >
                1,400 - 1,700
                <br />
                <span className="text-xs text-gray-500">calories/day</span>
              </button>
            </div>

            {/* Days */}
            <p className="text-sm font-semibold mb-1">Days per week?</p>
            <div className="flex gap-2 mb-4">
              {[5, 6, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-4 py-1 text-sm rounded border ${
                    days === d ? "bg-green-100" : ""
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>

            {/* Weeks */}
            <p className="text-sm font-semibold mb-1">How many weeks?</p>
            <div className="flex gap-2 flex-wrap mb-3">
              {[4, 8, 12].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeeks(w)}
                  className={`px-4 py-1 text-xs rounded border ${
                    weeks === w ? "bg-green-100" : ""
                  }`}
                >
                  {w === 4
                    ? "15% OFF"
                    : w === 8
                    ? "4 Free Weeks"
                    : "Best results"}
                  <br />
                  <span className="font-semibold text-sm">{w} weeks</span>
                </button>
              ))}
            </div>

            {/* Promo Code */}
            <p className="text-sm font-semibold mb-1">Available Promo Codes</p>
            <div className="text-xs text-red-600 font-medium mb-2">
              🎁 Summer 2025 - 15%
            </div>
            <div className="bg-green-100 border border-green-300 p-2 rounded text-xs mb-4">
              ✅ 8 Weeks + 4 Weeks Free <br />
              <span className="text-green-700 font-medium">
                You’re saving 33% off!
              </span>
            </div>

            {/* Allergy + Nutritionist */}
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold mb-1">
                  Do you have any allergies?
                </p>
                <div className="flex gap-4 mb-4">
                  <label>
                    <input
                      type="radio"
                      name="allergy"
                      checked={!allergy}
                      onChange={() => setAllergy(false)}
                    />{" "}
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="allergy"
                      checked={allergy}
                      onChange={() => setAllergy(true)}
                    />{" "}
                    Yes
                  </label>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">
                  Would you like to meet with a nutritionist?
                </p>
                <div className="flex gap-4 mb-6">
                  <label>
                    <input
                      type="radio"
                      name="nutritionist"
                      checked={!nutritionist}
                      onChange={() => setNutritionist(false)}
                    />{" "}
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="nutritionist"
                      checked={nutritionist}
                      onChange={() => setNutritionist(true)}
                    />{" "}
                    Yes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 border-t pt-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm p-3">
          <div className="text-sm text-gray-700">
            <p>
              Weekly:{" "}
              <span className="line-through text-gray-400">AED 780</span>{" "}
              <span className="text-red-600 font-bold">AED 625</span>
            </p>
            <p className="font-semibold">TOTAL: AED 7,500</p>
          </div>
          <CustomBtn href="checkout" className="py-2 px-3">
            Get my plan
          </CustomBtn>
        </div>
      </div>
    </section>
  );
};

export default CustomiseMealPlan;
