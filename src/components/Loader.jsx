import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Silk from "./Home/Silk";
import Logo from "../assets/images/H&H.png";

const Loader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Shader */}
          <div className="absolute inset-0">
            <Silk />
          </div>

          {/* Responsive Logo */}
          <motion.img
            src={Logo}
            alt="Logo"
            className="
              z-10
              w-32 h-32          /* default for small screens */
              sm:w-40 sm:h-40    /* medium screens */
              md:w-48 md:h-48    /* large screens */
              lg:w-56 lg:h-56    /* extra large screens */
              xl:w-64 xl:h-64    /* 2xl screens */
            "
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
