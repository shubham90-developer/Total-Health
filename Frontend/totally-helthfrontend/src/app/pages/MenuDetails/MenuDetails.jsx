"use client";

import CustomBtn from "@/app/components/CustomBtn";
import Image from "next/image";
import React, { useState } from "react";

const MenuDetails = () => {
  const [quantity, setQuantity] = useState(1); // Step 1

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Step 3

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image Section */}
          <div>
            <Image
              src="/img/Restaurants/10.jpg"
              alt="Feel Good Combo"
              width={1000}
              height={1000}
              className="rounded-xl object-cover w-full h-auto shadow-md"
            />
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Feel Good Combo (Non-veg) - AED 79
              </h2>
              <p className="text-gray-600 mt-2">
                Select your favourite bowl, pair it with a refreshing drink of
                your choice, and treat yourself with a guilt-free dessert.
              </p>
              <p className="text-sm text-gray-500">
                For allergens and macros, kindly check the information for each
                individual dish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 text-xs">
                <option value="">Your choice of Non-Veg Bowl</option>
                <option value="1380">Sweet Chilli Chicken Bowl</option>
                <option value="1381">Power Chicken Bowl</option>
                <option value="1382">Tokyo Chicken Bowl</option>
                <option value="1383">Chipotle Chicken Bowl</option>
                <option value="1384">Beef Bibimbap</option>
              </select>

              <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 text-xs">
                <option value="">Select your free side</option>
                <option value="-1">No Rice</option>
                <option value="781">Brown Rice</option>
                <option value="17">House Green Salad</option>
                <option value="1115">Low Carb Cauli Rice</option>
              </select>

              <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 text-xs">
                <option value="">Your choice of Dessert</option>
                <option value="1298">Protein Cheesecake Cup</option>
                <option value="1385">Red Velvet Cake</option>
                <option value="1173">Kunafa Cheesecake</option>
                <option value="841">Dark Chocolate Mousse</option>
                <option value="1195">Power Up Peanut Bar</option>
                <option value="1193">Peanut Butter & Jam Cheesecake</option>
                <option value="1104">Salted Tahini Caramel Bar</option>
                <option value="1105">Tahini Brownie</option>
                <option value="1192">Nutty Avocado Brownie</option>
                <option value="1194">Fresh Fruit Salad</option>
              </select>

              <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 text-xs">
                <option value="">Your choice of Drink</option>
                <option value="1363">Black Lemonade</option>
                <option value="1364">Pink Lemonade</option>
                <option value="1365">Green Goodness</option>
                <option value="1366">Orange</option>
                <option value="1337">Watermelon</option>
              </select>
            </div>

            {/* Price and Quantity */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-gray-800">
                AED {79 * quantity}.00
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQty}
                  className="border text-black border-gray-300 text-xl w-10 h-10 rounded hover:bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg text-black font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="border border-gray-300 text-black text-xl w-10 h-10 rounded hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>

              <CustomBtn href="cart" className="block py-2 px-4">
                Add to Cart
              </CustomBtn>
            </div>
          </div>
        </div>

        {/* Nutrition Facts */}
        <div className="mt-16 border-t pt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Nutrition Facts
          </h3>

          <ul className="space-y-6 text-sm md:text-base">
            {[
              {
                name: "House Green Salad",
                kcal: 126,
                fat: "1.1g",
                carbs: "6.6g",
                protein: "1.2g",
                allergens: "DAIRY",
              },
              {
                name: "Brown Rice",
                kcal: 123,
                fat: "1g",
                carbs: "25.5g",
                protein: "2.7g",
                allergens: "",
              },
              {
                name: "Dark Chocolate Mousse",
                kcal: 250,
                fat: "13.2g",
                carbs: "14g",
                protein: "2.8g",
                allergens: "GLUTEN, SOY, DAIRY",
              },
              {
                name: "Salted Tahini Caramel Bar",
                kcal: 308,
                fat: "33.2g",
                carbs: "9.6g",
                protein: "8.1g",
                allergens: "TREE NUTS, SESAME, DAIRY",
              },
              {
                name: "Tahini Brownie",
                kcal: 295,
                fat: "15.1g",
                carbs: "17.3g",
                protein: "5.4g",
                allergens: "SESAME, EGG",
              },
              {
                name: "Peanut Butter & Jam Cheesecake",
                kcal: 329,
                fat: "13.6g",
                carbs: "17.3g",
                protein: "6.2g",
                allergens: "GLUTEN, PEANUTS, TREE NUTS, DAIRY, SOY BEAN",
              },
              {
                name: "Power Up Peanut Bar",
                kcal: 398,
                fat: "18.7g",
                carbs: "15g",
                protein: "9.1g",
                allergens: "GLUTEN, PEANUTS, TREE NUTS, SOY BEAN",
              },
              {
                name: "Protein Cheesecake Cup",
                kcal: 308,
                fat: "14.6g",
                carbs: "11.5g",
                protein: "18.9g",
                allergens: "TREE NUTS, DAIRY",
              },
              {
                name: "Sweet Chili Chicken Bowl",
                kcal: 433,
                fat: "10.1g",
                carbs: "26g",
                protein: "42.9g",
                allergens: "SESAME, SOY BEAN",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="text-gray-700 leading-relaxed bg-green-50 grid grid-cols-2 gap-4 p-4"
              >
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p>
                  Kcal: {item.kcal}, Fat: {item.fat}, Carbs: {item.carbs}, Pro:{" "}
                  {item.protein}
                </p>
                {item.allergens && (
                  <p className="text-red-700 font-semibold uppercase">
                    ALLERGENS: {item.allergens}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MenuDetails;
