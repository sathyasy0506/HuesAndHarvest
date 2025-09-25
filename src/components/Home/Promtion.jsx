import React, { useState, useEffect, useRef } from "react";
import promoImage from "../../assets/images/promotion.jpg";

const images = [promoImage, promoImage, promoImage, promoImage, promoImage];

function Promotion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const isAutoScrolling = useRef(false);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll when currentIndex changes (autoplay or dot click)
  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const slideWidth = slider.offsetWidth;

      isAutoScrolling.current = true; // mark as auto scroll
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });

      // reset after transition
      const timeout = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 700); // should match CSS transition / scroll duration

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Detect active slide when user scrolls manually
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      if (isAutoScrolling.current) return; // ignore programmatic scrolls

      const slideWidth = slider.offsetWidth;
      const newIndex = Math.round(slider.scrollLeft / slideWidth);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  return (
    <section className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <div className="w-full max-w-5xl py-0 relative">
          {/* Slider container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory product-carousel-scrollbar space-x-4"
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Promotion ${index + 1}`}
                className="w-full flex-shrink-0 h-auto rounded-2xl object-cover snap-start"
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
      </div>
    </section>
  );
}

export default Promotion;
