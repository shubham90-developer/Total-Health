import React from "react";
import Restaurants from "@/app/pages/Restaurants/Restaurants";
import Collection from "@/app/pages/Restaurants/Collection";

const meta = {
  title: "Our Restaurants",
  description: "Our Restaurants",
};

const RestaurantsPage = () => {
  return (
    <>
      <Restaurants />
      <Collection />
    </>
  );
};

export default RestaurantsPage;
