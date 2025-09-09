import React from "react";
import ProductCarousel from "./ProductCarousel";
import ProductCylinderCarousel from "./ProductSlider";

export default function ProductShowcase() {
  return (
    <section
      className="max-w-7xl mx-auto py-2 rounded-2xl"
      style={{
        background: "linear-gradient(to bottom, #4F926E, #326B4E)",
      }}
    >
      <div className="flex gap-8 w-full overflow-hidden items-center">
        {/* Left component */}
        <div className="w-1/3 min-w-0">
          <ProductCylinderCarousel />
        </div>

        {/* Divider (auto stretch height) */}
        <div
          className="w-px self-stretch my-16"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, white 40%, transparent 40%)",
            backgroundSize: "1px 16px", // adjust for dash+gap size
          }}
        ></div>

        {/* Right component */}
        <div className="w-2/3 min-w-0">
          <ProductCarousel />
        </div>
      </div>
    </section>
  );
}
