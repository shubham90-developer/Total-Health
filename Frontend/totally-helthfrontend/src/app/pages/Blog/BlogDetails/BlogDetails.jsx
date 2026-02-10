import CustomBtn from "@/app/components/CustomBtn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const BlogData = [
  {
    id: 1,
    img: "/img/blog/1.jpg",
    title: "You’re Not Burning as Many Calories on Vacation as You Think",
    shortDesc:
      "Nostra maecenas malesuada vel lobortis sociis mus aliquam tempor etiam ipsum pretium cursus.",
    link: "/blog-details",
    author: "Robert Haven",
    date: "Dec 25, 2025",
  },
];

const BlogDetails = ({ max, sidebar = true }) => {
  return (
    <section className="bg-[#f8f5f0] py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Blog Details
          </h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> /{" "}
            <span>Blog Details</span>
          </p>
        </div>

        {/* Layout */}
        <div
          className={`grid gap-10 ${
            sidebar ? "lg:grid-cols-[2fr_1fr]" : "lg:grid-cols-1"
          }`}
        >
          {/* Blog Content */}
          <div>
            <div className="bg-white p-6 shadow-sm  space-y-6 blog-content">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
                You’re Not Burning as Many Calories on Vacation as You Think
              </h1>
              <div className="flex items-center text-sm text-gray-500 space-x-4 flex-wrap">
                <span>👤 Admin</span>
                <span>📅 Sep 15, 2025</span>
                <span>💬 2</span>
                <span>👁️ 276</span>
                <span>🔗 Shared Media</span>
              </div>

              <Image
                src="/img/blog/1.jpg"
                alt="Blog"
                width={800}
                height={400}
                className="w-full h-[340px] object-cover rounded"
              />

              <p>
                Nullam. Facilisis tempor rhoncus at. Tincidunt tempus lacus
                donec pulvinar fusce metus class cras litora condimentum
                inceptos senectus curae; mollis amet consectetuer urna mi tempus
                nisi sociis velit dis, suscipit lectus senectus cursus tincidunt
                sit primis eros semper luctus.
              </p>
              <p>
                Aenean augue, sociosqu netus varius sollicitudin. Pharetra
                senectus sem ornare. Fermentum mus hymenaeos. Mi molestie.
                Ultrices arcu tellus mattis, et vitae posuere pede fames per.
                Elit. Mollis. Ridiculus tristique. Facilisis feugiat consequat,
                est per. Interdum potenti. Vitae accumsan diam neque risus
                mollis parturient massa porta scetur primis magnis tincidunt
                tempus sed semper integer semper penatibus ultricies nisi
                natoque fames.
              </p>

              <blockquote className="border-l-4 border-[#aa8453] bg-[#f8f5f0] px-6 py-4 italic leading-loose text-gray-600">
                Penatibus suspendisse urna suspendisse class nascetur eros nisl
                blandit dignissim etiam rhoncus condimentum mollis. Montes urna,
                tincidunt quis. Amet faucibus torquent eros, fusce nullam
                accumsan sem odio facilisis curae; per pretium, inceptos vivamus
                mollis accumsan. Laoreet tincidunt est praesent lorem cursus
                pellentesque.
              </blockquote>

              <p>
                Scelerisque. Cubilia ultrices sociis interdum augue.
                Sollicitudin accumsan enim vel quisque semper at Aliquam potenti
                velit rutrum mus erat amet dapibus sit facilisi aliquam lorem ad
                vestibulum litora, parturient non sagittis tellus litora.
                Viverra Tristique proin commodo et quisque. Torquent convallis
                imperdiet vulputate cubilia a consectetuer tellus laoreet
                nascetur euismod potenti inceptos enim mauris curabitur
                consequat.
              </p>

              <p>
                Nisi amet Nisl urna facilisis ad curae;. Amet habitasse
                adipiscing nibh mollis felis leo semper. Semper lobortis
                interdum class rutrum nonummy. Hymenaeos, purus eu. Semper
                dictum mattis, magnis platea facilisis dapibus arcu suscipit
                litora porttitor odio luctus inceptos lectus curabitur erat
                platea faucibus.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center text-sm gap-2 border-t pt-4 text-gray-600">
                <span className="font-semibold text-lg leading-loose text-black">
                  Tags:
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  Food
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  Wealth{" "}
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  Nutration
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  Life
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  home
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  Fitness
                </span>
                <span className="border border-gray-200 px-2 py-1 text-xs">
                  Wellness
                </span>
              </div>

              {/* Share Icons */}
              <div className="flex space-x-4 text-gray-400 pt-4">
                <div className="flex gap-4 mt-4 text-xs text-gray-400">
                  <Link
                    href="#"
                    className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                  >
                    <FaFacebookF className="hover:text-white transition" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                  >
                    <FaTwitter className="hover:text-white transition" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                  >
                    <FaLinkedinIn className="hover:text-white transition" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
                  >
                    <FaInstagram className="hover:text-white transition" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Comments */}
            <div className="mt-10 bg-white p-6  shadow-sm">
              <h3 className="text-xl font-bold mb-4">(02) Comments</h3>
              <div className="flex gap-4 mb-6">
                <Image
                  src="/img/blog/1.jpg"
                  width={48}
                  height={48}
                  alt="Commenter"
                  className="w-12 h-12 rounded-full"
                />
                <div className="blog-content">
                  <h4 className="font-semibold leading-loose">Suraj Jamdade</h4>
                  <p className="text-xs text-gray-400 mb-1">
                    Posted on 25 May 2025 -{" "}
                    <span>
                      <Link href="#" className="text-[#aa8453]">
                        Reply
                      </Link>
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                    scelerisque ante sollicitudin. Cras purus odio, vestibulum
                    in vulputate at, tempus viverra turpis. Fusce condimentum
                    nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                    in faucibus.
                  </p>
                </div>
              </div>
            </div>

            {/*write Comments */}
            <div className="mt-10 bg-white p-6  shadow-sm">
              <h3 className="text-xl font-bold mb-4">Write A Comments</h3>

              <div>
                <div className="flex gap-4 mb-6">
                  <input
                    type="text"
                    name="search"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#aa8453]"
                  />
                  <input
                    type="text"
                    name="search"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#aa8453]"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message"
                  className="w-full border mb-5 border-gray-300 rounded px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#aa8453]"
                ></textarea>
                <CustomBtn
                  href="#"
                  className="bg-gray-900 text-white px-6 py-2  hover:bg-gray-800 transition flex gap-2 items-center justify-center"
                >
                  Submit
                </CustomBtn>
              </div>
            </div>
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
      </div>
    </section>
  );
};

export default BlogDetails;
