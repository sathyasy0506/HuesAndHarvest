import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { ENDPOINTS } from "../../api/api";
import { showToast } from "../Common/Toaster";
import { useCart } from "../../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { fetchCartCount } = useCart();

  useEffect(() => {
    fetch(ENDPOINTS.FEATURED_PRODUCTS())
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  if (products.length === 0) return null;

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("hh_token");
    if (!token) {
      showToast("Please login first to add items to cart.", "error");
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.ADD_TO_CART(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, product_id: product.id, quantity }),
      });
      const data = await response.json();
      if (data.success) {
        showToast("Item added to cart!", "success");
        await fetchCartCount();
      } else {
        showToast("❌ " + (data.message || "Could not add item"), "error");
      }
    } catch {
      showToast("❌ Something went wrong.", "error");
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="p-0 bg-transparent">
      <div className="text-center">
        <h3 className="text-gray-400 uppercase tracking-wide mb-2">
          EXCLUSIVE Hues & Harvest
        </h3>
        <h2 className=" text-gray-700 text-3xl uppercase">
          Best Seller’s of the Month
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow hover:brightness-90"
        >
          <NavigateBeforeIcon />
        </button>

        {/* Product Section */}
        <div className="w-full flex justify-center items-center relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            {products
              .filter((_, i) => i === currentIndex)
              .map((product) => {
                const oldPrice = parseFloat(product.oldPrice) || 0;
                const newPrice = parseFloat(product.price) || 0;
                const discount =
                  oldPrice > 0
                    ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
                    : 0;

                return (
                  <motion.div
                    key={product.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 w-full"
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className="w-full max-w-sm md:max-w-md aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4 md:pt-20 pt-0">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center md:text-left">
                        {product.name}
                      </h2>
                      <p
                        className="text-gray-600 text-sm md:text-base text-center md:text-left"
                        dangerouslySetInnerHTML={{
                          __html: product.short_description,
                        }}
                      />
                      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mt-2">
                        <span className="text-xl font-semibold">
                          ₹{newPrice}
                        </span>
                        {oldPrice > 0 && (
                          <span className="line-through text-gray-400">
                            ₹{oldPrice}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="px-3 py-1 rounded-full bg-red-100 text-red-500 text-sm font-medium">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="text-center md:text-left">
                        {product.stock_quantity === 0 ||
                        product.stock_status === "outofstock" ? (
                          <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-medium">
                            Out of Stock
                          </span>
                        ) : product.stock_quantity < 10 ? (
                          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                            Hurry! Only {product.stock_quantity} left
                          </span>
                        ) : null}
                      </div>

                      {/* Add to Cart */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full items-center justify-center md:justify-start">
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button
                            onClick={() =>
                              setQuantity((q) => Math.max(1, q - 1))
                            }
                            className="w-10 h-10 flex items-center justify-center text-lg border border-gray-300 rounded-full"
                            disabled={
                              product.stock_quantity === 0 ||
                              product.stock_status === "outofstock"
                            }
                          >
                            -
                          </button>
                          <span className="px-4 text-sm font-medium">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-10 h-10 flex items-center justify-center text-lg border border-gray-300 rounded-full"
                            disabled={
                              product.stock_quantity === 0 ||
                              product.stock_status === "outofstock"
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full ${
                            product.stock_quantity === 0 ||
                            product.stock_status === "outofstock"
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gray-800 text-white"
                          }`}
                          disabled={
                            product.stock_quantity === 0 ||
                            product.stock_status === "outofstock"
                          }
                        >
                          <ShoppingCart size={20} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow hover:brightness-90"
        >
          <NavigateNextIcon />
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
