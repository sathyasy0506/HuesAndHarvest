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
          // ✅ keep only Combo2p products
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

    // Smooth initial fill
    requestAnimationFrame(() => {
      updateProgress();
    });

    return () => el.removeEventListener("scroll", updateProgress);
  }, [products]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 300;
      scrollRef.current.scrollBy({
        left: dir === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-auto text-gray-800 p-3 md:p-6 rounded-2xl bg-transparent">
      <div className="flex flex-col">
        {/* Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-scroll scroll-smooth pr-8 md:pr-12 scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 flex flex-col cursor-pointer p-1 bg-white rounded-2xl shadow-lg"
              style={{
                width: window.innerWidth < 768 ? "200px" : "250px",
                height: window.innerWidth < 768 ? "340px" : "380px",
              }}
              onClick={() =>
                navigate(`/product/${slugify(product.name)}`, {
                  state: { id: product.id },
                })
              }
            >
              {/* Image container */}
              <div
                className="flex items-center justify-center overflow-hidden p-3 md:p-4 rounded-2xl"
                style={{
                  width: window.innerWidth < 768 ? "192px" : "242px",
                  height: window.innerWidth < 768 ? "200px" : "253px",
                  backgroundColor: product.bgColor,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="mt-2 p-2 md:p-3 flex flex-col flex-1 gap-2">
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-base md:text-lg">{product.name}</h3>

                  {/* Prices and Quantity */}
                  <div className="flex items-center justify-between mt-1">
                    {/* Current & Old Price on same line */}
                    <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
                      <span className="text-xs md:text-sm font-medium">
                        ₹ {product.price}.00
                      </span>
                      <span className="line-through text-gray-400 text-xs">
                        ₹ {product.oldPrice}.00
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 md:gap-2 border rounded-full border-gray-300 text-xs">
                      <button className="px-1 py-0 rounded-[50px] border border-gray-300">
                        –
                      </button>
                      <span className="text-xs">1</span>
                      <button className="px-1 py-0 rounded-[50px] border border-gray-300">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Push button to bottom */}
                <button
                  className="relative mt-auto w-full bg-[#EFEFEF] rounded-[12px] md:rounded-[15px] py-2 md:py-3 px-3 md:px-5 font-medium hover:bg-gray-200 transition text-sm md:text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${slugify(product.name)}`, {
                      state: { id: product.id },
                    });
                  }}
                >
                  <span className="block text-center">Shop Now</span>
                  <span className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white shadow">
                    <ArrowUpRight size={window.innerWidth < 768 ? 14 : 16} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollbar + Nav row */}
        <div className="flex items-center gap-3 mt-4">
          {/* Scrollbar track */}
          <div className="flex-1 h-[3px] bg-gray-400 rounded-full relative overflow-hidden">
            {/* Scroll thumb */}
            <div
              className="h-1 bg-white rounded-full transition-[width] duration-1000 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("prev")}
              className="bg-white rounded-full p-1 md:p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={window.innerWidth < 768 ? 16 : 20} />
            </button>
            <button
              onClick={() => scroll("next")}
              className="bg-white rounded-full p-1 md:p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={window.innerWidth < 768 ? 16 : 20} />
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const DURATION = 700;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ENDPOINTS.LIST_COMBO());
        const data = await res.json();
        if (data?.success) {
          // ✅ filter only ComboX2
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

  // go next
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

  // go prev
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

  // Responsive transforms
  const getTransforms = () => {
    if (isMobile) {
      return {
        left: {
          transform: "translateX(-30px) rotateY(22deg) translateZ(-50px)",
          zIndex: 2,
        },
        center: {
          transform: "translateX(0px) rotateY(0deg) translateZ(0px)",
          zIndex: 5,
        },
        right: {
          transform: "translateX(30px) rotateY(-22deg) translateZ(-50px)",
          zIndex: 2,
        },
      };
    }

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
      emphasized: false,
    },
    {
      key: "slot-center",
      role: roles[1],
      product: products[display.center],
      emphasized: true,
    },
    {
      key: "slot-right",
      role: roles[2],
      product: products[display.right],
      emphasized: false,
    },
  ];

  return (
    <section className="max-w-xl mx-auto text-gray-800 p-2 md:p-3 rounded-2xl flex flex-col items-center bg-transparent">
      <div
        className="relative"
        style={{
          width: isMobile ? "320px" : "520px",
          height: isMobile ? "320px" : "420px",
          perspective: "1300px",
        }}
      >
        {/* Cards */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {slots.map(({ key, role, product, emphasized }) => (
            <div
              key={key}
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
                isMobile={isMobile}
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
          className="absolute top-1/2 left-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
          style={{
            transform: isMobile ? "translateX(-120px)" : "translateX(-186px)",
          }}
        >
          <ChevronLeft size={isMobile ? 16 : 20} />
        </button>

        <button
          onClick={goNext}
          disabled={isAnimating}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-md hover:bg-gray-100 disabled:opacity-50"
          style={{
            transform: isMobile ? "translateX(80px)" : "translateX(140px)",
          }}
        >
          <ChevronRight size={isMobile ? 16 : 20} />
        </button>
      </div>
      <div className="text-center mt-4 md:mt-6">
        <h2 className="text-lg md:text-xl tracking-wide text-white">
          Combo Products
        </h2>
      </div>
    </section>
  );
}

function ProductCard({ product, onClick, emphasized, isMobile }) {
  if (!product) return null;

  return (
    <div
      className={[
        "relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer",
        "transition-all duration-700 ease-out",
        emphasized
          ? "scale-105 opacity-100 blur-0 brightness-100"
          : "scale-90 opacity-70 blur-sm brightness-110 pointer-events-none",
      ].join(" ")}
      style={{
        width: isMobile ? 180 : 250,
        height: isMobile ? 260 : 380,
      }}
      onClick={onClick}
    >
      {/* Combo Badge */}
      <div className="absolute top-2 md:top-3 left-2 md:left-3 z-20">
        <span className="bg-[#C6B560] text-white text-xs font-semibold px-2 md:px-3 py-1 rounded-full shadow-md">
          Combo
        </span>
      </div>

      {/* Green blurry overlay for side cards */}
      {!emphasized && (
        <div
          className="absolute inset-0 rounded-2xl z-20"
          style={{
            backgroundColor: "rgba(84, 136, 109, 0.6)",
            backdropFilter: "blur(1000px)",
          }}
        ></div>
      )}

      {/* image */}
      <div
        className="w-full flex items-center justify-center p-3 md:p-4"
        style={{
          height: isMobile ? "55%" : "65%",
          backgroundColor: product.bgColor,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* details */}
      <div className="flex flex-col flex-1 p-2 md:p-3 gap-1 md:gap-2 relative z-20 items-center">
        <h3 className="text-sm md:text-lg text-red-800 text-center">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm font-medium">
              ₹ {product.price}.00
            </span>
            <span className="line-through text-red-400 text-xs">
              ₹ {product.oldPrice}.00
            </span>
          </div>
        </div>

        <button className="relative mt-auto w-full bg-[#EFEFEF] rounded-[12px] md:rounded-[15px] py-1 md:py-2 px-2 md:px-4 font-medium hover:bg-gray-200 transition text-xs md:text-sm">
          <span className="block text-center">Shop Now</span>
        </button>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto py-2 rounded-2xl"
      style={{
        background: "linear-gradient(to bottom, #4F926E, #326B4E)",
      }}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col" : "gap-8"
        } w-full overflow-hidden items-center`}
      >
        {/* Left component */}
        <div className={isMobile ? "w-full" : "w-1/3 min-w-0"}>
          <ProductCylinderCarousel />
        </div>

        {/* Divider (hidden on mobile) */}
        {!isMobile && (
          <div
            className="w-px self-stretch my-16"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, white 40%, transparent 40%)",
              backgroundSize: "1px 16px",
            }}
          ></div>
        )}

        {/* Right component */}
        <div className={isMobile ? "w-full" : "w-2/3 min-w-0"}>
          <ProductCarousel />
        </div>
      </div>
    </section>
  );
}
