import CustomBtn from "@/app/components/CustomBtn";
import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-[#f8f5f0] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-sm text-gray-500">
            <span className="text-[#aa8453]">Home</span> /{" "}
            <span>Contact Us</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line">
              Send Message
            </h3>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message:
                </label>
                <textarea
                  rows="6"
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 focus:outline-none resize-none"
                ></textarea>
              </div>

              <CustomBtn
                children="Send Message"
                className="px-4 py-2"
                href="#"
              />
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-widest down-line">
              Get In Touch
            </h3>
            <p className="text-sm text-gray-600 mb-6 tracking-wider">
              Nullam vel enim risus. Integer rhoncus hendrerit sem egestas
              porttitor.
            </p>

            <div className="space-y-5 text-sm text-gray-700">
              <div>
                <h6 className="font-semibold text-lg mb-3 text-black">
                  Office Address :
                </h6>
                <p className="tracking-wider">
                  Floor 15, Tower X2, Cluster X, Jumeirah Lakes Towers, Dubai,
                  UAE. P.O. Box 391150
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-lg mb-3 text-black">
                  Contact Number :
                </h6>
                <p className="tracking-wider">
                  (+91) 9090909090, (+91) 9876543210
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-lg mb-3 text-black">
                  Email Address :
                </h6>
                <p className="tracking-wider">
                  Info@mealplans.com, support@mealplans.com
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-lg mb-3 text-black">
                  Career Info
                </h6>
                <p className="tracking-wider">
                  If you’re interested in employment opportunities at Unicoder,
                  please email us:
                  <br />
                  <span className="text-[#aa8453]">support@mealplans.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
