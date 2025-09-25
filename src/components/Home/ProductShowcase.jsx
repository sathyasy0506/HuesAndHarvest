import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ENDPOINTS } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Slugify for navigation
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// Predefined background colors
const bgColors = ["#FFFFFF"];

function getRandomBg() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}

function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(ENDPOINTS.LIST_COMBO());
        const data = await res.json();
        if (data.success) {
          const combo2pProducts = data.products.filter(
            (p) => p.category === "Combo2p"
          );

          const productsWithColor = combo2pProducts.map((p) => ({
            ...p,
            bgColor: getRandomBg(),
          }));

          setProducts(productsWithColor);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle scroll and progress bar
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress =
        ((el.scrollLeft + el.clientWidth) / el.scrollWidth) * 100;
      setScrollProgress(progress || 0);
    };

    el.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => el.removeEventListener("scroll", updateProgress);
  }, [products]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: dir === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full text-gray-800 px-4 py-6 md:p-6">
      <div className="flex flex-col">
        {/* Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth product-carousel-scrollbar snap-x"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 flex flex-col cursor-pointer bg-white rounded-2xl shadow-lg w-[280px] md:w-[300px] snap-start"
              onClick={() =>
                navigate(`/product/${slugify(product.name)}`, {
                  state: { id: product.id },
                })
              }
            >
              {/* Image container */}
              <div
                className="flex items-center justify-center p-4 md:p-6 rounded-t-2xl"
                style={{ backgroundColor: product.bgColor }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 md:h-56 object-contain"
                />
              </div>

              {/* Details */}
              <div className="p-4 md:p-6 flex flex-col flex-1 gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-medium capitalize line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Prices and Quantity */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base md:text-lg font-semibold">
                        ₹{product.price}.00
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        ₹{product.oldPrice}.00
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border rounded-full border-gray-300 text-sm">
                      <button className="px-2 py-1 hover:bg-gray-100 border border-gray-300 rounded-full">
                        –
                      </button>
                      <span className="px-2">1</span>
                      <button className="px-2 py-1 hover:bg-gray-100 border border-gray-300 rounded-full">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Shop Now Button */}
                <button
                  className="relative mt-auto w-full bg-gray-100 rounded-xl py-3 px-4 font-medium hover:bg-gray-200 transition-all duration-200 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${slugify(product.name)}`, {
                      state: { id: product.id },
                    });
                  }}
                >
                  <span className="block text-center">Shop Now</span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollbar + Navigation */}
        <div className="flex items-center gap-4 mt-6 px-2">
          {/* Scrollbar */}
          <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-300 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("prev")}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("next")}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCylinderCarousel() {
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState({ left: 0, center: 0, right: 0 });
  const [roles, setRoles] = useState(["left", "center", "right"]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const DURATION = 100;

  // Fetch products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ENDPOINTS.LIST_COMBO());
        const data = await res.json();
        if (data?.success) {
          const comboX2Products = data.products.filter(
            (p) => p.category === "ComboX2"
          );

          const withColor = comboX2Products.map((p) => ({
            ...p,
            bgColor: getRandomBg(),
          }));

          setProducts(withColor);

          if (withColor.length) {
            setDisplay({
              center: 0,
              left: (withColor.length - 1) % withColor.length,
              right: (0 + 1) % withColor.length,
            });
          }
        }
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    })();
  }, []);

  const goNext = () => {
    if (isAnimating || products.length < 2) return;
    setIsAnimating(true);

    const n = products.length;
    const newCenter = display.right;
    const newLeft = display.center;
    const newRight = (display.right + 1) % n;

    setRoles(["right", "left", "center"]);

    setTimeout(() => {
      setDisplay({ left: newLeft, center: newCenter, right: newRight });
      setRoles(["left", "center", "right"]);
      setIsAnimating(false);
    }, DURATION);
  };

  const goPrev = () => {
    if (isAnimating || products.length < 2) return;
    setIsAnimating(true);

    const n = products.length;
    const newCenter = display.left;
    const newRight = display.center;
    const newLeft = (display.left - 1 + n) % n;

    setRoles(["center", "right", "left"]);

    setTimeout(() => {
      setDisplay({ left: newLeft, center: newCenter, right: newRight });
      setRoles(["left", "center", "right"]);
      setIsAnimating(false);
    }, DURATION);
  };

  if (!products.length) return null;

  const getTransforms = () => {
    return {
      left: {
        transform: "translateX(-50px) rotateY(22deg) translateZ(-90px)",
        zIndex: 2,
      },
      center: {
        transform: "translateX(0px) rotateY(0deg) translateZ(0px)",
        zIndex: 5,
      },
      right: {
        transform: "translateX(50px) rotateY(-22deg) translateZ(-90px)",
        zIndex: 2,
      },
    };
  };

  const pos = getTransforms();

  const slots = [
    {
      key: "slot-left",
      role: roles[0],
      product: products[display.left],
    },
    {
      key: "slot-center",
      role: roles[1],
      product: products[display.center],
    },
    {
      key: "slot-right",
      role: roles[2],
      product: products[display.right],
    },
  ];

  return (
    <section className="w-full max-w-md mx-auto text-gray-800 p-4 mt-10">
      {/* Title moved OUTSIDE the 3D container to prevent overlapping */}

      <div
        className="relative mx-auto"
        style={{
          width: "100%",
          height: "420px", // Reduced height since title is now outside
          maxWidth: "520px",
          perspective: "1300px",
        }}
      >
        {/* Cards Container */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {slots.map(({ role, product }) => (
            <div
              key={`${role}-${product?.id}`}
              className="absolute top-1/2 left-1/2 will-change-transform transition-transform duration-700 ease-out"
              style={{
                ...pos[role],
                transformStyle: "preserve-3d",
                translate: "-50% -50%",
              }}
            >
              <ProductCard
                product={product}
                emphasized={role === "center"}
                onClick={() =>
                  role === "center" &&
                  navigate(`/product/${slugify(product.name)}`, {
                    state: { id: product.id },
                  })
                }
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goPrev}
          disabled={isAnimating}
          className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-50 transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={goNext}
          disabled={isAnimating}
          className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-50 transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold tracking-wide text-white">
          Combo Products
        </h2>
      </div>
    </section>
  );
}

function ProductCard({ product, onClick, emphasized }) {
  if (!product) return null;

  return (
    <div
      className={`
        relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
        transition-all duration-700 ease-out
        ${
          emphasized
            ? "scale-105 opacity-100 blur-0"
            : "scale-90 opacity-70 blur-[1px] pointer-events-none"
        }
      `}
      style={{
        width: "280px", // Slightly wider to utilize more space
        height: "380px", // Increased height to fill available space
      }}
      onClick={onClick}
    >
      {/* Combo Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-[#C6B560] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          Combo
        </span>
      </div>

      {/* Overlay for side cards */}
      {!emphasized && (
        <div
          className="absolute inset-0 rounded-2xl z-10"
          style={{
            backgroundColor: "rgba(84, 136, 109, 0.4)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Image container with optimized height */}
      <div
        className="w-full flex items-center justify-center p-4"
        style={{
          height: "60%", // Increased slightly for better image display
          backgroundColor: product.bgColor,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Details section with better spacing */}
      <div className="flex flex-col flex-1 p-4 gap-3 relative z-20 items-center justify-center">
        <h3 className="text-base font-medium text-gray-900 text-center capitalize line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            ₹{product.price}.00
          </span>
          <span className="line-through text-red-400 text-sm">
            ₹{product.oldPrice}.00
          </span>
        </div>

        <button className="w-full max-w-[90%] bg-gray-100 rounded-xl py-3 px-4 font-medium hover:bg-gray-200 transition-colors text-sm mt-1">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section
      className="w-full bg-transparent"
      // style={{
      //   background: "linear-gradient(to bottom, #4F926E, #326B4E)",
      // }}
    >
      <div
        className="max-w-7xl mx-auto py-8 md:py-0 rounded-2xl"
        style={{
          background: "linear-gradient(to bottom, #4F926E, #326B4E)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-center py lg:items-stretch gap-8 lg:gap-12 px-4">
          {/* Cylinder Carousel */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <ProductCylinderCarousel />
          </div>

          {/* Vertical Divider - Hidden on mobile */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-white/40 to-transparent bg-[length:1px_16px] my-8" />

          {/* Horizontal Carousel */}
          <div className="w-full lg:w-3/5">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
