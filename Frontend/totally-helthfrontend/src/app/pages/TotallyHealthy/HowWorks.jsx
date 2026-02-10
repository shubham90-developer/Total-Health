import React from "react";
import Image from "next/image";

const steps = [
  {
    no: "1",
    title: "Set Up Your Totally HealthyFit",
    description: "Easy setup and synchronization with the Totally HealthyApp.",
  },
  {
    no: "2",
    title: "Track Your Activities",
    description:
      "Monitor your steps, heart rate, and calories burned effortlessly.",
  },
  {
    no: "3",
    title: "Log Your Meals",
    description:
      "Enjoy your Totally Healthymeals and see them automatically logged in the app.",
  },
  {
    no: "4",
    title: "Log Your MealsMonitor Your Progress",
    description: "Get detailed insights and track your progress over time.",
  },
];
const HowWorks = () => {
  return (
    <>
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              How Totally Healthy Fit Works
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get full control over your activity and nutrition data in one
              place with our brand-new fitness tracker.
            </p>
          </div>

          <div className="md:flex items-start justify-between gap-10">
            {/* Left Steps */}
            <div className="w-full md:w-1/2 space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-green-50 p-5 rounded-md shadow-sm"
                >
                  {/* Number Badge */}
                  <div
                    className="min-w-[64px] min-h-[64px] flex items-center justify-center text-white text-xl font-bold bg-no-repeat bg-center bg-contain"
                    style={{
                      backgroundImage: "url(/img/howwork/1.png)",
                    }}
                  >
                    {step.no}
                  </div>

                  {/* Step Info */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex items-center justify-center">
              <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/img/features/step2.webp"
                  alt="Phone with food"
                  fill
                  className="object-cover rounded-xl"
                />

                {/* Overlay Image */}
                <div className="absolute -bottom-0 -right-0 w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl animate-pulse">
                  <Image
                    src="/img/features/step3.webp"
                    alt="Food plate"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </section>
    </>
  );
};

export default HowWorks;
