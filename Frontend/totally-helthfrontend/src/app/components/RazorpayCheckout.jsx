"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import CustomBtn from "./CustomBtn";

const RazorpayCheckout = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Razorpay) {
      setLoaded(true);
    }
  }, []);

  const handlePayment = () => {
    if (!loaded || typeof window.Razorpay !== "function") {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Test key
      amount: 50000,
      currency: "INR",
      name: "Test Order",
      description: "Test Payment",
      handler: function (response) {
        alert("Payment successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#10B981",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setLoaded(true)}
      />

      <div className="mt-6">
        <CustomBtn onClick={handlePayment} className="px-4 py-3 block">
          Place To Order
        </CustomBtn>
      </div>
    </>
  );
};

export default RazorpayCheckout;
