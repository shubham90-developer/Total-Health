import React from "react";

const services = [
  {
    title: "South Heights",
    image: "/img/locations/1.jpg",
    address: "123 Wellness St, Dubai Marina, Dubai, UAE",
  },
  {
    title: "Motor City",
    image: "/img/locations/2.jpg",
    address: "45 Healthy Ave, Downtown Abu Dhabi, UAE",
  },
  {
    title: " JLT",
    image: "/img/locations/3.jpg",
    address: "78 FitZone Rd, Al Ain City Center, UAE",
  },
  {
    title: " Business Bay",
    image: "/img/locations/4.jpg",
    address: "78 FitZone Rd, Al Ain City Center, UAE",
  },
  {
    title: "Mirdif",
    image: "/img/locations/5.jpg",
    address: "78 FitZone Rd, Al Ain City Center, UAE",
  },
  {
    title: "Dubai Healthcare City",
    image: "/img/locations/6.jpg",
    address: "78 FitZone Rd, Al Ain City Center, UAE",
  },
];

const Locations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Locations
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We have branches across the UAE
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer text-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white  overflow-hidden hover:shadow-lg transition duration-300 border border-dotted border-gray-900 rounded-lg"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-800">
                  {service.title}
                </h4>
              </div>

              {/* Hidden Address (shown on hover) */}
              <div className="absolute inset-0 bg-gray-900 bg-opacity-70 text-white flex items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 px-4">
                <p className="text-sm">{service.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
