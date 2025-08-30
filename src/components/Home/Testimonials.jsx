import React from "react";
import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "These chips are absolutely incredible! The quality and flavor are unmatched.",
    rating: 5,
    location: "California",
  },
  {
    name: "Mike Chen",
    text: "Finally found chips that taste authentic and don't have weird chemicals.",
    rating: 5,
    location: "New York",
  },
  {
    name: "Emma Williams",
    text: "Love supporting a brand that cares about sustainability and quality.",
    rating: 5,
    location: "Texas",
  },
];

const Testimonials = () => {
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

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "var(--cards-bg)",
                color: "var(--text-color)",
                fontFamily: "var(--font-poppins)",
              }}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              {/* ⭐ Stars (always yellow) */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    style={{ color: "#facc15" }} // Tailwind's yellow-400
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p
                className="mb-6 leading-relaxed italic"
                style={{ color: "var(--muted-text)" }}
              >
                "{testimonial.text}"
              </p>

              {/* User info */}
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
                    {testimonial.name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--muted-text)" }}
                  >
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
