import React from "react";
import NavBar from "./component/NavBar";
import Hero from "./component/Hero";
import BookCollection from "./component/BookCollection";
import WhyChooseUs from "./component/WhyChooseUs";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <BookCollection />
      <WhyChooseUs />
    </>
  );
};

export default Home;
