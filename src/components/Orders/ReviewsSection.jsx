// src/components/ReviewsSection.jsx
import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  X,
  Trash2,
  AlertTriangle,
  Trash,
} from "lucide-react";

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

  const [userReviews, setUserReviews] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  // Custom popups
  const [isValidationPopupOpen, setIsValidationPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

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

    if (formRating < 1) {
      setIsValidationPopupOpen(true);
      return;
    }

    const newReview = {
      rating: formRating,
      comment: formComment.trim(),
      date: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setUserReviews((prev) => ({
      ...prev,
      [selectedProductId]: newReview,
    }));

    closeModal();
  };

  const confirmDeleteReview = () => {
    setIsDeletePopupOpen(true);
  };

  const deleteReview = () => {
    setUserReviews((prev) => {
      const updated = { ...prev };
      delete updated[selectedProductId];
      return updated;
    });
    setIsDeletePopupOpen(false);
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
              Add, edit, or delete your review for each product
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

        {/* Grid: scrollable if more than 3 rows */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2"
          style={{
            maxHeight: "calc((90px + 12px) * 3)", // shows exactly 3 rows
            scrollbarWidth: "thin",
          }}
        >
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className={`flex items-center w-full border rounded-lg p-3 transition text-left ${
                selectedProductId === p.id
                  ? "border-gray-900 bg-gray-50 shadow-sm scale-[1.01]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {/* Left: Product image */}
              <img
                src={p.image}
                alt={p.name}
                className="w-14 h-14 rounded-md object-cover flex-shrink-0"
              />

              {/* Right: Product name + Stars */}
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]">
                  {p.name}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        userReviews[p.id] && i <= userReviews[p.id].rating
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
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

              <div className="flex gap-4 mt-3">
                <button
                  onClick={openModal}
                  className="text-sm font-medium text-gray-900 underline"
                >
                  Edit Review
                </button>
                <button
                  onClick={confirmDeleteReview}
                  className="flex items-center gap-1 text-sm font-medium text-red-600 hover:underline"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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

      {/* Validation Popup (Rating Required) */}
      {isValidationPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsValidationPopupOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h4 className="text-sm font-semibold text-gray-900">
                Rating Required
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Please select at least <strong>1 star</strong> before posting your
              review.
            </p>
            <button
              onClick={() => setIsValidationPopupOpen(false)}
              className="w-full py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:opacity-95"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDeletePopupOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <Trash className="w-6 h-6 text-red-500" />
              <h4 className="text-sm font-semibold text-gray-900">
                Delete Review
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to permanently delete this review?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteReview}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:opacity-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
