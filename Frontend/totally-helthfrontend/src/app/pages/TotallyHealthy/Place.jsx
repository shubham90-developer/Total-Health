import React from "react";

const programs = [
  {
    title: "Weight Loss Program",
    image: "/img/features/p1.webp",
  },
  {
    title: "Nutrition Response Testing",
    image: "/img/features/p2.webp",
  },
  {
    title: "Clinical Nutrition",
    image: "/img/features/p3.webp",
  },
];

const Place = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            All your data in one place
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The Totally HealthyApp simplifies your health journey by seamlessly
            integrating meal planning and fitness tracking. Easily log meals,
            monitor activities, and track progress all in one place. Stay on top
            of your health goals with the intuitive and user-friendly Totally
            HealthyApp.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {programs.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Place;
