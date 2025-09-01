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
  <div className="flex items-center space-x-1 mb-4">
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <StarIcon key={i} style={{ color: "#facc15" }} />
      ) : (
        <StarIcon key={i} style={{ color: "#d1d5db" }} />
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
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            style={{
              color: "var(--text-color)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            What Our Customers Say
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--muted-text)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Join thousands of satisfied customers who've discovered their new
            favorite snack.
          </p>
        </motion.div>

        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-3">
              <motion.div
                className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{
                  backgroundColor: "var(--cards-bg)",
                  color: "var(--text-color)",
                  fontFamily: "var(--font-poppins)",
                  height: "100%",
                }}
                whileHover={{ y: -5 }}
              >
                <RatingStars rating={review.rating} />
                <p
                  className="mb-6 leading-relaxed italic"
                  style={{ color: "var(--muted-text)" }}
                >
                  "{review.review}"
                </p>

                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--secondary-bg)" }}
                  >
                    <Users
                      className="w-6 h-6"
                      style={{ color: "var(--accent-color)" }}
                    />
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{
                        color: "var(--text-color)",
                        fontFamily: "var(--font-outfit)",
                      }}
                    >
                      {review.reviewer}
                    </div>
                    <div
                      className="text-sm"
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
