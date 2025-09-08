import { Play, ArrowUpRight } from "lucide-react";

function Promotion() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 gap-12">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Farmer Image with Play Button */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg"
              alt="Farmer"
              className="rounded-xl w-72 h-80 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full">
                <Play className="w-6 h-6 text-gray-800" />
              </span>
            </button>
          </div>

          {/* Natural text */}
          <div className="flex items-center gap-1">
            <span className="text-xl font-medium text-gray-700">Natural</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C10 10 2 12 2 12s8 2 10 10c2-8 10-10 10-10S14 10 12 2z" />
            </svg>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          {/* Top Tags */}
          <div className="flex items-center gap-4">
            <span className="px-4 py-1 border rounded-full text-sm font-medium text-gray-700">
              FREE DELIVERY
            </span>
            <span className="text-gray-400">•</span>
            <span className="px-4 py-1 border rounded-full text-sm font-medium text-gray-700">
              FRESH FRUITS
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Organic <br /> Food
          </h1>

          {/* Start Shopping Button */}
          <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition">
            Start Shopping
            <span className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </button>
        </div>

        {/* Tomato Image */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg"
            alt="Tomato"
            className="w-52 h-52 object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default Promotion;
