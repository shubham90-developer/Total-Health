import React from "react";
import About from "@/app/pages/about/About";
import Counter from "@/app/pages/counter/Counter";
import Leadership from "@/app/pages/about/Leadership";
import OurFood from "@/app/pages/about/OurFood";
import OurServices from "@/app/pages/OurServices/OurServices";

const meta = {
  title: "About us",
  description: "About us",
};

const AboutPage = () => {
  return (
    <>
      <About />
      <Counter />
      <Leadership />
      <OurFood />
      <OurServices />
    </>
  );
};

export default AboutPage;
