import React from "react";
import NavBar from "./component/NavBar";
import Hero from "./component/Hero";
import BookCollection from "./component/BookCollection";
import WhyChooseUs from "./component/WhyChooseUs";
import HowItWorks from "./component/HowItWorks";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import Footer from "./component/Footer";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <BookCollection />
      <WhyChooseUs />
      <HowItWorks />
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Home;
