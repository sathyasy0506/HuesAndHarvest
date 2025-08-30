import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./components/shop/shop";
import Footer from "./components/footer";
import ProductPage from "./components/Products/ProductPage";
import RatingsAndReviews from "./components/Products/rating";
import GlobalCursor from "./components/GlobalCursor";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";
import ScrollIndicator from "./components/Common/ScrollIndicator";
import Cart from "./components/Cart/Cart";
import AuthPage from "./components/Auth/Auth";
import AccountDashboard from "./components/MyAccount/AccountDashboard";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  const [loading, setLoading] = useState(true);
  const footerRef = useRef(null); // ✅ Footer ref for scroll indicator

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />

      {/* Custom Cursor */}
      <GlobalCursor />

      {/* Main Site */}
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <div className="pt-16 max-w-8xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productName" element={<ProductPage />} />
            <Route path="/reviews" element={<RatingsAndReviews />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account" element={<AccountDashboard />} />
          </Routes>
        </div>

        {/* Footer with ref */}
        <Footer ref={footerRef} />

        {/* Scroll indicator */}
        <ScrollIndicator footerRef={footerRef} />
      </div>

      {/* Loader Overlay */}
      <Loader isLoading={loading} />
    </Router>
  );
}

export default App;
