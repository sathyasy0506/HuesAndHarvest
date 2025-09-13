import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, blogPosts } from "./BlogData"; // assuming blogPosts is exported
import Gradient from "../Background/Gradient";
import BlogCard from "./BlogCard";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
    return null;
  }

  const blog = getBlogById(id);

  if (!blog) {
    navigate("/");
    return null;
  }

  // filter out current blog from suggestions
  const relatedBlogs = blogPosts.filter((b) => b.id !== id);

  return (
    <Gradient>
      <div className="min-h-screen bg-transparent mt-16">
        {/* Header Banner */}
        <div className="relative w-full h-44 sm:h-80 -mt-16 lg:h-64">
          <img
            src={blog.image}
            alt="Blog Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-gray-300 text-2xl sm:text-2xl lg:text-2xl ">
              <span onClick={() => navigate("/")}>Home</span> /{" "}
              <span onClick={() => navigate("/blog")}>Blog</span> /{" "}
              <span className=" text-white">Single Blog</span>
            </h2>
          </div>
        </div>

        {/* Main Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Blog Content */}
          <div className="lg:col-span-2 pr-4">
            {/* Title & Intro Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
              <div>
                <h1 className="text-4xl font-[500] text-gray-900 mb-4 leading-snug">
                  {blog.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-[2px] bg-gray-900"></div>
                  <p className="text-gray-500 font-medium">{blog.category}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-10">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>

            <div className="border-t border-dashed border-gray-300 my-8 w-full"></div>

            {/* Post Details */}
            <div className="mb-8">
              {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Post Details
              </h2> */}
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm">
                  Hosted by {blog.publishedDate} .
                </span>
                <div className="flex items-center gap-2">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                  <span className="font-medium text-gray-900">
                    {blog.author.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 sticky top-24 self-start h-fit">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Related Posts
            </h3>
            <div className="space-y-4">
              {relatedBlogs.slice(0, 5).map((related) => (
                <BlogCard
                  key={related.id}
                  blog={related}
                  variant="compact"
                  onClick={() => navigate(`/blog/${related.id}`)}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Gradient>
  );
};

export default SingleBlog;
