import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Sun, Moon } from "lucide-react";
import LogoDark from "../assets/images/dark.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedPreference = localStorage.getItem("darkMode");
    const initialDarkMode =
      storedPreference !== null ? JSON.parse(storedPreference) : false;
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const navigation = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path) =>
    path === "/" && (location.pathname === "/" || location.pathname === "/home")
      ? true
      : location.pathname === path;

  return (
    <header className="backdrop-blur-md bg-[var(--bg-color)]/70 fixed left-0 top-0 w-full z-50 shadow-sm border-b border-[var(--card-color)] transition">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-16">
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
          <nav className="hidden md:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium tracking-wide transition-all duration-200
                  ${
                    isActive(item.path)
                      ? "text-[var(--dark-gold-color)] scale-105 -translate-y-0.5 font-semibold"
                      : "text-[var(--text-color)]"
                  }
                  hover:text-[var(--dark-gold-color)] hover:scale-105 hover:-translate-y-0.5 hover:font-semibold
                `}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT (Icons + Dark Mode - desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] hover:scale-110 transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] hover:scale-110 transition">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] hover:scale-110 transition">
              <User className="w-5 h-5" />
            </button>
            {/* Dark/Light toggle desktop */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] hover:scale-110 transition"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* MOBILE HEADER (Hamburger + Logo center + Icons right) */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Left: Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] transition"
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

            {/* Center: Logo */}
            <Link to="/" className="flex items-center select-none">
              <img
                src={LogoDark}
                alt="Hues & Harvest Logo"
                className="h-40 md:h-44 w-auto"
              />
            </Link>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] hover:scale-110 transition">
                <Search className="w-6 h-6" />
              </button>
              <button className="text-[var(--text-color)] hover:text-[var(--dark-gold-color)] hover:scale-110 transition">
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Drawer under header) */}
      <div
        className={`fixed top-20 left-0 w-full h-[calc(100vh-5rem)] z-40 bg-[var(--bg-color)] transform transition-transform duration-300 ease-in-out
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
                  ? "text-[var(--dark-gold-color)] scale-105 -translate-y-0.5"
                  : "text-[var(--text-color)]"
              } hover:text-[var(--dark-gold-color)]`}
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {item.name}
            </Link>
          ))}

          {/* Account */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-semibold text-[var(--text-color)] hover:text-[var(--dark-gold-color)] transition"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Account
          </button>

          {/* Dark/Light Mode */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-xl font-medium text-[var(--text-color)] hover:text-[var(--dark-gold-color)] transition"
            style={{ fontFamily: "var(--font-poppins)" }}
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
    </header>
  );
};

export default Header;
