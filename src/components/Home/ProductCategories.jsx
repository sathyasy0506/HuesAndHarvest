import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import all from "../../assets/images/shop.jpeg";
import snacks from "../../assets/images/snacks.jpeg";
import combos from "../../assets/images/combo.jpeg";
import { ENDPOINTS } from "../../api/api";

const categories = [
  {
    name: "All",
    description: "All Your Favorites Together",
    key: "all",
    image: all,
  },
  {
    name: "Snacks",
    description: "Convenient bites packed with flavor",
    key: "snacks",
    image: snacks,
  },
  {
    name: "Combos",
    description: "Specially crafted for sharing moments",
    key: "combo",
    image: combos,
  },
];

const ProductCategories = () => {
  const [productCounts, setProductCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(ENDPOINTS.PRODUCT_COUNT())
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data && data.success) {
            setProductCounts({
              all: data.all ?? 0,
              snacks: data.snacks ?? 0,
              combo: data.combo ?? 0,
            });
          } else {
            console.error("Unexpected API response:", data);
          }
        } catch (err) {
          console.error("Failed to parse JSON. Response was:", text);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleCategoryClick = (categoryKey) => {
    switch (categoryKey) {
      case "all":
        navigate("/shop");
        break;
      case "snacks":
        navigate("/snacks");
        break;
      case "combo":
        navigate("/combos");
        break;
      default:
        navigate("/shop");
    }
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
              onClick={() => handleCategoryClick(category.key)}
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
