import React from "react";
import { ArrowUpRight } from "lucide-react";

const FreshInsights = () => {
  return (
    <section className="w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 flex flex-row gap-3">
          <span className="text-gray-500  text-[32px]">|</span>
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

        {/* Flex Layout */}
        <div className="flex gap-6">
          {/* Column 1 (523 × 505) */}
          <div
            className="w-[523px] h-[505px] rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/2228587/pexels-photo-2228587.jpeg?_gl=1*fgonwz*_ga*MTIwMzc1OTY5Ni4xNzU3MzI4ODY4*_ga_8JE65Q40S6*czE3NTczMzE0ODIkbzIkZzEkdDE3NTczMzE2MTYkajUyJGwwJGgw')",
            }}
          >
            <div className="relative z-10 text-white drop-shadow-md flex flex-col gap-3">
              <h3 className="text-lg font-semibold uppercase ">
                Stories of each slices
              </h3>
              <p className="text-sm leading-relaxed max-w-sm text-black">
                “From the benefits of organic produce to creative ways to enjoy
                seasonal fruits, we offer expert advice to help you make healthy
                choices.“
              </p>
              <button
                className="flex items-center justify-between bg-black text-white text-sm px-2  rounded-full hover:bg-gray-800 transition"
                style={{ width: "129px", height: "35px" }}
              >
                <span>Our story</span>
                <span className="bg-white text-black p-1 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={16} />
                </span>
              </button>
            </div>
          </div>

          {/* Column 2 (356 × 505) */}
          <div className="w-[356px] h-[505px] rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/32620523/pexels-photo-32620523.jpeg?_gl=1*ffpn4s*_ga*MTIwMzc1OTY5Ni4xNzU3MzI4ODY4*_ga_8JE65Q40S6*czE3NTczMzE0ODIkbzIkZzEkdDE3NTczMzE2OTUkajM4JGwwJGgw"
              alt="portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Column 3 (321 × 505 total) */}
          <div className="w-[321px] h-[505px] flex flex-col gap-4">
            {/* Top Image (321 × 308) */}
            <div className="w-[321px] h-[308px] rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4198654/pexels-photo-4198654.jpeg?_gl=1*5i4uqn*_ga*MTIwMzc1OTY5Ni4xNzU3MzI4ODY4*_ga_8JE65Q40S6*czE3NTczMzE0ODIkbzIkZzEkdDE3NTczMzE3NjEkajM1JGwwJGgw"
                alt="powder"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Content (321 × 182) */}
            <div className="w-[321px] h-[182px] rounded-2xl border-[1px] border-black-950 flex flex-col justify-center items-center p-6">
              <h4 className="text-center  uppercase text-lg mb-3">
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
