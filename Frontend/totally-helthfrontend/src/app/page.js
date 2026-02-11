import Image from "next/image";
import Hero from "@/app/pages/Hero/Hero";
import Goal from "@/app/pages/goal/Goal";
import About from "@/app/pages/about/About";
import Brands from "@/app/pages/brands/Brands";
import Recipes from "@/app/pages/recipes/Recipes";
import HowItWorks from "@/app/pages/howItWorks/HowItWorks";
import Counter from "@/app/pages/counter/Counter";
import Compare from "@/app/pages/compare/Compare";
import WhyChoose from "@/app/pages/whyChoose/WhyChoose";
import IntroVideo from "@/app/pages/introVideo/IntroVideo";
import Testimonials from "@/app/pages/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Goal />
      <About />
      <Brands />
      <Recipes />
      <HowItWorks />
      <Counter />
      <Compare />
      <WhyChoose />
      <IntroVideo />
      <Testimonials />
    </>
  );
}
