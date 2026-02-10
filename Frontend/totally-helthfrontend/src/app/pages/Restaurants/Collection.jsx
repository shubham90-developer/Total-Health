import React from "react";
import Link from "next/link";
import CustomBtn from "@/app/components/CustomBtn";

const data = [
  {
    id: 1,
    img: "/img/Restaurants/3.jpg",
    url: "restaurants/menu-list",
  },
  {
    id: 2,
    img: "/img/Restaurants/4.jpg",
    url: "restaurants/menu-list",
  },
  {
    id: 3,
    img: "/img/Restaurants/5.jpg",
    url: "restaurants/menu-list",
  },
  {
    id: 4,
    img: "/img/Restaurants/6.jpg",
    url: "restaurants/menu-list",
  },
  {
    id: 5,
    img: "/img/Restaurants/7.jpg",
    url: "restaurants/menu-list",
  },
  {
    id: 6,
    img: "/img/Restaurants/8.jpg",
    url: "restaurants/menu-list",
  },
];

const Collection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore our Collection
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.map((item) => (
            <Link href={`/${item.url}`} key={item.id}>
              <div className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02] cursor-pointer">
                <div className="w-full aspect-[3/5] relative">
                  <img
                    src={item.img}
                    alt={`Restaurant ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <CustomBtn className="mt-8 px-4 py-2" href="/menu-list">
            Order Now
          </CustomBtn>
        </div>
      </div>
    </section>
  );
};

export default Collection;
