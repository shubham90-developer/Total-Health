import React from "react";

const WhyPartner = () => {
  return (
    <>
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Partner With Totally healthy
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find out how becoming a Partner in Health benefits your company.
              Create a healthier and happier workforce with exclusive partner
              perks.
            </p>
          </div>

          {/* video ifram autoplay video */}
          <div>
            <iframe
              width="100%"
              height="500"
              src="https://kcallife.com/videos/pih-video.mp4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyPartner;
