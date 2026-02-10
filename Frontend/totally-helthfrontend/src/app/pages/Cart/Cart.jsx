import React from "react";
import Image from "next/image";
import CustomBtn from "@/app/components/CustomBtn";

const mockCartItems = [
  {
    id: 1,
    title: "Sweet Chili Chicken Bowl",
    price: 52,
    quantity: 2,
    img: "/img/Restaurants/3.jpg",
  },
  {
    id: 2,
    title: "Power Chicken Bowl",
    price: 49,
    quantity: 1,
    img: "/img/Restaurants/4.jpg",
  },
];

const Cart = () => {
  const total = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Cart
          </h3>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {mockCartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border border-gray-200 bg-green-50 rounded-lg p-4 shadow-sm"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-24 h-24"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    Price: AED {item.price} × {item.quantity}
                  </p>
                  <p>Your choice of Non-Veg Bowl:</p>
                  <ul className="text-xs font-medium list-disc mx-7">
                    <li>Sweet Chili Chicken Bowl</li>
                    <li>No Rice</li>
                    <li>Protien Cheesecake cup</li>
                    <li>Black Lemonade</li>
                  </ul>
                </div>
                <p className="text-right font-bold text-gray-700">
                  AED {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-gray-50 space-y-4 h-fit">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h4>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>AED {total}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery charge </span>
              <span>AED 7</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-900 border-t pt-4">
              <span>Total</span>
              <span>AED {total}</span>
            </div>
            <CustomBtn href="checkout" className="px-4 py-2 block">
              Proceed to Checkout
            </CustomBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
