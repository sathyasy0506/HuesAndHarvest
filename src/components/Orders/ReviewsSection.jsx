// src/components/ReviewsSection.jsx
import React, { useState } from "react";
import { Star, MessageSquare, X } from "lucide-react";

const ReviewsSection = () => {
  const currentUser = "Sathya";

  // Example ordered products
  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      image:
        "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 1,
      price: 29999,
    },
    {
      id: "2",
      name: "Smart Watch Series 8",
      image:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 1,
      price: 16000,
    },
  ];

  // State for all reviews by the user
  const [userReviews, setUserReviews] = useState({}); // { productId: {rating, comment, date} }
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const existingReview = userReviews[selectedProductId];

  const openModal = () => {
    if (existingReview) {
      setFormRating(existingReview.rating);
      setFormComment(existingReview.comment);
    } else {
      setFormRating(5);
      setFormComment("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormRating(5);
    setFormComment("");
  };

  const submitReview = (e) => {
    e.preventDefault();

    const newReview = {
      rating: formRating,
      comment: formComment.trim(),
      date: "2025-10-30 10:15 AM", // Hardcoded date and time
    };

    setUserReviews((prev) => ({
      ...prev,
      [selectedProductId]: newReview,
    }));

    closeModal();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="rounded-lg p-3 bg-gradient-to-br from-gray-100 to-white shadow-sm">
            <MessageSquare className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">My Reviews</h3>
            <p className="text-sm text-gray-500">
              Add or edit your review for each product
            </p>
          </div>
        </div>

        {/* Current product rating */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-2xl font-bold text-gray-900">
              {existingReview ? existingReview.rating : 0}
            </div>
            <div className="text-sm text-gray-500">/5</div>
          </div>
          <div className="flex items-center justify-center mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  existingReview && i <= existingReview.rating
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product selection */}
      <div className="p-6 border-b border-gray-100">
        <label className="text-xs font-medium text-gray-700 mb-2 block">
          Select Product to Review
        </label>
        <div className="flex flex-wrap gap-3">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className={`flex items-center gap-3 border rounded-lg p-2 pr-4 transition ${
                selectedProductId === p.id
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  {p.name}
                </div>
                <div className="text-xs text-gray-400">
                  ₹{p.price.toLocaleString()}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current product review */}
      <div className="p-6">
        {existingReview ? (
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-700">
              {currentUser[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {currentUser}
                  </div>
                  <div className="text-xs text-gray-400">
                    {existingReview.date}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= existingReview.rating
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {existingReview.comment}
              </p>
              <button
                onClick={openModal}
                className="mt-3 text-sm font-medium text-gray-900 underline"
              >
                Edit Review
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              You haven’t reviewed this product yet.
            </p>
            <button
              onClick={openModal}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-95 transition"
            >
              Add Review
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-white">
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {existingReview ? "Edit Review" : "Write a Review"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {selectedProduct.name}
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={submitReview} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Rating
                </label>
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setFormRating(i)}
                      className={`p-2 rounded-md ${
                        i <= formRating ? "bg-yellow-50" : "bg-gray-50"
                      } hover:bg-yellow-50 transition`}
                      aria-label={`Rate ${i} stars`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i <= formRating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700">
                  Review
                </label>
                <textarea
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Write about your experience..."
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg text-sm border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-95"
                >
                  {existingReview ? "Update Review" : "Post Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
