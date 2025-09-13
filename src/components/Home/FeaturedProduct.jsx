import React, { useState, useEffect } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ENDPOINTS } from "../../api/api";
import Loader from "../Load";

const FeaturedProduct = () => {
  const productIds = [20, 15]; // Example IDs
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState(0); // for slide direction

  // Fetch all products once
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const fetched = await Promise.all(
          productIds.map(async (id) => {
            const res = await fetch(ENDPOINTS.GET_PRODUCT(id));
            return res.json();
          })
        );
        setProducts(fetched);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading || products.length === 0) {
    return (
      <div className="py-20">
        <Loader />
      </div>
    );
  }

  const product = products[currentIndex];
  const oldPrice = parseFloat(product.oldPrice) || 0;
  const newPrice = parseFloat(product.price) || 0;
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

  // Handlers
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  // Motion Variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeIn" },
    }),
  };

  return (
    <section className="py-16 px-4 font-[Poppins] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto bg-transparent">
        {/* Section Title */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 uppercase tracking-wider text-[19px]">
              Exclusive Hues & Harvest
            </p>
            <h2 className="text-3xl lg:text-[31px] uppercase text-gray-900">
              Featured Product
            </h2>
          </div>
        </div>

        {/* Product Wrapper */}
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={product.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Button */}
              <button
                onClick={handlePrev}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Section */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-full bg-yellow-100 flex items-center justify-center w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </motion.div>
              </div>

              {/* Product Info Section */}
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl text-gray-900">
                  {product.name}
                </h2>

                <p className="text-lg leading-relaxed text-gray-600">
                  {product.short_description || product.description}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-[23px] text-gray-900">₹{newPrice}</span>
                  {oldPrice > 0 && (
                    <span className="text-[20px] line-through text-gray-400">
                      ₹{oldPrice}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                      {discount}% offer
                    </span>
                  )}
                </div>

                <div className="space-y-4 w-[379px]">
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center border rounded-full overflow-hidden flex-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-lg text-gray-700 border-r border-gray-300 rounded-full"
                      >
                        -
                      </button>
                      <span className="px-4 text-[15px] font-medium text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-lg text-gray-700 border-l border-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </div>

                    <button className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-full text-[12px] flex-[2]">
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>

                  <button className="w-full border border-gray-800 py-2 rounded-full text-[20px] text-gray-900">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Right Button */}
              <button
                onClick={handleNext}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
