import React from "react";
import { Clock, User } from "lucide-react";

const BlogCard = ({ blog, onClick, variant = "default" }) => {
  if (variant === "compact") {
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <div className="flex gap-3 p-4">
          <div className="flex-shrink-0">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {blog.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{blog.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-[10px] bg-white shadow-sm
             hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium border border-white/80 bg-white/90 text-gray-800 rounded-full shadow-sm backdrop-blur-sm">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-3 transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-sm leading-relaxed text-gray-600 mb-5 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 ">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {blog.author.name}
              </p>
              <p className="text-xs text-gray-500">{blog.publishedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
