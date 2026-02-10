import React from "react";
import PartnerInHealth from "@/app/pages/PartnerInHealth/PartnerInHealth";
import Benefits from "../pages/PartnerInHealth/Benefits";
import BenifitsCards from "../pages/PartnerInHealth/BenifitsCards";
import WhyPartner from "../pages/PartnerInHealth/WhyPartner";
import Testimonials from "../pages/testimonials/Testimonials";

export const metadata = {
  title: "Partner In Health",
  description: "Partner In Health",
};

const PartnerInHealthPage = () => {
  return (
    <>
      <PartnerInHealth />
      <Benefits />
      <BenifitsCards />
      <WhyPartner />
      <Testimonials />
    </>
  );
};

export default PartnerInHealthPage;
