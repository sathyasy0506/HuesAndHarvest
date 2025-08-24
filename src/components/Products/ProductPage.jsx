import { useState, useEffect } from "react";
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
import Silk from "../Home/Silk";

// FeatureCard Component
const FeatureCard = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// InfoCard Component
const InfoCard = ({ Icon, text, highlight }) => (
  <div
    className="bg-[#F9FBF9] rounded-2xl p-6"
    style={{ borderTopRightRadius: "6rem" }}
  >
    <div className="flex items-start space-x-3">
      <Icon className="w-6 h-6 text-green-600 mt-1" />
      <p className="text-gray-900 font-medium">
        {text} <span className="font-bold">{highlight}</span>
      </p>
    </div>
  </div>
);

// StarRating Component
const StarRating = ({ count }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? "text-yellow-500" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.959a1 1 0 00-.364-1.118L2.074 9.386c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.959z" />
      </svg>
    ))}
  </div>
);

// Dummy Reviews
const reviews = Array.from({ length: 20 }, (_, i) => ({
  name: `User ${i + 1}`,
  date: `August ${i + 1}, 2022`,
  review: `This is a sample review from user ${
    i + 1
  }. The product is really good and I am satisfied with the purchase.`,
  stars: Math.floor(Math.random() * 5) + 1,
}));

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalVisibleCount, setModalVisibleCount] = useState(10);

  const kiwiImage =
    "https://images.pexels.com/photos/4701130/pexels-photo-4701130.jpeg?auto=compress&cs=tinysrgb&w=800";
  const appleImage =
    "https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  // Modal scroll lock
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleShowMoreModal = () => {
    setModalVisibleCount((prev) => prev + 10);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalVisibleCount(10);
  };

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 flex justify-center bg-white dark:bg-black relative z-1">
      <div className="w-full max-w-7xl flex flex-col gap-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full md:w-[90%] lg:w-[80%] aspect-square bg-pink-50 rounded-xl overflow-hidden">
              <img
                src={kiwiImage}
                alt="Kiwi Fruit"
                className="w-full h-full object-cover filter grayscale"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">Kiwi</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-base sm:text-lg">
                Kiwi is a small, oval-shaped fruit with a brown fuzzy exterior
                and vibrant green.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold">₹599.00</span>
              <span className="line-through text-gray-400 text-sm sm:text-lg">
                ₹1199.00
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="p-2 border rounded-full"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <Minus size={18} />
              </button>
              <span className="font-medium text-base sm:text-lg">
                Quantity: {quantity}
              </span>
              <button
                className="p-2 border rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-sm">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full shadow hover:opacity-80">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="px-6 py-3 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 flex flex-col gap-8">
            <div
              className="bg-white rounded-2xl border border-gray-200 px-8 py-[40px] flex-1"
              style={{ borderTopRightRadius: "6rem" }}
            >
              <div className="grid grid-cols-2 gap-8">
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
            className="lg:w-1/3 flex flex-col gap-8 bg-[#EFF5ED] p-0 rounded-2xl"
            style={{ borderTopRightRadius: "6rem" }}
          >
            <div className="rounded-2xl p-4 flex-1 flex justify-between flex-col gap-6">
              <InfoCard
                Icon={Clock}
                text="We Delivery on Next Day from"
                highlight="10:00 AM to 08:00 PM"
              />

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Product Description
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Green apples delivered fresh! Crisp, fresh and hand-picked!
                  Essential for your kitchen. A perfect snack on-the-go or yummy
                  in a soft pie! Green apples are a type of apple that's known
                  for its tart and tangy flavor...
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Additional information
                </h2>
                <div className="border-t border-gray-200">
                  <div className="py-3 flex justify-between">
                    <span className="text-gray-700 font-medium">Weight</span>
                    <span className="text-gray-900">
                      0.5 kg, 1 kg, 2 kg, 5 kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="max-w-7xl w-full mx-auto px-6 py-12 font-sans text-gray-800">
          <h2 className="text-4xl font-bold mb-10 text-gray-900">
            Ratings & Reviews
          </h2>

          {/* Summary */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-12 bg-gray-50 p-6 rounded-xl shadow-sm">
            <div className="text-center md:text-left mr-0 md:mr-12 mb-6 md:mb-0">
              <div className="text-5xl font-extrabold text-gray-900">
                {averageRating}
              </div>
              <StarRating count={Math.round(averageRating)} />
              <div className="text-gray-500 mt-1">
                Based on {reviews.length} reviews
              </div>
            </div>

            <div className="flex-1 space-y-3 w-full">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center w-full">
                  <span className="w-5 text-sm text-gray-600">{star}</span>
                  <div className="flex-1 h-2 bg-gray-200 mx-3 rounded-full overflow-hidden">
                    <div
                      className={`h-2 bg-yellow-500 rounded-full`}
                      style={{
                        width: `${
                          (reviews.filter((r) => r.stars === star).length /
                            reviews.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Reviews */}
          <div className="space-y-8">
            {reviews.slice(0, 5).map((r, index) => (
              <div
                key={index}
                className="flex flex-col bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 w-full"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg text-gray-900">
                    {r.name}
                  </h4>
                  <span className="text-sm text-gray-500">{r.date}</span>
                </div>
                <div className="mt-2">
                  <StarRating count={r.stars} />
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed">{r.review}</p>
              </div>
            ))}
          </div>

          {/* Show more button */}
          {reviews.length > 5 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Show More
              </button>
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div
              className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm"
              onClick={closeModal}
            >
              <div
                className="bg-white/90 backdrop-blur-md rounded-xl w-[600px] h-[500px] p-6 relative shadow-lg flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
                >
                  &times;
                </button>
                <h3 className="text-2xl font-bold mb-4">All Reviews</h3>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {reviews.slice(0, modalVisibleCount).map((r, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-gray-50 p-4 rounded-xl shadow-sm w-full"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg text-gray-900">
                          {r.name}
                        </h4>
                        <span className="text-sm text-gray-500">{r.date}</span>
                      </div>
                      <div className="mt-1">
                        <StarRating count={r.stars} />
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">
                        {r.review}
                      </p>
                    </div>
                  ))}
                </div>
                {modalVisibleCount < reviews.length && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handleShowMoreModal}
                      className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
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
