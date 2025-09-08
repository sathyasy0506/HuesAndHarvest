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
import FeaturedProduct from "./FeaturedProduct";
import Promotion from "./Promtion";

const Home = () => {
  return (
    <>
      {/* Hero without background */}
      <div className="-mt-16 overflow-hidden">
        <Gradient>
          <Hero />
          <BrandStory />
          <ProductListing />
          <Promotion />
          <ProductCategories />
          <Features />
          <FeaturedProduct />
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
