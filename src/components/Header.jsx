import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoDark from "../assets/images/H&H.png";
import { Search, ShoppingBag, User, X } from "lucide-react";
import { ENDPOINTS } from "../api/api";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext"; // ✅ useAuth

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [products, setProducts] = useState([]);
  const { cartCount, fetchCartCount } = useCart(); // ✅ from context
  const searchContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ check login state

  // Slugify function
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(ENDPOINTS.LIST_PRODUCTS());
        const data = await response.json();
        const formatted = data.products.map((p) => ({
          id: p.id,
          name: p.name,
          price: `₹${p.price}`,
          image: p.image,
        }));
        setProducts(formatted);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const token = localStorage.getItem("hh_token"); // 🔑 stored after login

  // ✅ Fetch Cart Count is imported from useCart context, no need to redeclare here

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user) fetchCartCount();
  }, [user, location]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "HOME", path: "/" },
    // { name: "SHOP", path: "/shop" },
    { name: "SNACKS", path: "/snacks" },
    { name: "COMBOS", path: "/combos" },
    { name: "ABOUT", path: "/about" },
    { name: "BLOG", path: "/blog" },
  ];

  const isActive = (path) =>
    path === "/" && (location.pathname === "/" || location.pathname === "/home")
      ? true
      : location.pathname === path;

  const headerTextColor = isScrolled
    ? "text-white"
    : location.pathname === "/" ||
      location.pathname === "/home" ||
      location.pathname === "/auth" ||
      location.pathname.startsWith("/blog") // ✅ blogs included
    ? "text-white"
    : "text-black";

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        backgroundColor: isScrolled ? "rgba(35, 69, 65, 0.6)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",
        transition: "background-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* LEFT (Logo - desktop) */}
          <Link to="/" className="hidden md:flex items-center select-none">
            <img
              src={LogoDark}
              alt="Hues & Harvest Logo"
              className="h-18 md:h-20 w-auto"
            />
          </Link>

          {/* CENTER (Nav - desktop) */}
          <nav className="hidden md:flex items-center gap-10 relative">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium tracking-wide transition-all duration-200
                ${
                  isActive(item.path)
                    ? `${headerTextColor} scale-105 -translate-y-0.5 font-semibold text-[#E5B676]`
                    : headerTextColor
                }
                hover:scale-105 hover:-translate-y-0.5 hover:font-semibold
              `}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT (Icons - desktop) */}
          <div className="hidden md:flex items-center gap-6 relative">
            {/* Search */}
            <div
              className="relative w-8 h-8 flex items-center justify-center"
              ref={searchContainerRef}
            >
              {showSearch ? (
                <div className="absolute right-0 top-0 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="flex items-center p-1">
                    <input
                      type="text"
                      className="w-64 p-2 rounded outline-none text-black"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setShowSearch(false);
                        setSearchTerm("");
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {searchTerm && filteredProducts.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            navigate(`/product/${slugify(product.name)}`, {
                              state: { id: product.id },
                            });
                            setShowSearch(false);
                            setSearchTerm("");
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {product.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchTerm && filteredProducts.length === 0 && (
                    <div className="absolute top-full left-0 w-full p-2 bg-white text-gray-500 rounded-md shadow-lg border border-gray-200">
                      No products found
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className={`${headerTextColor} hover:scale-110 transition`}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart (only if logged in) */}
            {user && (
              <Link to="/cart" className="relative">
                <ShoppingBag
                  className={`${headerTextColor} w-5 h-5 hover:scale-110 transition`}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-[6px] -right-2 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* User → Auth or Account */}
            <Link to={user ? "/account" : "/auth"}>
              <button
                className={`${headerTextColor} hover:scale-110 transition`}
              >
                <User className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between w-full md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${headerTextColor} transition`}
            >
              <svg
                className="w-7 h-7"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link to="/" className="flex items-center select-none">
              <img
                src={LogoDark}
                alt="Hues & Harvest Logo"
                className="h-16 md:h-20 w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSearch(true)}
                className={`${headerTextColor} hover:scale-110 transition`}
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Cart only if logged in */}
              {user && (
                <Link to="/cart" className="relative">
                  <ShoppingBag
                    className={`${headerTextColor} w-6 h-6 hover:scale-110 transition`}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-[6px] -right-2 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4  flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-20 left-0 w-full h-[calc(100vh-5rem)] z-40 bg-white transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-semibold transition ${
                isActive(item.path)
                  ? "text-black scale-105 -translate-y-0.5"
                  : "text-black"
              } hover:text-black`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {item.name}
            </Link>
          ))}

          {/* Account only if logged in */}
          {user && (
            <Link
              to="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-semibold text-black hover:text-black transition"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Account
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:hidden"
          style={{
            backgroundColor: "rgba(35, 69, 65, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div className="w-full max-w-md mx-4 rounded-lg shadow-xl border border-gray-200 bg-white">
            <div className="flex items-center p-4 border-b border-gray-200">
              <input
                type="text"
                className="flex-1 p-2 rounded outline-none text-black"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                }}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {searchTerm && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchTerm("");
                      navigate(`/product/${slugify(product.name)}`, {
                        state: { id: product.id },
                      });
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">{product.price}</p>
                    </div>
                  </div>
                ))
              ) : searchTerm ? (
                <p className="p-4 text-center text-gray-500">
                  No products found
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
