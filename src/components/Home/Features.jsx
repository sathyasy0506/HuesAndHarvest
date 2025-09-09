import React from "react";
import icon1 from "../../assets/images/ic1.png"; // for Home Made & Chemical Free
import icon2 from "../../assets/images/ic2.png"; // for Traditional

const Features = () => {
  return (
    <section className="py-16 bg-white text-center">
      {/* Heading */}
      <h3 className="text-gray-400 uppercase tracking-wide mb-2">
        Hues & Harvest
      </h3>
      <h2 className=" text-gray-500 text-3xl mb-12">WHY WE ARE SPECIAL?</h2>

      {/* Cards using flex */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition w-[267px] h-[220px] flex flex-col items-center justify-center">
          <img src={icon1} alt="Home Made" className="w-12 h-12 mb-4" />
          <h4 className=" text-gray-500 text-lg  mb-2">Home Made </h4>
          <p className="text-gray-500 text-sm text-center">
            Delicious foods made with fresh ingredients, served hot and fast!
          </p>
        </div>

        {/* Card 2 (Highlighted) */}
        <div className="bg-[#EB3257] text-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition w-[267px] h-[220px] flex flex-col items-center justify-center">
          <img src={icon2} alt="Traditional" className="w-12 h-12 mb-4" />
          <h4 className="text-lg  mb-2">Traditional</h4>
          <p className="text-sm text-center">
            Delicious foods made with fresh ingredients, served hot and fast!
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition w-[267px] h-[220px] flex flex-col items-center justify-center">
          <img src={icon1} alt="Chemical Free" className="w-12 h-12 mb-4" />
          <h4 className=" text-gray-500 text-lg  mb-2">Chemical Free</h4>
          <p className="text-gray-500 text-sm text-center">
            Delicious foods made with fresh ingredients, served hot and fast!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
