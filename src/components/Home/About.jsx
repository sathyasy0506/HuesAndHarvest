import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

const About = () => {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded by two friends passionate about authentic flavors, Huses & Harvest
                began as a small farm operation with a simple mission: create the perfect chip
                using only the finest organic ingredients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to bring you chips that celebrate the natural goodness
                of real ingredients, sustainable farming practices, and traditional craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 mb-2">2018</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Organic</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Retail Partners</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 mb-2">Zero</div>
                <div className="text-sm text-gray-600">Preservatives</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Farm to table process"
              className="rounded-3xl shadow-2xl w-full"
            />
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-orange-500" />
                <div>
                  <div className="font-bold text-gray-900">Farm Fresh</div>
                  <div className="text-sm text-gray-600">Direct from source</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
