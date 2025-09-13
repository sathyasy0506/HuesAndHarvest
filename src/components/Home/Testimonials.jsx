import React, { useEffect, useRef, useState } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import { ENDPOINTS } from "../../api/api";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// RatingStars component
const RatingStars = ({ rating }) => (
  <div className="flex items-center space-x-1 mb-3 sm:mb-4">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <StarIcon key={i} style={{ color: "#facc15", fontSize: "20px" }} />
      ) : (
        <StarIcon key={i} style={{ color: "#d1d5db", fontSize: "20px" }} />
      )
    )}
  </div>
);

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(ENDPOINTS.REVIEWS())
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1); // mobile
      else if (window.innerWidth < 1024) setVisibleCount(2); // tablet
      else setVisibleCount(3); // desktop
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (!reviews || reviews.length === 0) return null; // ✅ hide if no reviews

  const maxPage = Math.ceil(reviews.length / visibleCount) - 1;

  const scrollToPage = (newPage) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: newPage * containerWidth,
      behavior: "smooth",
    });
    setPage(newPage);
  };

  const scrollLeft = () => {
    if (page > 0) scrollToPage(page - 1);
  };

  const scrollRight = () => {
    if (page < maxPage) scrollToPage(page + 1);
  };

  return (
    <section className="py-16 sm:py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div className="text-center mb-10 sm:mb-16" {...fadeInUp}>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            style={{
              color: "var(--text-color)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            What Our Customers Say
          </h2>
          <p
            className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--muted-text)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Join thousands of satisfied customers who've discovered their new
            favorite snack.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Button */}
          {reviews.length > visibleCount && (
            <button
              onClick={scrollLeft}
              disabled={page === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition ${
                page === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-[var(--secondary-bg)] text-[var(--accent-color)] hover:scale-110"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Scrollable Reviews */}
          <div
            ref={scrollRef}
            className="overflow-x-hidden flex space-x-6 sm:space-x-8 lg:space-x-[1px] snap-x snap-mandatory scroll-smooth"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="snap-center shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
                whileHover={{ y: -5 }}
              >
                <div
                  className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between"
                  style={{
                    backgroundColor: "var(--cards-bg)",
                    color: "var(--text-color)",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  <div>
                    <RatingStars rating={review.rating} />
                    <p
                      className="mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base"
                      style={{ color: "var(--muted-text)" }}
                    >
                      "{review.review}"
                    </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="flex items-center space-x-3 mt-auto">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "var(--secondary-bg)" }}
                    >
                      <Users
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color: "var(--accent-color)" }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-sm sm:text-base"
                        style={{
                          color: "var(--text-color)",
                          fontFamily: "var(--font-outfit)",
                        }}
                      >
                        {review.reviewer}
                      </div>
                      <div
                        className="text-xs sm:text-sm"
                        style={{ color: "var(--muted-text)" }}
                      >
                        {review.date_created}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Button */}
          {reviews.length > visibleCount && (
            <button
              onClick={scrollRight}
              disabled={page === maxPage}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition ${
                page === maxPage
                  ? "opacity-40 cursor-not-allowed"
                  : "bg-[var(--secondary-bg)] text-[var(--accent-color)] hover:scale-110"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
