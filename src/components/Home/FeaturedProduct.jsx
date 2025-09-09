import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { ENDPOINTS } from "../../api/api";
import Loader from "../Load";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const productId = 20; // Fixed product ID

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_PRODUCT(productId));
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="py-20">
        <Loader />
      </div>
    );
  }

  const oldPrice = parseFloat(product.oldPrice) || 0;
  const newPrice = parseFloat(product.price) || 0;
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

  return (
    <section className="py-16 px-4 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 flex items-center justify-between">
          {/* Left side: Title */}
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 uppercase tracking-wider text-[19px]">
              Exclusive Hues & Harvest
            </p>
            <h2 className="text-3xl lg:text-[31px] uppercase text-gray-900">
              Featured Product
            </h2>
          </div>

          {/* Right side: Navigation Buttons
          <div className="flex gap-3">
            <button className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-800 text-gray-600 hover:bg-gray-100">
              <ChevronLeft size={24} />
            </button>
            <button className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-800 text-gray-600 hover:bg-gray-100">
              <ChevronRight size={24} />
            </button>
          </div> */}
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <div className="rounded-full bg-yellow-100 flex items-center justify-center w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-3xl lg:text-4xl text-gray-900">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-600">
              {product.short_description || product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-[23px] text-gray-900">₹{newPrice}</span>
              {oldPrice > 0 && (
                <span className="text-[20px] line-through text-gray-400">
                  ₹{oldPrice}
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-10 border text-red-300 text-sm font-medium">
                  {discount}% offer
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4 w-[379px]">
              {/* Row 1: Quantity + Add to Cart */}
              <div className="flex items-center gap-4 w-full">
                {/* Quantity Selector */}
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

                {/* Add to Cart */}
                <button className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-full text-[12px] flex-[2]">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>

              {/* Row 2: Buy Now */}
              <button className="w-full border border-gray-800 py-2 rounded-full text-[20px] text-gray-900">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
