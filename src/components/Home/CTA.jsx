import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div className="space-y-8" {...fadeInUp}>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Ready to Taste the Difference?
          </h2>
          <p className="text-xl leading-relaxed opacity-90">
            Join thousands of satisfied customers and experience chips made the
            way they should be.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Start Shopping</span>
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find in Stores
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
