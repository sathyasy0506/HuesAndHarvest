import { useEffect } from "react";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import ProductCategories from "./ProductCategories";
import InstagramFeed from "./InstagramFeed";
import ProductListing from "./ProductListing";
import Gradient from "../Background/Gradient";
import FeaturedProducts from "./FeaturedProduct";
import Promotion from "./Promtion";
import FreshInsights from "./FreshInsights";
import FreshnessSection from "./FreshnessSection";
import CaProductListing from "./CaProductListing";
import ProductShowcase from "./ProductShowcase";
import { ENDPOINTS } from "../../api/api";

const Home = ({ onDataLoaded }) => {
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetch(ENDPOINTS.HH_SECTIONS()).then((res) => res.json()),
          fetch(ENDPOINTS.PRODUCT_COUNT()).then((res) => res.json()),
          fetch(ENDPOINTS.LIST_PRODUCTS()).then((res) => res.json()),
          fetch(ENDPOINTS.LIST_COMBO()).then((res) => res.json()),
          fetch(ENDPOINTS.FEATURED_PRODUCTS()).then((res) => res.json()),
          fetch(ENDPOINTS.ADD_TO_CART()).then((res) => res.json()),
          fetch(ENDPOINTS.REVIEWS()).then((res) => res.json()),
          fetch(ENDPOINTS.INSTAGRAM_FEED()).then((res) => res.json()),
        ]);
      } catch (error) {
        console.error("❌ Error loading home data:", error);
      } finally {
        onDataLoaded();
      }
    };

    fetchAllData();
  }, [onDataLoaded]);

  return (
    <div className="-mt-16 overflow-hidden">
      <Gradient>
        <div className="flex flex-col gap-16">
          <Hero />
          <ProductCategories />
          <CaProductListing />
          <Promotion />
          <ProductShowcase />
          <Features />
          <FreshnessSection />
          <FeaturedProducts />
          <Testimonials />
          <FreshInsights />
          <InstagramFeed />
        </div>
      </Gradient>
    </div>
  );
};

export default Home;
