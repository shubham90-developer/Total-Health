import Image from "next/image";
import React from "react";

const Designed = () => {
  return (
    <>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Designed for comfort and style
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Combination of functionality and fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="w-full">
              <Image
                src="/img/features/c1.webp"
                alt="banner"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full">
              <Image
                src="/img/features/c2.webp"
                alt="banner"
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Designed;
