import Image from "next/image";
import React from "react";

const Leadership = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="w-full h-64 md:h-100 relative rounded-lg overflow-hidden shadow-md">
              <Image
                src="/img/t1.jpg"
                alt="Leadership Banner"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">
              Totally HealthyLeadership
            </h2>

            <div className="mb-6">
              <p className="text-sm font-semibold text-green-400">
                Andreas L. Borgmann
              </p>
              <p className="text-xs text-gray-600">
                Totally HealthyCo-Founder and Chief Executive Officer
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-800">
              <p>
                We’re not your typical food company. Since 2010, we’ve been on a
                mission to change the way people think about food—bringing full
                transparency to our menu and building our nutrition philosophy
                on the foundations of the paleo lifestyle.
              </p>
              <p>
                For us, food is so much more than fuel. It’s the cornerstone of
                a healthy, fulfilling life. That’s why we’re committed to
                empowering people with choices that make living well both easy
                and delicious. Because true healthcare starts with
                prevention—and that begins with what we eat.
              </p>
              <p className="font-semibold">
                Totally Healthyisn’t just a business to me; it’s a way of life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
