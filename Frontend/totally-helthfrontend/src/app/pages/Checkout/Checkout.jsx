import CustomBtn from "@/app/components/CustomBtn";
import RazorpayCheckout from "@/app/components/RazorpayCheckout";
import Link from "next/link";
import React from "react";

const Checkout = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Login Notice */}
        <div className="border-l-4 text-black border-green-500 bg-green-50 px-4 py-2 text-sm mb-8">
          Returning customer?{" "}
          <Link href="/login" className="text-green-600 underline">
            Click here to Log In
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left - Billing Form */}
          <div className="lg:col-span-2 bg-green-50 p-6 rounded-lg shadow space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Billing Details
            </h3>

            <form className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="input"
                />
                <input type="text" placeholder="Country *" className="input" />
                <input type="text" placeholder="Address *" className="input" />
                <input
                  type="text"
                  placeholder="Town / City *"
                  className="input"
                />
              </div>

              {/* State and Zip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="State / County *"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Postcode / Zip *"
                  className="input"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="input"
                />
                <input type="tel" placeholder="Phone *" className="input" />
              </div>

              <textarea
                rows="4"
                placeholder="Order Notes"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </form>
          </div>

          {/* Right - Summary + Payment */}
          <div className="space-y-6">
            {/* Checkout Summary */}
            <div className="border border-gray-300 rounded-lg p-6 shadow-sm bg-gray-50">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">
                Checkout Summary
              </h4>
              <div className="space-y-2 text-black text-sm">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>AED 150.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>AED 7.00</span>
                </div>

                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>AED 157.00</span>
                </div>
                <div className="flex justify-between font-bold text-green-600">
                  <span>Payable Total</span>
                  <span>AED 157.00</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border text-black border-gray-300 rounded-lg p-6 shadow-sm bg-gray-50">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">
                Payment Method
              </h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="payment"
                      defaultChecked
                      className="mr-2"
                    />
                    <label htmlFor="bank" className="font-semibold">
                      Direct Bank Transfer
                    </label>
                  </div>
                  <p className="text-gray-600 mt-1 text-xs">
                    Make your payment directly into our bank account. Use your
                    Order ID as the payment reference. Your order won’t be
                    shipped until the funds have cleared.
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    className="mr-2"
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    className="mr-2"
                  />
                  <label htmlFor="cod">Cash On Delivery</label>
                </div>
              </div>

              <div className="mt-4">
                <RazorpayCheckout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
