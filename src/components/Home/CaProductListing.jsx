import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ENDPOINTS } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Predefined background colors
const bgColors = ["#ffeae2", "#e9f7e4", "#fff9e6", "#ffe9ef"];

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
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Map API categories to display labels
  const categoryLabels = {
    spicy: "Spicy",
    sweetssssss: "Sweet",
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(ENDPOINTS.LIST_PRODUCTS());
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setCategories(data.Categories || []);
          if (data.Categories && data.Categories.length > 0) {
            setActiveCategory(data.Categories[0]); // default select first category
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update scroll button visibility
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
  }, [products, activeCategory]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 4; // exactly 4 per view
      const scrollAmount = cardWidth * 4; // jump one "page"
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Filter products by category
  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <section className="w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 md:gap-0">
          <div className="text-center w-full flex justify-center flex-col gap-4">
            <p className="text-gray-400 uppercase tracking-wide text-sm">
              Exclusive Hues & Harvest
            </p>
            <h2 className="text-2xl md:text-3xl mt-1">
              BEST SELLER’S OF MONTH
            </h2>
          </div>

          {/* Category Toggle */}
          <div className="flex rounded-full border border-[#4b3832] bg-[#4b3832] overflow-hidden p-[2px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-28 py-1 text-base font-medium flex items-center justify-center transition-all
        ${
          activeCategory === cat
            ? "bg-white text-[#4b3832]"
            : "bg-[#4b3832] text-white border border-[#4b3832]"
        }
        rounded-full`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Products */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!showLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow transition
              ${
                showLeft
                  ? "bg-white hover:bg-gray-100"
                  : "bg-gray-200 cursor-not-allowed opacity-50"
              }`}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!showRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow transition
              ${
                showRight
                  ? "bg-white hover:bg-gray-100"
                  : "bg-gray-200 cursor-not-allowed opacity-50"
              }`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Product Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth py-2 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-1/4 px-3 flex flex-col cursor-pointer snap-start"
                onClick={() =>
                  navigate(`/product/${slugify(product.name)}`, {
                    state: { id: product.id },
                  })
                }
              >
                {/* Image with random background */}
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

                {/* Details */}
                <div className="mt-4 p-2 flex flex-col gap-2">
                  <h3 className="text-lg">{product.name}</h3>

                  {/* Prices and Quantity */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium">
                        ₹ {product.price}.00
                      </span>
                      <span className="line-through text-gray-400">
                        ₹ {product.oldPrice}.00
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 border rounded-full border-gray-300">
                      <button className="px-2 py-1 rounded-[50px] border border-gray-300">
                        –
                      </button>
                      <span className="text-sm">1kg</span>
                      <button className="px-2 py-1 rounded-[50px] border border-gray-300">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Shop Now button */}
                  <button
                    className="relative mt-4 w-full bg-[#EFEFEF] rounded-[15px] py-3 px-5 font-medium hover:bg-gray-200 transition"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering card click
                      navigate(`/product/${slugify(product.name)}`, {
                        state: { id: product.id },
                      });
                    }}
                  >
                    <span className="block text-center">Shop Now</span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow">
                      <ArrowUpRight size={16} />
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
