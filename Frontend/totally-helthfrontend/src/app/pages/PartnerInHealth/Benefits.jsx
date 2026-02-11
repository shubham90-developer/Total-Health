"use client";

import CustomBtn from "@/app/components/CustomBtn";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./CompanyDiscountModal";

const Benefits = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Partner in Health Benefits
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Healthier and happier employees means a more productive and
              positive working environment. Benefit from our range of
              specialised PIH services customised to your company needs.
            </p>
          </div>

          <div className="flex justify-center items-center mb-5">
            <Image
              src="/img/partner/1.webp"
              width={1000}
              height={1000}
              alt="banner"
              className="w-xl h-full object-contain"
            />
          </div>
          <div className="flex justify-center items-center">
            <CustomBtn
              className="px-10 py-2"
              onClick={() => setModalOpen(true)}
            >
              Start Your Own Story
            </CustomBtn>
          </div>
        </div>
      </section>

      {/* Modal with form inside */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {/* You can put your full form component here */}
        <h2 className="text-2xl font-bold mb-4">Sign up for exclusive deals</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <select className="w-full border rounded-md px-3 py-2 text-gray-500">
            <option>Select your company</option>
          </select>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="tel"
            placeholder="Contact number (WhatsApp)"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Promo Code"
            className="w-full border rounded-md px-3 py-2"
          />
          <CustomBtn type="submit" className="px-6 py-2 block">
            Sign Up & Unlock →
          </CustomBtn>
        </form>
      </Modal>
    </>
  );
};

export default Benefits;
