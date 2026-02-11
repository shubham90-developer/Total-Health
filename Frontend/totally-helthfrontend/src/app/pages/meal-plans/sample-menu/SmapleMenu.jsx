import React from "react";
import MealPlansSamples from "./MealPlansSamples";

const SampleMenu = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <h3 className="text-3xl font-bold mb-2">
            Arabic Meal Plan Sample Menu
          </h3>
          <p className="text-gray-600 text-base">
            This is just one of thousands of menu combinations. You can easily
            make changes to your plan using the Totally HealthyApp, putting you
            in control of what you eat.
          </p>
        </div>

        {/* Sample Meal Plan Table or Component */}
        <MealPlansSamples />
      </div>
    </section>
  );
};

export default SampleMenu;
