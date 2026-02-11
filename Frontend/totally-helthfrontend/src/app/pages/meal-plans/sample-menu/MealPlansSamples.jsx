import React from "react";

// Sample structured data (for demonstration)
const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
const meals = [
  { label: "Breakfast", key: "Breakfast" },
  { label: "Morning Snack", key: "MorningSnack" },
  { label: "Lunch", key: "Lunch" },
  { label: "Afternoon Snack", key: "AfternoonSnack" },
  { label: "Dinner", key: "Dinner" },
  { label: "Evening Snack", key: "EveningSnack" },
  { label: "Supper", key: "Supper" },
];

const mealPlan = {
  Breakfast: [
    {
      title: "Fatteh Eggs",
      desc: "A blend of scrambled eggs with chickpeas, yoghurt and crispy whole wheat bread.",
      img: "/img/samplemenu/1.webp",
    },
    {
      title: "Date Caramel Oatmeal",
      desc: "Creamy oatmeal made with oat milk, date caramel & cinnamon.",
      img: "/img/samplemenu/2.webp",
    },
    {
      title: "Protein Bread with Halloumi and Labneh",
      desc: "Toasted multigrain protein bread with grilled halloumi and labneh.",
      img: "/img/samplemenu/3.webp",
    },
    {
      title: "Cardamom Honey Pancakes",
      desc: "Fluffy whole wheat pancakes infused with cardamom & honey.",
      img: "/img/samplemenu/4.webp",
    },
    {
      title: "Foul Moudammas",
      desc: "Traditional fava bean dish with lemon and olive oil.",
      img: "/img/samplemenu/5.webp",
    },
  ],
  MorningSnack: [
    {
      title: "Fatteh Eggs",
      desc: "A blend of scrambled eggs with chickpeas, yoghurt and crispy whole wheat bread.",
      img: "/img/samplemenu/1.webp",
    },
    {
      title: "Date Caramel Oatmeal",
      desc: "Creamy oatmeal made with oat milk, date caramel & cinnamon.",
      img: "/img/samplemenu/2.webp",
    },
    {
      title: "Protein Bread with Halloumi and Labneh",
      desc: "Toasted multigrain protein bread with grilled halloumi and labneh.",
      img: "/img/samplemenu/3.webp",
    },
    {
      title: "Cardamom Honey Pancakes",
      desc: "Fluffy whole wheat pancakes infused with cardamom & honey.",
      img: "/img/samplemenu/4.webp",
    },
    {
      title: "Foul Moudammas",
      desc: "Traditional fava bean dish with lemon and olive oil.",
      img: "/img/samplemenu/5.webp",
    },
  ],
  Lunch: [
    {
      title: "Fatteh Eggs",
      desc: "A blend of scrambled eggs with chickpeas, yoghurt and crispy whole wheat bread.",
      img: "/img/samplemenu/1.webp",
    },
    {
      title: "Date Caramel Oatmeal",
      desc: "Creamy oatmeal made with oat milk, date caramel & cinnamon.",
      img: "/img/samplemenu/2.webp",
    },
    {
      title: "Protein Bread with Halloumi and Labneh",
      desc: "Toasted multigrain protein bread with grilled halloumi and labneh.",
      img: "/img/samplemenu/3.webp",
    },
    {
      title: "Cardamom Honey Pancakes",
      desc: "Fluffy whole wheat pancakes infused with cardamom & honey.",
      img: "/img/samplemenu/4.webp",
    },
    {
      title: "Foul Moudammas",
      desc: "Traditional fava bean dish with lemon and olive oil.",
      img: "/img/samplemenu/5.webp",
    },
  ],
  AfternoonSnack: [
    {
      title: "Fatteh Eggs",
      desc: "A blend of scrambled eggs with chickpeas, yoghurt and crispy whole wheat bread.",
      img: "/img/samplemenu/1.webp",
    },
    {
      title: "Date Caramel Oatmeal",
      desc: "Creamy oatmeal made with oat milk, date caramel & cinnamon.",
      img: "/img/samplemenu/2.webp",
    },
    {
      title: "Protein Bread with Halloumi and Labneh",
      desc: "Toasted multigrain protein bread with grilled halloumi and labneh.",
      img: "/img/samplemenu/3.webp",
    },
    {
      title: "Cardamom Honey Pancakes",
      desc: "Fluffy whole wheat pancakes infused with cardamom & honey.",
      img: "/img/samplemenu/4.webp",
    },
    {
      title: "Foul Moudammas",
      desc: "Traditional fava bean dish with lemon and olive oil.",
      img: "/img/samplemenu/5.webp",
    },
  ],
  Dinner: [
    {
      title: "Fatteh Eggs",
      desc: "A blend of scrambled eggs with chickpeas, yoghurt and crispy whole wheat bread.",
      img: "/img/samplemenu/1.webp",
    },
    {
      title: "Date Caramel Oatmeal",
      desc: "Creamy oatmeal made with oat milk, date caramel & cinnamon.",
      img: "/img/samplemenu/2.webp",
    },
    {
      title: "Protein Bread with Halloumi and Labneh",
      desc: "Toasted multigrain protein bread with grilled halloumi and labneh.",
      img: "/img/samplemenu/3.webp",
    },
    {
      title: "Cardamom Honey Pancakes",
      desc: "Fluffy whole wheat pancakes infused with cardamom & honey.",
      img: "/img/samplemenu/4.webp",
    },
    {
      title: "Foul Moudammas",
      desc: "Traditional fava bean dish with lemon and olive oil.",
      img: "/img/samplemenu/5.webp",
    },
  ],
  Supper: [
    {
      title: "Fatteh Eggs",
      desc: "A blend of scrambled eggs with chickpeas, yoghurt and crispy whole wheat bread.",
      img: "/img/samplemenu/1.webp",
    },
    {
      title: "Date Caramel Oatmeal",
      desc: "Creamy oatmeal made with oat milk, date caramel & cinnamon.",
      img: "/img/samplemenu/2.webp",
    },
    {
      title: "Protein Bread with Halloumi and Labneh",
      desc: "Toasted multigrain protein bread with grilled halloumi and labneh.",
      img: "/img/samplemenu/3.webp",
    },
    {
      title: "Cardamom Honey Pancakes",
      desc: "Fluffy whole wheat pancakes infused with cardamom & honey.",
      img: "/img/samplemenu/4.webp",
    },
    {
      title: "Foul Moudammas",
      desc: "Traditional fava bean dish with lemon and olive oil.",
      img: "/img/samplemenu/5.webp",
    },
  ],

  // Add other meals similarly...
};

const MealPlansSamples = () => {
  return (
    <div className="overflow-auto">
      <div className="min-w-[1200px] grid grid-cols-[160px_repeat(5,minmax(220px,1fr))] border border-gray-300">
        {/* Header Row */}
        <div className="bg-[#E6E6E6] font-semibold text-center border-r border-b p-3">
          Meals / Days
        </div>
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`text-center font-bold border-b border-r p-3 ${
              idx === 0
                ? "bg-[#FFD88D]"
                : idx === 1
                ? "bg-[#D9F0E6]"
                : idx === 2
                ? "bg-[#F2D9F7]"
                : idx === 3
                ? "bg-[#E6F3F9]"
                : "bg-[#FFE1DA]"
            }`}
          >
            {day}
          </div>
        ))}

        {/* Meal Rows */}
        {meals.map(({ label, key }) => (
          <React.Fragment key={key}>
            <div className="bg-[#E6E6E6] font-medium border-t border-r border-b p-3 text-sm">
              {label}
            </div>

            {days.map((_, jdx) => {
              const item = mealPlan[key]?.[jdx];
              return (
                <div
                  key={jdx}
                  className="border border-gray-200 p-2 text-sm text-gray-700 min-h-[130px] flex flex-col items-center text-center"
                >
                  {item ? (
                    <>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-12 h-12 rounded-full object-cover mb-2"
                      />
                      <div className="font-semibold text-[13px] mb-1">
                        {item.title}
                      </div>
                      <p className="text-[12px] text-gray-500">{item.desc}</p>
                    </>
                  ) : (
                    <span className="text-gray-400 text-xs">–</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MealPlansSamples;
