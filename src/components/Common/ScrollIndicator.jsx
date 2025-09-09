import { useEffect, useState } from "react";
import { Mouse } from "lucide-react";

export default function ScrollIndicator({ footerRef }) {
  const [show, setShow] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Initial delay before showing
  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Observe footer visibility
  useEffect(() => {
    if (!footerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [footerRef]);

  // Observe Hero visibility
  useEffect(() => {
    const hero = document.querySelector("section"); // assumes Hero is the first <section>
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Show indicator only when timer is done, Hero is not visible, and Footer is not visible
  useEffect(() => {
    if (timerDone && !heroVisible && !footerVisible) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [timerDone, heroVisible, footerVisible]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center space-x-2 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`transition-opacity duration-700 ${
          footerVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="rotate-180">
          <Mouse size={28} color="gray" className="animate-bounce-smooth" />
        </div>
      </div>
    </div>
  );
}
