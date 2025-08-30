import React from "react";
import { motion } from "framer-motion";
import { Leaf, Award, Heart } from "lucide-react";

const BrandStory = () => {
  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "No artificial flavors, colors, or preservatives",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized by top culinary institutions",
    },
    {
      icon: Heart,
      title: "Family Recipe",
      description: "Passed down through generations",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-transparent ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 gradient-header rounded-3xl transform rotate-3"></div>
            <img
              src="https://images.pexels.com/photos/4109754/pexels-photo-4109754.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Story"
              className="relative z-10 w-full rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2
                className="text-4xl lg:text-6xl font-bold mb-6 primary-text"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Our Story
              </h2>
              <p
                className="text-lg leading-relaxed mb-8 muted-text"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Born from a passion for authentic flavors and sustainable
                farming, Huses & Harvest represents the perfect marriage of
                traditional craftsmanship and modern innovation. Every chip
                tells a story of dedication, quality, and respect for nature's
                finest ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3
                    className="font-bold mb-2 primary-text"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm muted-text"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="primary-button px-8 py-4 rounded-full font-semibold shadow-lg"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Learn More About Us
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
