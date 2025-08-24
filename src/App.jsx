import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/home";
import Shop from "./components/shop/shop";
import Footer from "./components/footer";
import ProductPage from "./components/Products/ProductPage";
import RatingsAndReviews from "./components/Products/rating";
import Cursor from "react-animated-cursor";
import GlobalCursor from "./components/GlobalCursor";
import "./index.css";

function App() {
  return (
    <Router>
      {/* Cursor appended to body via portal */}
      <GlobalCursor />

      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-16 max-w-8xl mx-auto w-full">
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
