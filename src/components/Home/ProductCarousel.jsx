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

// CSS to hide scrollbar (if Tailwind scrollbar-hide is not included)
import "../../../scrollbar-hide.css"; // Make sure to create this CSS file or add in global CSS

// Predefined background colors
const bgColors = ["#ffffff"];

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
          const productsWithColor = data.products.map((p) => ({
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
      scrollRef.current.scrollBy({
        left: dir === "next" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="w-auto  text-gray-800 p-6 rounded-2xl bg-transparent"

    >
      <div className="flex flex-col">
        {/* Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6  overflow-x-scroll scroll-smooth pr-12 scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 flex flex-col  cursor-pointer p-1 bg-white rounded-2xl shadow-lg"
              style={{ width: "250px", height: "380px" }}
              onClick={() =>
                navigate(`/product/${slugify(product.name)}`, {
                  state: { id: product.id },
                })
              }
            >
              {/* Image container */}
              <div
                className="w-[242px] h-[253px] flex items-center justify-center overflow-hidden p-4 rounded-2xl"
                style={{ backgroundColor: product.bgColor }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="mt-2 p-3 flex flex-col flex-1 gap-2">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg">{product.name}</h3>

                  {/* Prices and Quantity */}
                  <div className="flex items-center justify-between mt-1">
                    {/* Current & Old Price on same line */}
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="text-sm font-medium">
                        ₹ {product.price}.00
                      </span>
                      <span className="line-through text-gray-400 text-xs">
                        ₹ {product.oldPrice}.00
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border rounded-full border-gray-300  text-xs">
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
                  className="relative mt-auto w-full bg-[#EFEFEF] rounded-[15px] py-3 px-5 font-medium hover:bg-gray-200 transition"
                  onClick={(e) => {
                    e.stopPropagation();
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

        {/* Scrollbar + Nav row */}
        <div className="flex items-center gap-3 mt-4">
          {/* Scrollbar track */}
          <div className="flex-1 h-[3px] bg-gray-400 rounded-full relative overflow-hidden">
            {/* Scroll thumb */}
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
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("next")}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;
