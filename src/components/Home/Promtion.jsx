import React, { useState, useEffect, useRef } from "react";
import promoImage from "../../assets/images/promotion.jpg"; // adjust path if needed

const images = [promoImage, promoImage, promoImage, promoImage, promoImage];

function Promotion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Scroll animation when currentIndex changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <section className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto py-16 overflow-hidden relative">
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Promotion ${index + 1}`}
              className="w-full flex-shrink-0 h-auto rounded-2xl object-cover"
            />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                index === currentIndex ? "bg-[#1A342F]" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Promotion;
