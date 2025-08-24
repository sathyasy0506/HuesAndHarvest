import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Shop from "./components/shop/shop";
import Footer from "./components/footer";
import ProductPage from "./components/Products/ProductPage";
import "./index.css";
import RatingsAndReviews from "./components/Products/rating";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Global container for all page content */}
        <div className="pt-16  max-w-8xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/reviews" element={<RatingsAndReviews />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
