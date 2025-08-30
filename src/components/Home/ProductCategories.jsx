import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Classic Flavors",
    description: "Timeless tastes that never go out of style",
    image:
      "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: 12,
  },
  {
    name: "Gourmet Collection",
    description: "Premium ingredients for sophisticated palates",
    image:
      "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: 8,
  },
  {
    name: "Spicy & Bold",
    description: "For those who love adventure in every bite",
    image:
      "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=800",
    products: 6,
  },
];

const ProductCategories = () => {
  return (
    <section className="py-20 lg:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-6xl font-bold mb-6"
            style={{
              color: "var(--text-color)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Shop by Category
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--muted-text)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Explore our carefully curated collections, each designed to satisfy
            different taste preferences and occasions.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                {/* Image */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {category.products} Products
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3
                    className="text-2xl font-bold mb-3 group-hover:text-[var(--primary-color)] transition-colors"
                    style={{
                      color: "var(--text-color)",
                      fontFamily: "var(--font-outfit)",
                    }}
                  >
                    {category.name}
                  </h3>
                  <p
                    className="mb-6 leading-relaxed"
                    style={{
                      color: "var(--muted-text)",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {category.description}
                  </p>

                  {/* Button */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-2 font-semibold"
                      style={{
                        color: "var(--accent-color)",
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
