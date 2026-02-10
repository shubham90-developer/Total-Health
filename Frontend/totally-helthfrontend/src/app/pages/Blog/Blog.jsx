import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogData = [
  {
    id: 1,
    img: "/img/blog/1.jpg",
    title: "You’re Not Burning as Many Calories on Vacation as You Think",
    shortDesc:
      "Nostra maecenas malesuada vel lobortis sociis mus aliquam tempor etiam ipsum pretium cursus.",
    link: "blog/blog-details",
    author: "Robert Haven",
    date: "Dec 25, 2025",
  },
  {
    id: 2,
    img: "/img/blog/2.jpg",
    title:
      "Smart Summer Eating: Enjoy the Holidays Without the Guilt or the Rules",
    shortDesc:
      "Nostra maecenas malesuada vel lobortis sociis mus aliquam tempor etiam ipsum pretium cursus.",
    link: "blog/blog-details",
    author: "Robert Haven",
    date: "Dec 25, 2025",
  },
  {
    id: 3,
    img: "/img/blog/3.png",
    title: "Why Men and Women Lose Weight Differently: What You Should Know",
    shortDesc:
      "Nostra maecenas malesuada vel lobortis sociis mus aliquam tempor etiam ipsum pretium cursus.",
    link: "blog/blog-details",
    author: "Robert Haven",
    date: "Dec 25, 2025",
  },
  {
    id: 4,
    img: "/img/blog/4.png",
    title: "Menstrual Cycle and Fat Loss: Why One Diet Doesn’t Fit All Women",
    shortDesc:
      "Nostra maecenas malesuada vel lobortis sociis mus aliquam tempor etiam ipsum pretium cursus.",
    link: "blog/blog-details",
    author: "Robert Haven",
    date: "Dec 25, 2025",
  },
];

const Blog = ({ max, sidebar = true }) => {
  return (
    <section className="bg-[#f8f5f0] py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h6 className="text-green-500 text-sm font-light tracking-widest uppercase mb-2">
            Our Recent Post
          </h6>
          <h2 className="text-3xl font-bold text-gray-800 leading-snug">
            Publish What We Think, <br /> About Our Company Activities
          </h2>
        </div>

        {/* Grid Layout */}
        <div
          className={`grid gap-10 ${
            sidebar ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {/* Blog Cards */}
          <div
            className={`${
              sidebar
                ? "lg:col-span-2 md:grid-cols-2"
                : "col-span-full md:grid-cols-3"
            } grid grid-cols-1 gap-8 blog`}
          >
            {BlogData.slice(0, max).map((item) => (
              <Link href={item.link} key={item.id} className="group">
                <div className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="relative group overflow-hidden rounded-t">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-[400] text-gray-900 mb-3 leading-snug tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-5  leading-loose">
                      {item.shortDesc}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 font-medium gap-4">
                      <span className="text-[#aa8453] font-semibold">
                        BY {item.author.toUpperCase()}
                      </span>
                      <span className="h-3 w-px bg-gray-400"></span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          {sidebar && (
            <aside className="space-y-10">
              {/* Search */}
              <div className="bg-white shadow-sm rounded p-6">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#aa8453]"
                />
              </div>

              {/* Categories */}
              <div className="bg-white shadow-sm rounded p-6 border border-gray-100 category">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">
                  Categories
                </h4>
                <ul className="space-y-3 text-gray-700 text-sm">
                  {[
                    { name: "Food", count: 23 },
                    { name: "Fitness", count: 10 },
                    { name: "Wealth", count: 9 },
                    { name: "Nutrition", count: 35 },
                    { name: "Life", count: 5 },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-100 last:border-b-0 pb-2"
                    >
                      <Link
                        href="#"
                        className="flex justify-between items-center"
                      >
                        <span>{item.name}</span>
                        <span className="text-gray-400">
                          ({String(item.count).padStart(2, "0")})
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white shadow-sm rounded p-6 border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">
                  Recent Posts
                </h4>
                <ul className="space-y-3 text-gray-700 text-sm">
                  {BlogData.slice(0, 4).map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-gray-100 last:border-b-0 pb-2"
                    >
                      <Link href={item.link} className="flex items-center">
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="w-12 h-12 object-cover mr-4"
                        />
                        <div>
                          <span className="block font-semibold text-sm tracking-wide">
                            {item.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.date}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        {/* pagnination */}
      </div>
    </section>
  );
};

export default Blog;
