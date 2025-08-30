import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Info,
  CheckCircle,
  Shield,
  Clock,
} from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import Silk from "../Background/Silk";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Loader from "../Load";

// FeatureCard Component
const FeatureCard = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--cards-bg)" }}
      >
        <Icon className="w-6 h-6" style={{ color: "var(--primary-color)" }} />
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
      backgroundColor: "#d7f0e6",
    }}
  >
    <div className="flex items-start space-x-3">
      <Icon className="w-6 h-6 mt-1" style={{ color: "#6cae8f" }} />
      <p
        className="font-medium"
        style={{
          color: "#2a5d4f",
          fontFamily: "var(--font-poppins)",
        }}
      >
        {text}{" "}
        <span className="font-bold" style={{ color: "#6cae8f" }}>
          {highlight}
        </span>
      </p>
    </div>
  </div>
);

// StarRating Component using MUI Star icons
const StarRating = ({ count }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          style={{
            color: i < count ? "var(--primary-color)" : "#D1D5DB",
            fontSize: 18,
          }}
        />
      ))}
    </div>
  );
};

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

// Dummy Reviews (keep for now)
// const reviews = Array.from({ length: 20 }, (_, i) => ({
//   name: `User ${i + 1}`,
//   date: `August ${i + 1}, 2022`,
//   review: `This is a sample review from user ${
//     i + 1
//   }. The product is really good and I am satisfied with the purchase.`,
//   stars: Math.floor(Math.random() * 5) + 1,
// }));

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalVisibleCount, setModalVisibleCount] = useState(10);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Get the product ID from navigation state
  const location = useLocation();
  const productId = location.state?.id;

  const averageRating =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
        )
      : 0;

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    fetch(
      `https://admin.huesandharvest.com/api/get_product.php?id=${productId}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    fetch(`https://admin.huesandharvest.com/api/product_reviews.php?id=${productId}`)
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

  // Determine stock message
  let stockMessage = "";
  if (product.stock_quantity === 0 || product.stock_status === "outofstock") {
    stockMessage = "Out of Stock";
  } else if (product.stock_quantity < 10) {
    stockMessage = `Hurry Up Only ${product.stock_quantity} Left!`;
  } else {
    stockMessage = "In Stock";
  }

  const images = [product.image]; // single image for now

  return (
    <div
      className="min-h-screen px-4 sm:px-6 py-8 flex justify-center relative z-1 mt-20"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        fontFamily: "var(--font-poppins)",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col gap-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
            {/* Gallery */}
            <div className="flex md:flex-col flex-row gap-2 justify-center md:justify-start order-2 md:order-1">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
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

            {/* Main Image with Navigation */}
            <div className="relative flex-1 aspect-square rounded-xl overflow-hidden order-1 md:order-2">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Left Arrow */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full shadow
             bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full shadow
             bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
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
          <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-semibold"
                style={{ color: "var(--text-color)" }}
              >
                {product.name}
              </h1>

              {/* Only show stars if there are reviews */}
              {averageRating > 0 && (
                <div className="mt-2">
                  <StarRating count={averageRating} />
                </div>
              )}

              <p
                className="mt-2 text-base sm:text-lg"
                style={{ color: "var(--text-color)" }}
              >
                {product.short_description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <span
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--text-color)" }}
              >
                ₹{product.price}
              </span>
              <span
                className="line-through text-sm sm:text-lg"
                style={{ color: "var(--text-color)" }}
              >
                ₹{product.oldPrice}
              </span>
            </div>
            {/* Stock and Quantity Row */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mt-2">
              {/* Stock Status */}
              <p
                className={`font-medium ${
                  product.stock_quantity === 0
                    ? "text-red-600"
                    : product.stock_quantity < 10
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {stockMessage}
              </p>

              {/* Quantity Selector (hidden if out of stock) */}
              {product.stock_quantity > 0 && (
                <div className="flex items-center gap-2 border rounded-full px-2 py-1">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="p-1"
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                  <span className="font-medium text-base sm:text-lg px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev < product.stock_quantity ? prev + 1 : prev
                      )
                    }
                    className="p-1"
                  >
                    <AddIcon fontSize="small" />
                  </button>
                </div>
              )}
            </div>

            {/* Buttons Column */}
            <div className="flex flex-col gap-4 mt-4">
              <button
                className={`flex items-center justify-center gap-2 px-6 py-3 shadow transition-all duration-200 ${
                  product.stock_quantity === 0
                    ? "filter grayscale cursor-not-allowed opacity-70"
                    : "hover:opacity-80"
                }`}
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--bg-color)",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "16px",
                }}
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                className={`px-6 py-3 border transition-all duration-200 ${
                  product.stock_quantity === 0
                    ? "filter grayscale cursor-not-allowed opacity-70"
                    : "hover:opacity-80"
                }`}
                style={{
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "16px",
                }}
                disabled={product.stock_quantity === 0}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 flex flex-col gap-8">
            <div
              className="rounded-2xl border px-8 py-[40px] flex-1"
              style={{
                borderColor: "var(--cards-bg)",
                borderTopRightRadius: "6rem",
                backgroundColor: "var(--bg-color)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FeatureCard
                  Icon={Truck}
                  title="Free Delivery Across Town!"
                  description="Free delivery for all orders above ₹500"
                />
                <FeatureCard
                  Icon={Info}
                  title="Top-Notch Support"
                  description="Chat with us if you've any questions"
                />
                <FeatureCard
                  Icon={CheckCircle}
                  title="100% Satisfaction Guarantee!"
                  description="Providing help in case of dissatisfaction"
                />
                <FeatureCard
                  Icon={Shield}
                  title="Secure Payments"
                  description="We use safest payment technologies"
                />
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden h-80"
              style={{ borderBottomLeftRadius: "6rem" }}
            >
              <Silk className="w-full h-full" />
            </div>
          </div>

          <div
            className="lg:w-1/3 flex flex-col gap-8 p-0 rounded-2xl"
            style={{
              borderTopRightRadius: "6rem",
              backgroundColor: "var(--cards-bg)",
            }}
          >
            <div className="rounded-2xl p-4 flex-1 flex justify-between flex-col gap-6">
              <InfoCard
                Icon={Clock}
                text="We Delivery on Next Day from"
                highlight="10:00 AM to 08:00 PM"
              />

              <div>
                <h2
                  style={{ color: "var(--text-color)" }}
                  className="text-xl font-bold mb-4"
                >
                  Product Description
                </h2>
                <p
                  style={{
                    color: "var(--text-color)",
                    fontFamily: "var(--font-poppins)",
                  }}
                  className="text-sm leading-relaxed"
                >
                  {product.description}
                </p>
              </div>

              <div>
                <h2
                  style={{ color: "var(--text-color)" }}
                  className="text-xl font-bold mb-4"
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

        {/* Ratings & Reviews Section */}
        <div
          className="max-w-7xl w-full mx-auto px-6 py-12"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {/* Title */}
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center md:text-left">
            Ratings & Reviews
          </h2>

          {/* Ratings Bar Graph */}
          {reviews.length > 0 && (
            <div
              className="rounded-2xl p-6 mb-8 shadow-md flex flex-col gap-4"
              style={{ backgroundColor: "var(--cards-bg)" }}
            >
              <div className="flex flex-row gap-6">
                {/* Average Rating Circle */}
                <div className="w-1/4 flex items-center justify-center">
                  <AverageRatingCircle rating={averageRating} />
                </div>

                {/* Star Graph */}
                <div className="w-3/4 flex flex-col gap-3 justify-center">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage =
                      (reviews.filter((r) => r.stars === star).length /
                        reviews.length) *
                      100;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-5 text-gray-700 dark:text-gray-300">
                          {star}
                        </span>
                        <div className="flex-1 h-3 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-3 rounded-xl"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: "var(--primary-color)",
                            }}
                          ></div>
                        </div>
                        <span className="w-10 text-right text-sm text-gray-700 dark:text-gray-400">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 col-span-2 text-center">
                No reviews yet
              </p>
            ) : (
              reviews.slice(0, 6).map((r, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: "var(--cards-bg)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {r.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {r.date}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    <StarRating count={r.stars} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4">
                    {r.review}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Show More Button */}
          {reviews.length > 6 && (
            <div className="mt-8 text-center">
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
              className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm"
              onClick={() => {
                setShowModal(false);
                setModalVisibleCount(10);
              }}
            >
              <div
                className="rounded-2xl w-[600px] max-w-full h-[500px] p-6 relative shadow-lg flex flex-col"
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
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  All Reviews
                </h3>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {reviews.slice(0, modalVisibleCount).map((r, index) => (
                    <div
                      key={index}
                      className="rounded-2xl p-4 shadow-md w-full"
                      style={{ backgroundColor: "var(--cards-bg)" }}
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {r.name}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {r.date}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <StarRating count={r.stars} />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {r.review}
                      </p>
                    </div>
                  ))}
                </div>
                {modalVisibleCount < reviews.length && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setModalVisibleCount((prev) => prev + 10)}
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
  );
}

export default ProductPage;
