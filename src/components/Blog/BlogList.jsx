import React from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "./BlogData";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="relative w-full h-44 sm:h-80 -mt-16 lg:h-64">
        <img
          src="https://images.pexels.com/photos/19161533/pexels-photo-19161533.jpeg?_gl=1*1kjzvtp*_ga*MTIwMzc1OTY5Ni4xNzU3MzI4ODY4*_ga_8JE65Q40S6*czE3NTc3NjY1MTMkbzQkZzEkdDE3NTc3NjY1NDQkajI5JGwwJGgw"
          alt="Blog Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-gray-300 text-2xl sm:text-2xl lg:text-2xl ">
            <span onClick={() => navigate("/")}>Home</span> /{" "}
            <span className=" text-white"> Blogs</span>
          </h2>
        </div>
      </div>

      {/* Blog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onClick={() => handleBlogClick(blog.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogList;
