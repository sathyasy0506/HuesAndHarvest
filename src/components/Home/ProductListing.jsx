import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // Fetch products from your PHP API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://admin.huesandharvest.com/api/list_products.php",
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("API error:", data.message);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current && scrollRef.current.firstChild) {
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 24;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth * 4 : cardWidth * 4,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2
            className="text-2xl font-bold text-center"
            style={{
              color: "var(--text-color)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Loading products...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <h2
          className="text-4xl font-extrabold text-center mb-12"
          style={{
            color: "var(--text-color)",
            fontFamily: "var(--font-outfit)",
          }}
        >
          Explore Our Collection
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md hover:shadow-xl z-20 hidden lg:flex"
          style={{ backgroundColor: "var(--sho-bg-color)" }}
          aria-label="Scroll left"
        >
          <ChevronLeft
            className="w-6 h-6"
            style={{ color: "var(--text-color)" }}
          />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md hover:shadow-xl z-20 hidden lg:flex"
          style={{ backgroundColor: "var(--sho-bg-color)" }}
          aria-label="Scroll right"
        >
          <ChevronRight
            className="w-6 h-6"
            style={{ color: "var(--text-color)" }}
          />
        </button>

        {/* Show All */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "var(--primary-color)",
              fontFamily: "var(--font-outfit)",
              fontWeight: 600,
              padding: 0,
            }}
          >
            <span className="text-lg font-bold">Show All Products</span>
            <ArrowRight
              className="w-4 h-4 transform -rotate-45"
              style={{ color: "var(--primary-color)" }}
            />
          </button>
        </div>

        {/* Product Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto py-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start flex-shrink-0 w-[300px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 relative group overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "var(--cards-bg)",
                fontFamily: "var(--font-poppins)",
              }}
              onClick={() =>
                navigate(`/product/${slugify(product.name)}`, {
                  state: { id: product.id },
                })
              }
            >
              {/* Image */}
              <div className="relative h-64">
                <div className="relative h-64 rounded-xl bg-gray-300 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {product.stock_status === "outofstock" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col justify-between">
                <div className="mb-4">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "var(--text-color)" }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--accent-color)" }}
                    >
                      ₹{product.price}
                    </span>
                    {product.oldPrice > product.price && (
                      <span
                        className="line-through"
                        style={{ color: "var(--muted-text)" }}
                      >
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Shop Now Button */}
                <button
                  disabled={product.stock_status === "outofstock"}
                  className="px-4 py-2 transition-all duration-300 flex items-center justify-between rounded-md w-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "var(--white)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    navigate(`/product/${slugify(product.name)}`, {
                      state: { id: product.id },
                    });
                  }}
                >
                  <span>Shop Now</span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center ml-2"
                    style={{ backgroundColor: "var(--white)" }}
                  >
                    <ArrowRight
                      className="w-3 h-3 transform -rotate-45"
                      style={{ color: "var(--accent-color)" }}
                    />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
