import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { ENDPOINTS } from "../../api/api";
import Loader from "../Load";


const FeaturedProduct = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const productId = 20; // Fixed product ID

  const navigate = useNavigate(); // ✅ hook for navigation

  // ✅ same slugify helper as in Shop
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(ENDPOINTS.GET_PRODUCT(productId));
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(ENDPOINTS.PRODUCT_REVIEWS(productId));
        const data = await res.json();
        if (Array.isArray(data)) {
          const formattedReviews = data.map((r) => ({
            stars: r.rating || 0,
          }));
          setReviews(formattedReviews);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    Promise.all([fetchProduct(), fetchReviews()]).finally(() =>
      setLoading(false)
    );
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="py-20">
        <Loader />
      </div>
    );
  }

  // Calculate discount percentage
  const oldPrice = parseFloat(product.oldPrice) || 0;
  const newPrice = parseFloat(product.price) || 0;
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
      : 0;

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: "var(--cards-bg)",
              color: "var(--accent-color)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Featured Product
          </div>
          <h2
            className="text-5xl lg:text-6xl font-bold primary-text mb-6"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {product.name}
          </h2>
          <div
            className="w-32 h-1 mx-auto mb-8"
            style={{ backgroundColor: "var(--accent-color)" }}
          ></div>
        </div>

        {/* Product Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative group">
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ backgroundColor: "var(--cards-bg)" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold shadow-lg">
                    Save {discount}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {renderStars(averageRating)}
              </div>
              <span className="text-lg font-semibold primary-text">
                {averageRating.toFixed(1)}
              </span>
              <span className="muted-text">
                ({reviews.length.toLocaleString()} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-xl leading-relaxed muted-text">
              {product.short_description || product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold primary-text">
                ₹{newPrice}
              </span>
              {oldPrice > 0 && (
                <span className="text-2xl muted-text line-through">
                  ₹{oldPrice}
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold error-badge">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="primary-button px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-3">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                className="secondary-button px-8 py-4 rounded-xl text-lg font-semibold"
                onClick={() =>
                  navigate(`/product/${slugify(product.name)}`, {
                    state: { id: product.id },
                  })
                }
              >
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              className="grid grid-cols-3 gap-6 pt-8 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="text-center">
                <Truck size={24} className="mx-auto mb-2" />
                <p className="text-sm font-medium primary-text">
                  Free Shipping
                </p>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto mb-2" />
                <p className="text-sm font-medium primary-text">
                  Top-Notch Support{" "}
                </p>
              </div>
              <div className="text-center">
                <RotateCcw size={24} className="mx-auto mb-2" />
                <p className="text-sm font-medium primary-text">
                  100% Satisfaction Guarantee!{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
