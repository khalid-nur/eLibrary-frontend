import React from "react";
import NavBar from "./component/NavBar";
import Hero from "./component/Hero";
import BookCollection from "./component/BookCollection";
import WhyChooseUs from "./component/WhyChooseUs";
import HowItWorks from "./component/HowItWorks";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <BookCollection />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
};

export default Home;
