import React from "react";
import { motion } from "framer-motion";
import { Leaf, Shield, Heart, Truck } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const Features = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Organic",
      description:
        "Certified organic ingredients sourced from sustainable farms",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Preservatives",
      description: "Pure, natural ingredients with no artificial additives",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made with Love",
      description: "Small-batch production ensuring quality in every bite",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fresh Delivery",
      description: "Fast shipping to ensure maximum freshness and quality",
    },
  ];

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
            Why Choose Us
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--muted-text)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            We're committed to delivering exceptional quality while caring for
            our planet and community.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl transition-all duration-300 group"
              style={{
                backgroundColor: "var(--cards-bg)",
                boxShadow: `0 1px 3px var(--shadow-color)`,
              }}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div
                className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center"
                style={{ color: "var(--accent-color)" }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--muted-text)",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
