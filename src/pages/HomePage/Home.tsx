import React from "react";
import Hero from "./component/Hero";
import BookCollection from "./component/BookCollection";
import WhyChooseUs from "./component/WhyChooseUs";
import HowItWorks from "./component/HowItWorks";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";

const Home = () => {
  return (
    <>
      <Hero />
      <BookCollection />
      <WhyChooseUs />
      <HowItWorks />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default Home;
