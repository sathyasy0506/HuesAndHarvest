import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import BlogList from "./components/Blog/BlogList";
import AccordionUsage from "./components/Products/Accordian";
import Snacks from "./components/shop/Snacks";
import Combo from "./components/shop/Combo";
import ProductCategories from "./components/Home/ProductCategories";
import Checkout from "./components/Checkout/Checkout";
import FeaturedProduct from "./components/Home/FeaturedProduct";
import Hero from "./components/Home/Hero";
import OrderDetail from "./components/Orders/OrderDetails";
import OrdersList from "./components/Orders/OrdersList";
import TermsAndConditions from "./components/Policy/TermsAndConditions";
import ShippingPolicy from "./components/Policy/ShippingPolicy";
import { Cancel } from "@mui/icons-material";
import PrivacyPolicy from "./components/Policy/PrivacyPolicy";
import CancellationsAndRefunds from "./components/Policy/CancellationsAndRefunds";

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

// ✅ AppContent separated so useLocation works inside Router
function AppContent() {
  const [splashDone, setSplashDone] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const footerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // ⏳ Ensure splash loader shows for at least 2s
    const timer = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ If route is NOT home, mark dataLoaded immediately
  useEffect(() => {
    if (location.pathname !== "/") {
      setDataLoaded(true);
    }
  }, [location]);

  const handleDataLoaded = () => {
    setDataLoaded(true);
  };

  // final loader state depends on BOTH
  const loading = !(splashDone && dataLoaded);

  return (
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
              <Route path="/snacks" element={<Snacks />} />
              <Route path="/combos" element={<Combo />} />
              <Route path="/product/:productName" element={<ProductPage />} />
              <Route path="/reviews" element={<RatingsAndReviews />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/accordian" element={<AccordionUsage />} />
              <Route path="/blog/:id" element={<SingleBlog />} />
              <Route path="/catagories" element={<ProductCategories />} />
              <Route path="/showcase" element={<FeaturedProduct />} />
              <Route path="/Hero" element={<Hero />} />

              {/* Policy Pages */}

              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route
                path="/cancellation-and-refunds"
                element={<CancellationsAndRefunds />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* ✅ Protected Routes */}

              <Route
                path="/orders"
                element={
                  <ProtectedRoute requiresAuth={true}>
                    <OrdersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute requiresAuth={true}>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute requiresAuth={true}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
