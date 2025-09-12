import React from "react";
import promoImage from "../../assets/images/promotion.png"; // change the path to your actual image file

function Promotion() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <img
          src={promoImage}
          alt="Promotion"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </section>
  );
}

export default Promotion;
