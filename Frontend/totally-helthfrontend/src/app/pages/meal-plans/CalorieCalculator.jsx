"use client";
import React, { useState } from "react";
import CustomBtn from "@/app/components/CustomBtn";

const CalorieCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [activityIndex, setActivityIndex] = useState(1);
  const [resultOpen, setResultOpen] = useState(false);
  const [calories, setCalories] = useState(null);

  const activityLevels = [
    "Sedentary",
    "Lightly Active",
    "Active",
    "Very Active",
    "Extremely Active",
  ];

  const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9];

  const handleCalculate = () => {
    if (!dob || !weight || !height) return;

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    const weightKg =
      weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.4536;
    const heightCm =
      heightUnit === "cm" ? parseFloat(height) : parseFloat(height) * 30.48;

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const activityMultiplier = activityMultipliers[activityIndex];
    const maintenance = Math.round(bmr * activityMultiplier);

    setCalories({
      age,
      heightCm: Math.round(heightCm),
      weightKg: Math.round(weightKg),
      activity: activityLevels[activityIndex],
      loss: maintenance - 400,
      maintain: maintenance,
      gain: maintenance + 500,
    });

    setResultOpen(true);
  };

  return (
    <>
      {/* Trigger */}
      <p className="text-xs">
        Not sure what calories are right?{" "}
        <button
          className="underline text-green-500 font-bold cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Calculate
        </button>
      </p>

      {/* Input Modal */}
      {isOpen && !resultOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-xl cursor-pointer border rounded-full w-8 h-8 flex items-center justify-center bg-red-100"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">
              Calculate your daily calories
            </h2>

            {/* Gender */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-2 border rounded ${
                  gender === "male" ? "bg-green-100" : ""
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-2 border rounded ${
                  gender === "female" ? "bg-green-100" : ""
                }`}
              >
                Female
              </button>
            </div>

            <input
              type="date"
              className="w-full border rounded px-3 py-2 mb-3"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="text-sm">Weight</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setWeightUnit("kg")}
                    className={`text-xs px-2 py-1 rounded ${
                      weightUnit === "kg" ? "bg-green-100" : ""
                    }`}
                  >
                    Kg
                  </button>
                  <button
                    onClick={() => setWeightUnit("lb")}
                    className={`text-xs px-2 py-1 rounded ${
                      weightUnit === "lb" ? "bg-green-100" : ""
                    }`}
                  >
                    Lb
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm">Height</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setHeightUnit("cm")}
                    className={`text-xs px-2 py-1 rounded ${
                      heightUnit === "cm" ? "bg-green-100" : ""
                    }`}
                  >
                    Cm
                  </button>
                  <button
                    onClick={() => setHeightUnit("ft")}
                    className={`text-xs px-2 py-1 rounded ${
                      heightUnit === "ft" ? "bg-green-100" : ""
                    }`}
                  >
                    Ft
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium">
                Activity: {activityLevels[activityIndex]}
              </p>
              <input
                type="range"
                min={0}
                max={4}
                value={activityIndex}
                onChange={(e) => setActivityIndex(Number(e.target.value))}
                className="w-full accent-green-500"
              />
              <div className="text-center mt-1 text-xs">
                {
                  ["0–1 Hr", "1–3 Hr", "4–5 Hr", "6–8 Hr", "9+ Hr"][
                    activityIndex
                  ]
                }
              </div>
            </div>

            <CustomBtn
              className="w-full mt-6 py-2 px-3 block"
              onClick={handleCalculate}
            >
              Calculate
            </CustomBtn>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {isOpen && resultOpen && calories && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => {
                setIsOpen(false);
                setResultOpen(false);
              }}
              className="absolute top-2 right-2 text-xl cursor-pointer border rounded-full w-8 h-8 flex items-center justify-center bg-red-100"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              Based on the information you provided:
            </h2>

            <div className="bg-green-50 p-4 rounded mb-4 grid grid-cols-2 gap-2 text-sm">
              <div className="border rounded p-2">
                Age: <strong>{calories.age}</strong>
              </div>
              <div className="border rounded p-2">
                Height: <strong>{calories.heightCm} Cm</strong>
              </div>
              <div className="border rounded p-2">
                Weight: <strong>{calories.weightKg} Kg</strong>
              </div>
              <div className="border rounded p-2">
                Activity: <strong>{calories.activity}</strong>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Health guidelines recommend a calorie deficit of no more than 500
              calories per day.
            </p>

            <div className="bg-green-50 p-4 rounded grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs">Weight Loss</p>
                <p className="text-xl font-bold">{calories.loss}</p>
                <p className="text-xs">per day</p>
              </div>
              <div>
                <p className="text-xs">Maintenance</p>
                <p className="text-xl font-bold">{calories.maintain}</p>
                <p className="text-xs">per day</p>
              </div>
              <div>
                <p className="text-xs">Weight Gain</p>
                <p className="text-xl font-bold">{calories.gain}+</p>
                <p className="text-xs">per day</p>
              </div>
            </div>

            <CustomBtn
              className="w-full mt-6 py-2 px-3 block"
              onClick={() => {
                setIsOpen(false);
                setResultOpen(false);
              }}
            >
              Back to Meal Plans
            </CustomBtn>
          </div>
        </div>
      )}
    </>
  );
};

export default CalorieCalculator;
