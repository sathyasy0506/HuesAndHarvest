import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Info,
  CheckCircle,
  Shield,
  ShieldCheck,
  Headphones,
  CreditCard,
  Clock,
} from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import Silk from "../Background/Silk";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Loader from "../Load";
import { ENDPOINTS } from "../../api/api";
import Gradient from "../Background/Gradient";
import { Star } from "lucide-react";
import ProductListing from "../Home/ProductListing";
import { showToast } from "../Common/Toaster"; // ✅ import this
import { useCart } from "../../contexts/CartContext"; // ✅ import cart context
import ProductAccordion from "./Accordian";

const bgColors = ["#ffffff"];

// FeatureCard Component
const FeatureCard = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ border: "1px solid #D8DFD9" }}
      >
        <Icon className="w-6 h-6" style={{ color: "red-500" }} />
      </div>
    </div>
    <div>
      <h3
        className="text-lg font-semibold mb-1"
        style={{
          color: "var(--text-color)",
          fontFamily: "var(--font-poppins)",
        }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: "var(--text-color)" }}>
        {description}
      </p>
    </div>
  </div>
);

// InfoCard Component
const InfoCard = ({ Icon, text, highlight }) => (
  <div
    className="rounded-2xl p-6"
    style={{
      borderTopRightRadius: "6rem",
      backgroundColor: "#FAFBF9",
    }}
  >
    <div className="flex items-start space-x-3">
      <Icon className="w-10 h-10" style={{ color: "#343A36" }} />
      <p
        className="font-normal text-[14px]"
        style={{
          color: "#2a5d4f",
          fontFamily: "var(--font-poppins)",
        }}
      >
        {text}{" "}
        <span className="" style={{ color: "#060606" }}>
          {highlight}
        </span>
      </p>
    </div>
  </div>
);

// StarRating Component using MUI Star icons
// Lucide StarRating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={20}
          className={
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

// Inside ProductPage component

const AverageRatingCircle = ({ rating }) => {
  const radius = 40; // circle radius
  const stroke = 6; // stroke width
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (rating / 5) * circumference; // fill according to rating

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[80px] h-[80px]">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="var(--primary-color)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        {/* Centered Rating Number */}
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900 dark:text-white">
          {rating.toFixed(1)}
        </div>
      </div>
      <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Average Rating
      </span>
    </div>
  );
};

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const { setCartCount, fetchCartCount } = useCart(); // ✅ use cart context
  const [showModal, setShowModal] = useState(false);
  const [modalVisibleCount, setModalVisibleCount] = useState(10);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const randomBgColor = useMemo(() => {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
  }, []);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("hh_token"); // 🔐 token from localStorage
    if (!token) {
      showToast("Please login first to add items to cart.", "error");
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.ADD_TO_CART(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          product_id: product.id,
          quantity,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Cart updated:", data);
        showToast("Item added to cart!", "success");

        // ✅ Option 1: Refresh from backend (safer if stock rules apply)
        await fetchCartCount();

        // ✅ Option 2 (faster UI): Increment manually
        // setCartCount((prev) => prev + quantity);
      } else {
        console.error("Cart error:", data);
        showToast("❌ " + (data.message || "Could not add item"), "error");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      showToast("❌ Something went wrong.", "error");
    }
  };

  // Get the product ID from navigation state
  const location = useLocation();
  const productId = location.state?.id;

  // Calculate average rating and count **inside the component**
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
      : 0;

  const reviewsCount = reviews.length;

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    fetch(ENDPOINTS.GET_PRODUCT(productId))
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    fetch(ENDPOINTS.PRODUCT_REVIEWS(productId))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formattedReviews = data.map((r) => ({
            name: r.reviewer,
            date: r.date_created,
            review: r.review,
            stars: r.rating || 0,
          }));
          setReviews(formattedReviews);
        }
      })
      .catch((err) => console.error(err));
  }, [productId]);

  const handleShowMoreModal = () => setModalVisibleCount((prev) => prev + 10);
  const closeModal = () => {
    setShowModal(false);
    setModalVisibleCount(10);
  };

  if (!product) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const oldPrice = parseFloat(product.oldPrice) || 0;
  const newPrice = parseFloat(product.price) || 0;
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

  // Determine stock message
  let stockMessage = "";
  if (product.stock_quantity === 0 || product.stock_status === "outofstock") {
    stockMessage = "Out of Stock";
  } else if (product.stock_quantity < 10) {
    stockMessage = `Hurry Up Only ${product.stock_quantity} Left!`;
  } else {
    stockMessage = "In Stock";
  }

  const images = [product.image, ...(product.gallery || [])];

  return (
    <Gradient>
      <div
        className="min-h-screen px-4 sm:px-6 py-8 flex justify-center relative z-1 pt-20 bg-transparent mt-10"
        style={{
          color: "var(--text-color)",
          fontFamily: "var(--font-poppins)",
        }}
      >
        <div className="w-full max-w-7xl flex flex-col gap-8 md:gap-16">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-20">
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex flex-row gap-4">
              {/* Gallery Images - Left */}
              <div className="flex flex-col gap-2 justify-start">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      i === selectedImageIndex
                        ? "border-var(--primary-color)"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImageIndex(i)}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image Container */}
              <div
                className="relative flex-1 p-0 rounded-xl flex items-center justify-center aspect-square"
                style={{ backgroundColor: randomBgColor }}
              >
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />

                {/* Left Arrow */}
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full shadow bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                >
                  <NavigateBeforeIcon
                    fontSize="large"
                    style={{ fontWeight: "bold", color: "var(--text-color)" }}
                  />
                </button>

                {/* Right Arrow */}
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full shadow bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <NavigateNextIcon
                    fontSize="large"
                    style={{ fontWeight: "bold", color: "var(--text-color)" }}
                  />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 justify-center">
              <div className="flex gap-3 flex-col">
                <h2 className="text-3xl lg:text-4xl text-gray-900">
                  {product.name}
                </h2>
                <p
                  className="text-lg leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description || product.description,
                  }}
                />
              </div>

              {/* Price + Stock Badge */}
              {/* Price Section */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[23px] text-gray-900">₹{newPrice}</span>
                {oldPrice > 0 && (
                  <span className="text-[20px] line-through text-gray-400">
                    ₹{oldPrice}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-red-100 border text-red-500 text-sm font-medium">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* ✅ Stock Badge just below prices */}
              <div className="mt-2">
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

              {/* Buttons */}
              <div className="space-y-4 w-[379px]">
                {/* Row 1: Quantity + Add to Cart */}
                <div className="flex items-center gap-4 w-full">
                  {/* Quantity Selector */}
                  <div className="flex items-center border rounded-full overflow-hidden flex-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg text-gray-700 border-r border-gray-300 rounded-full"
                      disabled={
                        product.stock_quantity === 0 ||
                        product.stock_status === "outofstock"
                      }
                    >
                      -
                    </button>
                    <span className="px-4 text-[15px] font-medium text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg text-gray-700 border-l border-gray-300 rounded-full"
                      disabled={
                        product.stock_quantity === 0 ||
                        product.stock_status === "outofstock"
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-full text-[12px] flex-[2] disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={
                      product.stock_quantity === 0 ||
                      product.stock_status === "outofstock"
                    }
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>

                {/* Row 2: Buy Now */}
                <button
                  className="w-full border border-gray-800 py-2 rounded-full text-[20px] text-gray-900 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    product.stock_quantity === 0 ||
                    product.stock_status === "outofstock"
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <div className="lg:w-2/3 flex flex-col gap-6 md:gap-8">
              <div
                className="rounded-2xl border px-4 md:px-8 py-6 md:py-[40px] flex-1"
                style={{
                  borderColor: "var(--cards-bg)",
                  borderTopRightRadius: "6rem",
                  backgroundColor: "var(--bg-color)",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <FeatureCard
                    Icon={Truck}
                    title="Free Delivery Across India"
                    description="Complimentary delivery on all orders over ₹500"
                  />
                  <FeatureCard
                    Icon={ShieldCheck}
                    title="Your satisfaction is our priority"
                    description="We are always here to assist you"
                  />
                  <FeatureCard
                    Icon={Headphones}
                    title="Top-Notch Support"
                    description="Reach out to us anytime for any queries"
                  />
                  <FeatureCard
                    Icon={CreditCard}
                    title="Secure Payments"
                    description="We use the most reliable and safe payment methods"
                  />
                </div>
              </div>

              <div
                className="rounded-2xl overflow-hidden h-64 md:h-80"
                style={{ borderBottomLeftRadius: "6rem" }}
              >
                <img
                  src="https://huesandharvest.com/assets/banner.jpg"
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              className="lg:w-1/3 flex flex-col gap-6 md:gap-8 p-0 rounded-2xl"
              style={{
                borderTopRightRadius: "6rem",
                backgroundColor: "#EFF5ED",
              }}
            >
              <div className="rounded-2xl p-4 md:p-6 flex-1 flex justify-between flex-col gap-6">
                <InfoCard
                  Icon={Truck}
                  text="Pure ingredients carefully made to make every moment delicious"
                />

                <div>
                  <h2
                    style={{ color: "var(--text-color)" }}
                    className="text-xl  mb-4"
                  >
                    Product Description
                  </h2>
                  <p
                    style={{
                      color: "var(--text-color)",
                      fontFamily: "var(--font-poppins)",
                    }}
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                <div>
                  <h2
                    style={{ color: "var(--text-color)" }}
                    className="text-xl mb-4"
                  >
                    Additional information
                  </h2>
                  <div
                    className="border-t"
                    style={{ borderColor: "var(--cards-bg)" }}
                  >
                    <div className="py-3 flex justify-between">
                      <span
                        style={{
                          color: "var(--text-color)",
                          fontFamily: "var(--font-poppins)",
                        }}
                        className="font-medium"
                      >
                        Weight
                      </span>
                      <span style={{ color: "var(--text-color)" }}>
                        {product.weight ? `${product.weight} g` : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductAccordion productId={productId} />

          {/* Ratings & Reviews Section */}
          <div
            className="w-full mx-auto px-4 md:px-6 py-8 md:py-12"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white text-center md:text-left">
              Ratings & Reviews
            </h2>

            {/* Review List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No reviews yet
                </p>
              ) : (
                reviews.slice(0, 6).map((r, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src="https://shop.huesandharvest.com/wp-content/uploads/2025/09/profile-picture.png"
                        alt="Profile"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {r.name}
                      </span>
                      <StarRating rating={r.stars} />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-10">
                      {r.review}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Show More Button */}
            {reviews.length > 6 && (
              <div className="mt-6 md:mt-8 text-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2 text-white shadow-md hover:brightness-90 transition-all duration-200"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "16px",
                  }}
                >
                  Show More
                </button>
              </div>
            )}

            {/* Modal */}
            {showModal && (
              <div
                className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm p-4"
                onClick={() => {
                  setShowModal(false);
                  setModalVisibleCount(10);
                }}
              >
                <div
                  className="rounded-2xl w-full max-w-2xl h-auto max-h-[80vh] p-4 md:p-6 relative shadow-lg flex flex-col"
                  style={{ backgroundColor: "var(--cards-bg)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setModalVisibleCount(10);
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
                  >
                    &times;
                  </button>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    All Reviews
                  </h3>

                  {/* Review List in Modal */}
                  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {reviews.slice(0, modalVisibleCount).map((r, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src="https://shop.huesandharvest.com/wp-content/uploads/2025/09/profile-picture.png"
                            alt="Profile"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-gray-900 dark:text-white font-medium">
                            {r.name}
                          </span>
                          <StarRating rating={r.stars} />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-10">
                          {r.review}
                        </p>
                      </div>
                    ))}
                  </div>

                  {modalVisibleCount < reviews.length && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() =>
                          setModalVisibleCount((prev) => prev + 10)
                        }
                        className="px-6 py-2 text-white shadow-md hover:brightness-90 transition-all duration-200"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          borderTopLeftRadius: "16px",
                          borderTopRightRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "16px",
                        }}
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductListing excludeId={productId} />
    </Gradient>
  );
}

export default ProductPage;
