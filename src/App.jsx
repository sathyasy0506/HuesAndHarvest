import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Toaster from "./components/Common/Toaster";
import { CartProvider } from "./contexts/CartContext";
import SingleBlog from "./components/Blog/SingleBlog";
import BlogCard from "./components/Blog/BlogCard";
import BlogList from "./components/Blog/BlogList";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children, requiresAuth }) => {
  const { user } = useAuth();

  if (requiresAuth && !user) {
    return <Navigate to="/auth" />;
  }
  if (!requiresAuth && user) {
    return <Navigate to="/account" />;
  }
  return children;
};

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    // ⏳ Ensure splash loader shows for at least 2s
    const timer = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // final loader state depends on BOTH
  const loading = !(splashDone && dataLoaded);

  const handleDataLoaded = () => {
    setDataLoaded(true);
  };

  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <CartProvider>
          <GlobalCursor />
          <div className="min-h-screen flex flex-col relative">
            <Header />
            <div className="pt-16 max-w-8xl mx-auto w-full">
              <Routes>
                <Route
                  path="/"
                  element={<Home onDataLoaded={handleDataLoaded} />}
                />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:productName" element={<ProductPage />} />
                <Route path="/reviews" element={<RatingsAndReviews />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<SingleBlog />} />

                {/* ✅ Protected Routes */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute requiresAuth={true}>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute requiresAuth={true}>
                      <AccountDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/auth"
                  element={
                    <ProtectedRoute requiresAuth={false}>
                      <AuthPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer ref={footerRef} />
            <ScrollIndicator footerRef={footerRef} />
          </div>
          <Loader isLoading={loading} />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
