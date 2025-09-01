import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../api/api";
const categories = [
  {
    name: "All",
    description: "All products in one place",
    image:
      "https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=800",
    key: "",
  },
  {
    name: "Spicy & Bold",
    description: "For those who love adventure in every bite",
    image:
      "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=800",
    key: "spicy",
  },
  {
    name: "Sweet Treats",
    description: "Delight your sweet tooth",
    image:
      "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=800",
    key: "sweetssssss",
  },
];

const ProductCategories = () => {
  const [productCounts, setProductCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(ENDPOINTS.LIST_PRODUCTS())
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const counts = {};
          let total = 0;

          data.Categories.forEach((cat) => {
            const count = data.products.filter(
              (p) => p.category === cat
            ).length;
            counts[cat] = count;
            total += count;
          });

          counts["all"] = total;
          setProductCounts(counts);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (categoryKey) => {
    navigate("/shop", { state: { category: categoryKey } });
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer flex"
              onClick={() => handleCategoryClick(category.key)} // Navigate on card click
            >
              <div
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col w-full"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                {/* Image */}
                <div className="aspect-video relative overflow-hidden flex-shrink-0">
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
                      {productCounts[category.key] ?? 0} Products
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
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
                  </div>

                  <div className="flex items-center justify-between mt-auto">
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
