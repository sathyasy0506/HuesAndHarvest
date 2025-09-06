import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Users } from "lucide-react";
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

  useEffect(() => {
    fetch(ENDPOINTS.REVIEWS())
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  if (!reviews.length) return null; // Optional loader

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1280, // large laptops
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // tablets
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-16 sm:py-20 bg-transparent">
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

        {/* Reviews Slider */}
        <Slider {...settings} key={reviews.length}>
          {reviews.map((review) => (
            <div key={review.id} className="px-2 sm:px-3 w-full">
              <motion.div
                className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between w-full"
                style={{
                  backgroundColor: "var(--cards-bg)",
                  color: "var(--text-color)",
                  fontFamily: "var(--font-poppins)",
                }}
                whileHover={{ y: -5 }}
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
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
