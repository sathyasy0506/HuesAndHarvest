import React from "react";
import promoImage from "../../assets/images/promotion.jpg"; // change the path to your actual image file

function Promotion() {
  return (
    <section className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto  py-16">
        <img
          src={promoImage}
          alt="Promotion"
          className="w-full h-auto rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}

export default Promotion;
