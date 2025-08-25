import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Shop from "./components/shop/shop";
import Footer from "./components/footer";
// import ProductPage from "./components/Products/ProductPage";
import RatingsAndReviews from "./components/Products/rating";
import GlobalCursor from "./components/GlobalCursor";
import Loader from "./components/Loader";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import ProductPage from "./components/Products/ProductPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />

      {/* Custom Cursor */}
      <GlobalCursor />

      {/* Main Site (always rendered) */}
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <div className="pt-16 max-w-8xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productName" element={<ProductPage />} />
            <Route path="/reviews" element={<RatingsAndReviews />} />
          </Routes>
        </div>
        <Footer />
      </div>

      {/* Loader Overlay (fades out smoothly) */}
      <Loader isLoading={loading} />
    </Router>
  );
}

export default App;
