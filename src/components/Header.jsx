import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoDark from "../assets/images/dark.png";
import { Search, ShoppingBag, User, Sun, Moon, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [products, setProducts] = useState([]);

  // Slugify function (same as in Shop component)
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-") // spaces → hyphens
      .replace(/[^\w-]+/g, ""); // remove special characters

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://admin.huesandharvest.com/api/list_products.php"
        );
        const data = await response.json();
        // Map to only include id, name, price, image
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms debounce

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedPreference = localStorage.getItem("darkMode");
    const initialDarkMode =
      storedPreference !== null ? JSON.parse(storedPreference) : false;
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navigation = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
  ];

  const isActive = (path) =>
    path === "/" && (location.pathname === "/" || location.pathname === "/home")
      ? true
      : location.pathname === path;

  const headerTextColor = darkMode
    ? "text-white"
    : location.pathname === "/" || location.pathname === "/home"
    ? "text-white"
    : !hideHeader && lastScrollY > 50
    ? "text-white"
    : "text-black";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      } ${
        !hideHeader && lastScrollY > 50
          ? "backdrop-blur-xl bg-[#234541]/80 border-transparent"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* LEFT (Logo - desktop) */}
          <Link to="/" className="hidden md:flex items-center select-none">
            <img
              src={LogoDark}
              alt="Hues & Harvest Logo"
              className="h-40 md:h-44 w-auto"
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
                    ? `${headerTextColor} scale-105 -translate-y-0.5 font-semibold`
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

          {/* RIGHT (Icons + Dark Mode - desktop) */}
          <div className="hidden md:flex items-center gap-6 relative">
            {/* Search container - fixed width to prevent layout shift */}
            <div
              className="relative w-8 h-8 flex items-center justify-center"
              ref={searchContainerRef}
            >
              {showSearch ? (
                <div className="absolute right-0 top-0 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center p-1">
                    <input
                      type="text"
                      className="w-64 p-2 rounded outline-none text-black dark:text-white dark:bg-gray-800"
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
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {searchTerm && filteredProducts.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                            <span className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-300">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchTerm && filteredProducts.length === 0 && (
                    <div className="absolute top-full left-0 w-full p-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
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

            <Link to="/cart">
              <button
                className={`${headerTextColor} hover:scale-110 transition`}
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/auth">
              <button
                className={`${headerTextColor} hover:scale-110 transition`}
              >
                <User className="w-5 h-5" />
              </button>
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${headerTextColor} hover:scale-110 transition`}
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
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
                className="h-40 md:h-44 w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSearch(true)}
                className={`${headerTextColor} hover:scale-110 transition`}
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                className={`${headerTextColor} hover:scale-110 transition`}
              >
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-20 left-0 w-full h-[calc(100vh-5rem)] z-40 bg-[var(--sho-bg-color)] transform transition-transform duration-300 ease-in-out
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
                  ? "text-white scale-105 -translate-y-0.5"
                  : "text-white"
              } hover:text-white`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-semibold text-white hover:text-white transition"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Account
          </button>

          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-xl font-medium text-white hover:text-white transition"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {darkMode ? (
              <>
                <Sun className="w-6 h-6" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-6 h-6" /> Dark Mode
              </>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center pt-20 md:hidden">
          <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <input
                type="text"
                className="flex-1 p-2 rounded outline-none text-black dark:text-white dark:bg-gray-800"
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
                className="ml-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {searchTerm && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : searchTerm ? (
                <p className="p-4 text-center text-gray-500 dark:text-gray-300">
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
