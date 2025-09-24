import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ENDPOINTS } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Predefined background colors
const bgColors = ["#ffffff"];
function getRandomBg() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function CaProductListing() {
  const [products, setProducts] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(ENDPOINTS.LIST_PRODUCTS());
        const data = await res.json();
        if (data.success) {
          // Filter out combo products
          const filteredProducts = (data.products || []).filter(
            (p) =>
              !["combo", "combo2p", "combox2"].includes(
                p.category.toLowerCase()
              )
          );
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 4;
      const scrollAmount = cardWidth * 4;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-6 py-12 bg-transparent">
      <div className="max-w-7xl mx-auto bg-transparent">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 md:gap-0">
          <div className="text-center w-full flex justify-center flex-col gap-4 lg:ml-40">
            <p className="text-gray-400 uppercase tracking-wide text-sm">
              Exclusive Hues & Harvest
            </p>
            <h2 className="text-2xl md:text-3xl mt-1">TRENDING TASTY TREATS</h2>
          </div>

          {/* All Collections Button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => navigate("/snacks")}
              className="flex items-center gap-2 border border-gray-400 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100 transition whitespace-nowrap flex-shrink-0"
            >
              ALL COLLECTIONS <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Products */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            disabled={!showLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow transition ${
              showLeft
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!showRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow transition ${
              showRight
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth py-2 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 px-3 flex flex-col cursor-pointer snap-start"
                onClick={() =>
                  navigate(`/product/${slugify(product.name)}`, {
                    state: { id: product.id },
                  })
                }
              >
                <div
                  className="w-full aspect-square rounded-2xl flex items-center justify-center overflow-hidden p-4"
                  style={{ backgroundColor: getRandomBg() }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-4 p-2 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg font-medium">
                    {product.name}
                  </h3>

                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-lg font-medium">
                        ₹ {product.price}.00
                      </span>
                      <span className="line-through text-gray-400 text-xs sm:text-sm">
                        ₹ {product.oldPrice}.00
                      </span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 border rounded-full border-gray-300 text-xl">
                      <button className="px-2 py-0 rounded-[50px] border border-gray-300">
                        –
                      </button>
                      <span className="text-xs">1</span>
                      <button className="px-2 py-0 rounded-[50px] border border-gray-300">
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="relative mt-3 sm:mt-4 w-full bg-[#EFEFEF] rounded-[12px] sm:rounded-[15px] py-2 sm:py-3 px-3 sm:px-5 font-medium hover:bg-gray-200 transition text-sm sm:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${slugify(product.name)}`, {
                        state: { id: product.id },
                      });
                    }}
                  >
                    <span className="block text-center">Shop Now</span>
                    <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white shadow">
                      <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaProductListing;
