import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Newsletter = () => {
  return (
    <section
      className="py-20 bg-transparent"
      style={{
        color: "var(--text-color)",
        fontFamily: "var(--font-poppins)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div className="space-y-8" {...fadeInUp}>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Stay Crunchy, Stay Updated
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get the latest updates on new flavors, exclusive offers, and
              sustainable farming stories.
            </p>
          </div>

          <motion.form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            />
            <motion.button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span>✅ No spam, ever</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✅ Unsubscribe anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
