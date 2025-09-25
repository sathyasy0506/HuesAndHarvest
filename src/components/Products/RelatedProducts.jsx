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

function RelatedProducts({ excludeId }) {
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
          const filteredProducts = (data.products || [])
            .filter(
              (p) =>
                !["combo", "combo2p", "combox2"].includes(
                  p.category.toLowerCase()
                )
            )
            .filter((p) => p.id !== excludeId); // Exclude current product
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [excludeId]);

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
      const container = scrollRef.current;
      const card = container.querySelector(".flex-shrink-0");
      if (!card) return;

      const scrollAmount =
        card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products.length) return null;

  return (
    <section className="w-full px-4 sm:px-6 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto bg-transparent">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4 md:gap-0">
          <div className="text-center w-full flex justify-center flex-col gap-2 md:gap-4 lg:ml-40">
            <p className="text-gray-400 uppercase tracking-wide text-sm">
              You may also like
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl mt-1">
              Related Products
            </h2>
          </div>
        </div>

        {/* Scrollable Products */}
        <div className="relative">
          {/* Left Scroll */}
          <button
            onClick={() => scroll("left")}
            disabled={!showLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow transition ${
              showLeft
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Scroll */}
          <button
            onClick={() => scroll("right")}
            disabled={!showRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow transition ${
              showRight
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth py-2 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[65%] sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 sm:px-3 flex flex-col cursor-pointer snap-start"
                onClick={() =>
                  navigate(`/product/${slugify(product.name)}`, {
                    state: { id: product.id },
                  })
                }
              >
                {/* Image */}
                <div
                  className="w-full aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden p-3 sm:p-4"
                  style={{ backgroundColor: getRandomBg() }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 sm:mt-4 p-2 flex flex-col gap-2 md:p-0 p-3">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between gap-2 mt-1 flex-wrap ">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base md:text-lg font-medium">
                        ₹ {product.price}.00
                      </span>
                      {product.oldPrice && (
                        <span className="line-through text-gray-400 text-xs sm:text-sm">
                          ₹ {product.oldPrice}.00
                        </span>
                      )}
                    </div>

                    {/* Shop Now */}
                    <button
                      className="mt-3 sm:mt-4 w-full bg-[#EFEFEF] rounded-[10px] sm:rounded-[12px] md:rounded-[15px] py-2 sm:py-3 px-3 sm:px-5 font-medium hover:bg-gray-200 transition text-xs sm:text-sm md:text-base"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${slugify(product.name)}`, {
                          state: { id: product.id },
                        });
                      }}
                    >
                      <span className="block text-center">Shop Now</span>
                      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white shadow">
                        <ArrowUpRight
                          size={12}
                          className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;
