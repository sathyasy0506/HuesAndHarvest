import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Sun, Moon } from "lucide-react";
import LogoDark from "../assets/images/dark.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [bannerOverlay, setBannerOverlay] = useState(true);

  const location = useLocation();

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

  // Scroll listener with pointer peek effect
  useEffect(() => {
    const isPointerAtTop = { current: false };

    const handleScroll = () => {
      if (isPointerAtTop.current) {
        setHideHeader(false); // show header while pointer at top
        return;
      }

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHideHeader(true); // scrolling down
      } else {
        setHideHeader(false); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    const handlePointerMove = (e) => {
      if (e.clientY <= 50) {
        isPointerAtTop.current = true;
        setHideHeader(false);
      } else {
        isPointerAtTop.current = false;
      }
    };

    const handlePointerUp = () => {
      // when pointer released, immediately check scroll again
      isPointerAtTop.current = false;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [lastScrollY]);

  const navigation = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "CONTACT", path: "/product" },
  ];

  const isActive = (path) =>
    path === "/" && (location.pathname === "/" || location.pathname === "/home")
      ? true
      : location.pathname === path;

  // New: decide text color based on scroll
  const headerTextColor = darkMode
    ? "text-white"
    : location.pathname === "/" || location.pathname === "/home"
    ? "text-white"
    : !hideHeader && lastScrollY > 50
    ? "text-white"
    : "text-black";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[50] shadow-sm transition-transform duration-300 ${
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
          <nav className="hidden md:flex items-center gap-10">
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
    hover:${headerTextColor} hover:scale-105 hover:-translate-y-0.5 hover:font-semibold
  `}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT (Icons + Dark Mode - desktop) */}
          <div className="hidden md:flex items-center gap-6 ">
            <button
              className={`${headerTextColor} hover:${headerTextColor} hover:scale-110 transition`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={`${headerTextColor} hover:${headerTextColor} hover:scale-110 transition`}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              className={`${headerTextColor} hover:${headerTextColor} hover:scale-110 transition`}
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${headerTextColor} hover:${headerTextColor} hover:scale-110 transition`}
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
              className={`${headerTextColor} hover:${headerTextColor} transition`}
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
                className={`${headerTextColor} hover:${headerTextColor} hover:scale-110 transition`}
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                className={`${headerTextColor} hover:${headerTextColor} hover:scale-110 transition`}
              >
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
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
                  ? "text-white scale-105 -translate-y-0.5"
                  : "text-white"
              } hover:text-white`}
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-semibold text-white hover:text-white transition"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Account
          </button>

          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-xl font-medium text-white hover:text-white transition"
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
