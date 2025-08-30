import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const products = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Artisan Chip ${i + 1}`,
  price: `$${(10 + i * 0.75).toFixed(2)}`,
  oldPrice: `$${(14 + i * 0.75).toFixed(2)}`,
  image: `https://picsum.photos/seed/chip${i + 1}/400/400`,
}));

const ProductListing = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 24;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth * 4 : cardWidth * 4,
        behavior: "smooth",
      });
    }
  };

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
        >
          <ChevronRight
            className="w-6 h-6"
            style={{ color: "var(--text-color)" }}
          />
        </button>
        {/* Show All */}
        <div className="text-right mb-6 flex justify-end items-center gap-2 cursor-pointer">
          <span
            className="text-lg font-bold transition-all"
            style={{
              color: "var(--primary-color)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Show All Products
          </span>
          <ArrowRight
            className="w-4 h-4 transform"
            style={{
              color: "var(--primary-color)",
              transform: "rotate(-45deg)",
            }}
          />
        </div>

        {/* Product Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto py-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start flex-shrink-0 w-[300px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 relative group overflow-hidden"
              style={{
                backgroundColor: "var(--cards-bg)",
                fontFamily: "var(--font-poppins)",
              }}
            >
              {/* Image */}
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top right, var(--accent-color)/10, var(--warning-color)/10)",
                  }}
                ></div>
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
                      {product.price}
                    </span>
                    <span
                      className="line-through"
                      style={{ color: "var(--muted-text)" }}
                    >
                      {product.oldPrice}
                    </span>
                  </div>
                </div>

                {/* Shop Now Button */}
                <button
                  className="px-4 py-2 transition-all duration-300 flex items-center justify-between rounded-md w-full font-medium"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "var(--white)",
                  }}
                >
                  <span>Shop Now</span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center ml-2"
                    style={{ backgroundColor: "var(--white)" }}
                  >
                    <ArrowRight
                      className="w-3 h-3 transform"
                      style={{
                        color: "var(--accent-color)",
                        transform: "rotate(-45deg)",
                      }}
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
