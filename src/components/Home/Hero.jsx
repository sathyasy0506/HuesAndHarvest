import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mouse } from "lucide-react";
import Silk from "../Background/Silk";
import mainImg1 from "../../assets/images/tb1.jpeg";
import mainImg2 from "../../assets/images/tb2.jpeg";

const Hero = () => {
  // For now all five use the same URL; replace with distinct URLs later
  const images = [mainImg1, mainImg2];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

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
                className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-[14px] text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Farm to Bag Excellence
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Harvested for Your{" "}
                <span className="text-emerald-400 block">Taste</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Handcrafted artisanal chips made with pure organic goodness,
                delivering bold, real flavors nurtured in our sustainable farms
                and shared fresh at your table.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="bg-emerald-500 text-white px-8 py-3 rounded-[18px] font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-emerald-600 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="border-2 border-gray-500 text-white px-8 py-3 rounded-[18px] font-semibold text-lg hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn Our Story
              </motion.button>
            </div>

            {/* <div className="flex items-center space-x-8 pt-4">
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
            </div> */}
          </motion.div>

          {/* Right Image (badge moved outside overflow-hidden so it won't be clipped) */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Outer wrapper is relative and DOES NOT hide overflow. This allows the badge to sit outside the image's rounded container without being clipped. */}
            <div className="relative w-full">
              {/* Image wrapper keeps rounded corners and hides overflow so the image stays clipped to the rounded shape. */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Premium Chips ${currentIndex + 1}`}
                    className="w-full h-[420px] md:h-[520px] lg:h-[420px] object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>
              </div>

              {/* Badge placed in the outer wrapper so it's not clipped by the rounded image container */}
              <motion.div
                className="absolute -top-4 -right-4 bg-orange-500 text-white px-6 py-2 rounded-[18px] font-bold shadow-lg z-20"
                animate={{ rotate: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
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
