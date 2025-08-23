import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import "./index.css";
import Shop from "./components/shop/shop";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
