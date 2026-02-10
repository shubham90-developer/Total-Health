"use client";
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl cursor-pointer border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
