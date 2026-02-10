import Image from "next/image";
const TotallyHealthy = () => {
  return (
    <>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Discover the Totally Healthy Fit
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get full control over your activity and nutrition data in one
              place with our brand-new fitness tracker.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Image
              src="/img/features/1.avif"
              alt="totallyhealthy"
              width={1000}
              height={1000}
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TotallyHealthy;
