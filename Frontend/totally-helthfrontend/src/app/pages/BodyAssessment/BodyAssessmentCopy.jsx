"use client";

import CustomBtn from "@/app/components/CustomBtn";
import React, { useEffect, useState } from "react";
import { FaDumbbell, FaRunning, FaUserClock, FaWalking } from "react-icons/fa";
import { FaPersonRunning } from "react-icons/fa6";

const BodyAssessment = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("weight-loss");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const [userData, setUserData] = useState({
    goal: "Weight Loss",
    shape: "Trapezoid",
    weight: 70,
    height: 170,
    gender: "",
    activityLevel: "0-1 hours per week",
  });

  const goals = [
    { label: "Weight Loss", value: "weight-loss" },
    { label: "Improve Health", value: "improve-health" },
    { label: "Muscle Gain", value: "muscle-gain" },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const calculateShape = ({ weight, height, gender }) => {
    if (!weight || !height || !gender) return "Unknown";

    const bmi = Number(weight) / (Number(height) / 100) ** 2;

    if (gender === "Male") {
      if (bmi < 18.5) return "Rectangle";
      if (bmi < 25) return "Trapezoid";
      if (bmi < 30) return "Oval";
      return "Round";
    } else {
      if (bmi < 18.5) return "Rectangle";
      if (bmi < 25) return "Hourglass";
      if (bmi < 30) return "Pear";
      return "Apple";
    }
  };

  useEffect(() => {
    const newShape = calculateShape({
      weight: userData.weight,
      height: userData.height,
      gender: userData.gender,
    });
    setUserData((prev) => ({ ...prev, shape: newShape }));
  }, [userData.weight, userData.height, userData.gender]);

  const renderShapeSVG = () => (
    <svg viewBox="0 0 200 400" className="mx-auto w-44 h-80 relative">
      <rect width="200" height="400" fill="transparent" />
      {/* Body Shape Path */}
      <path
        d="M100 20 C90 40, 70 80, 80 120
         C60 160, 60 200, 70 240
         C60 280, 80 320, 100 380
         C120 320, 140 280, 130 240
         C140 200, 140 160, 120 120
         C130 80, 110 40, 100 20 Z"
        fill="#374151"
        stroke="#94a3b8"
        strokeWidth="1"
      />

      {/* Rings */}
      <ellipse cx="100" cy="80" rx="40" ry="10" stroke="#10b981" fill="none" />
      <ellipse cx="100" cy="160" rx="45" ry="10" stroke="#10b981" fill="none" />
      <ellipse cx="100" cy="240" rx="50" ry="10" stroke="#10b981" fill="none" />

      {/* Goal Label */}
      <circle cx="80" cy="60" r="4" fill="#facc15" />
      <text x="10" y="55" fontSize="10" fill="#0f172a">
        Goal: <tspan fill="#3b82f6">{userData.goal}</tspan>
      </text>
      <line
        x1="80"
        y1="60"
        x2="40"
        y2="55"
        stroke="#3b82f6"
        strokeWidth="0.5"
      />

      {/* Weight Label */}
      <circle cx="135" cy="160" r="4" fill="#facc15" />
      <text x="140" y="160" fontSize="10" fill="#0f172a">
        Weight: {userData.weight} {weightUnit.toUpperCase()}
      </text>
      <line
        x1="135"
        y1="160"
        x2="190"
        y2="160"
        stroke="#3b82f6"
        strokeWidth="0.5"
      />

      {/* Height Label */}
      <circle cx="90" cy="310" r="4" fill="#facc15" />
      <text x="10" y="308" fontSize="10" fill="#0f172a">
        Height: {userData.height} {heightUnit.toUpperCase()}
      </text>
      <line
        x1="90"
        y1="310"
        x2="60"
        y2="308"
        stroke="#3b82f6"
        strokeWidth="0.5"
      />
    </svg>
  );

  const getShortGoal = (label) => {
    if (label === "Weight Loss") return "Fat Burn";
    if (label === "Improve Health") return "Health";
    return "Muscle";
  };

  const shapes = [
    {
      value: "round",
      label: "Round",
      icon: <svg>...</svg>, // or an imported image/component
      description:
        "Torso wider than shoulders, rounded stomach, fuller face, short neck.",
    },
    {
      value: "triangle",
      label: "Triangle",
      icon: <svg>...</svg>,
      description:
        "Large around the waist in relation to your chest. Narrow, sloped shoulders.",
    },
    // ... others
  ];

  const renderShapeSVGstep2 = () => {
    const shape = userData.shape?.toLowerCase();

    const shapePaths = {
      round: (
        <ellipse
          cx="100"
          cy="200"
          rx="40"
          ry="70"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      triangle: (
        <polygon
          points="100,250 60,320 140,320"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      trapezoid: (
        <polygon
          points="60,160 140,160 120,250 80,250"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      "inverted triangle": (
        <polygon
          points="60,160 140,160 100,250"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      rectangle: (
        <rect
          x="80"
          y="160"
          width="40"
          height="90"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
    };

    return (
      <svg viewBox="0 0 200 400" className="mx-auto w-32 h-64">
        <rect width="200" height="400" fill="transparent" />

        {/* Human silhouette */}
        <path
          d="M100 20 C90 40, 70 80, 80 120
          C60 160, 60 200, 70 240
          C60 280, 80 320, 100 380
          C120 320, 140 280, 130 240
          C140 200, 140 160, 120 120
          C130 80, 110 40, 100 20 Z"
          fill="#4b5563"
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* Shape overlay */}
        {shapePaths[shape] || null}

        {/* Labels */}
        <text x="10" y="30" fontSize="10" fill="#0f766e">
          Goal : {userData.goal}
        </text>
        <text x="10" y="50" fontSize="10" fill="#0f766e">
          Shape : {userData.shape}
        </text>
        <text x="150" y="250" fontSize="10" fill="#0f766e">
          Weight: {userData.weight} {weightUnit}
        </text>
        <text x="10" y="280" fontSize="10" fill="#0f766e">
          Height : {userData.height} {heightUnit}
        </text>
      </svg>
    );
  };

  // step 3
  const renderShapeSVGstep3 = () => {
    const shape = userData.shape?.toLowerCase();

    const shapeOverlay = {
      round: (
        <ellipse
          cx="100"
          cy="200"
          rx="40"
          ry="70"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      triangle: (
        <polygon
          points="100,250 60,320 140,320"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      trapezoid: (
        <polygon
          points="60,160 140,160 120,250 80,250"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      "inverted triangle": (
        <polygon
          points="60,160 140,160 100,250"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
      rectangle: (
        <rect
          x="80"
          y="160"
          width="40"
          height="90"
          fill="#a7f3d0"
          stroke="#059669"
          strokeWidth="1"
        />
      ),
    };

    return (
      <svg viewBox="0 0 200 400" className="mx-auto w-32 h-64">
        {/* Human silhouette */}
        <path
          d="M100 20 C90 40, 70 80, 80 120
          C60 160, 60 200, 70 240
          C60 280, 80 320, 100 380
          C120 320, 140 280, 130 240
          C140 200, 140 160, 120 120
          C130 80, 110 40, 100 20 Z"
          fill="#4b5563"
          stroke="#94a3b8"
          strokeWidth="1"
        />
        {/* Overlay Shape */}
        {shapeOverlay[shape] || null}

        {/* Labels */}
        <text x="10" y="30" fontSize="10" fill="#0f766e">
          Goal : {userData.goal}
        </text>
        <text x="10" y="50" fontSize="10" fill="#0f766e">
          Shape : {userData.shape}
        </text>
        <text x="150" y="250" fontSize="10" fill="#0f766e">
          Weight: {userData.weight} {weightUnit}
        </text>
        <text x="10" y="280" fontSize="10" fill="#0f766e">
          Height : {userData.height} {heightUnit}
        </text>
        <text x="10" y="300" fontSize="10" fill="#0f766e">
          Activity Level : {userData.activityLevel}
        </text>
      </svg>
    );
  };

  const activityLevels = [
    { value: "0-1", label: "0-1 hours per week", icon: <FaUserClock /> },
    { value: "1-3", label: "1-3 hours per week", icon: <FaWalking /> },
    { value: "4-5", label: "4-5 hours per week", icon: <FaRunning /> },
    { value: "6-8", label: "6-8 hours per week", icon: <FaDumbbell /> },
    { value: "9+", label: "9+ hours per week", icon: <FaPersonRunning /> },
  ];

  const movementOptions = [
    "Swimming",
    "Weight Training",
    "Walking/Hiking",
    "Yoga",
    "CrossFit",
    "Dancing",
    "HIIT",
    "Running",
    "Circuit Training",
    "Spinning",
    "Aerobics",
    "Kickboxing",
    "Rowing",
    "Group Exercise",
    "Zumba",
    "Cycling",
    "Rock Climbing",
    "Padel Tennis",
    "Tennis",
    "Bootcamp",
  ];

  const toggleMovementOption = (option) => {
    setUserData((prev) => {
      const existing = prev.movement || [];
      const updated = existing.includes(option)
        ? existing.filter((o) => o !== option)
        : [...existing, option];
      return { ...prev, movement: updated };
    });
  };

  // step 4

  const symptoms = [
    "Stress",
    "Anxiety",
    "Trouble Sleeping",
    "Poor Focus",
    "Depression",
    "Lack of Motivation",
  ];

  const alcoholOptions = [
    "Never",
    "A few times per year",
    "Once per month",
    "Once per week",
    "A few times per week",
  ];

  const toggleSymptom = (symptom) => {
    setUserData((prev) => {
      const exists = prev.symptoms?.includes(symptom);
      return {
        ...prev,
        symptoms: exists
          ? prev.symptoms.filter((s) => s !== symptom)
          : [...(prev.symptoms || []), symptom],
      };
    });
  };

  // setp 5
  const suffering = [
    "High Blood Pressure",
    "Gestational Diabetes",
    "Hypo/Hyperthyroidism",
    "Hypertension",
    "Acid Reflux",
    "Metabolic Syndrome",
    "Kidney Disease",
    "Cancer",
    "Hyperlipidemia (High Cholesterol Levels)",
    "IBS",
    "High Uric Acid",
    "Diabetes",
    "Heart Disease",
    "Stroke",
    "Arthritis",
    "PCOS",
  ];
  const toggleRisk = (item) => {
    setUserData((prev) => {
      const exists = prev.risks?.includes(item);
      return {
        ...prev,
        risks: exists
          ? prev.risks.filter((i) => i !== item)
          : [...(prev.risks || []), item],
      };
    });
  };

  // step 6
  const proteinOptions = ["Chicken", "Fish", "Turkey", "Shrimp", "Beef"];

  const ingredientOptions = [
    "Spinach",
    "Green Beans",
    "Olives",
    "Beetroot",
    "Eggplant (Aubergine)",
    "Sweet Potato",
    "Fresh Garlic",
    "Cucumber",
    "Fresh Onion",
    "Broccoli",
    "Cauliflower",
    "Mushroom",
    "Kale",
  ];

  const toggleProtein = (item) => {
    setUserData((prev) => {
      const exists = prev.proteins?.includes(item);
      return {
        ...prev,
        proteins: exists
          ? prev.proteins.filter((i) => i !== item)
          : [...(prev.proteins || []), item],
      };
    });
  };

  const toggleIngredient = (item) => {
    setUserData((prev) => {
      const exists = prev.ingredients?.includes(item);
      const current = prev.ingredients || [];

      if (exists) {
        return {
          ...prev,
          ingredients: current.filter((i) => i !== item),
        };
      } else if (current.length < 3) {
        return {
          ...prev,
          ingredients: [...current, item],
        };
      }
      return prev; // Do nothing if already at 3
    });
  };

  // step 7

  // step 8
  const restartAssessment = () => {
    setUserData({
      goal: "",
      shape: "",
      height: "",
      weight: "",
      activityLevel: "",
      movement: [],
      symptoms: [],
      alcohol: "",
      risks: [],
      dietary: "No",
      dietaryDetail: "",
      medication: "No",
      medicationDetail: "",
      proteins: [],
      vegetarian: false,
      pescatarian: false,
      ingredients: [],
      calories: 0,
      targetWeight: "",
    });

    setStep(1); // Reset to the first step
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 ">
        {/* step 1 */}
        <div>
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white rounded-xl shadow-md p-6">
                  {/* Header */}
                  <h2 className="text-2xl font-semibold mb-2">
                    Welcome to your body assessment
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    This body assessment will provide a daily calorie intake
                    target to help you reach your health goal. For an accurate
                    recommendation, please fill in the details below.
                  </p>

                  {/* Goal Selection */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">What is your goal?</h3>
                    <div className="flex gap-4">
                      {goals.map((g) => (
                        <button
                          key={g.value}
                          className={`flex-1 py-3 rounded-md border text-sm font-medium transition ${
                            goal === g.value
                              ? "bg-green-100 border-green-500 text-green-700 shadow"
                              : "bg-white border-gray-300 hover:border-green-400"
                          }`}
                          onClick={() => {
                            setGoal(g.value);
                            setUserData((prev) => ({ ...prev, goal: g.label }));
                          }}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">What is your gender?</h3>
                    <div className="flex gap-6 text-sm">
                      {["Male", "Female"].map((g) => (
                        <label key={g} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={userData.gender === g}
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                gender: e.target.value,
                              }))
                            }
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
                    {/* Date of Birth */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="border border-green-300 w-full px-3 py-2 rounded-md"
                        onChange={(e) =>
                          setUserData({ ...userData, dob: e.target.value })
                        }
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block mb-1 font-medium">Weight</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={userData.weight}
                          className="border border-green-300 w-full px-3 py-2 rounded-md"
                          onChange={(e) =>
                            setUserData({ ...userData, weight: e.target.value })
                          }
                        />
                        {["kg", "lb"].map((unit) => (
                          <button
                            key={unit}
                            className={`px-3 py-1 border rounded-md ${
                              weightUnit === unit
                                ? "bg-green-100 border-green-500"
                                : "border-gray-300"
                            }`}
                            onClick={() => setWeightUnit(unit)}
                          >
                            {unit.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Height */}
                    <div>
                      <label className="block mb-1 font-medium">Height</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={userData.height}
                          className="border border-green-300 w-full px-3 py-2 rounded-md"
                          onChange={(e) =>
                            setUserData({ ...userData, height: e.target.value })
                          }
                        />
                        {["cm", "ft"].map((unit) => (
                          <button
                            key={unit}
                            className={`px-3 py-1 border rounded-md ${
                              heightUnit === unit
                                ? "bg-green-100 border-green-500"
                                : "border-gray-300"
                            }`}
                            onClick={() => setHeightUnit(unit)}
                          >
                            {unit.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Goal Weight */}
                    <div>
                      <label className="block mb-1 font-medium">
                        Goal Weight
                      </label>
                      <input
                        type="number"
                        className="border border-green-300 w-full px-3 py-2 rounded-md"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            goalWeight: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <div className="text-right">
                    <CustomBtn onClick={nextStep} className="px-4 py-2">
                      Next
                    </CustomBtn>
                  </div>
                </div>

                {/* ✅ Right side: Summary panel (1/3 width) */}
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
                  <div className="mt-6">{renderShapeSVG()}</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* step 2 */}
        {step === 2 && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left 2/3: Body Shape Selection */}
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
                    <div className="mb-2">{shape.icon}</div>
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

            {/* Right 1/3: Summary Panel */}
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
              <div className="mt-6">{renderShapeSVGstep2()}</div>
            </div>
          </div>
        )}

        {/* step 3 */}
        {step === 3 && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left 2/3: Body Shape Selection */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                How active are you?
              </h2>

              {/* Activity Level Selection */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-6">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    className={`p-4 border rounded-lg text-center ${
                      userData.activityLevel === level.value
                        ? "bg-green-100 border-green-500 text-green-700 shadow"
                        : "bg-white border-gray-300 hover:border-green-400"
                    }`}
                    onClick={() =>
                      setUserData((prev) => ({
                        ...prev,
                        activityLevel: level.value,
                      }))
                    }
                  >
                    <div className="text-lg mb-1">{level.icon}</div>
                    <p className="font-medium">{level.label}</p>
                  </button>
                ))}
              </div>

              {/* Favorite Way to Move */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  What’s your favorite way to move?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movementOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleMovementOption(option)}
                      className={`px-4 py-2 rounded-full border text-sm ${
                        userData.movement?.includes(option)
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="mt-8 text-right">
                <CustomBtn onClick={nextStep} className="px-6 py-2">
                  Next
                </CustomBtn>
              </div>
            </div>

            {/* Right 1/3: Summary Panel */}
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
              <div className="mt-6">{renderShapeSVGstep3()}</div>
            </div>
          </div>
        )}

        {/* step 4 */}
        {step === 4 && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left 2/3: Body Shape Selection */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Do you suffer from any of the following?
              </h2>
              <p>
                Why is this important? Totally healthy improves your overall
                well-being and the list below are the most common reasons people
                fall into poor nutrition habits. These are also common symptoms
                of poor nutrition.
              </p>

              {/* Optional Symptoms */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-6">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    className={`p-4 border rounded-lg text-center ${
                      userData.symptoms?.includes(symptom)
                        ? "bg-green-100 border-green-500 text-green-700 shadow"
                        : "bg-white border-gray-300 hover:border-green-400"
                    }`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              {/* Alcohol Intake */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  How often do you drink alcohol?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {alcoholOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setUserData((prev) => ({ ...prev, alcohol: option }))
                      }
                      className={`px-4 py-2 rounded-full border text-sm ${
                        userData.alcohol === option
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 text-right">
                <CustomBtn
                  onClick={prevStep}
                  className="px-6 py-2 mr-4 bg-gray-200 text-gray-700"
                >
                  Back
                </CustomBtn>
                <CustomBtn onClick={nextStep} className="px-6 py-2">
                  Next
                </CustomBtn>
              </div>
            </div>

            {/* Right 1/3: Summary Panel */}
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
              <div className="mt-6">{renderShapeSVGstep3()}</div>
            </div>
          </div>
        )}

        {/* step 5 */}
        {step === 5 && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left 2/3: Body Shape Selection */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Are you at risk of or suffering from any of the following?
              </h2>

              {/* Health Risks Selection */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-6">
                {suffering.map((item) => (
                  <button
                    key={item}
                    className={`p-4 border rounded-lg text-center ${
                      userData.risks?.includes(item)
                        ? "bg-green-100 border-green-500 text-green-700 shadow"
                        : "bg-white border-gray-300 hover:border-green-400"
                    }`}
                    onClick={() => toggleRisk(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Dietary Requirements + Medication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Special Dietary Requirements */}
                <div>
                  <h3 className="font-medium mb-2">
                    Do you have any special dietary requirements?
                  </h3>
                  <div className="flex gap-4 mb-2">
                    {["No", "Yes"].map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setUserData((prev) => ({ ...prev, dietary: option }))
                        }
                        className={`px-4 py-2 rounded-full border text-sm ${
                          userData.dietary === option
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="If YES, please specify."
                    disabled={userData.dietary !== "Yes"}
                    className="w-full border rounded-md p-2 text-sm disabled:opacity-50"
                    value={userData.dietaryDetail || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dietaryDetail: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Medication */}
                <div>
                  <h3 className="font-medium mb-2">
                    Are you on any medication?
                  </h3>
                  <div className="flex gap-4 mb-2">
                    {["No", "Yes"].map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setUserData((prev) => ({
                            ...prev,
                            medication: option,
                          }))
                        }
                        className={`px-4 py-2 rounded-full border text-sm ${
                          userData.medication === option
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="If YES, please specify."
                    disabled={userData.medication !== "Yes"}
                    className="w-full border rounded-md p-2 text-sm disabled:opacity-50"
                    value={userData.medicationDetail || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        medicationDetail: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 text-right">
                <CustomBtn
                  onClick={prevStep}
                  className="px-6 py-2 mr-4 bg-gray-200 text-gray-700"
                >
                  Back
                </CustomBtn>
                <CustomBtn onClick={nextStep} className="px-6 py-2">
                  Next
                </CustomBtn>
              </div>
            </div>

            {/* Right 1/3: Summary Panel */}
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
              <div className="mt-6">{renderShapeSVGstep3()}</div>
            </div>
          </div>
        )}

        {/* step 6 */}
        {step === 6 && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left 2/3: Body Shape Selection */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Are there any proteins you DO NOT like?
              </h2>

              {/* Proteins Selection */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm mb-4">
                {proteinOptions.map((protein) => (
                  <button
                    key={protein}
                    onClick={() => toggleProtein(protein)}
                    className={`p-4 border rounded-lg text-center ${
                      userData.proteins?.includes(protein)
                        ? "bg-green-100 border-green-500 text-green-700 shadow"
                        : "bg-white border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {protein}
                  </button>
                ))}
              </div>

              {/* Vegetarian/Pescatarian Toggle */}
              <div className="flex gap-6 text-sm mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={userData.vegetarian || false}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        vegetarian: e.target.checked,
                      }))
                    }
                  />
                  I’m Vegetarian
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={userData.pescatarian || false}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        pescatarian: e.target.checked,
                      }))
                    }
                  />
                  I’m Pescatarian
                </label>
              </div>

              {/* Ingredients Dislike */}
              <h3 className="font-medium mb-2">
                Are there any ingredients you{" "}
                <span className="text-green-700 font-bold">DO NOT</span> like?
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                (Select up to a maximum of three)
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredientOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleIngredient(item)}
                    disabled={
                      !userData.ingredients?.includes(item) &&
                      userData.ingredients?.length >= 3
                    }
                    className={`px-4 py-2 rounded-full border text-sm ${
                      userData.ingredients?.includes(item)
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "border-gray-300 hover:border-green-400"
                    } ${
                      !userData.ingredients?.includes(item) &&
                      userData.ingredients?.length >= 3
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="mt-8 text-right">
                <CustomBtn
                  onClick={prevStep}
                  className="px-6 py-2 mr-4 bg-gray-200 text-gray-700"
                >
                  Back
                </CustomBtn>
                <CustomBtn onClick={nextStep} className="px-6 py-2">
                  Next
                </CustomBtn>
              </div>
            </div>

            {/* Right 1/3: Summary Panel */}
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
              <div className="mt-6">{renderShapeSVGstep3()}</div>
            </div>
          </div>
        )}

        {/* step 7 */}
        {step === 7 && (
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6 border border-green-200">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
              Would you like personalised meal plans based on your assessment?
            </h2>

            {/* Radio Options */}
            <div className="space-y-4 text-sm md:text-base">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="planPreference"
                  value="yes"
                  checked={userData.planPreference === "yes"}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      planPreference: e.target.value,
                    }))
                  }
                />
                Yes, I want a plan tailored to my goals.
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="planPreference"
                  value="no"
                  checked={userData.planPreference === "no"}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      planPreference: e.target.value,
                    }))
                  }
                />
                No, just the assessment results for now.
              </label>
            </div>

            {/* Navigation */}
            <div className="mt-8 text-center">
              <CustomBtn onClick={nextStep} className="px-6 py-2">
                Next
              </CustomBtn>
            </div>
          </div>
        )}

        {/* step 8 */}
        {step === 8 && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Panel: Results */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Here are your results
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Body Shape Section */}
                <div className="flex flex-col items-center text-center">
                  {renderShapeSVGstep3()}
                  <div className="mt-4 space-y-1 text-sm text-gray-700">
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
                  </div>
                  <button
                    onClick={restartAssessment}
                    className="mt-4  font-semibold text-sm border border-blue-200 rounded-md px-4 py-2 hover:bg-blue-50 text-red-500 cursor-pointer"
                  >
                    Restart Assessment
                  </button>
                </div>

                {/* Calorie + Stats */}
                <div className="text-center border-l border-gray-200 pl-6">
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {userData.calories || "1,380"}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Calories per day</p>
                  <p className="text-xs text-gray-500">
                    According to your body assessment, this is your recommended
                    calorie intake for <strong>{userData.goal}</strong>.
                    Consuming this amount per day will help you reach your
                    health goals.
                  </p>

                  {/* Success Stat */}
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4">
                    <p className="text-xl font-bold text-green-700">72%</p>
                    <p className="text-xs text-gray-600">
                      Similar people lost more than 10kg using Totally healthy
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs text-gray-600">
                    <p>
                      <strong>Allergies:</strong> {userData.allergies || "None"}
                    </p>
                    <p>
                      <strong>Medication:</strong>{" "}
                      {userData.medication || "None"}
                    </p>
                    <p>
                      <strong>Dietary:</strong> {userData.dietary || "None"}
                    </p>
                  </div>
                </div>

                {/* Target Weight Timeline */}
                <div className="text-center">
                  <h3 className="font-semibold mb-2">ACHIEVABLE WEIGHT</h3>
                  <p className="text-3xl font-bold text-green-700">
                    {userData.targetWeight || "68"}kg
                  </p>
                  <p className="text-xs mb-4">August 4th, 2025</p>
                  <div className="w-full h-24 bg-gray-50 rounded-md flex items-center justify-center text-xs text-gray-500">
                    📈 Chart Placeholder (optional SVG)
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Disclaimer: This is an estimate. Results may vary.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel: Recommended Plan */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Recommended</h3>
              <h2 className="text-xl font-bold text-green-700 mb-1">
                International Meal Plan
              </h2>
              <p className="text-yellow-500 mb-1">★★★★★</p>
              <p className="text-xs text-gray-500 mb-3">
                1,012 Customer Reviews
              </p>

              <p className="text-sm font-medium text-gray-700 mb-2">
                1,000 - 1,300 calories per day
              </p>
              <p className="text-xs text-gray-500 mb-4">
                This plan has the widest variety of dishes from global cuisines.
              </p>

              <img
                src="/img/meal-box.png"
                alt="Meal Box"
                className="rounded-md shadow mb-4 w-full object-cover h-36"
              />

              <div className="flex flex-col gap-3">
                <CustomBtn className="w-full px-4 py-2">Sample Menu</CustomBtn>
                <CustomBtn className="w-full px-4 py-2">
                  Customise your plan
                </CustomBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BodyAssessment;
