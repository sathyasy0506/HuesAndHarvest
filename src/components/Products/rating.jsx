import React, { useState, useEffect } from 'react';

// Generate 20 dummy reviews
const reviews = Array.from({ length: 20 }, (_, i) => ({
  name: `User ${i + 1}`,
  date: `August ${i + 1}, 2022`,
  review: `This is a sample review from user ${i + 1}. The product is really good and I am satisfied with the purchase.`,
  stars: Math.floor(Math.random() * 5) + 1,
}));

const StarRating = ({ count }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.959a1 1 0 00-.364-1.118L2.074 9.386c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.959z" />
      </svg>
    ))}
  </div>
);

const RatingsAndReviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalVisibleCount, setModalVisibleCount] = useState(10);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleShowMoreModal = () => {
    setModalVisibleCount((prev) => prev + 10);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalVisibleCount(10);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-12 font-sans text-gray-800">
      <h2 className="text-4xl font-bold mb-10 text-gray-900">Ratings & Reviews</h2>

      {/* Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center mb-12 bg-gray-50 p-6 rounded-xl shadow-sm">
        <div className="text-center md:text-left mr-0 md:mr-12 mb-6 md:mb-0">
          <div className="text-5xl font-extrabold text-gray-900">
            {(reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)}
          </div>
          <StarRating
            count={Math.round(
              reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
            )}
          />
          <div className="text-gray-500 mt-1">Based on {reviews.length} reviews</div>
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
                      (reviews.filter((r) => r.stars === star).length / reviews.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main reviews - show only first 5 */}
      <div className="space-y-8">
        {reviews.slice(0, 5).map((r, index) => (
          <div
            key={index}
            className="flex flex-col bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 w-full"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg text-gray-900">{r.name}</h4>
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
                    <h4 className="font-semibold text-lg text-gray-900">{r.name}</h4>
                    <span className="text-sm text-gray-500">{r.date}</span>
                  </div>
                  <div className="mt-1">
                    <StarRating count={r.stars} />
                  </div>
                  <p className="mt-2 text-gray-700 leading-relaxed">{r.review}</p>
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
  );
};

export default RatingsAndReviews;
