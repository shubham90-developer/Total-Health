"use client";

import React, { useEffect, useState } from "react";
import CustomBtn from "@/app/components/CustomBtn";
import { FaAddressBook } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import TrustSection from "../Hero/TrustSection";
import Modal from "./CompanyDiscountModal";

const PartnerInHealth = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  const slideImage = "partner";

  return (
    <div className="relative bg-[#f2fef2] overflow-hidden py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Unlock Partner In Health Perks
            </h1>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              Get the most out of our Partner in Health program. Sign up below
              and claim exclusive partner perks!
            </p>

            {/* 🚀 Open Modal on Click */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <CustomBtn
                onClick={() => setModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition flex gap-2 items-center"
              >
                <FaDiscord /> Activate My Company Discount
              </CustomBtn>

              <CustomBtn
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition flex gap-2 items-center"
              >
                <FaAddressBook /> Become a Partner in Health
              </CustomBtn>
            </div>

            <TrustSection />
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center relative z-10">
            <img
              src={`/img/hero/3.jpg`}
              alt="Partner in Health"
              className="w-full max-w-md mx-auto rounded-bl-[30px] shadow-lg"
            />
          </div>
        </div>
      </div>

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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-1">Sign up my company</h2>
        <p className="text-sm text-gray-500 mb-6">
          Become a Partner in Health and get exclusive benefits with Totally
          healthy.
        </p>

        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full border rounded-md px-3 py-2"
            />
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="tel"
            placeholder="+971 (55) 123 4567"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="text"
            placeholder="Enter your designation"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="text"
            placeholder="Enter company name"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="tel"
            placeholder="Company number"
            className="w-full border rounded-md px-3 py-2"
          />

          <CustomBtn type="submit" className="px-4 py-2 block">
            Sign Up →
          </CustomBtn>
        </form>
      </Modal>
    </div>
  );
};

export default PartnerInHealth;
