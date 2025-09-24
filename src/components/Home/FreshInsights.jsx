import React from "react";
import { ArrowUpRight } from "lucide-react";

const FreshInsights = () => {
  return (
    <section className="w-full px-6 py-0 bg-transparent">
      <div className="max-w-7xl mx-auto bg-transparent">
        {/* Heading */}
        <div className="mb-10 flex flex-row gap-3">
          <span className="text-gray-500 text-[32px]">|</span>
          <div>
            <h2 className="text-3xl font-bold text-left flex items-center gap-3">
              Fresh <span className="text-gray-500 font-medium">Insights</span>
            </h2>
            <p className="mt-2 text-gray-600 text-left max-w-xl">
              Welcome to our Fresh Insights blog, where we bring you the latest
              tips, trends.
            </p>
          </div>
        </div>

        {/* Responsive Layout */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Column 1 */}
          <div
            className="relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-cover bg-center aspect-[4/5]"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/2228587/pexels-photo-2228587.jpeg')",
            }}
          >
            <div className="relative z-10 text-white drop-shadow-md flex flex-col gap-3">
              <h3 className="text-lg font-semibold uppercase">
                Stories of each slices
              </h3>
              <p className="text-sm leading-relaxed max-w-sm text-black">
                “From the benefits of organic produce to creative ways to enjoy
                seasonal fruits, we offer expert advice to help you make healthy
                choices.“
              </p>
              <button className="flex items-center justify-between bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition w-fit">
                <span>Our story</span>
                <span className="bg-white text-black p-1 rounded-full flex items-center justify-center ml-2">
                  <ArrowUpRight size={16} />
                </span>
              </button>
            </div>
          </div>

          {/* Column 2 */}
          <div className="rounded-2xl overflow-hidden aspect-[4/5]">
            <img
              src="https://images.pexels.com/photos/32620523/pexels-photo-32620523.jpeg"
              alt="portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {/* Top Image */}
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/4198654/pexels-photo-4198654.jpeg"
                alt="powder"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Content */}
            <div className="rounded-2xl border border-gray-900 flex flex-col justify-center items-center p-6 flex-grow">
              <h4 className="text-center uppercase text-lg mb-3">
                Let’s explore <br /> together
              </h4>
              <button className="flex items-center gap-2 border px-5 py-2 rounded-full text-sm hover:bg-gray-100 transition">
                See all blogs <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshInsights;
