import Link from "next/link";
import React from "react";

const menuItems = [
  {
    name: "Sweet Chili Chicken Bowl",
    price: 50,
    img: "/img/Restaurants/3.jpg",
    url: "menu-details",
  },
  {
    name: "Power Chicken Bowl",
    price: 52,
    img: "/img/Restaurants/4.jpg",
    url: "menu-details",
  },
  {
    name: "Veggie Chili Bowl",
    price: 42,
    img: "/img/Restaurants/5.jpg",
    url: "menu-details",
  },
  {
    name: "Tokyo Chicken Bowl",
    price: 50,
    img: "/img/Restaurants/6.jpg",
    url: "menu-details",
  },
  {
    name: "Chipotle Chicken Bowl",
    price: 50,
    img: "/img/Restaurants/7.jpg",
    url: "menu-details",
  },
  {
    name: "Vegan Three Bean Bowl",
    price: 42,
    img: "/img/Restaurants/8.jpg",
    url: "menu-details",
  },
  {
    name: "Baked Falafel Bowl",
    price: 38,
    img: "/img/Restaurants/9.jpg",
    url: "menu-details",
  },
];

const categories = [
  "Summer Selections",
  "Breakfast",
  "Soups & Bites",
  "Salads",
  "Burgers & Sandwiches",
  "Quesadillas & Wraps",
  "Bowls",
  "Mains",
  "Sides",
  "Kids",
  "Desserts",
  "Drinks",
  "Snacks",
];

const MenuList = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Menu List
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Totally Healthyis about more than meal plans. We deliver top
            quality, great-tasting nutrition services across the UAE.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 px-4 py-8 bg-white">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="sticky top-4 space-y-6 bg-green-50 rounded-xl p-4">
              <div className="space-y-2">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    className={`block w-full text-left px-4 py-2 rounded-md text-black hover:bg-gray-100 cursor-pointer ${
                      cat === "Bowls" ? "bg-teal-100 font-semibold" : ""
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <Link
                href={item.url}
                key={i}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-200 hover:bg-green-50 cursor-pointer"
              >
                <div className="aspect-square">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.name} - AED {item.price}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuList;
