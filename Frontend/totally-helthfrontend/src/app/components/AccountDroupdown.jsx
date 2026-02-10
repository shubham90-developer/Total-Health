"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown, FaGlobe, FaUser } from "react-icons/fa";
import CustomBtn from "@/app/components/CustomBtn";
import Link from "next/link";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex text-xs items-center gap-2 py-2 px-3 font-medium text-gray-800 hover:text-black border border-gray-200 cursor-pointer hover:bg-green-50"
      >
        <FaUser />
        My Profile
        <FaCaretDown />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
          <Link
            href={"/profile"}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Profile
          </Link>

          <Link
            href={"/login"}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500 font-bold border-t border-gray-300"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
