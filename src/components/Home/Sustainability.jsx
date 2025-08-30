import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const Sustainability = () => {
  const items = [
    "100% compostable packaging",
    "Carbon-neutral delivery",
    "Supporting regenerative agriculture",
    "Zero waste manufacturing process",
  ];

  return (
    <section className="py-20 bg-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Sustainable farming"
              className="rounded-3xl shadow-2xl w-full"
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Sustainable Future
              </h2>
              <p className="text-lg text-emerald-100 leading-relaxed mb-6">
                We believe great taste shouldn't come at the expense of our
                planet. That's why we're committed to sustainable practices at
                every step.
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="w-6 h-6 text-orange-300 flex-shrink-0" />
                  <span className="text-emerald-100">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn More</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
