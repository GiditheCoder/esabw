import React from "react";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Why from "./Why";
import Bookings from "./Bookings";
import Reviews from "./Reviews";
import Gallery from "./Gallery";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Home />
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="why">
        <Why />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="bookings">
        <Bookings />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
