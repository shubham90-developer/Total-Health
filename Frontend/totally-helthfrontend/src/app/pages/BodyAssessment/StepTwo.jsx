"use client";
import React from "react";
import CustomBtn from "@/app/components/CustomBtn";

// Dummy shape options (replace with real icons)
const shapes = [
  {
    label: "Trapezoid",
    value: "Trapezoid",
    description: "Broad shoulders, narrow waist",
    icon: "🔺",
  },
  {
    label: "Oval",
    value: "Oval",
    description: "Wider around midsection",
    icon: "⚪",
  },
  {
    label: "Rectangle",
    value: "Rectangle",
    description: "Similar width throughout",
    icon: "⬛",
  },
  {
    label: "Hourglass",
    value: "Hourglass",
    description: "Defined waist, balanced top and bottom",
    icon: "⏳",
  },
  {
    label: "Pear",
    value: "Pear",
    description: "Wider hips than shoulders",
    icon: "🍐",
  },
];

const StepTwo = ({
  step,
  userData,
  setUserData,
  weightUnit = "kg",
  heightUnit = "cm",
  nextStep,
}) => {
  if (step !== 2) return null;

  const renderShapeSVGstep2 = () => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);

    if (!weight || !height || isNaN(weight) || isNaN(height)) return null;

    const weightValue =
      weightUnit === "lb" ? (weight * 2.20462).toFixed(1) : weight.toFixed(1);
    const heightValue =
      heightUnit === "ft" ? (height / 30.48).toFixed(2) : height.toFixed(1);

    return (
      <div className="mt-2 text-gray-700">
        <p>
          Height: {heightValue} {heightUnit} | Weight: {weightValue}{" "}
          {weightUnit}
        </p>
        <p className="mt-1">
          Shape: <strong>{userData.shape}</strong>
        </p>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-10">
      {/* Left Panel */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Choose which best describes your body shape?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          {shapes.map((shape) => (
            <button
              key={shape.value}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all text-center ${
                userData.shape === shape.value
                  ? "bg-green-100 border-green-500 text-green-700 shadow"
                  : "bg-white border-gray-300 hover:border-green-400"
              }`}
              onClick={() =>
                setUserData((prev) => ({ ...prev, shape: shape.value }))
              }
            >
              <div className="mb-2 text-2xl">{shape.icon}</div>
              <strong className="mb-1">{shape.label}</strong>
              <p className="text-xs text-gray-500">{shape.description}</p>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-8 text-right">
          <CustomBtn onClick={nextStep} className="px-6 py-2">
            Next
          </CustomBtn>
        </div>
      </div>

      {/* Right Summary */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-sm text-center">
        <p>
          <strong>Goal:</strong> {userData.goal}
        </p>
        <p>
          <strong>Shape:</strong> {userData.shape}
        </p>
        <p>
          <strong>Weight:</strong> {userData.weight} {weightUnit}
        </p>
        <p>
          <strong>Height:</strong> {userData.height} {heightUnit}
        </p>
        <p>
          <strong>Activity Level:</strong> {userData.activityLevel}
        </p>
        {renderShapeSVGstep2()}
      </div>
    </div>
  );
};

export default StepTwo;
