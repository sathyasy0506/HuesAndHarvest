import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import axios from "axios";
import { ENDPOINTS } from "../../api/api";

const InstagramFeed = () => {
  const [instagramPosts, setInstagramPosts] = useState([]);

  // Fetch initial posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(ENDPOINTS.INSTAGRAM_FEED());
      if (res.data && res.data.data) {
        const sortedPosts = res.data.data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 6);
        setInstagramPosts(sortedPosts);
      }
    } catch (err) {
      console.error("Error fetching Instagram posts:", err);
    }
  };

  // Refresh counts + check for new posts
  const refreshData = async () => {
    try {
      const res = await axios.get(ENDPOINTS.INSTAGRAM_FEED);
      if (res.data && res.data.data) {
        const latestPosts = res.data.data
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 6);

        setInstagramPosts((prevPosts) => {
          const prevIds = new Set(prevPosts.map((p) => p.id));
          const updated = prevPosts.map((p) => {
            const match = latestPosts.find((lp) => lp.id === p.id);
            return match
              ? {
                  ...p,
                  like_count: match.like_count,
                  comments_count: match.comments_count,
                }
              : p;
          });

          // Add any new posts not seen before
          const newOnes = latestPosts.filter((lp) => !prevIds.has(lp.id));
          return [...newOnes, ...updated].slice(0, 6); // keep max 6
        });
      }
    } catch (err) {
      console.error("Error refreshing Instagram data:", err);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial load
    const interval = setInterval(refreshData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-0 lg:py-0 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
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
              @huesandharvest
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer relative aspect-square"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.media_type === "VIDEO" ? (
                  <video
                    src={post.media_url}
                    muted
                    autoPlay
                    loop
                    playsInline
                    poster={post.thumbnail_url}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={post.media_url}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}

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
            href="https://www.instagram.com/huesandharvest/"
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
