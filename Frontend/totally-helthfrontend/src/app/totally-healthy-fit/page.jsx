"use client";

import React from "react";
import TotallyHealthy from "@/app/pages/TotallyHealthy/TotallyHealthy";
import Benefits from "@/app/pages/TotallyHealthy/Benefits";
import Track from "@/app/pages/TotallyHealthy/Track";
import HowWorks from "@/app/pages/TotallyHealthy/HowWorks";
import Designed from "@/app/pages/TotallyHealthy/Designed";
import Place from "@/app/pages/TotallyHealthy/Place";

const TotallyHealthyPage = () => {
  return (
    <>
      <TotallyHealthy />
      <Benefits />
      <Track />
      <HowWorks />
      <Designed />
      <Place />
    </>
  );
};

export default TotallyHealthyPage;
