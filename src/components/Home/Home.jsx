import React from "react";
import Features from "./Features";
import Process from "./Process";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Hero from "./Hero";
import BrandStory from "./BrandStory";
import ProductCategories from "./ProductCategories";
import InstagramFeed from "./InstagramFeed";
import ProductListing from "./ProductListing";
import Gradient from "../Background/Gradient";

const Home = () => {
  return (
    <>
      {/* Hero without background */}
      <div className="-mt-16 overflow-hidden">
        <Gradient>
          <Hero />
          <BrandStory />
          <ProductListing />
          <ProductCategories />
          <Features />
          <Process />
          <Testimonials />
          <InstagramFeed />
          <Newsletter />
        </Gradient>
      </div>
    </>
  );
};

export default Home;
