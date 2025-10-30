import React, { useState, useEffect, useRef } from "react";
import { ENDPOINTS } from "../../api/api";

function Promotion() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const isAutoScrolling = useRef(false);

  // ✅ Fetch promotion images from your WordPress API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(ENDPOINTS.HH_SECTIONS());
        const data = await res.json();

        const promotionArray = Array.isArray(data.promotion)
          ? data.promotion
          : [];
        // Fallback to hero if promotion is missing/empty
        const sourceArray =
          promotionArray.length > 0 && promotionArray
            ? promotionArray
            : Array.isArray(data.hero)
            ? data.hero
            : [];

        if (sourceArray.length > 0) {
          const sorted = sourceArray
            .slice()
            .sort((a, b) => Number(a.order) - Number(b.order));
          setImages(sorted.map((img) => img.url));
        }
      } catch (err) {
        console.error("Failed to fetch promotions:", err);
      }
    };

    fetchImages();
  }, []);

  // ✅ Auto scroll
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  // ✅ Smooth scroll on index change
  useEffect(() => {
    if (sliderRef.current && images.length > 0) {
      const slider = sliderRef.current;
      const slideWidth = slider.offsetWidth;

      isAutoScrolling.current = true;
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });

      const timeout = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, images]);

  // ✅ Detect manual scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || images.length === 0) return;

    const handleScroll = () => {
      if (isAutoScrolling.current) return;

      const slideWidth = slider.offsetWidth;
      const newIndex = Math.round(slider.scrollLeft / slideWidth);
      if (newIndex !== currentIndex) setCurrentIndex(newIndex);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [currentIndex, images]);

  return (
    <section className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <div className="w-full max-w-5xl py-0 relative">
          {/* ✅ Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory space-x-4 product-carousel-scrollbar"
          >
            {images.length > 0 ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Promotion ${index + 1}`}
                  className="w-full flex-shrink-0 h-[13rem] rounded-2xl object-cover snap-start"
                />
              ))
            ) : (
              <div className="w-full h-[13rem] flex items-center justify-center text-gray-400 bg-gray-100 rounded-2xl">
                Loading promotions...
              </div>
            )}
          </div>

          {/* ✅ Dots */}
          {images.length > 1 && (
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
          )}
        </div>
      </div>
    </section>
  );
}

export default Promotion;
