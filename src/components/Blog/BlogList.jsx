import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import Gradient from "../Background/Gradient";
import banner from "../../assets/images/blog_banner.jpg";
import { ENDPOINTS } from "../../api/api";
import Loader from "../Load"; // ✅ Import Loader

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    fetch(ENDPOINTS.GET_POSTS())
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) return <Loader />; // ✅ Show loader while fetching

  return (
    <Gradient>
      <div className="min-h-screen bg-transparent ">
        {/* Header */}
        <div className="relative w-full ">
          <img
            src={banner}
            alt="Blog Header"
            className="w-full h-auto object-cover"
          />
          {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-gray-300 text-2xl sm:text-2xl lg:text-2xl">
              <span onClick={() => navigate("/")}>Home</span> /{" "}
              <span className="text-white"> Blogs</span>
            </h2>
          </div> */}
        </div>

        {/* Blog Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={{
                  id: blog.id,
                  title: blog.title,
                  excerpt: blog.excerpt,
                  content: blog.content,
                  image: blog.featured_image,
                  category: blog.categories?.[0]?.name || "General",
                  author: {
                    name: blog.author?.name || "Unknown",
                    avatar:
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(blog.author?.name || "U"),
                  },
                  publishedDate: blog.date,
                  readTime: blog.reading_time,
                }}
                onClick={() => handleBlogClick(blog.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </Gradient>
  );
};

export default BlogList;
