import Image from "next/image";

const TrustSection = ({ banner }) => {
  if (!banner) return null;

  return (
    <div className="flex flex-col items-center gap-4 md:items-start md:flex-row md:justify-between md:gap-10 px-4 py-6">
      {/* Top Section */}
      <div className="flex items-center flex-wrap gap-2 text-sm md:text-base">
        <Image src="/img/icons/1.webp" alt="Google" width={20} height={20} />

        <span className="text-gray-800 font-medium">
          {banner.googleReviewCount || "1000+"}
        </span>

        <div className="flex text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <span className="text-gray-500">|</span>
        <span className="text-gray-800">Split payment with</span>

        {banner.certLogo && (
          <Image
            src={banner.certLogo}
            alt="Certification Logo"
            width={60}
            height={20}
          />
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
        <Image
          src="/img/icons/2.webp"
          alt="Certification"
          width={100}
          height={50}
        />
      </div>
    </div>
  );
};

export default TrustSection;
