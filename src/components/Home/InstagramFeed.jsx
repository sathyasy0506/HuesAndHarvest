import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import axios from "axios";

const InstagramFeed = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);

  // Function to fetch Instagram posts
  const fetchPosts = () => {
    axios
      .get("https://admin.huesandharvest.com/api/instagram.php")
      .then((res) => {
        if (res.data && res.data.data) {
          // Sort posts by timestamp descending (assuming post has timestamp) and take first 6
          const sortedPosts = res.data.data
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 6);
          setInstagramPosts(sortedPosts);
        }
      })
      .catch((err) => console.error("Error fetching Instagram posts:", err));
  };

  useEffect(() => {
    fetchPosts();
    // Poll every 5 seconds (100ms is too frequent)
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Instagram className="w-8 h-8 text-[var(--accent-color)]" />
            <h2
              className="text-4xl lg:text-6xl font-bold primary-text"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              @husesandharvest
            </h2>
          </div>
          <p
            className="text-xl muted-text max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Follow us for daily inspiration, recipes, and behind-the-scenes
            moments from our artisanal kitchen.
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer relative aspect-square"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={post.media_url}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <div className="flex space-x-6 text-white">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{post.like_count}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{post.comments_count}</span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/husesandharvest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="primary-button px-8 py-4 rounded-full font-semibold hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-lg flex items-center space-x-2 mx-auto"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <Instagram className="w-5 h-5" />
              <span>Follow Us</span>
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
