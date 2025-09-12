import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mouse } from "lucide-react";
import Silk from "../Background/Silk";

const Hero = () => {
  return (
    <section
      className="relative overflow-x-hidden overflow-y-hidden min-h-screen
                 mt-16 md:-mt-8 lg:-mt-20
                 pt-40 md:pt-52 lg:pt-[140px]
                 pb-24 md:pb-32 lg:pb-10"
    >
      {/* Silk Background */}
      <div className="absolute top-0 left-0 w-screen h-full -z-10">
        <Silk
          speed={5}
          scale={1}
          color="#234541"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen w-full">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Farm to Bag Excellence
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Taste the
                <span className="text-emerald-400 block">Harvest</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Premium artisanal chips crafted from the finest organic
                ingredients, bringing authentic flavors straight from our
                sustainable farms to your table.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="border-2 border-gray-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn Our Story
              </motion.button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-300">Organic</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-sm text-gray-300">Flavors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full">
              <motion.img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Premium Chips"
                className="rounded-3xl shadow-2xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <motion.div
                className="absolute -top-4 -right-4 bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Fresh Daily!
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <span className="text-white text-sm">Scroll</span>
        <motion.div
          className="text-white"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Mouse className="w-6 h-6 -rotate-180" />
        </motion.div>
        <span className="text-white text-sm">|</span>
      </div>
    </section>
  );
};

export default Hero;
