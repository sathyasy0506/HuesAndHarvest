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
import FreshInsights from "./FreshInsights";
import FreshnessSection from "./FreshnessSection";
import CaProductListing from "./CaProductListing";
import ProductCarousel from "./ProductCarousel";
import ProductSlider from "./ProductSlider";
import ProductShowcase from "./ProductShowcase";

const Home = () => {
  return (
    <>
      {/* Hero without background */}
      <div className="-mt-16 overflow-hidden">
        <Gradient>
          <Hero />
          <ProductCategories />
          <ProductListing />
          <Promotion />
          <ProductShowcase />
          <Features />
          <CaProductListing />
          <FreshnessSection />
          <FeaturedProduct />
          <Testimonials />
          <FreshInsights />
          <InstagramFeed />
          {/* <BrandStory /> */}
          {/* <Process /> */}
          {/* <ProductCarousel /> */}
          {/* <ProductSlider /> */}
          {/* <Newsletter /> */}
        </Gradient>
      </div>
    </>
  );
};

export default Home;
