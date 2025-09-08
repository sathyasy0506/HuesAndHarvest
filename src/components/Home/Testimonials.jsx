import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarIcon from "@mui/icons-material/Star";

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          "https://admin.huesandharvest.com/api/reviews.php"
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  if (!reviews || reviews.length === 0) {
    return <p className="text-center py-10">No reviews found</p>;
  }

  const currentReview = reviews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          style={{
            fontSize: 16,
            color: i <= rating ? "#FBBF24" : "rgba(255,255,255,0.4)",
          }}
        />
      );
    }
    return stars;
  };

  return (
    <section className="w-full bg-transparent px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Card */}
        <div className="relative bg-[#6F4869] rounded-[56px] p-4 md:p-6 overflow-visible shadow-lg">
          {/* decorative top-right plate */}
          <div className="absolute -top-6 right-12 z-20">
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
              <img
                src={currentReview.product_image}
                alt="plate"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* main layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Product image inside white rounded frame */}
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div className="bg-white rounded-[36px] p-6 md:p-8 w-full max-w-md shadow-inner">
                <img
                  src={currentReview.product_image}
                  alt="product"
                  className="w-full h-72 md:h-80 object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:col-span-7 text-white">
              {/* Title line */}
              <h2 className="text-4xl md:text-5xl font-light leading-tight flex items-center gap-3">
                <span>Love</span>
                <span className="text-white/60 font-light">From</span>
                <span>Customers</span>
              </h2>

              <div className="mt-4 mb-6 w-full">
                <div className="h-px bg-white/30 w-3/4" />
              </div>

              {/* reviewer row + carousel controls */}
              <div className="flex items-center gap-60">
                <div className="flex items-center gap-2">
                  <img
                    src="https://shop.huesandharvest.com/wp-content/uploads/2025/09/profile-picture.png"
                    alt={currentReview.reviewer}
                    className="w-12 h-12 rounded-full ring-2 ring-white object-cover"
                  />
                  <div>
                    <p className="font-medium">{currentReview.reviewer}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(currentReview.rating)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    aria-label="previous"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition"
                    onClick={handlePrev}
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  <button
                    aria-label="next"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition"
                    onClick={handleNext}
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-white/90 max-w-2xl leading-relaxed whitespace-pre-line pr-40">
                {currentReview.review}
              </p>
            </div>
          </div>

          {/* bottom-right decorative leaf */}
          <svg
            className="absolute right-8 bottom-6 opacity-20 w-56 h-40 pointer-events-none"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 90 C40 40, 140 40, 195 95"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35 80 C70 50, 120 50, 160 80"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
