import { useEffect } from "react";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Hero from "./Hero";
import ProductCategories from "./ProductCategories";
import InstagramFeed from "./InstagramFeed";
import ProductListing from "./ProductListing";
import Gradient from "../Background/Gradient";
import FeaturedProduct from "./FeaturedProduct";
import Promotion from "./Promtion";
import FreshInsights from "./FreshInsights";
import FreshnessSection from "./FreshnessSection";
import CaProductListing from "./CaProductListing";
import ProductShowcase from "./ProductShowcase";

const Home = ({ onDataLoaded }) => {
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 🔹 Fetch everything in parallel
        await Promise.all([
          fetch("/api/products").then((res) => res.json()),
          fetch("/api/categories").then((res) => res.json()),
          fetch("/api/insights").then((res) => res.json()),
          fetch("/api/featured").then((res) => res.json()),
          fetch("/api/testimonials").then((res) => res.json()),
          fetch("/api/instagram").then((res) => res.json()),
          // 👉 Add any other API calls your sections need
        ]);
      } catch (error) {
        console.error("❌ Error loading home data:", error);
      } finally {
        // ✅ Always notify App, even if some calls failed
        onDataLoaded();
      }
    };

    fetchAllData();
  }, [onDataLoaded]);

  return (
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
      </Gradient>
    </div>
  );
};

export default Home;
